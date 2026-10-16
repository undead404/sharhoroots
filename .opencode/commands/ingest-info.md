---
description: Route user-provided information into relevant existing articles, or leave it out when it adds no value
agent: build
---

Load and follow the `@ingest-info` skill. Route the information supplied in `$ARGUMENTS` or the attached file into the narrowest relevant existing article(s). Treat user-provided statements and transcriptions as established facts unless the user marks uncertainty or asks for verification. Use the vault only to identify article scope, fit, and duplicates; do not research or independently verify claims. Preserve supplied details and any uncertainty the user marked. Make no edits when the information is redundant, tangential, or has no clear existing home. Ask only when a genuine ambiguity blocks safe routing. Report destinations and changes, or why nothing was added.
