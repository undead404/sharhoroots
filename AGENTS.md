# Sharhoroots project guidance

This repository is an Obsidian vault published with Quartz 4. It serves genealogy, history, and lore researchers of the former Sharhorod raion and surrounding area.

## Working with the vault

- Preserve existing Markdown structure, YAML frontmatter, Obsidian wikilinks, embeds, and naming conventions. Prefer the conventions of nearby notes over introducing a new format.
- Write new or revised article prose in Ukrainian unless the user requests another language. Preserve original-language quotations and source titles where useful.
- Do not invent historical or genealogical facts, identities, dates, or source details. Every factual claim needs a verifiable reference; distinguish what a source states from interpretation, hypotheses, and oral tradition, and make uncertainty explicit.
- Preserve citations and source links when editing claims. If a claim cannot be verified from the available material, flag that rather than silently strengthening or changing it. A search snippet, OCR result, or another page citing a source is not the same as inspecting that source.
- Keep place names, historical administrative units, and transliterations consistent with the source and surrounding notes; do not normalize them by guesswork.
- For requests to find and source historical facts, load the `research-facts` skill. For requests to reorganize, move, or rename vault articles, load the `curate-articles` skill.
- For historical or genealogical research, follow `research-facts`: search the web, inspect and record at least one source document, and save each worthwhile unanswered follow-up as its own atomic note in `tasks/`. Check existing tasks first; a task may target more than one article, but must have one research question and one deliverable.
- When an article's published path changes, update `content/_redirects` and affected internal links in the same change. Preserve existing redirect entries and verify the old and new published paths; do not assume every route has the same prefix.
- Quartz builds the `content/` directory by default and ignores paths matching `private`, `templates`, `.obsidian`, and `**/*.excalidraw.md`. Keep research tasks in the repository-root `tasks/` directory, outside the published content tree; never copy them into generated site output.
- Do not edit generated output or local Obsidian workspace state as a substitute for editing its source.

## Quartz and verification

- `npm run docs` runs the repository's Quartz build with its local preview server.
- `npm run check` runs TypeScript checking and Prettier validation.
- `npm test` runs the TypeScript tests.
- Run `npm run check` after TypeScript or formatting changes; run `npm test` when changes affect tested behavior. For content-only edits, preserve note conventions and links and report any checks that were not run.
- Do not reformat unrelated files or run `npm run format` across the repository unless explicitly requested.
