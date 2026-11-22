import assert from "node:assert/strict";
import test from "node:test";
import { renderToString } from "preact-render-to-string";
import { StructuredData } from "./StructuredData";
import Head from "./Head";
import { QuartzComponentProps } from "./types";
import { canonicalUrl } from "../util/canonical";
import { FullSlug } from "../util/path";

function props(slug: string, frontmatter?: Record<string, unknown>) {
  return {
    cfg: {
      baseUrl: "sharhoroots.koreni.org.ua",
      pageTitle: "Генеалогія Шаргородщини",
      locale: "uk-UA",
      publisher: {
        name: "Віталій Дмитрович Перегончук",
        url: "https://sharhoroots.koreni.org.ua/author",
      },
      theme: { cdnCaching: false },
    },
    fileData: { slug, frontmatter },
    ctx: { cfg: { plugins: { emitters: [] } } },
    externalResources: { css: [], js: [], additionalHead: [] },
  } as unknown as QuartzComponentProps;
}

function graph(input: QuartzComponentProps) {
  const html = renderToString(StructuredData(input));
  return JSON.parse(html.replace(/^<script[^>]*>|<\/script>$/g, ""))[
    "@graph"
  ] as Record<string, any>[];
}

test("canonicals follow sitemap index, Unicode, case and subpath conventions", () => {
  for (const [slug, expected] of [
    ["index", "/"],
    ["registrar/index", "/registrar/"],
    ["registrar/church", "/registrar/church"],
    ["registrar/distinct-Church", "/registrar/distinct-Church"],
    ["Історія", "/%D0%86%D1%81%D1%82%D0%BE%D1%80%D1%96%D1%8F"],
  ]) {
    assert.equal(
      canonicalUrl("example.org", slug as FullSlug),
      `https://example.org${expected}`,
    );
  }
  assert.equal(
    canonicalUrl("example.org/vault/", "index" as FullSlug),
    "https://example.org/vault/",
  );
});

test("Head emits one canonical matching Open Graph; excludes 404 and unset domain", () => {
  const head = Head();
  const html = renderToString(head(props("index")));
  assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1);
  assert.match(
    html,
    /rel="canonical" href="https:\/\/sharhoroots.koreni.org.ua\/"/,
  );
  assert.match(
    html,
    /property="og:url" content="https:\/\/sharhoroots.koreni.org.ua\/"/,
  );
  assert.doesNotMatch(renderToString(head(props("404"))), /rel="canonical"/);
  const local = props("index");
  local.cfg.baseUrl = undefined;
  assert.doesNotMatch(renderToString(head(local)), /rel="canonical"/);
});

test("historical subject remains distinct from page, website and publisher", () => {
  const nodes = graph(
    props("registrar/church", {
      title: "Церква",
      type: "PlaceOfWorship",
      coordinates: [48.7, 28.1],
      containedInPlace: "Слобода-Шаргородська",
      foundingDate: 1750,
      tags: ["defunct"],
    }),
  );
  const subject = nodes.find((node) => node["@type"] === "PlaceOfWorship")!;
  const page = nodes.find((node) => node["@type"] === "WebPage")!;
  assert.equal(subject.foundingDate, "1750");
  assert.equal(subject.geo.latitude, 48.7);
  assert.equal(subject.containedInPlace.name, "Слобода-Шаргородська");
  assert.equal(subject.dissolutionDate, undefined);
  assert.equal(subject.publisher, undefined);
  assert.equal(subject.author, undefined);
  assert.equal(page.mainEntity["@id"], subject["@id"]);
  assert.equal(subject.mainEntityOfPage["@id"], page["@id"]);
  assert.equal(
    page.publisher["@id"],
    nodes.find((n) => n["@type"] === "Person")!["@id"],
  );
});

test("profile reuses publisher identity; home and generated pages stay WebPages", () => {
  const profile = graph(props("author", { title: "Автор", type: "Person" }));
  assert.equal(profile.filter((n) => n["@type"] === "Person").length, 1);
  assert.equal(
    profile.find((n) => n["@type"] === "Person")!.name,
    "Віталій Дмитрович Перегончук",
  );
  for (const input of [
    props("index", { title: "Головна", type: "WebPage" }),
    props("tags/index"),
  ]) {
    assert.equal(
      graph(input).filter((n) => n["@type"] === "WebPage").length,
      1,
    );
  }
});

test("JSON-LD escapes script terminators and omits unknown publisher identity", () => {
  const input = props("test", {
    title: "</script><script>alert(1)</script>",
    type: "Place",
  });
  input.cfg.publisher = undefined;
  const html = renderToString(StructuredData(input));
  assert.equal((html.match(/<script/g) ?? []).length, 1);
  const nodes = graph(input);
  assert.equal(
    nodes.find((n) => n["@type"] === "Place")!.name,
    input.fileData.frontmatter!.title,
  );
  assert(nodes.every((n) => n.publisher === undefined));
});
