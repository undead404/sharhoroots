# Sharhoroots project contract

This Obsidian vault is published with Quartz 4. Its scope is the territory of Sharhorod raion immediately before the 2020 reform. External material belongs only when it directly documents that territory or its inhabitants. External record-keeping institutions whose coverage overlaps it and administrative areas that included it may have articles about that overlap. Proximity or an unrelated external role does not establish local relevance.

## Language and evidence

- All authored reader-facing text under `content/` is Ukrainian, even when another language is requested. Render foreign personal and place names in Ukrainian script without adding original spellings. Exact publication titles and literal identifiers retain their forms. Use «РПЦ» or «Російська церква» for the church using the designations «УПЦ»/«Українська православна церква»; preserve «ПЦУ»/«Православна церква України».
- Accept user-confirmed readings/transcriptions as established readings without requiring independent rereading; preserve their explicit uncertainty. Accept other user-stated facts as supplied within their stated scope, but distinguish a user's account of what a document says from the truth of the historical assertion it records. Accurate transcription does not establish a document's accuracy: preserve attribution, source limits, and conflicting evidence. OCR/HTR remains unverified machine output until confirmed.
- Never invent facts or source details. Distinguish source assertions, supported inferences, and oral tradition. Include useful evidence-based inferences with calibrated uncertainty, reasoning, citations, and what remains unproven. Preserve citations and qualifications; access failures belong in research logs.
- Preserve named people with source-supported local connections regardless of fame or a single appearance. A locally seated role can support a qualified inference of presence; an external role or matching name alone cannot. Living or recently deceased people have no blanket exclusion, but publication requires a case-by-case privacy assessment: consider local relevance, necessity of each detail, sensitivity, consent where known, and foreseeable harm to the person or living relatives. Public availability alone does not justify republication. Omit or generalize unnecessary sensitive details; if a material privacy question remains unresolved, withhold the affected detail and record the reason in the existing task/evidence record without copying sensitive data into tracked notes. Report conflicting build rules.
- When evaluating sources or encountering external links in `content/`, load [evaluate-external-source](.agents/skills/evaluate-external-source/SKILL.md) and its [credibility policy](.agents/skills/evaluate-external-source/references/credibility-policy.md). Excluded or unresolved links require replacement tasks unless the historical-document exception is established, including during editorial work. Wikipedia editorial content is never historical evidence; navigation uses a confirmed Ukrainian page only when no local article exists.
- Before using vision or inspecting source images, load [llm-vision](.agents/skills/llm-vision/SKILL.md). Read [Nysh and archival rules](.agents/skills/research-facts/references/nysh-archival.md) before scans or Nysh work.

## Editing boundaries and skill routing

Preserve nearby Markdown conventions and evidence. Do not edit generated output or Obsidian workspace state. Quartz publishes `content/`; tasks belong in `tasks/`. Use ignored `.agent-work/` for temporary work and `books/` for retained source copies. Do not push Git changes or run `nysh site build` here.

Repository skills in `.agents/skills/` take precedence over global copies. Read their `SKILL.md` directly if omitted from discovery. Resolve repository paths from the root and skill resources from their skill directory. Load only the references triggered by the current operation; routed rules remain mandatory at that point.

| Operation | Load before doing it |
| --- | --- |
| Edit any article | [Vault editing rules](.agents/references/vault-editing.md) |
| Research historical/genealogical claims | [research-facts](.agents/skills/research-facts/SKILL.md); check local tasks, sources, and books before searching |
| Create a research task | [create-research-task](.agents/skills/create-research-task/SKILL.md) |
| Maintain source records, copies, retained text, inspected passages | [manage-sources](.agents/skills/manage-sources/SKILL.md) |
| Edit article YAML | [content-frontmatter](.agents/skills/content-frontmatter/SKILL.md) |
| Edit citations, quotations, footnotes, notes, or cited passages | [citations-and-notes](.agents/skills/citations-and-notes/SKILL.md) |
| Choose destinations or cross-references | [content-placement](.agents/skills/content-placement/SKILL.md) |
| Move, rename, split, or merge articles | [curate-articles](.agents/skills/curate-articles/SKILL.md); update redirects and internal links with published path changes |
| Edit «Дотичні фонди» | [related-fonds-table](.agents/skills/related-fonds-table/SKILL.md) |
| Edit «Переписи та ревізії» | [census-revision-table](.agents/skills/census-revision-table/SKILL.md), taking precedence over general cases |
| Edit general «Дотичні справи» | [related-cases-table](.agents/skills/related-cases-table/SKILL.md) |
| Find article illustrations | [find-illustration](.agents/skills/find-illustration/SKILL.md) |
| Run or write any Python | [python-tools](.agents/skills/python-tools/SKILL.md); prefer it for ad hoc processing when existing tools are insufficient |
| Invoke command workflows or maintain skills/configuration | [Agent setup](.agents/references/agent-setup.md); preserve explicit-only invocation policies |
| Run tooling or finish an edit | [Verification rules](.agents/references/verification.md); use focused checks for Markdown-only changes |

For more than three enumerated items, use a list or table in vault text and replies.
