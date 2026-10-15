---
description: Polish a vault article and relocate clearly misplaced material
agent: build
---

Load and follow the `@editorial-pass` skill. Use lists, headings, or other Markdown formatting when they make information easier to scan; avoid dense paragraph blocks, but do not force lists onto connected narrative. Avoid opaque internal identifiers in reader-facing prose (for example, “У рядку 111001”): identify the record by its meaningful subject and cite a human-readable locator such as the printed page, section, or entry instead. Keep an identifier only when it matters to the reader, and explain what it identifies. For each target article, ensure its YAML frontmatter has a concise, accurate `description` for Quartz previews; add it if missing or refresh it if stale, without changing unrelated frontmatter. Edit the requested article(s): $ARGUMENTS

If no path is supplied, use the article attached to this prompt. Make the edits directly unless I asked for review only. You may update an existing destination article when a passage clearly belongs there; preserve its evidence, attribution, uncertainty, and links. Do not create or rename articles, broaden the cleanup to unrelated notes, or invent historical claims. Report what you changed and any ambiguity you left unresolved.
