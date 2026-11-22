import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import { globSync } from "node:fs";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import type { Root as MdRoot } from "mdast";
import { VFile } from "vfile";
import { fromHtml } from "hast-util-from-html";
import { render } from "preact-render-to-string";
import { Fragment, h } from "preact";
import { ObsidianFlavoredMarkdown } from "@quartz-community/obsidian-flavored-markdown";
import { GitHubFlavoredMarkdown } from "@quartz-community/github-flavored-markdown";
import { TagPage } from "@quartz-community/tag-page";
import { TagList } from "@quartz-community/tag-list";
import { Explorer } from "@quartz-community/explorer";
import type { QuartzConfig } from "../cfg";
import type { BuildCtx } from "../util/ctx";
import type { PageFrameProps } from "../components/frames";
import { frameRegistry } from "../components/frames";
import { formatDate } from "../components/Date";
import { applyUkrainianLocalization, localizeCallouts } from "./index";
import { localizeHtml } from "./html";
import { tagLabel, tagLabels } from "./uk";

function config(): QuartzConfig {
  return applyUkrainianLocalization(
    {
      configuration: { locale: "uk-UA" },
      plugins: {
        transformers: [ObsidianFlavoredMarkdown(), GitHubFlavoredMarkdown()],
        filters: [],
        emitters: [],
        pageTypes: [TagPage()],
      },
    } as unknown as QuartzConfig,
    "/* client */",
  );
}

function serialized(tree: ReturnType<typeof fromHtml>) {
  // Reuse the frame's supported rendering path in the integration test below;
  // JSON here makes identifiers and text equally visible to assertions.
  return JSON.stringify(tree);
}

test("real regression article uses Ukrainian generated labels with stable references", async () => {
  const cfg = config();
  const ctx = { cfg } as BuildCtx;
  const article = matter(
    fs.readFileSync(
      "content/registrar/Sloboda-Sharhorodska-orthodox-Marymas.md",
      "utf8",
    ),
  );
  const file = new VFile(article.content);
  file.data.slug = "registrar/sloboda-sharhorodska-orthodox-marymas" as never;
  const md = unified()
    .use(remarkParse)
    .use(
      cfg.plugins.transformers.flatMap((p) => p.markdownPlugins?.(ctx) ?? []),
    );
  const ast = (await md.run(md.parse(file), file)) as MdRoot;
  const html = unified()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(cfg.plugins.transformers.flatMap((p) => p.htmlPlugins?.(ctx) ?? []));
  const result = serialized(await html.run(ast, file));
  assert.match(result, /Ілюстрація/);
  assert.match(result, /Примітки/);
  assert.match(result, /Повернутися до посилання 1/);
  assert.match(result, /Церква Різдва Пресвятої Богородиці/);
  assert.match(result, /user-content-fn-topohrafichnyi-opys-1799-217-218/);
  assert.match(result, /footnote-label/);
  assert.doesNotMatch(
    result,
    /"value":"Figure"|"value":"Footnotes"|Back to reference/,
  );
  assert.deepEqual(article.data.tags, ["eastern-orthodox", "greek-catholic"]);
});

test("only automatic callout titles are translated, with folding and metadata preserved", () => {
  const md = unified().use(remarkParse);
  const tree = md.parse(
    "> [!figure]-\n> Зображення\n\n> [!warning|custom]+\n> Текст\n\n> [!figure] Авторський підпис\n> Текст",
  );
  localizeCallouts(tree);
  const result = JSON.stringify(tree);
  assert.match(result, /\[!figure\]- Ілюстрація/);
  assert.match(result, /\[!warning\|custom\]\+ Застереження/);
  assert.match(result, /\[!figure\] Авторський підпис/);
});

