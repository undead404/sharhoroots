---
metadata:
  opencode/autoinvoke: false
name: archive-case-intake
description: Add pasted archival case descriptions to the narrowest relevant existing vault article tables, preserving scan links, table structure, chronology, and duplicate-free references. Викликати для внесення описів архівних справ у статті.
---

# Add an archival case to article tables

Turn user-provided archival catalog descriptions into concise, correctly routed rows in existing vault articles. This is an intake/editing workflow, not a request to research or verify the case contents.

## Read before editing

1. For general related cases, load and follow the `related-cases-table` skill. This embedded example illustrates its canonical template when a relevant article has no suitable section. Do not use it for censuses or tax revisions listing people; use the specialized `census-revision-table` skill for those.

   ```markdown
   ## Дотичні справи

   | Час         | Архівна справа       | Назва                                                                                                                                                                                           | Посилання                                                                                                                                                                                  | Примітка                                        |
   | ----------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
   | 1779        | ЦДІАК-236-1-17       | Дарчий запис Київського воєводича Олександра Любомирського рідній сестрі Галицькій старостині Людвіці Потоцькій на села Пелинівка та **Політанки** Летичівського повіту Подільського воєводства | [ВікіДжерела](https://uk.wikisource.org/wiki/Архів:ЦДІАК/236/1/17)                                                                                                                         |                                                 |
   | 1945        | ДАХмО-Р6193-12-П8154 | Справа репресованих: Чайковська Б.Я., Чайковська Ю.Я. та інші                                                                                                                                   |                                                                                                                                                                                            | Датування приблизне; Чайковські Б.Я. та Ю.Я. народилися в Політанках |
   ```

2. Inspect only articles identified as destinations by the routing rules. Preserve each destination's frontmatter, section order, table data, links, and prose. Do not inspect or edit neighboring articles just to infer destinations or formatting; use the applicable table skill when a section is missing. Do not normalize or reformat unrelated rows. The `related-cases-table` skill governs general related-case tables; the specialized `census-revision-table` skill takes precedence for census or tax-revision tables.
3. Search the vault for the archival reference and distinctive title terms before inserting anything. Read enough of each candidate article to confirm what it covers and whether the case is already listed.

## Parse the submitted record

Extract only what the payload supplies:

- archival designation (archive, fond, inventory, file);
- the case/catalog description;
- date or date range;
- number of folios/sheets, if supplied;
- every supplied scan or document URL.

Preserve the archival identifier and its digits exactly; format separators to match nearby rows (for example, `ЦДІАК 442-1-2088` may be styled `ЦДІАК-442-1-2088`). Render the description in concise Ukrainian table wording; this is an editorial translation, not a verbatim archival title. Render foreign personal and place names in Ukrainian script, using established Ukrainian forms or consistent transliteration/transcription, and do not add the original foreign spelling alongside them. Retain important names, roles, places, dates, and the source's uncertainty or allegations; do not add facts or imply that a catalog description proves the described event occurred.

For `Час` in a general related-case table, use one year or a year range, as specified by `related-cases-table`. For a census or tax revision listing people, use `Роки` as specified by `census-revision-table` (one year or a range). Strip day and month from full dates everywhere; for example, `6 жовтня 1836 — 4 лютого 1837` becomes `1836-1837`, while two full dates in the same year become that single year. Do not retain exact day/month dates in `Примітка`. Include a supplied folio count there. Do not infer dates or folio counts that the payload does not provide.

## Choose articles narrowly

Route by the case's actual subject as expressed in its description, not by every place or institution named incidentally. Use existing notes only; do not create new articles or links to nonexistent notes.

