---
name: curate-articles
description: Reorganize, move, split, merge, or rename Obsidian/Quartz articles while preserving links and updating content/_redirects whenever a published URL changes.
---

# Curate vault articles

Make requested structural changes without losing an article's evidence, inbound links, attachments, or published URL history. A title edit alone is not necessarily a URL change; check the actual Quartz route before deciding whether a redirect is needed.

## Before editing

1. Confirm the requested scope. Do not infer permission to rewrite historical claims while reorganizing an article.
2. Read the source note and nearby destination notes. Preserve YAML frontmatter, citations, Obsidian wikilinks, embeds, attachments, and the established folder/type conventions.
3. Search the vault for links to the current note, its filename, aliases, and relevant headings. Include indexes, tables, and Markdown links—not only prose backlinks.
4. Inspect `content/_redirects` before changing paths. Its format is one old route and one destination route per line. Preserve existing lines and their order; the file contains routes with different prefixes, so do not normalize routes by guesswork.
5. Determine the actual old and new published routes from the repository's Quartz path rules and any relevant frontmatter/configuration. A content file path is not automatically a URL with a `content/` prefix. If a route cannot be determined confidently, stop and ask rather than writing a speculative redirect.

## Move, rename, or restructure

1. Make only the requested move/rename or content restructuring. Preserve or intentionally update the note's title and frontmatter; do not change its research conclusions without evidence and authorization.
2. Update affected internal wikilinks, embeds, Markdown links, and navigation/index notes so they resolve to the new location. Preserve meaningful aliases where they are used by the project.
3. **If the published URL changes, update `content/_redirects` in the same change.** Add a mapping from the old published route to the new published route, using the file's existing two-column format. Do this even if the note has a Quartz `aliases` entry: the repository explicitly tracks path changes in `_redirects`.
4. If the old route already appears in `_redirects`, do not add a duplicate. Inspect its current destination and any redirect chain; update it only when required to preserve a direct route to the final destination. Do not remove or rewrite unrelated historical redirects.
5. For title-only edits where Quartz continues to emit the same path, do not invent a redirect. Explain that the public route did not change.

## Verify

- The destination note exists and produces the intended public route.
- Every changed internal link points to an existing note/heading or known asset.
- For a URL change, exactly one applicable old-route mapping exists in `content/_redirects`, points to the final route, and does not create a self-redirect or cycle.
- Existing redirects remain intact; do not treat mixed prefixes as errors without verifying their deployed routes.
- Confirm `_redirects` is included in the site output when validating a build. Quartz's Assets emitter copies non-Markdown files from `content`; avoid hand-editing generated output.
- Report the paths changed, the redirect mapping, checks run, and any route or link that could not be verified. Do not claim the change was deployed; building the site does not publish it.
