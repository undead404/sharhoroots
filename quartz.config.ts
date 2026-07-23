import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Генеалогія Шаргородщини та Джуринщини",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "uk-UA",
    baseUrl: "sharhoroots.pages.dev",
    ignorePatterns: ["private", "templates", ".obsidian", "**/*.excalidraw.md"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Source Sans 3", // Виправлено на актуальну варіативну версію
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fcfcfc",
          lightgray: "#e5e5e5",
          gray: "#a3a3a3",
          darkgray: "#404040",
          dark: "#171717",
          secondary: "#2f5c7a",
          tertiary: "#5a8c82",
          highlight: "rgba(47, 92, 122, 0.08)",
          textHighlight: "rgba(255, 242, 54, 0.5)",
        },
        darkMode: {
          light: "#121212",
          lightgray: "#262626",
          gray: "#737373",
          darkgray: "#d4d4d4",
          dark: "#f5f5f5",
          secondary: "#8ab4f8",
          tertiary: "#84a59d",
          highlight: "rgba(138, 180, 248, 0.15)",
          textHighlight: "rgba(179, 170, 2, 0.5)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      // Plugin.Latex() видалено.
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config