---
name: start-task
description: Find and begin or resume one unfinished research task in tasks/, optionally selected by path or title.
metadata:
  opencode/autoinvoke: "false"
---

# Start or resume a research task

Read and follow the body of `.opencode/commands/start-task.md` from the repository root. It is the shared workflow for OpenCode, Codex, and Antigravity. Ignore its OpenCode frontmatter; treat `$ARGUMENTS` as the user's supplied arguments and `@skill-name` as an instruction to load the named repository skill. Run `node --import tsx scripts/find-task.ts $ARGUMENTS` to select or resolve the task deterministically.
