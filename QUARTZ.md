# Quartz maintenance

This site uses Quartz **5.0.0**, based on upstream commit
`97a2d05f80c4c50534959b1d0d41cc4b3895625e` from the `v5` branch.

- Site settings, plugin options, and layout: `quartz.config.yaml`.
- Typography uses the core theme settings; the optional fonts plugin is disabled
  because its independent defaults override the configured fonts.
- Engine entry point: `quartz.ts`.
- Community plugins are npm dependencies, pinned by `package-lock.json`.
- The local map plugin lives in `plugins/places-map`; `npm ci` builds it through
  `prepare`. Its component remains in `quartz/components/PlacesMap.tsx`.
- Local structured metadata uses `StructuredData.tsx` in `Head.tsx`, with the
  existing Schema.org types and frontmatter validation.
- `content/_redirects` preserves old mixed-case URLs and existing renamed routes.
  Quartz 5 emits lowercase canonical URLs; wikilinks retain their source filenames.
  The alias plugin also generates case redirects on case-sensitive build systems.

Use Node.js 22 or newer and npm 10.9.2 or newer:

```sh
npm ci
npm run build
npm run docs
```

`npm run build` publishes the `content/` vault to `public/`. `npm run docs` previews
that same vault, using polling to avoid macOS file-watcher limits. Hosts can continue using `npx quartz build` after `npm ci`;
all community plugins are installed by npm and the engine links the local plugin.
Do not disable install scripts without running `npm run build:plugins` separately.

Run `npm run check` for frontmatter validation, tests, TypeScript, and formatting.
The migration passed all 168 tests and TypeScript checking. Repository-wide
Prettier validation also reports pre-existing formatting issues outside this
migration; do not reformat the vault just to clear them.

Upstream documentation: <https://quartz.jzhao.xyz/migrating>