test("tag display labels preserve canonical links and unrelated prose", () => {
  const tree = fromHtml(
    '<a class="internal tag-link" href="../tags/eastern-orthodox">eastern-orthodox</a><p>eastern-orthodox</p><a class="tag-link" href="../tags/greek-catholic">#greek-catholic</a>',
    { fragment: true },
  );
  localizeHtml(tree);
  const result = serialized(tree);
  assert.match(result, /"href":"\.\.\/tags\/eastern-orthodox"/);
  assert.match(result, /"value":"православ’я"/);
  assert.match(result, /"value":"#греко-католицизм"/);
  assert.match(result, /"value":"eastern-orthodox"/);
  assert.equal(tagLabel("unknown/topic"), "unknown / topic");
  assert.equal(tagLabel("area/volost"), "територія / волость");
});

test("every canonical vault tag has a Ukrainian display label", () => {
  for (const path of globSync("content/**/*.md")) {
    const { data } = matter(fs.readFileSync(path, "utf8"));
    for (const tag of data.tags ?? []) {
      assert.ok(tagLabels[tag], `Missing display label for ${tag} in ${path}`);
      assert.doesNotMatch(tagLabels[tag], /[A-Za-z]/);
    }
  }
});

test("virtual tag pages have localized titles and unchanged routes", () => {
  const cfg = config();
  const pageType = cfg.plugins.pageTypes!.find((p) => p.name === "TagPage")!;
  const file = new VFile();
  file.data.frontmatter = {
    title: "Приклад",
    tags: ["eastern-orthodox", "greek-catholic"],
  } as never;
  const pages = pageType.generate!({
    content: [[{ type: "root", children: [] }, file]],
    cfg: cfg.configuration,
  } as never);
  assert.equal(
    pages.find((p) => p.slug === "tags/eastern-orthodox")?.title,
    "православ’я",
  );
  assert.equal(
    pages.find((p) => p.slug === "tags/greek-catholic")?.title,
    "греко-католицизм",
  );
  assert.equal(pages.find((p) => p.slug === "tags/index")?.title, "Усі теги");
});

test("frame localizes nested upstream components and preserves map JSON", () => {
  config();
  const componentData = {
    fileData: {
      slug: "registrar/example",
      frontmatter: { tags: ["eastern-orthodox"] },
    },
    cfg: { locale: "uk-UA" },
  };
  const result = render(
    frameRegistry.get("ukrainian")!.frame.render({
      componentData,
      header: [],
      beforeBody: [TagList()],
      afterBody: [],
      left: [],
      right: [],
      footer: [],
      pageBody: () =>
        h(
          Fragment,
          null,
          h("nav", { "aria-label": "breadcrumbs" }),
          h("button", { "aria-label": "Global Graph" }),
          h("script", {
            id: "map-data",
            type: "application/json",
            dangerouslySetInnerHTML: {
              __html: '[{"title":"Шаргород","url":"../settlement/sharhorod"}]',
            },
          }),
        ),
    } as unknown as PageFrameProps),
  );
  assert.match(result, /href="\.\.\/tags\/eastern-orthodox"[^>]*>православ’я/);
  assert.match(result, /aria-label="Навігаційний шлях"/);
  assert.match(result, /aria-label="Граф усіх сторінок"/);
  assert.match(
    result,
    /\[\{"title":"Шаргород","url":"\.\.\/settlement\/sharhorod"\}\]/,
  );
});

test("Ukrainian date format includes the month name and year marker", () => {
  const formatted = formatDate(new Date("2026-11-12T12:00:00Z"), "uk-UA");
  assert.match(formatted, /12 лист\. 2026 р\./);
});

test("frame preserves upstream Explorer template contents for mobile navigation", () => {
  config();
  const result = render(
    frameRegistry.get("ukrainian")!.frame.render({
      componentData: {
        fileData: { slug: "index", frontmatter: {} },
        cfg: { locale: "uk-UA" },
      },
      header: [],
      beforeBody: [],
      afterBody: [],
      right: [],
      footer: [],
      left: [Explorer()],
      pageBody: () => h("article", {}),
    } as unknown as PageFrameProps),
  );
  assert.match(result, /<template id="template-folder"><li/);
  assert.match(result, /<template id="template-file"><li/);
  assert.match(result, /class="folder-title"/);
});
