import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

// Run after a full build; checks the deployable files, not source assumptions.
const output = process.argv[2] ?? "public";
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

for (const url of urls) {
  assert.equal(url.origin, "https://sharhoroots.koreni.org.ua");
  assert.equal(url.search + url.hash, "", `Non-canonical URL: ${url}`);
  const route = decodeURI(url.pathname);
  const html = await fs.readFile(htmlPath(route), "utf8");
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

const redirects = await fs.readFile(path.join(output, "_redirects"), "utf8");
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
console.log(`Indexing checks passed: ${urls.length} URLs, ${count} redirects.`);