- **Settlement article:** use it when the case describes an event that occurred in the settlement or directly concerns its residents or community—not merely because the settlement appears as an incidental administrative or geographic reference.
- **Jewish community article:** add it when Jewish communal life or a Jewish communal institution/person is directly involved. For a case involving Jews and non-Jews, add it to both the settlement article and the relevant Jewish-community article. Do not infer that townspeople were Jewish or non-Jewish unless the description says so.
- **Church article:** when the case concerns church affairs strictly (such as worship or internal church administration) and does not involve clergy in a non-clerical interaction, put it in the directly relevant church article, not automatically in the settlement article just because the settlement is named.
- **Clergy in non-clerical affairs:** when clergy are directly involved with non-clergy in a non-clerical context—including conflicts, property affairs, transactions, or legal/civil matters—add it to both the directly relevant church article and the settlement article when the settlement can be identified from the title/description.
- **Other institutions/communities:** if a school, local council, or other organization is directly involved, add the case to an existing article devoted to that body only when the case directly concerns it or its members. Do not add a row to an article merely because its subject is mentioned incidentally; apply the other routing rules independently.

- **Censuses and tax revisions listing people:** when the case is a census or tax revision whose purpose is to list people, prefer the article's `## Переписи та ревізії` section over `## Дотичні справи`. Load and follow the `census-revision-table` skill; its four-column schema and rules take precedence over the general related-case template below. Route it only to articles whose settlement, community, or listed subgroup is directly covered, applying the routing rules above. Do not use this exception for a general archival case that merely mentions a census or revision.

Confirm the place/entity against article titles, aliases, and content. Do not resolve ambiguous place names by guesswork. If the subject or target article remains genuinely ambiguous, ask one concise question before editing that entry; proceed with other unambiguous entries if the payload contains several.

## Insert rows and preserve table structure

1. Prefer an existing section/table specifically for related archive cases. Do not put a general case in a metrics, confession-book, census, or other specialized table just because it is the only table present. Census and tax-revision cases listing people are the exception described above: route them to `## Переписи та ревізії` and follow `census-revision-table`.
2. If a relevant article has no suitable section, create `## Дотичні справи` with the exact five column headings and order specified by `related-cases-table`. For a census or tax revision listing people, create `## Переписи та ревізії` with the specialized four-column schema instead, following `census-revision-table`. Place a new section near the article's other archival material, following the section order used by comparable articles. Do not change other sections to accommodate it.
3. In an existing general related-case table, follow `related-cases-table`, including its canonical columns and sorting rules. For census and tax-revision tables, follow `census-revision-table`. Do not add columns or preserve a conflicting schema merely for an individual row.
4. Keep the target table in ascending chronological order according to the applicable table skill. When the target table is edited, sort the whole table; do not change the order of unrelated tables.
5. Before adding a row, compare the normalized archival reference against rows in that table and inspect the same article for the reference in another relevant section. Treat punctuation/spacing variations in an otherwise identical archive/fond/inventory/file designation as the same reference. Never add a duplicate reference to the same table. If the same case is already present there, merge only missing, non-conflicting supplied details or URLs into that row; preserve existing content when values conflict and report the conflict instead of silently overwriting it.
6. A case may appear in separate articles when the routing rules independently call for those perspectives. Avoid duplicates within each target table; do not mistake this intentional cross-reference for a duplicate.
7. Preserve every user-supplied URL exactly, including query parameters. Render it as a Markdown link with a concise service label (for example, `FamilySearch`, `Google Drive`, or `ВікіДжерела`) unless the payload supplies a preferred label. Never construct or guess a missing URL. If no link is supplied, leave the link cell empty.
8. Escape Markdown table delimiters in cell text as needed, and keep each row valid Markdown.

Do not open or claim to have inspected scan links as part of routine intake. They are access links supplied for the table. If the user asks to read or verify scan contents, treat that as a separate research/transcription task and follow the relevant workflow.

## Verify and report

After editing:

- verify every targeted article exists and only the justified target articles changed;
- confirm the new section, when needed, has the exact heading and the applicable skill's canonical columns;
- confirm rows are valid Markdown and the edited table follows the applicable skill's chronological order;
- search the target tables again to confirm no duplicate archival reference was introduced;
- confirm links match the submitted URLs and no URL was inferred;
- confirm table wording is Ukrainian and foreign personal and place names are rendered in Ukrainian script, except when part of an exact publication title;
- inspect the diff for accidental changes to unrelated prose, frontmatter, or table rows.

Report the target articles and sections, any section created, duplicate rows merged/skipped, ambiguous targets left untouched, and checks run. Do not claim that scan contents were verified unless they were separately inspected.
