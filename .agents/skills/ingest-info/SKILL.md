---
metadata:
  opencode/autoinvoke: "false"
name: ingest-info
description: "Route user-provided historical or genealogical information into relevant existing vault articles."
---

# Route user-provided information into articles

When creating or revising quotations, source citations, footnotes, or author/editor notes, load and follow `../citations-and-notes/SKILL.md`. This includes paraphrasing evidence and moving cited passages; stay within this workflow’s editing scope.

Take information supplied by the user and place its useful parts in the existing vault article or articles that best fit. Accept user-confirmed readings or transcriptions as established readings and other user-stated facts within their stated scope, preserving uncertainty. A trusted reading establishes what the document says, not that its historical assertion is true. Preserve supplied attribution and source limits without independently verifying them. This is a local routing and editing workflow, not a research or fact-checking task.

## Scope

- Treat the supplied text or attachment as the complete information payload. Do not search the web, open external links, inspect source documents, run OCR, or otherwise research or verify its claims.
- Inspect the vault as needed to understand candidate article scopes, conventions, existing coverage, and duplicates. Search locally using distinctive names, places, dates, and phrases from the payload; read only plausible destinations and directly relevant context.
- Edit existing articles only. Do not create, rename, split, or merge articles; create research tasks; or broaden the request into a general cleanup.
- A command invocation does not mean every supplied detail belongs in an article. It is correct to make no changes.

## Assess each item

1. If the payload contains several independent facts or records, assess each separately.
2. Identify what the information actually says, who or what it concerns, its place and period, and any supplied source, attribution, quotation, locator, or uncertainty. Distinguish the user's confirmed reading, the document's assertion, and any interpretation. Accept supplied facts within that scope; do not add details to fill gaps or infer historical accuracy from reading confidence.
3. Route a detail only when it materially helps answer the reader-facing question of a clearly relevant existing article. Load and follow `../content-placement/SKILL.md`: choose the page for the actual historical subject, not simply the narrowest title or the keeper of the source. Choose its primary home and useful cross-references; add substantive treatment elsewhere only for a distinct perspective grounded in the payload. A resident's religion alone does not route their history to a registrar. Report a justified independent-entity proposal if needed, without creating a page in this workflow.
4. Do not add material that is already adequately covered, incidental, repetitive, uncertain in a way the user has marked, or not useful to readers. Do not withhold a user-stated fact or require a citation merely because it lacks independent corroboration. Preserve the user's uncertainty markers. If the supplied information itself is genuinely ambiguous, ask only for the detail needed to route or accurately express it; do not research or independently verify it.
5. For living or recently deceased people, apply the root contract's case-by-case privacy assessment using the supplied information and relevant local context. Public availability is not sufficient justification to republish a detail. Omit or generalize unnecessary sensitive details; withhold a detail whose material privacy question remains unresolved. Record the decision in an existing task/evidence section when available, otherwise in the response, without reproducing sensitive data or creating a new record.
6. If no existing article clearly owns a worthwhile detail, leave it unplaced. Do not create a note or force it into a loosely related article.
7. If the correct destination or meaning remains genuinely ambiguous, ask one concise question about that item before editing it. Continue with other items whose routing is clear.

## Edit conservatively

- Preserve the destination article's frontmatter, structure, wording conventions, and existing table schemas. Add the detail in the most natural existing section and format. Create a heading only when needed to make a substantive addition understandable; do not create a generic catch-all section.
- Write all added article text in Ukrainian; do not switch languages at the user's request. Translate or summarize supplied quotations and source descriptions in Ukrainian. Preserve another language only for the exact title of an actual publication. Render foreign personal and place names in Ukrainian script, using established Ukrainian forms or consistent transliteration/transcription; do not add the original foreign spelling alongside them. Keep prose concise and distinguish what the supplied source states from interpretation or inference.
- Preserve every supplied identity, date, locator, URL, citation, attribution, and qualification that is relevant to the retained detail and passes the privacy assessment; render names according to the `content/` language rule above. Do not fabricate, complete, normalize by guesswork, or silently strengthen any of them. Do not add skepticism merely because the information came from the user. Preserve the distinction between a user's account, what an uninspected source is said to contain, and what that source can establish; use source-attributed wording when the supplied evidence supports only the document's assertion.
- Add relevant Obsidian wikilinks only to existing notes. When revising prose, bold the article's title at its natural first mention, following the vault convention.
- Check candidate destinations for existing coverage before adding. If the detail is already present, leave it unchanged unless the payload supplies a clear improvement such as a missing citation or qualification. If existing article text conflicts with supplied information, preserve both accounts' attribution and relevant citations rather than resolving historical truth from transcription confidence. Do not omit the user's contribution merely for lack of corroboration; apply it at its supported scope, subject to the privacy assessment.
- Do not update Quartz descriptions, unrelated prose, or other files as incidental cleanup.

## Verify and report

After editing, re-read the changed passages in context. Confirm that only justified destination articles changed, retained user-provided facts and uncertainty remain intact, document assertions were not promoted to established events merely through transcription confidence, privacy decisions were applied, and no duplicate was introduced. Check links touched by the edit and inspect the diff for unrelated changes.
Confirm that all added reader-facing text is Ukrainian and that foreign personal and place names are rendered in Ukrainian script, except when part of an exact publication title.

Report:

- which article(s) and sections changed, and what was added or clarified;
- which supplied items were already covered, left out as unnecessary, or left unresolved due to ambiguity;
- that no independent research or source verification was performed.

If nothing was added, say so plainly and briefly explain why.
