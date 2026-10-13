# Sharhoroots project guidance

This repository is an Obsidian vault published with Quartz 4. It serves genealogy, history, and lore researchers of the former Sharhorod raion and surrounding area.

## Working with the vault

- Preserve existing Markdown structure, YAML frontmatter, Obsidian wikilinks, embeds, and naming conventions. Prefer the conventions of nearby notes over introducing a new format.
- Do not invent historical or genealogical facts, identities, dates, or source details. Keep documented evidence distinct from interpretation, hypotheses, and oral tradition; make uncertainty explicit.
- Preserve citations and source links when editing claims. If a claim cannot be verified from the available material, flag that rather than silently strengthening or changing it.
- Keep place names, historical administrative units, and transliterations consistent with the source and surrounding notes; do not normalize them by guesswork.
- Quartz is configured to ignore paths matching `private`, `templates`, `.obsidian`, and `**/*.excalidraw.md`. Do not move private or working material into the published content or generated site output.
- Do not edit generated output or local Obsidian workspace state as a substitute for editing its source.

## Quartz and verification

- `npm run docs` runs the repository's Quartz build with its local preview server.
- `npm run check` runs TypeScript checking and Prettier validation.
- `npm test` runs the TypeScript tests.
- Run `npm run check` after TypeScript or formatting changes; run `npm test` when changes affect tested behavior. For content-only edits, preserve note conventions and links and report any checks that were not run.
- Do not reformat unrelated files or run `npm run format` across the repository unless explicitly requested.
