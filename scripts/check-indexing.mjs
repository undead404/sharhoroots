import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fromHtml } from "hast-util-from-html";

// Run after a full build; checks the deployable files, not source assumptions.
const output = process.argv[2] ?? "public";
const origin = "https://sharhoroots.koreni.org.ua";
const robots = await fs.readFile(path.join(output, "robots.txt"), "utf8");
assert.match(
  robots,
  new RegExp(`^Sitemap: ${origin.replaceAll(".", "\\.")}/sitemap\\.xml$`, "m"),
);
const sitemap = await fs.readFile(path.join(output, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  ([, url]) => new URL(url),
);
const routes = new Set(urls.map((url) => decodeURI(url.pathname)));
assert.equal(routes.size, urls.length, "Duplicate sitemap URLs");
assert(routes.has("/"), "Homepage missing from sitemap");

function htmlPath(route) {
  const slug = route.endsWith("/") ? `${route}index` : route;
  return path.join(output, `${slug}.html`);
}

function elements(html) {
  const result = [];
  function visit(node) {
    if (node.type === "element") result.push(node);
    for (const child of node.children ?? []) visit(child);
  }
  visit(fromHtml(html));
  return result;
}

function verifyMetadata(html, url) {
  const nodes = elements(html);
  const canonicals = nodes.filter(
    (node) =>
      node.tagName === "link" && node.properties.rel?.includes("canonical"),
  );
  assert.equal(canonicals.length, 1, `Canonical count: ${url}`);
  assert.equal(
    canonicals[0].properties.href,
    url.href,
    `Canonical differs from sitemap: ${url}`,
  );
  const og = nodes.find(
    (node) => node.tagName === "meta" && node.properties.property === "og:url",
  );
  assert.equal(og?.properties.content, url.href, `Open Graph URL: ${url}`);
  const scripts = nodes.filter(
    (node) =>
      node.tagName === "script" &&
      node.properties.type === "application/ld+json",
  );
  assert.equal(scripts.length, 1, `JSON-LD count: ${url}`);
  const data = JSON.parse(
    scripts[0].children.map((node) => node.value ?? "").join(""),
  );
  assert.equal(data["@context"], "https://schema.org");
  const graph = data["@graph"];
  const ids = new Set(graph.map((node) => node["@id"]));
  assert.equal(ids.size, graph.length, `Duplicate entity IDs: ${url}`);
  const page = graph.find((node) => node["@id"] === `${url.href}#webpage`);
  const site = graph.find((node) => node["@id"] === `${origin}/#website`);
  const publisher = graph.find(
    (node) => node["@id"] === `${origin}/author#person`,
  );
  assert.equal(page?.url, url.href);
  assert.equal(page.inLanguage, "uk-UA");
  assert.equal(page.isPartOf["@id"], site["@id"]);
  assert.equal(page.publisher["@id"], publisher["@id"]);
  assert.equal(site.publisher["@id"], publisher["@id"]);
  assert.equal(publisher["@type"], "Person");
  assert.equal(publisher.name, "Віталій Дмитрович Перегончук");
  if (page.mainEntity) assert(ids.has(page.mainEntity["@id"]));
  for (const node of graph) {
    assert.equal(node.author, undefined, `Unverified author: ${url}`);
    assert.notEqual(node.dissolutionDate, "Historical/Defunct");
  }
  return graph;
}

for (const url of urls) {
  assert.equal(url.origin, "https://sharhoroots.koreni.org.ua");
  assert.equal(url.search + url.hash, "", `Non-canonical URL: ${url}`);
  const route = decodeURI(url.pathname);
  const html = await fs.readFile(htmlPath(route), "utf8");
  const graph = verifyMetadata(html, url);
  if (route === "/registrar/sloboda-sharhorodska-orthodox-marymas") {
    const subject = graph.find((node) => node["@type"] === "PlaceOfWorship");
    assert.equal(subject.geo["@type"], "GeoCoordinates");
    assert.equal(subject.containedInPlace["@type"], "Place");
    assert.equal(subject.containedInPlace.name, "Слобода-Шаргородська");
    assert.equal(subject.foundingDate, "1750");
    assert.equal(subject.publisher, undefined);
  }
  const metas = html.match(/<meta\b[^>]*>/gi) ?? [];
  assert(
    !metas.some(
      (meta) =>
        /name\s*=\s*["']?(robots|googlebot)\b/i.test(meta) &&
        /content\s*=\s*["'][^"']*\b(noindex|none)\b/i.test(meta),
    ),
    `Sitemap page is noindex: ${url}`,
  );
  assert(
    !metas.some((meta) => /http-equiv\s*=\s*["']?refresh\b/i.test(meta)),
    `Sitemap page redirects: ${url}`,
  );
}

// Generated folder/tag pages are not necessarily included in ContentIndex's sitemap.
let generated = 0;
for (const file of await fs.readdir(output, { recursive: true })) {
  if (!file.endsWith(".html") || file === "404.html") continue;
  const route =
    file === "index.html"
      ? "/"
      : `/${file.replace(/index\.html$|\.html$/g, "")}`;
  if (routes.has(route)) continue;
  const html = await fs.readFile(path.join(output, file), "utf8");
  if (/<meta\b[^>]*http-equiv=["']?refresh/i.test(html)) continue;
  verifyMetadata(html, new URL(encodeURI(route), origin));
  generated++;
}

const redirects = await fs.readFile(path.join(output, "_redirects"), "utf8");
const notFound = elements(
  await fs.readFile(path.join(output, "404.html"), "utf8"),
);
assert(
  notFound.some(
    (node) =>
      node.tagName === "meta" &&
      node.properties.name === "robots" &&
      node.properties.content === "noindex",
  ),
  "Error document must be noindex even when served directly with HTTP 200",
);
assert(!routes.has("/404"), "Error document must not appear in sitemap");

const map = elements(await fs.readFile(path.join(output, "map.html"), "utf8"));
const mapData = map.find((node) => node.properties.id === "map-data");
assert(mapData, "Map data missing");
const places = JSON.parse(
  mapData.children.map((node) => node.value ?? "").join(""),
);
const directory = map.find(
  (node) =>
    node.tagName === "details" &&
    node.properties.className?.includes("places-map-list"),
);
assert(directory, "Map needs an HTML directory independent of JavaScript");
const links = [];
function collectMapLinks(node) {
  if (node.tagName === "a") links.push(node);
  for (const child of node.children ?? []) collectMapLinks(child);
}
collectMapLinks(directory);
assert(places.length > 0, "Map places missing");
assert.deepEqual(
  links.map((node) => node.properties.href),
  places.map((place) => place.url),
  "Every map marker needs a matching HTML link",
);
for (const link of links) {
  const target = new URL(link.properties.href, `${origin}/map`);
  assert(
    routes.has(decodeURI(target.pathname)),
    `Map target missing: ${target}`,
  );
}

let count = 0;
const sources = new Set();
for (const line of redirects.split("\n")) {
  if (!line.trim() || line.trimStart().startsWith("#")) continue;
  const [source, target, status, extra] = line.trim().split(/\s+/);
  assert(!extra && source && target, `Invalid redirect: ${line}`);
  assert.equal(status, "301", `Permanent move needs 301: ${line}`);
  assert(!sources.has(source), `Duplicate redirect: ${source}`);
  sources.add(source);
  assert(!routes.has(source), `Redirect hides sitemap page: ${source}`);
  assert(routes.has(target), `Redirect target absent from sitemap: ${target}`);
  count++;
}
console.log(
  `Indexing checks passed: ${urls.length} sitemap URLs, ${generated} generated pages, ${count} redirects; canonical, Open Graph and JSON-LD verified.`,
);
