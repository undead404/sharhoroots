---
description: Find and begin or resume an unfinished research task
agent: build
---

Load and follow the `@research-facts` skill.

## 1. Select the task

Execute `node --import tsx scripts/find-task.ts $ARGUMENTS` (or `npm run task:find -- $ARGUMENTS`).

- It deterministically resolves the next actionable task (or the specific task when `$ARGUMENTS` is supplied), evaluates time gates (`not_before`), and outputs the task path, metadata, checkpoint, and next action.
- If the script reports no actionable tasks, an unexpired `not_before` delay, a metadata problem, or a blocker for an explicit argument, report the output and stop.
- Never mark a task `in_progress` before confirming that its next research step can begin.

The script is the sole authority for automatic selection order, eligibility, and tie-breaking. Use its selected task; do not independently rank or choose tasks from the directory.

## 2. Continue the selected task

Follow the next-action guidance and checkpoint returned by the script under `research-facts`. Read linked evidence before continuing; do not start a new research pass when the returned action is article follow-through.

When maintaining task metadata:

- Set `retry_ready: true` only after confirming and recording that a technical cause was resolved or an essential dependency became available. Recheck before resuming; clear the flag on transition to `in_progress` or if the condition no longer holds. If an automatic candidate cannot proceed, update its checkpoint and eligibility metadata, then rerun the script.
- Reopen an exhausted search only with a documented materially different or newly available research route; an explicit task argument alone does not establish one.
- Use optional `article_value` to describe expected article value, with the reason in `## Навіщо це`: `high` for resolving a consequential claim, replacing an excluded source, or adding a substantive documented local person or event; `low` for a minor contextual addition; otherwise `normal`. Do not bulk-rank the backlog.

## 3. Article follow-through and completion

- Treat `targets` as a working list, not a limit. Before article follow-through, search `content/` for relevant existing articles and expand `targets` with repository-relative paths that findings inform.
- Before setting `status: done`, account for every supported local-person mention and finding in destination articles. If valuable findings lack a suitable existing article, keep `status: found` and report the needed placement.
- In the final report, summarize the task selected, status transition, progress made, linked articles updated, and any remaining blockers.
