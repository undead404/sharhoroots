---
description: Add a pasted archival case description to narrowly relevant article tables
agent: build
---

Load and follow the `@archive-case-intake` skill. Add the archival case record(s) supplied in `$ARGUMENTS` or the attached file to the narrowest relevant existing article table(s). Preserve supplied scan URLs, avoid duplicate archival references in each table, and keep chronological tables chronological. If both pasted text and an attachment are supplied, process each distinct record once. Ask only when a genuine ambiguity prevents safe routing; otherwise make the edits directly. Report changed articles, rows added or merged, and any unresolved ambiguity.
