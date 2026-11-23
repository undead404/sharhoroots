# Repository tooling and verification

Read before running repository tooling or finishing any repository edit.

## Python tooling

- For ad hoc scripting and data processing, prefer Python using the `python-tools` skill over Ruby, Perl, or other scripting languages. Use existing project tools and shell commands when sufficient.
- Before any Python work (writing, running, testing, adding dependencies), load `.agents/skills/python-tools/SKILL.md` and follow it. The skill isolates the Python environment under `.agents/skills/python-tools/` so Cloudflare Pages does not detect the vault root as a Python project.

## Quartz and verification

- `npm run docs` runs Quartz build with its local preview server.
- `npm run check` runs frontmatter and source validation, tests, TypeScript checking, and repository-wide Prettier validation.
- `npm run lint:markdown` checks Markdown using `.markdownlint.jsonc`. For focused edits, use `npx markdownlint-cli2 ":path/to/note.md" ":.agents/path/to/SKILL.md"` with actual changed paths. Prefer the CLI over custom scripts; keep MD055/MD056 table rules unless changes are requested.
- `npm test` runs TypeScript tests.
- Run `npm run check` after TypeScript, formatter configuration, or code formatting changes; run `npm test` when behavior is affected. For Markdown-only prose, research logs, or agent instructions, run focused Markdown linting and applicable frontmatter/source validators instead of repository-wide Prettier.
- Distinguish Markdown lint from Prettier formatting. In markdownlint-cli2, `Summary: 0 issues in 0 files` is success. Report Prettier failures separately; do not loosen Markdown rules or reformat unrelated content.
- Do not reformat unrelated files or run `npm run format` across the repository unless explicitly requested.
