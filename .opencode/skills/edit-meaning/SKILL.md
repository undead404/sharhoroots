---
name: edit-meaning
description: Edit article meaning and structure: establish its subject and local relevance, curate material, maintain applicable sections, and record worthwhile research gaps.
---

# Edit an article's meaning and structure

Use this skill for a meaning-focused editorial pass, not for a general language polish. The goal is to make clear what an article is about, why it belongs in this site, and how its established information best serves genealogists, historians, and local-lore researchers.

## Scope and evidence

1. Resolve the target from the supplied repository-relative path(s) or attached article. If there is no unambiguous target, ask rather than guessing. Read each target in full, including its frontmatter and headings. Inspect linked or nearby notes only as needed to understand scope, avoid duplicate coverage, or assess a clearly suitable destination for moved material; do not turn this into a vault-wide audit.
2. Apply the repository's territorial scope. The site covers genealogy, lore, and history of the territory belonging to Sharhorod raion immediately before the 2020 administrative reform. External areas, people, institutions, events, and records belong only when they directly document or explain that territory or its inhabitants, subject to the repository's specific rules for record-keeping institutions and administrative areas.
3. Treat user-provided statements, readings, and transcriptions as established facts, preserving any uncertainty the user marked. Do not invent or independently weaken them. Distinguish source statements from editorial interpretation and evidence-based inference. Preserve uncertainty and evidential limits; do not make a claim sound more certain or broader than its basis.
4. This is not a research pass. Do not fill gaps from memory, search snippets, or uninspected citations. Use established article material, relevant vault context, and user-provided information. If the user requests fact-finding or verification, load and follow `@research-facts` for that work.

## Subject and relevance near the top

- Ensure the opening body text, near the top of the article, answers both: **What is this?** (the article's subject) and **Why is it here?** (its relevance to the site's territory and to genealogical, historical, or local-lore readers). State only what the article and inspected context can establish.
- If the subject or local connection cannot credibly be established, do not delete the article or manufacture an explanation. Retain it and state plainly near the top that the subject, its connection, or both still need clarification. Do not disguise the lack of an answer with generic promotional wording.
- Ensure the YAML `description` also accurately and concisely announces the page's subject and scope/relevance. It must agree with the body and preserve uncertainty; it does not replace the opening explanation. Load and follow `@content-frontmatter` when adding or editing it. Do not change unrelated frontmatter.

## Curate content

- Assess each passage for its contribution to the article's subject, evidence, local relevance, or necessary context from the perspectives of genealogists, historians, and local-lore researchers. Remove clearly irrelevant repetition, tangents, conversational or drafting residue, and operational research-process notes; retain reader-useful evidence qualifications.
- Do not treat obscure or one-time appearances as disposable: preserve named people and source-supported roles, actions, and appearances connected to the target territory. Apply the repository's rules for qualified inferences from locally seated roles and for external roles that do not establish local relevance.
- Mark assumptions and interpretations as such when the evidence does not establish them as fact. Keep supported inferences when useful, with calibrated wording, their basis, and what remains unproven. Do not infer an identity or relationship from a name alone.
- Move material only to a clearly suitable **existing** article. Inspect the destination first; preserve evidence, attribution, uncertainty, citations, and useful links, and update both affected article bodies and descriptions so they remain accurate. If the destination or fit is ambiguous, leave the material in place and report the ambiguity. Do not create, rename, split, or move article files; use `@curate-articles` if the user requests those operations.
- Preserve useful structure. Use chronological organization when the evidence and subject support it; do not force undated material onto a timeline. For a material move, add or adjust relevant wikilinks only when useful and only to existing notes. Bold an article's title at its natural first mention when revising its prose, as required by the repository guidance.

## Recommended sections

Assess these sections according to the article's entity type and established material; they are editorial prompts, not a checklist for empty headings. Keep useful existing thematic sections and create other sections when material needs a clearer home.

- **`## Історія`** — use for a meaningful chronology of the subject's documented history, from its supported beginning through its supported dissolution or present. Include concise events and relevant people at the dates of their documented actions, appearances, or milestones. Its subsections must begin with the supported year or a clearly approximate year/range; never infer dates to fill gaps. Keep undated material in an appropriate contextual section. Do not imply a known founding, dissolution, continuity, or endpoint without support.
- **`## Адміністративний поділ`** — for administrative areas, use this for one or more dated snapshots of subdivisions/coverage. Put changes and transitions over time in `## Історія`, not here. Do not invent boundaries or settlement membership.
- **`## Переписи та ревізії`** — assess for settlements and administrative areas when relevant census or tax-revision records/data are established. Whenever creating or editing this section or its table, load and follow `@census-revision-table`.
- **`## Дотичні фонди`** — use for relevant archival fonds. Whenever creating or editing its table, load and follow `@related-fonds-table`.
- **`## Дотичні справи`** — use for relevant individual archival cases other than census/revision listings. Whenever creating or editing its table, load and follow `@related-cases-table`. The specialized census/revision convention takes precedence for census and tax-revision tables.
- **`## Парафія`** — for a place of worship, identify the settlements it served when supported; preserve changes in coverage with their dates/qualifications when known.
- **`## Територія`** — assess for territorial coverage when neither `Парафія` nor `Адміністративний поділ` applies, such as relevant registrar/institution articles.
- Under **`content/registrar/`**, assess for **`## Метричні книги`**. For places of worship, assess for **`## Сповідні розписи`**. Include only information supported by the article or relevant material; never fabricate holdings or date ranges.

Do not add a blank or placeholder section merely to satisfy this list. If useful material is absent, create a research task only when there is a worthwhile, concrete, non-duplicate, answerable question grounded in an actual clue. An absent section alone is not evidence that a record or fact exists.

## Research-gap tasks

- Create tasks only for meaningful unanswered historical/genealogical questions that could improve the article and have a concrete clue or plausible source lead. Do not create a task just to improve wording, fill an empty heading, or ask generically for more information. Do not conduct the research as part of this pass.
- For each worthwhile candidate, load and follow `create-research-task`. Supply the concrete article passage or other clue, the unanswered question, plausible leads, preserved uncertainty, and the target article path. Do not modify or reopen an existing task; report a duplicate instead. A task is a lead, not a finding.

## Frontmatter, language, and structural boundaries

- Load and follow `@content-frontmatter` whenever editing YAML frontmatter. Update only the `description` unless the user explicitly requests another metadata change. Keep it concise (about 150 characters or fewer where practical), accurate, Ukrainian, and evidence-aligned.
- Write all authored reader-facing `content/` text in Ukrainian. Follow the repository's Ukrainian-script rendering for foreign personal and place names; retain another language only for the exact title of an actual publication. Preserve literal identifiers, archival references, URLs, citations, wikilinks, embeds, and machine-required syntax.
- Do not edit unrelated articles or tasks, change published paths, create articles, or perform broad metadata or formatting sweeps. When an edit touches a specialized table, follow its required skill and preserve all existing information that remains in scope.

## Verify and report

Re-read each changed passage in context. Check that subject and relevance are clear near the top or their uncertainty is explicit; body and `description` agree; claims, citations, names, dates, and qualifiers were not strengthened or lost; moved material has a clear home and preserved evidence; links and Markdown/frontmatter remain intact; applicable sections and tables follow their specialized skills; and new tasks are atomic, grounded, non-duplicate, and `queued`. Report files changed, material removed or moved, sections/descriptions updated, tasks created or already covered, and ambiguities or verification not performed. Do not claim source verification unless you inspected the source.
