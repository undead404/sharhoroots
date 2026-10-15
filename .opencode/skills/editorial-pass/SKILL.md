---
name: editorial-pass
description: Polish vault articles on request: clarify wording, cut irrelevant or conversational material, and move useful facts to the existing articles that best fit them while preserving evidence and links.
---

# Edit and organize vault articles

Use this skill when asked to edit, polish, clean up, or improve one or more vault articles. The goal is reader-focused prose and sound article organization—not a broader rewrite or new historical research unless requested.

## Scope and defaults

1. Treat the named or attached note as the primary target. If the request identifies several articles, stay within those targets.
2. When a passage clearly belongs in a different **existing** article, inspect that destination and move the passage there if the user asked for organizational editing. Preserve its citations, qualifications, and useful wikilinks. Do not create articles, rename or move files, or reorganize unrelated notes unless asked.
3. If the destination is uncertain, the passage supports multiple articles, or moving it would change its meaning, leave it in place and ask or report the ambiguity rather than guessing.
4. Make the requested edits directly. Do not stop at critique or a proposed rewrite unless the user asked for review only, a plan, or suggestions.
5. For every target article, ensure YAML frontmatter contains a concise, accurate `description` for Quartz previews. Add it when missing or update it when stale; aim for about 150 characters or fewer. Base it only on established article content, preserve uncertainty, and leave unrelated frontmatter unchanged. Apply this only to target articles, not as an implicit sweep of all `content/` notes.

## Editorial method

1. Read the whole target note, its frontmatter, and enough nearby or linked notes to understand its subject, structure, and conventions. Before relocating material, inspect the likely destination note.
2. State the article's reader-facing question in your own reasoning. Keep material that answers it or provides necessary context; cut repetition, tangents, low-value source-comparison commentary, and research-process narration that does not help the reader.
3. Rewrite for clear, economical Ukrainian prose unless the user requests another language. Preserve original-language quotations and titles when they are evidence. Follow the note's existing structure and style rather than imposing a template.
4. Treat the frontmatter `description` as the explicit Quartz preview text: make it a compact summary of the article's subject and scope, not a generic tagline. If no description exists, add one in the existing YAML frontmatter style (or create frontmatter containing `description` if needed). Quartz uses this value instead of deriving the preview from body text, so keep it aligned with the article without requiring the opening body paragraph to duplicate it verbatim.
5. Prefer scannable structure over bulky paragraphs: split distinct points into a list, use a short heading or another Markdown structure when it helps readers find information, and keep connected explanation in prose. Do not add formatting just for its own sake.
6. Avoid opaque internal identifiers in reader-facing prose, such as “У рядку 111001.” Refer to the record by its meaningful subject and use a human-readable source locator (for example, printed page, section, or entry) in the citation. Retain an identifier only if readers need it, and explain what it identifies.
7. Remove conversational artifacts such as assistant/user exchanges, prompt residue, self-referential drafting commentary, and chatty transitions. Do not mistake attributed testimony, oral tradition, or a necessary explanation of evidential limits for conversational filler.
8. Keep reader-facing evidence qualifications that materially prevent misunderstanding. Move operational research notes (failed access, tool errors, search history, next-step reminders) out of published prose and into an existing relevant task/log when appropriate. Do not create a task for every removed aside.

## Evidence and integrity

- Preserve YAML frontmatter, citations, source links, Obsidian wikilinks, embeds, names, dates, quotations, and calibrated uncertainty unless the requested edit requires a specific change. Adding or updating the Quartz `description` is an expected part of editing each target article; do not otherwise rewrite unrelated frontmatter.
- Never invent a fact, source, locator, identity, or link. Do not strengthen, normalize, or silently alter a historical claim while polishing its wording.
- A citation or source record is not proof that the underlying source supports the sentence. If the edit depends on a disputed or unclear historical claim, inspect the cited evidence when feasible. Load `research-facts` for requested historical fact-finding or substantive verification; otherwise preserve the claim with its existing attribution/uncertainty or flag it for review.
- When cutting or relocating a factual passage, retain its evidence and caveats with it. Do not turn an omission from a source or index into proof of nonexistence, unchanged status, or completeness.
- Add only relevant wikilinks to notes that exist. Bold the target article's title at its natural first mention when revising article prose, as required by the vault guidance.

## Structural boundaries

- Content-only editing does not authorize changing filenames or published routes. If the user requests a file move, split, merge, or rename, load `curate-articles` and follow its backlink and redirect checks.
- Moving a paragraph between existing notes is a content edit: update both notes, preserve the source attribution, and add an appropriate wikilink where useful. Search for relevant duplicate placement only when needed to avoid leaving misleading duplicated prose.
- Do not create or revise an article merely because a fact could fit there. The user must authorize article creation or the destination must already exist and clearly own the material.

## Verify and report

- Re-read each changed passage in context. Check that frontmatter and Markdown structure remain intact, each target has a concise and accurate `description`, citations still support the claims as far as inspected, and moved material has not lost its qualifiers or source links.
- Check wikilinks and heading links touched by the edit. If a content move changes a published path, stop and use `curate-articles`; do not improvise redirects.
- Report the files edited, the main kinds of changes (clarified, cut, or relocated), and any factual ambiguity left unresolved. Mention research or checks not performed; do not claim source verification unless the source was actually inspected.
