import { Fragment } from "preact";
import { jsx, jsxs } from "preact/jsx-runtime";
import { render } from "preact-render-to-string";
import { fromHtml } from "hast-util-from-html";
import { toJsxRuntime, type Jsx } from "hast-util-to-jsx-runtime";
import { visit } from "unist-util-visit";
import type { Root as MdRoot } from "mdast";
import type { ElementContent, Root } from "hast";
import type { QuartzConfig } from "../cfg";
import { DefaultFrame, frameRegistry } from "../components/frames";
import { localizeHtml } from "./html";
import { calloutLabels, tagLabel } from "./uk";

/** Run before Obsidian generates its default English callout headings. */
export function localizeCallouts(tree: MdRoot): void {
  visit(tree, "blockquote", (node) => {
    const paragraph = node.children[0];
    const first =
      paragraph?.type === "paragraph" ? paragraph.children[0] : undefined;
    if (first?.type !== "text") return;
    first.value = first.value.replace(
      /^(\[!([\w-]+)(?:\|[^\]]*)?\][+-]?)[\t ]*(?=\n|$)/,
      (match, directive, type: string) => {
        const label = calloutLabels[type.toLowerCase()];
        return label ? `${directive} ${label}` : match;
      },
    );
  });
}

/** Site-level extensions: upstream packages and source Markdown stay untouched. */
export function applyUkrainianLocalization(
  config: QuartzConfig,
  clientScript: string,
): QuartzConfig {
  if (config.configuration.locale !== "uk-UA") return config;

  config.plugins.transformers.unshift({
    name: "UkrainianCalloutLabels",
    markdownPlugins: () => [() => localizeCallouts],
  });
  const descriptionIndex = config.plugins.transformers.findIndex(
    (plugin) => plugin.name === "Description",
  );
  config.plugins.transformers.splice(
    descriptionIndex < 0
      ? config.plugins.transformers.length
      : descriptionIndex,
    0,
    {
      name: "UkrainianHtmlLabels",
      htmlPlugins: () => [() => (tree: Root) => localizeHtml(tree)],
      externalResources: () => ({
        js: [
          {
            script: clientScript,
            loadTime: "afterDOMReady",
            contentType: "inline",
          },
        ],
        css: [
          {
            inline: true,
            content: `
        .tags > li { white-space: normal; max-width: 100%; }
        a.internal.tag-link { display: inline-block; overflow-wrap: anywhere; }
        .search .ghost-text { display: none; }
        .search .tag-suggestion-item { white-space: normal; overflow-wrap: anywhere; }
      `,
          },
        ],
      }),
    },
  );

  frameRegistry.register(
    "ukrainian",
    {
      name: "ukrainian",
      render(props) {
        // The frame API covers community components, including their nested page lists.
        const tree = fromHtml(render(DefaultFrame.render(props)), {
          fragment: true,
        });
        // HAST stores inert template contents separately; JSX uses children.
        // Keep Explorer's folder/file templates available to its client script.
        visit(tree, "element", (node) => {
          if (node.tagName === "template" && node.content) {
            node.children = node.content.children as ElementContent[];
          }
        });
        localizeHtml(tree);
        return toJsxRuntime(tree, {
          Fragment,
          jsx: jsx as Jsx,
          jsxs: jsxs as Jsx,
          elementAttributeNameCase: "html",
          // Preserve embedded map JSON and styles verbatim during this SSR pass.
          components: {
            script: ({ children, ...rest }) => (
              <script
                {...rest}
                dangerouslySetInnerHTML={{ __html: String(children ?? "") }}
              />
            ),
            style: ({ children, ...rest }) => (
              <style
                {...rest}
                dangerouslySetInnerHTML={{ __html: String(children ?? "") }}
              />
            ),
          },
        });
      },
    },
    "sharhoroots",
  );

  config.plugins.pageTypes = config.plugins.pageTypes?.map((pageType) => {
    const generate = pageType.generate;
    return {
      ...pageType,
      frame: "ukrainian",
      ...(pageType.name === "TagPage" && generate
        ? {
            generate: (...args: never[]) =>
              generate(...args).map((page) => ({
                ...page,
                title:
                  page.slug === "tags/index"
                    ? "Усі теги"
                    : tagLabel(page.slug.slice("tags/".length)),
              })),
          }
        : {}),
    };
  });
  return config;
}
