import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import type { Element, RootContent } from "hast";
import { fromHtml } from "hast-util-from-html";
import { visit } from "unist-util-visit";
import { tagLabels } from "../quartz/localization/uk";

const output = process.argv[2] ?? "public";
const regression = "registrar/sloboda-sharhorodska-orthodox-marymas";
const sitemap = fs.readFileSync(path.join(output, "sitemap.xml"), "utf8");
const slugs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) =>
    decodeURIComponent(new URL(match[1]).pathname).replace(/^\/|\/$/g, "") ||
    "index",
);
assert.ok(
  slugs.includes(regression),
  "Regression article is missing from the sitemap",
);

function text(node: RootContent): string {
  return node.type === "text"
    ? node.value
    : "children" in node
      ? node.children.map(text).join("")
      : "";
}

let pages = 0;
let tags = 0;
for (const slug of new Set([
  ...slugs,
  "404",
  "tags/index",
  ...Object.keys(tagLabels).map((tag) => `tags/${tag}`),
])) {
  const htmlPath = [
    path.join(output, `${slug}.html`),
    path.join(output, slug, "index.html"),
  ].find((candidate) => fs.existsSync(candidate));
  assert.ok(htmlPath, `${slug}: missing generated HTML`);
  const tree = fromHtml(fs.readFileSync(htmlPath, "utf8"));
  const elements: Element[] = [];
  visit(tree, "element", (node) => {
    elements.push(node);
  });
  const html = elements.find((node) => node.tagName === "html")!;
  assert.equal(html.properties.lang, "uk", `${slug}: HTML language`);
  assert.equal(html.properties.dir, "ltr", `${slug}: HTML direction`);
  for (const node of elements) {
    for (const key of ["ariaLabel", "placeholder"]) {
      const value = node.properties[key];
      if (typeof value === "string")
        assert.doesNotMatch(
          value,
          /[A-Za-z]/,
          `${slug}: untranslated ${key}: ${value}`,
        );
    }
    if (node.properties.id === "footnote-label")
      assert.equal(text(node).trim(), "Примітки", `${slug}: footnote heading`);
    if (
      node.tagName === "a" &&
      String(node.properties.className).includes("tag-link")
    ) {
      assert.doesNotMatch(
        text(node),
        /[A-Za-z]/,
        `${slug}: untranslated tag: ${text(node)}`,
      );
      tags++;
    }
    if (String(node.properties.className).includes("callout-title-inner"))
      assert.notEqual(text(node).trim(), "Figure", `${slug}: figure heading`);
  }
  if (slug === regression) {
    for (const id of ["template-folder", "template-file"]) {
      const template = elements.find(
        (node) => node.tagName === "template" && node.properties.id === id,
      );
      assert.ok(
        template?.content?.children.length,
        `${id}: Explorer template contents`,
      );
    }
    const link = elements.find(
      (node) =>
        node.tagName === "a" &&
        node.properties.href === "../tags/eastern-orthodox",
    );
    assert.ok(
      link && text(link).includes("Православ’я"),
      "Regression tag label/link",
    );
    assert.ok(
      elements.some(
        (node) =>
          node.tagName === "img" &&
          String(node.properties.alt).includes(
            "Церква Різдва Пресвятої Богородиці",
          ),
      ),
      "Regression image alt",
    );
    assert.ok(
      elements.some(
        (node) =>
          node.tagName === "time" &&
          /\d{1,2} [а-яіїєґ]+\. \d{4} р\./u.test(text(node)),
      ),
      "Regression Ukrainian date",
    );
    assert.ok(
      elements.some(
        (node) =>
          node.properties.id ===
          "user-content-fnref-topohrafichnyi-opys-1799-217-218",
      ),
      "Regression stable footnote ID",
    );
  }
  if (slug.startsWith("tags/") && slug !== "tags/index") {
    assert.ok(
      text(elements.find((node) => node.tagName === "title")!).startsWith(
        tagLabels[slug.slice(5)],
      ),
      `${slug}: tag page title`,
    );
  }
  pages++;
}
const index = JSON.parse(
  fs.readFileSync(path.join(output, "static/contentIndex.json"), "utf8"),
);
assert.deepEqual(
  index[regression].tags,
  ["eastern-orthodox", "greek-catholic"],
  "Search index must retain canonical tags",
);
console.log(
  `Localization passed: ${pages} pages, ${tags} tag links, Ukrainian dates/HTML/accessibility, stable canonical tags and footnotes.`,
);
