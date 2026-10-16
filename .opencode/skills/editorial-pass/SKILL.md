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
5. Load and follow `@content-frontmatter` whenever editing a target's YAML frontmatter. For every target article, also ensure it contains a concise, accurate `description` for Quartz previews. Add it when missing or update it when stale; aim for about 150 characters or fewer. Base it only on established article content, preserve uncertainty, and leave unrelated frontmatter unchanged. Apply this only to target articles, not as an implicit sweep of all `content/` notes.

## Editorial method

1. Read the whole target note, its frontmatter, and enough nearby or linked notes to understand its subject, structure, and conventions. Before relocating material, inspect the likely destination note.
2. State the article's reader-facing question in your own reasoning. Keep material that answers it or provides necessary context; cut repetition, tangents, low-value source-comparison commentary, and research-process narration that does not help the reader. Do not cut a named person's source-supported local role, action, or appearance merely because the person is obscure, appears only once, or seems insufficiently notable; preserve it in the appropriate article. A role seated in a target settlement may support a qualified inference of probable presence there, while an unrelated external role alone (such as judge in Mogilev) does not.
3. Rewrite in clear, economical Ukrainian. Apply the vault's `content/` language rule: do not switch languages at the user's request; translate or summarize quotations and source wording in Ukrainian, preserving another language only for the exact title of an actual publication. Render foreign personal and place names in Ukrainian script, using established Ukrainian forms or consistent transliteration/transcription without adding the original foreign spelling alongside them. For historical articles, prefer chronological organization when the evidence and subject allow; preserve useful thematic structure when chronology would obscure the subject rather than imposing a timeline mechanically.
4. Treat the frontmatter `description` as the explicit Quartz preview text: make it a compact summary of the article's subject and scope, not a generic tagline. If no description exists, add one in the existing YAML frontmatter style (or create frontmatter containing `description` if needed). Quartz uses this value instead of deriving the preview from body text, so keep it aligned with the article without requiring the opening body paragraph to duplicate it verbatim.
5. Prefer scannable structure over bulky paragraphs: split distinct points into a list, use a short heading or another Markdown structure when it helps readers find information, and keep connected explanation in prose. Do not add formatting just for its own sake.
6. Avoid opaque internal identifiers in reader-facing prose, such as “У рядку 111001.” Refer to the record by its meaningful subject and use a human-readable source locator (for example, printed page, section, or entry) in the citation. Retain an identifier only if readers need it, and explain what it identifies.
7. Remove conversational artifacts such as assistant/user exchanges, prompt residue, self-referential drafting commentary, and chatty transitions. Do not mistake attributed testimony, oral tradition, or a necessary explanation of evidential limits for conversational filler.
8. Keep reader-facing evidence qualifications that materially prevent misunderstanding. Move operational research notes (failed access, tool errors, search history, next-step reminders) out of published prose and into an existing relevant task/log when appropriate. Do not create a task for every removed aside.

## Chronological organization

- Treat dated events and people’s dated appearances, actions, or life milestones as points on the article’s timeline. Group them under explicit years or clearly labeled approximate year ranges where that helps readers follow the sequence.
- Anchor each point to the event or milestone date, not the publication, record, or source date that reports it. Preserve the source’s precision and uncertainty (for example, an approximate date stays approximate); never infer a year or range merely to fill a gap.
- A person's mention belongs at the point supported by the cited event or milestone; do not place a person by birth year alone when the passage concerns a later event. Keep undated material in a clearly contextual or thematic section instead of forcing it into the chronology.
- Preserve the evidence, attribution, citations, and qualifications for every point when rearranging material. Check that the resulting timeline is in chronological order and that date ranges do not imply more precision than the sources support.

## Evidence and integrity

- Preserve YAML frontmatter, citations, source links, Obsidian wikilinks, embeds, dates, evidence, and calibrated uncertainty unless the requested edit requires a specific change. Keep exact publication titles in citations; translate other quoted or descriptive source wording into Ukrainian. Render foreign names in Ukrainian script as described above. Adding or updating the Quartz `description` is an expected part of editing each target article; follow `@content-frontmatter` for any other metadata change and do not rewrite unrelated frontmatter.
- Never invent a fact, source, locator, identity, or link. Do not strengthen, normalize, or silently alter a historical claim while polishing its wording.
- A citation or source record is not proof that the underlying source supports the sentence. If the user asks to verify a claim, or an inspected source genuinely conflicts with it, inspect the cited evidence when feasible and report the distinction. Do not treat a user-provided fact or transcription as doubtful merely because it lacks a citation or independent confirmation; preserve it as stated, including any uncertainty the user marked. Load `research-facts` for requested historical fact-finding or substantive verification.
- When cutting or relocating a factual passage, retain its evidence and caveats with it. Do not turn an omission from a source or index into proof of nonexistence, unchanged status, or completeness.
- Add only relevant wikilinks to notes that exist. Bold the target article's title at its natural first mention when revising article prose, as required by the vault guidance.
- Before finishing, check revised reader-facing text for non-Ukrainian wording and foreign personal or place names left in non-Ukrainian script, applying the repository's `content/` language rule.

## Structural boundaries

- Content-only editing does not authorize changing filenames or published routes. If the user requests a file move, split, merge, or rename, load `curate-articles` and follow its backlink and redirect checks.
- Moving a paragraph between existing notes is a content edit: update both notes, preserve the source attribution, and add an appropriate wikilink where useful. Search for relevant duplicate placement only when needed to avoid leaving misleading duplicated prose.
- Do not create or revise an article merely because a fact could fit there. The user must authorize article creation or the destination must already exist and clearly own the material.

## Verify and report

- Re-read each changed passage in context. Check that frontmatter and Markdown structure remain intact, each target has a concise and accurate `description`, citations still support the claims as far as inspected, and moved material has not lost its qualifiers or source links.
- Check wikilinks and heading links touched by the edit. If a content move changes a published path, stop and use `curate-articles`; do not improvise redirects.
- Report the files edited, the main kinds of changes (clarified, cut, or relocated), and any factual ambiguity left unresolved. Mention research or checks not performed; do not claim source verification unless the source was actually inspected.
