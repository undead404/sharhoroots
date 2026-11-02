---
description: Find and begin or resume an unfinished research task
agent: build
---

Load and follow the `@research-facts` skill. Find a research task in `tasks/` and start or resume its next appropriate step. Optional argument: a task path, filename, or distinctive title; when supplied, use that task. Otherwise choose deterministically by status priority (`in_progress`, `queued`, `fail`, `no_result`, `found`, then eligible `blocked`), and within a status choose the oldest `created` date, breaking ties by filename. Ignore `tasks/TEMPLATE.md`.

Handle states as follows:

- `in_progress`: continue from the task's existing record without repeating completed work.
- `queued`: change to `in_progress` and begin research.
- `fail`: inspect the recorded technical failure, retry only after addressing or working around it, and change to `in_progress` when work can proceed. If the failure still prevents work, record the concrete error and leave/set `fail`.
- `no_result`: review the exhausted search and try again only through a materially different or newly available research route; record why this retry is worthwhile, avoid repeating exhausted methods, and change to `in_progress` when proceeding. If no viable new route exists, leave it `no_result` and report that rather than pretending it restarted.
- `found`: apply and disposition the recorded findings in target articles according to `research-facts`; this is follow-through, not a new research pass.
- `blocked`: resume only if its named essential dependency is now available; otherwise skip it and report the blocker.
- `done`: never reopen automatically.

For `found`, perform the article follow-through; select `blocked` only if its dependency is available. Without an explicit task argument, if a candidate cannot proceed (including a `no_result` task with no genuinely new route or a `fail` task whose technical cause persists), leave its status unchanged and try the next candidate; handle only one task per invocation. With an explicit task argument, report the blocker and stop. Never change a task's status before confirming that its next step can begin. At the end, report the task selected, its status transition (if any), progress made, and any remaining blocker. If there is no actionable task, say so and summarize the relevant unfinished tasks by status.

Treat `targets` as a working list, not a limit on where findings belong. Before article follow-through, read the actual findings and search `content/` for relevant existing articles, including historical names, aliases, and linked places, people, institutions, or administrative units. Inspect candidate articles and expand or correct `targets` with the repository-relative paths that the findings genuinely inform. Repeat this assessment when research reveals a new connection. An empty `targets: []` means destinations need assessment; it is not evidence that the findings have no article value. Running this command authorizes applying relevant findings to existing articles discovered this way; creating a new article still requires user authorization.

Before setting `status: done`, account for every supported local-person mention and other article-worthy fact or useful qualified inference in `## Докази й відповідь`: identify the destination article and section where it was applied or already appears, or give a finding-specific reason for excluding it under `research-facts`. Verify those destinations in the actual article text and review the content diff. Empty or exhausted `targets`, a completed research log, and a general statement that findings are low-value do not satisfy completion. If a valuable finding still has no suitable existing article, keep `status: found`, record the unresolved destination, and report the proposed article or placement needed; do not discard it or relabel it `no_result`. In the final report, link the articles updated (or identify the existing passages that already cover the findings) and disclose any unapplied valuable findings.
