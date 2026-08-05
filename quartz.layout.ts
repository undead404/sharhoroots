import { PageLayout, SharedLayout } from "./quartz/cfg";
import * as Component from "./quartz/components";
import PlacesMap from "./quartz/components/PlacesMap";
import type { Options } from "./quartz/components/Explorer";

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "Генеалогія Шаргородщини на Facebook": "https://www.facebook.com/groups/1748115539548381",
    },
  }),
};

const customSortFn: Options["sortFn"] = (a, b) => {
  const orderMap: Record<string, number> = {
    'map': 0,
    'author': 1,
    'settlement/index': 2,
    'registrar/index': 3,
    'administrative-division/index': 4
  };

  const orderA = a.slug in orderMap ? orderMap[a.slug] : Infinity;
  const orderB = b.slug in orderMap ? orderMap[b.slug] : Infinity;

  if (orderA !== orderB) {
    return orderA - orderB;
  }

  return a.displayName.localeCompare(b.displayName, 'uk', {
    numeric: true,
    sensitivity: "base",
  });
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    PlacesMap(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      sortFn: customSortFn,
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
};

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
};
