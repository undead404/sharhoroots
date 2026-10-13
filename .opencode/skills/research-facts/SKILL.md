---
name: research-facts
description: Find, verify, reference, and write interesting historical or genealogical facts about Sharhorod raion and nearby places; use when asked to research a claim, find a surprising fact, add evidence, or draft sourced Ukrainian prose.
---

# Research sourced local-history facts

Help the user discover interesting facts without turning plausible stories, search snippets, or weak citations into asserted history. “Proved” means supported by evidence that readers can inspect; do not imply absolute certainty where the sources do not provide it.

## Workflow

1. **Define the question.** Identify the place, period, people or institution, and what would count as an interesting answer. Ask a concise question if the scope is too broad to research responsibly.
2. **Check the task queue.** Read relevant notes in `tasks/` before starting. Do not duplicate an open task; if the request spans independently answerable questions, keep the current answer focused and capture the other questions as separate tasks.
3. **Search the web and inspect documents.** Every research session must include at least one web search and processing of at least one source document (for example, a page of a book, archival image, map, official text, or a relevant local document). A search result is a lead, not a processed document. Record the query and useful result, and record each inspected document with its title/creator, date, exact page/folio/image or other locator, URL or shelfmark, and what it can establish. Prefer primary sources for claims about events, with reputable secondary sources for context. A catalog description establishes what the catalog says, not the uninspected file's contents.
4. **Save worthwhile follow-up leads.** If research uncovers a distinct, potentially useful question that is not answered in the current scope, create a Markdown task in `tasks/` using `tasks/TEMPLATE.md`. Check for duplicates first. Create one note per independently answerable question; do not create an umbrella task or combine unrelated questions. Include the lead/evidence that prompted it, a focused question, useful search terms or source leads, and a completion condition. Capture every material follow-up lead; do not turn trivial tangents into queue noise. One task may target multiple article paths: use the `targets` YAML list for every affected article. Article count does not determine task scope.
5. **Inspect and locate the evidence.** Verify the relevant passage, page, image, folio, entry, or map location in the underlying source where possible. Preserve original spelling in quotations; translate or summarize separately. If web search or document access is unavailable, disclose it; do not imply that the minimum was met.
6. **Be explicit about limits.** If the underlying item is inaccessible, OCR is uncertain, sources conflict, or a genealogical identity is only a hypothesis, say so and lower the claim's confidence. Never fabricate a shelfmark, page, quotation, URL, or access detail. A research task whose required web search or document inspection could not be completed remains `blocked` or `open`, not `done`.
7. **Build a small evidence record.** For each candidate fact, capture:
   - the proposed claim;
   - the evidence and a precise locator;
   - source type (primary/secondary) and what it can establish;
   - caveats, conflicting evidence, and confidence.

   Prefer a smaller number of well-supported, locally relevant facts over a long list of trivia. Seek independent corroboration for consequential or surprising claims when feasible.

8. **Write in Ukrainian.** When asked to draft or add prose, follow nearby notes' organization and inline Markdown citation style. Put citations next to the claims they support. Separate source wording from editorial interpretation; do not embellish a claim for dramatic effect. Preserve existing frontmatter, wikilinks, embeds, and source links.
9. **Respect the requested scope.** If the user asks only to find facts, return the evidence record and suggested Ukrainian wording without editing article files. Edit an article only when asked; state what remains unverified and which sources you actually inspected. When working on a task note, update its research record and status; do not silently edit its target articles unless requested.

## Atomic task convention

- A task is one answerable research question with one completion outcome. It may require several sources and may target multiple articles, but it is not a list of independent questions or edits.
- Use `targets` as a YAML sequence of article paths (not a singular `target` field). List every article the findings are intended to inform; use an empty sequence only when no article is in scope.
- Keep task notes in `tasks/`, based on `tasks/TEMPLATE.md`. A task is done only when its answer/evidence is recorded and the web-search and document-processing requirements are met. If access prevents that, record the attempt and leave it open or blocked.
- Record web queries and the actual source documents processed in the task. For an ordinary research request without an existing task, include these in the returned evidence record; create task notes only for distinct worthwhile follow-ups.

## Completion check

- Each historical or genealogical assertion in proposed prose has a reference that supports that specific assertion.
- The locator allows a reader to find the evidence; where the source could not be inspected, this is disclosed.
- The research record includes at least one web search and at least one processed source document, or explicitly records why the work remains incomplete.
- Each worthwhile unanswered follow-up discovered during research has a non-duplicative, atomic task note.
- Names, dates, places, and quoted wording have not been silently normalized or inferred.
- The Ukrainian prose does not state more than the evidence supports.
