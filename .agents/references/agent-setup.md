# Agent setup and command invocation

Read when invoking a command workflow or maintaining agent configuration and skills.

## Shared OpenCode, Codex, and Antigravity setup

- This file is the shared project guidance for OpenCode, Codex, and Google Antigravity. Repository skills live in `.agents/skills/`, which all three agents discover. Load the repository version when a global skill has the same name; if it is absent from the tool's skill catalog, read its `SKILL.md` directly. Resolve repository paths from the repository root and skill-relative resources from the skill directory.
- Invocation across agents:
  - OpenCode invokes skills as `@skill-name` and command workflows as `/name`.
  - Codex invokes skills as `$skill-name` (with proxy skills in `.agents/skills/` for commands).
  - Antigravity discovers skills in `.agents/skills/` and activates them by name, via `/name`, `@skill-name`, or direct user prompt.
- Preserve explicit-only invocation settings in both OpenCode `metadata` (`opencode/autoinvoke: "false"`) and Codex `agents/openai.yaml` (`policy: allow_implicit_invocation: false`) when maintaining a skill.
- For explicit invocations of `add-archive-case`, `article-gaps`, `edit-meaning`, `edit-wording`, `ingest-info`, or `start-task`, read and follow the matching `.opencode/commands/<name>.md` body as well as its named skill. These templates are the single source for command workflows across all three agents. Ignore OpenCode command frontmatter in Codex and Antigravity, interpret `$ARGUMENTS` as supplied arguments, and interpret `@skill-name` as loading that repository skill. `add-archive-case` and `start-task` have repository skill entry points for this purpose.
- Each agent uses its own model, tools, sandbox, and approval controls:
  - OpenCode: `opencode.json` controls permissions and model.
  - Codex: `.codex/config.toml` controls sandboxing and approval policies.
  - Antigravity: native terminal sandbox and tool execution policies control access.
  - Do not push Git changes from any agent.
