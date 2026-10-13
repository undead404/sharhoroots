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
5. **Inspect and locate the evidence.** Verify the relevant passage, page, image, folio, entry, or map location in the underlying source where possible. Preserve original spelling in quotations; translate or summarize separately. If web search or document access is unavailable, record that in the task or returned research record; do not imply that the minimum was met or put the access failure into article prose.
6. **Be explicit about limits in the right place.** In article prose, include only a concise qualification needed to accurately interpret the historical claim (for example, that a catalog entry establishes what the catalog says, not the contents of an uninspected file). Do not narrate the research process or the agent's environment in an article: failed access attempts, HTTP errors, unavailable tools, and similar operational details belong in the task's research log and evidence/answer sections. If access prevents adding new supported information to a task, record the attempts and limitation there, leave target articles unchanged, and set `status: fail`; never mark incomplete evidence as `found` or `done`. Do not turn an access failure into article prose merely to disclose that the research was incomplete.
7. **Build a small evidence record.** For each candidate fact, capture:
   - the proposed claim;
   - the evidence and a precise locator;
   - source type (primary/secondary) and what it can establish;
   - caveats, conflicting evidence, and confidence.

   Prefer a smaller number of well-supported, locally relevant facts over a long list of trivia. Seek independent corroboration for consequential or surprising claims when feasible.

8. **Write in Ukrainian.** When asked to draft or add prose, follow nearby notes' organization and inline Markdown citation style. Put citations next to the claims they support. Separate source wording from editorial interpretation; do not embellish a claim for dramatic effect. Preserve existing frontmatter, wikilinks, embeds, and source links.
9. **Apply task findings to their targets.** For a research task, save verified findings and source details in the task first and set `status: found`. Then apply relevant, supported findings to every applicable article in `targets`, preserving the note's structure, citations, and uncertainty; add Obsidian wikilinks to relevant existing notes rather than leaving cross-linking to the user. When drafting or revising article prose, bold the article's title at its natural first mention. Set `status: done` only after the target article changes are applied. If no new supported information can be added (including because required sources are inaccessible), record what was attempted and why, leave target articles unchanged, and set `status: fail`. Do not mark an interrupted or not-yet-researched task `fail`; leave it `open`.
   For a standalone request to find facts, do not edit article files unless asked: return the evidence record and suggested Ukrainian wording. State what remains unverified and which sources you actually inspected.

## Atomic task convention

- A task is one answerable research question with one completion outcome. It may require several sources and may target multiple articles, but it is not a list of independent questions or edits.
- Use `targets` as a YAML sequence of article paths (not a singular `target` field). List every article the findings are intended to inform; use an empty sequence only when no article is in scope.
- Keep task notes in `tasks/`, based on `tasks/TEMPLATE.md`. Task states are: `open` while work is pending or incomplete; `found` when new supported findings and their evidence are saved in the task but have not yet been applied to target articles; `done` only after those findings are applied to the relevant target articles; and `fail` when no new supported information can be added, with the reason and attempts recorded. Access failure that prevents new findings is `fail`, not `done`. Do not change targets for a `fail` task.
- Record web queries and the actual source documents processed in the task. For an ordinary research request without an existing task, include these in the returned evidence record; create task notes only for distinct worthwhile follow-ups.
- When applying findings, add Obsidian wikilinks to relevant existing notes and bold the target article's title at its natural first mention. Do not create links to nonexistent notes or add irrelevant links merely to increase link count.

## Completion check

- Each historical or genealogical assertion in proposed prose has a reference that supports that specific assertion.
- The locator allows a reader to find the evidence. Article prose distinguishes what a source establishes from what remains uncertain, without exposing research-process or agent-environment failures; those details are recorded in the task.
- The research record includes at least one web search and at least one processed source document, or explicitly records why the work remains incomplete.
- A task marked `found` has evidence recorded but its target articles have not yet been updated; a task marked `done` has its applicable target articles updated; a task marked `fail` records why no new supported information could be added and leaves targets unchanged.
- Target article prose added or revised from findings includes appropriate Obsidian wikilinks to relevant existing notes and bolds the article title at its natural first mention.
- Each worthwhile unanswered follow-up discovered during research has a non-duplicative, atomic task note.
- Names, dates, places, and quoted wording have not been silently normalized or inferred.
- The Ukrainian prose does not state more than the evidence supports.
