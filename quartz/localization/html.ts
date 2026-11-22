import type { Element, Root, RootContent } from "hast";
import { visit } from "unist-util-visit";
import { searchLabels, tagLabel } from "./uk";

function text(node: RootContent): string {
  return node.type === "text"
    ? node.value
    : "children" in node
      ? node.children.map(text).join("")
      : "";
}

function hasClass(node: Element, name: string): boolean {
  return String(node.properties.className ?? "")
    .split(/[ ,]+/)
    .includes(name);
}

function setText(node: Element, value: string) {
  node.children = [{ type: "text", value }];
}

/** Translate generated UI, never prose, identifiers, hrefs, or image filenames. */
export function localizeHtml(tree: Root): void {
  visit(tree, "element", (node, _index, parent) => {
    for (const key of ["ariaLabel", "title", "placeholder"]) {
      const value = node.properties[key];
      if (typeof value !== "string") continue;
      const label =
        searchLabels[value] ??
        {
          breadcrumbs: "Навігаційний шлях",
          "Global Graph": "Граф усіх сторінок",
        }[value];
      if (label) node.properties[key] = label;
      if (
        key === "ariaLabel" &&
        node.properties.dataFootnoteBackref !== undefined
      ) {
        const match = /^Back to reference (\d+)(?:-(\d+))?$/.exec(value);
        if (match)
          node.properties[key] =
            `Повернутися до посилання ${match[1]}${match[2] ? ` (згадка ${match[2]})` : ""}`;
      }
    }

    if (node.tagName === "title" && text(node) === "Search")
      setText(node, "Пошук");

    if (parent?.type === "element" && node.tagName === "p") {
      const value = text(node);
      if (hasClass(parent, "page-listing")) {
        const count =
          /^(?:Елементів з цією міткою: (\d+)\.|(1) елемент з цією міткою\.)$/.exec(
            value,
          );
        if (count)
          setText(node, `Сторінок із цим тегом: ${count[1] ?? count[2]}.`);
      }
      if (hasClass(parent, "popover-hint")) {
        const count = /^Всього знайдено міток: (\d+)\.$/.exec(value);
        if (count) setText(node, `Усього тегів: ${count[1]}.`);
      }
    }
    if (node.tagName === "span") {
      const count = /^Показ перших (\d+) міток\.$/.exec(text(node));
      if (count) setText(node, `Показано сторінок: ${count[1]}.`);
    }

    if (
      node.properties.id === "footnote-label" &&
      text(node).startsWith("Footnotes")
    ) {
      // Preserve the existing anchor child, id, and all footnote reference targets.
      const first = node.children[0];
      if (first?.type === "text" && first.value === "Footnotes")
        first.value = "Примітки";
    }

    if (node.tagName === "a" && hasClass(node, "tag-link")) {
      const href = String(node.properties.href ?? "");
      const match = /(?:^|\/)tags\/(.+?)(?:\.html)?(?:[#?].*)?$/.exec(href);
      if (match) {
        const tag = decodeURIComponent(match[1]);
        const prefix = text(node).startsWith("#") ? "#" : "";
        setText(node, prefix + tagLabel(tag));
      }
    }

    if (
      node.tagName === "blockquote" &&
      node.properties.dataCallout === "figure"
    ) {
      const captions: string[] = [];
      visit(node, "element", (child) => {
        if (child.tagName === "em" || child.tagName === "figcaption")
          captions.push(text(child));
      });
      visit(node, "element", (child) => {
        if (child.tagName === "img" && !child.properties.alt) {
          child.properties.alt = captions[0]?.trim() || "Ілюстрація";
        }
      });
    }
  });
}
