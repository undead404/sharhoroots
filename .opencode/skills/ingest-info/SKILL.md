---
metadata:
  opencode/autoinvoke: false
name: ingest-info
description: Route user-provided historical or genealogical information into relevant existing vault articles, preserving evidence and leaving out material that is redundant or does not fit. Викликати для внесення наданих відомостей до статей.
---

# Route user-provided information into articles

Take information supplied by the user and place only its useful, supported parts in the existing vault article or articles that best fit. This is a local routing and editing workflow, not a research or fact-checking task.

## Scope

- Treat the supplied text or attachment as the complete information payload. Do not search the web, open external links, inspect source documents, run OCR, or otherwise research or verify its claims.
- Inspect the vault as needed to understand candidate article scopes, conventions, existing coverage, and duplicates. Search locally using distinctive names, places, dates, and phrases from the payload; read only plausible destinations and directly relevant context.
- Edit existing articles only. Do not create, rename, split, or merge articles; create research tasks; or broaden the request into a general cleanup.
- A command invocation does not mean every supplied detail belongs in an article. It is correct to make no changes.

## Assess each item

1. If the payload contains several independent facts or records, assess each separately.
2. Identify what the information actually says, who or what it concerns, its place and period, and any supplied source, attribution, quotation, locator, or uncertainty. Do not fill gaps with assumptions.
3. Route a detail only when it materially helps answer the reader-facing question of a clearly relevant existing article. Prefer the narrowest article that owns the subject. Add it to another existing article only when that article has a distinct, useful perspective supported by the same payload—not merely because it mentions a related place, person, or institution.
4. Do not add material that is already adequately covered, incidental, repetitive, speculative, unsupported by the supplied payload, or not useful to readers. In particular, do not turn an unsupported assertion into authoritative article prose. If a missing citation or unclear claim is essential to safe publication, leave that item untouched and ask the user for the needed information; do not research it.
5. If no existing article clearly owns a worthwhile detail, leave it unplaced. Do not create a note or force it into a loosely related article.
6. If the correct destination or meaning remains genuinely ambiguous, ask one concise question about that item before editing it. Continue with other items whose routing is clear.

## Edit conservatively

- Preserve the destination article's frontmatter, structure, wording conventions, and existing table schemas. Add the detail in the most natural existing section and format. Create a heading only when needed to make a substantive addition understandable; do not create a generic catch-all section.
- Write all added article text in Ukrainian; do not switch languages at the user's request. Translate or summarize supplied quotations and source descriptions in Ukrainian. Preserve another language only for the exact title of an actual publication. Render foreign personal and place names in Ukrainian script, using established Ukrainian forms or consistent transliteration/transcription; do not add the original foreign spelling alongside them. Keep prose concise and distinguish what the supplied source states from interpretation or inference.
- Preserve every supplied identity, date, locator, URL, citation, attribution, and qualification that is relevant to the retained detail; render names according to the `content/` language rule above. Do not fabricate, complete, normalize by guesswork, or silently strengthen any of them. Do not imply that an uninspected source says more than the user's supplied description establishes.
- Add relevant Obsidian wikilinks only to existing notes. When revising prose, bold the article's title at its natural first mention, following the vault convention.
- Check candidate destinations for existing coverage before adding. If the detail is already present, leave it unchanged unless the payload supplies a clear, non-conflicting improvement such as a missing citation or qualification. Do not silently replace conflicting article content with unverified supplied claims; report the conflict.
- Do not update Quartz descriptions, unrelated prose, or other files as incidental cleanup.

## Verify and report

After editing, re-read the changed passages in context. Confirm that only justified destination articles changed, supplied evidence and uncertainty remain attached to the claims, and no duplicate was introduced. Check links touched by the edit and inspect the diff for unrelated changes.
Confirm that all added reader-facing text is Ukrainian and that foreign personal and place names are rendered in Ukrainian script, except when part of an exact publication title.

Report:

- which article(s) and sections changed, and what was added or clarified;
- which supplied items were already covered, omitted as unnecessary/unsupported, or left unresolved due to ambiguity;
- that no independent research or source verification was performed.

If nothing was added, say so plainly and briefly explain why.
