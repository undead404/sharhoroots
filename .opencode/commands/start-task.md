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

## 2. Continue the selected task

Follow the status guidance and checkpoint returned by the script:

- `in_progress`: read the current-state checkpoint and linked evidence first, then continue the unresolved next step under `research-facts`.
- `deferred`: make one bounded check of the named dependency. If available, change to `in_progress`, remove `not_before`, and continue. If still unavailable with a new concrete retry time, keep `deferred`, update `not_before`, and record the basis. If there is no justified retry time, change to `blocked` and remove `not_before`.
- `queued`: change to `in_progress` and begin research.
- `fail`: inspect the recorded technical failure, retry only after addressing or working around it, and change to `in_progress` when work can proceed.
- `no_result`: review the exhausted search and try again only through a materially different or newly available research route; change to `in_progress` when proceeding.
- `found`: apply and disposition the recorded findings in target articles according to `research-facts` (follow-through, not a new research pass).
- `blocked`: resume only if its named essential dependency is confirmed available; otherwise report the blocker.
- `done`: never reopen automatically.

## 3. Article follow-through and completion

- Treat `targets` as a working list, not a limit. Before article follow-through, search `content/` for relevant existing articles and expand `targets` with repository-relative paths that findings inform.
- Before setting `status: done`, account for every supported local-person mention and finding in destination articles. If valuable findings lack a suitable existing article, keep `status: found` and report the needed placement.
- In the final report, summarize the task selected, status transition, progress made, linked articles updated, and any remaining blockers.
