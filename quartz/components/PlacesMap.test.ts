import assert from "node:assert/strict";
import test from "node:test";
import { renderToString } from "preact-render-to-string";
import { fromHtml } from "hast-util-from-html";
import type { Element, Root } from "hast";
import PlacesMap from "./PlacesMap";
import type { QuartzComponentProps } from "./types";

function elements(node: Root | Element): Element[] {
  return node.children.flatMap((child) =>
    child.type === "element" ? [child, ...elements(child)] : [],
  );
}

test("map places have crawlable, escaped links without running JavaScript", () => {
  const component = PlacesMap();
  const props = {
    fileData: { slug: "map", frontmatter: { isMapPage: true } },
    allFiles: [
      {
        slug: "settlement/yarove",
        frontmatter: {
          title: "Ярове",
          type: "Place",
          coordinates: [48.8, 28.2],
        },
      },
      {
        slug: "registrar/church",
        frontmatter: {
          title: "Церква <Святого> Михаїла",
          type: "PlaceOfWorship",
          coordinates: [48.7, 28.1],
        },
      },
      { slug: "settlement/unknown", frontmatter: { title: "Без координат" } },
    ],
  } as unknown as QuartzComponentProps;
  const html = renderToString(component(props));
  const nodes = elements(fromHtml(html));
  const links = nodes.filter((node) => node.tagName === "a");
  const data = nodes.find((node) => node.properties.id === "map-data")!;
  const places = JSON.parse(
    data.children.map((node) => ("value" in node ? node.value : "")).join(""),
  );
  assert.equal(links.length, 2);
  assert.deepEqual(
    links.map((node) => node.properties.href),
    places.map((place: { url: string }) => place.url),
  );
  assert.deepEqual(
    places.map((place: { title: string }) => place.title),
    ["Церква <Святого> Михаїла", "Ярове"],
  );
  assert.equal(
    links[0].children
      .map((node) => ("value" in node ? node.value : ""))
      .join(""),
    "Церква <Святого> Михаїла",
  );
  assert.equal(
    renderToString(
      component({
        ...props,
        fileData: { frontmatter: {} },
      } as QuartzComponentProps),
    ),
    "",
  );
});
