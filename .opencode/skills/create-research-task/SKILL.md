---
name: create-research-task
description: Create a focused, non-duplicate research task note in tasks/ from an already-vetted question or follow-up lead.
---

# Create a research-task note

Turn an already-vetted research question or follow-up lead into a task note in the repository-root `tasks/` directory. The calling workflow decides whether the lead is worthwhile and supplies its basis; this skill handles task-note creation, not gap triage or substantive research.

## Workflow

1. **Resolve the task input.** Use the supplied research question, concrete clue or evidence, uncertainty, plausible leads, and target article paths. Do not invent missing facts, sources, article targets, or research already performed. Ask for clarification if the question or intended outcome is too ambiguous to write responsibly.
2. **Check the convention and queue.** Read `tasks/TEMPLATE.md`. Search `tasks/` for semantic duplicates in every status; do not rely on filenames alone. If an existing task covers the question, do not create, edit, or reopen a task. Report the matching path and stop for that candidate.
3. **Keep the task atomic.** It must ask one independently answerable research question with one expected outcome. It may target multiple articles if the same answer would genuinely inform each. Do not combine independent questions or split one question into separate tasks merely because several articles are affected. If the input contains several independent candidates, handle each separately.
4. **Create the note from the template.** Use a concise question-shaped title and a unique descriptive `research-*.md` kebab-case filename. Preserve the template's sections and instructions. Set frontmatter to `type: ResearchTask`, `status: queued`, today's date, and `targets` as a YAML sequence of all applicable repository-relative article paths; use an empty sequence if no article is in scope.
5. **Record the lead honestly.** State why the question matters, identify the exact passage, evidence, or observation that prompted it, and preserve any uncertainty. List only plausible search terms, source types, collections, or local notes, clearly as leads rather than evidence. Do not claim that a source was inspected unless the supplied record says it was. Keep research-process logs empty except for applicable template guidance/placeholders; creating a task does not mean research has started.
6. **Set one completion condition.** Under `## Критерій завершення`, state one verifiable outcome that answers the question or records the limits of what the identified sources can establish. Do not set a status other than `queued` for a newly created task.
7. **Verify and report.** Check the filename, frontmatter, target paths, atomicity, duplicate scan, preserved uncertainty, and completion condition. Report each created task path and question, and any matching existing task instead of a new note. Do not edit target articles or other tasks as part of this skill.

## Boundaries

- Do not decide whether an editorial gap is worthwhile; follow the calling skill's relevance and value criteria.
- Do not research the question, verify source leads, create source records, or treat a catalog description or search result as inspected source evidence.
- Do not change the status or contents of an existing task, even if it is blocked, completed, or marked `no_result`.
- Do not create a task whose only outcome is wording improvement, filling a blank section, or generic “more research.”
