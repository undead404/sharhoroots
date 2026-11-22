import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import matter from "gray-matter";
import { renderToString } from "preact-render-to-string";
import ArticleTitle from "./ArticleTitle";
import type { QuartzComponentProps } from "./types";

const component = ArticleTitle();

function render(slug: string, frontmatter: Record<string, unknown>) {
  return renderToString(
    component({ fileData: { slug, frontmatter } } as QuartzComponentProps),
  );
}

test("home and folder indexes keep navigation aliases out of the heading", () => {
  const { data } = matter(fs.readFileSync("content/index.md", "utf8"));
  for (const slug of ["index", "settlement/index"]) {
    const html = render(slug, data);
    assert.match(html, /<h1 class="article-title">/);
    assert.doesNotMatch(html, /article-aliases|Інші назви/);
  }
});

test("a name repeated without the title qualifier adds no alias line", () => {
  const html = render("settlement/Budne", {
    title: "Будне (Шаргородське)",
    aliases: ["Будне", "Будне (Шаргородське)"],
  });
  assert.match(html, /Будне \(Шаргородське\)<\/h1>/);
  assert.doesNotMatch(html, /article-aliases|Інші назви/);
});

test("distinct names retain their spelling and order after redundant names are removed", () => {
  const { data } = matter(
    fs.readFileSync("content/settlement/Verbivka.md", "utf8"),
  );
  const html = render("settlement/Verbivka", data);
  assert.match(
    html,
    /Інші назви: Ксьондзівка, Малі Голинчинці, Ворошилівка, Ворошиловка<\/p>/,
  );
});

test("missing aliases stay hidden and displayed values are deduplicated and escaped", () => {
  assert.doesNotMatch(render("test", { title: "Назва" }), /article-aliases/);
  const html = render("test", {
    title: "Назва",
    aliases: ["Назва", " ", " Інша назва ", "Інша назва", "<script>"],
  });
  assert.match(html, /Інші назви: Інша назва, &lt;script><\/p>/);
  assert.doesNotMatch(html, /<script>/);
});
