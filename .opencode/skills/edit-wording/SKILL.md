---
name: edit-wording
description: Polish article prose and descriptions for readability, audience fit, and correct natural Ukrainian while preserving meaning and evidential strength.
---

# Edit an article's wording

Use this skill as a publishing editor: make an article easier to read and understand for genealogists, historians, and local-lore researchers. Improve expression, not the article's underlying meaning or organization.

## Scope

1. Resolve the target from the supplied repository-relative path(s) or attached article. If there is no unambiguous target, ask rather than guessing. Read each target in full and edit only reader-facing text in its body (including headings, captions, and explanatory table text) and its YAML `description` field.
2. Make edits directly unless the user asked for review only. Keep the article's existing structure and scope; this command is not a meaning audit, research pass, metadata sweep, or permission to relocate or remove substantive facts.
3. Do not create research tasks. If a gap or meaning problem becomes apparent, report it as a suggestion for `/edit-meaning` rather than changing the article's meaning.

## Editorial standard

- Check whether the prose is easy to read and understand, flows coherently, and meets the expectations of the intended audience. Prefer direct, economical, idiomatic Ukrainian while retaining necessary historical precision and context.
- Correct Ukrainian spelling, grammar, punctuation, agreement, word choice, and awkward or ambiguous phrasing. Apply the repository's `content/` language rule: authored reader-facing text is Ukrainian; foreign personal and place names are rendered in Ukrainian script; another language remains only in the exact title of an actual publication. Translate or summarize other foreign-language source wording rather than reproducing it.
- Preserve every substantive proposition, name, date, relationship, attribution, citation, link, and useful qualification. Do not silently cut, add, rearrange, or relocate factual content. Do not turn an inference, possibility, oral tradition, or source-limited statement into an established fact.
- Never make a statement stronger, broader, more precise, or more certain than before. Keep qualifiers such as *можливо* and *ймовірно* when they carry evidential meaning. If the intended meaning cannot be determined safely from the text and context, preserve the passage and report the ambiguity instead of resolving it by guesswork.
- Preserve the article's heading hierarchy, chronology, Markdown structure, citations, Obsidian wikilinks, embeds, literal identifiers, archival codes, and URLs. Correct clear Ukrainian errors in reader-facing headings and labels without changing their scope or structure. Avoid opaque internal identifiers in reader-facing prose; if clarifying one would require changing what it refers to, flag it for a meaning pass instead.

## Description field

- The pass covers the YAML `description` as well as the body. Load and follow `@content-frontmatter` whenever editing frontmatter.
- Improve the description's Ukrainian, clarity, and readability while preserving the same established subject, scope, and degree of certainty. Keep it concise (aim for about 150 characters or fewer), accurate, and consistent with the body; do not add a relevance claim or other fact not already established there.
- If the description is materially inaccurate or its subject/scope cannot be made clear without deciding a meaning question, do not invent a correction: report that `/edit-meaning` should resolve it. Do not change unrelated frontmatter.

## Boundaries and checks

- Do not perform historical verification or external research. The user's own statements and transcriptions remain established facts unless they marked uncertainty or asked for verification. If the user requests verification, load and follow `@research-facts` rather than treating wording edits as evidence review.
- Do not change table data, archival identifiers, source locators, or URLs to make them look more regular. If wording work necessarily touches a specialized table's layout or contents, stop and follow the corresponding table skill before editing; leave non-wording changes for `/edit-meaning`.
- Keep all authored `content/` reader-facing text in Ukrainian and preserve exact publication titles and literal identifiers. Do not change filenames, routes, unrelated notes, or task files.

Before finishing, reread each changed passage in context. Confirm the Ukrainian is correct and natural, the description is concise and aligned with the body, and no fact, evidence, structure, link, or degree of certainty has changed. Report the files edited and any meaning issue or ambiguity left for a separate pass.
