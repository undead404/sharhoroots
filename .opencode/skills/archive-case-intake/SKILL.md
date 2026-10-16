---
metadata:
  opencode/autoinvoke: false
name: archive-case-intake
description: Add pasted archival case descriptions to the narrowest relevant existing vault article tables, preserving scan links, table structure, chronology, and duplicate-free references. Викликати для внесення описів архівних справ у статті.
---

# Add an archival case to article tables

Turn user-provided archival catalog descriptions into concise, correctly routed rows in existing vault articles. This is an intake/editing workflow, not a request to research or verify the case contents.

## Read before editing

1. Use this embedded example as the canonical template when a relevant article has no suitable related-cases section:

   ```markdown
   ## Дотичні справи

   | Час         | Архівна справа       | Назва                                                                                                                                                                                           | Посилання                                                                                                                                                                                  | Примітка                                        |
   | ----------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
   | 1779        | ЦДІАК-236-1-17       | Дарчий запис Київського воєводича Олександра Любомирського рідній сестрі Галицькій старостині Людвіці Потоцькій на села Пелинівка та **Політанки** Летичівського повіту Подільського воєводства | [ВікіДжерела](https://uk.wikisource.org/wiki/Архів:ЦДІАК/236/1/17)                                                                                                                         |                                                 |
   | 1850        | ДАХмО-226-79-5231    | Ревізька казка селян с. Політанок (том 6)                                                                                                                                                       | [Корені](https://koreni.org.ua/DAKhmO-226-79-5231t6-Politanky/1/), [ВікіДжерела](https://uk.wikisource.org/wiki/%D0%90%D1%80%D1%85%D1%96%D0%B2:%D0%94%D0%90%D0%A5%D0%BC%D0%9E/226/79/5231) | Підшивка, див. том 6                            |
   | Прибл. 1945 | ДАХмО-Р6193-12-П8154 | Справа репресованих: Чайковська Б.Я., Чайковська Ю.Я. та інші                                                                                                                                   |                                                                                                                                                                                            | Чайковські Б.Я. та Ю.Я. народилися в Політанках |
   ```

2. Inspect only articles identified as destinations by the routing rules. Preserve each destination's frontmatter, section order, existing table columns, formatting, links, and prose. Do not inspect or edit neighboring articles just to infer destinations or formatting; use the embedded example for a missing section and the destination's own table when one exists. Do not normalize or reformat unrelated rows.
3. Search the vault for the archival reference and distinctive title terms before inserting anything. Read enough of each candidate article to confirm what it covers and whether the case is already listed.

## Parse the submitted record

Extract only what the payload supplies:

- archival designation (archive, fond, inventory, file);
- the case/catalog description;
- date or date range;
- number of folios/sheets, if supplied;
- every supplied scan or document URL.

Preserve the archival identifier and its digits exactly; format separators to match nearby rows (for example, `ЦДІАК 442-1-2088` may be styled `ЦДІАК-442-1-2088`). Translate Russian descriptions into concise Ukrainian table wording, as the user requested. This translation is an editorial rendering, not a verbatim archival title. Retain important names, roles, places, dates, and the source's uncertainty or allegations; do not add facts or imply that a catalog description proves the described event occurred.

For `Час`, use only years: a single year, a comma-separated list of years, or a year range, as supported by the supplied date(s). Strip day and month from full dates everywhere; for example, `6 жовтня 1836 — 4 лютого 1837` becomes `1836-1837`, while two full dates in the same year become that single year. Do not retain exact day/month dates in `Примітка`. Include a supplied folio count there. Do not infer dates or folio counts that the payload does not provide.

## Choose articles narrowly

Route by the case's actual subject as expressed in its description, not by every place or institution named incidentally. Use existing notes only; do not create new articles or links to nonexistent notes.

- **Settlement article:** use it when the case describes an event that occurred in the settlement or directly concerns its residents or community—not merely because the settlement appears as an incidental administrative or geographic reference.
- **Jewish community article:** add it when Jewish communal life or a Jewish communal institution/person is directly involved. For a case involving Jews and non-Jews, add it to both the settlement article and the relevant Jewish-community article. Do not infer that townspeople were Jewish or non-Jewish unless the description says so.
- **Church article:** when the case concerns church affairs strictly (such as worship or internal church administration) and does not involve clergy in a non-clerical interaction, put it in the directly relevant church article, not automatically in the settlement article just because the settlement is named.
- **Clergy in non-clerical affairs:** when clergy are directly involved with non-clergy in a non-clerical context—including conflicts, property affairs, transactions, or legal/civil matters—add it to both the directly relevant church article and the settlement article when the settlement can be identified from the title/description.
- **Other institutions/communities:** if a school, local council, or other organization is directly involved, add the case to an existing article devoted to that body only when the case directly concerns it or its members. Do not add a row to an article merely because its subject is mentioned incidentally; apply the other routing rules independently.

Confirm the place/entity against article titles, aliases, and content. Do not resolve ambiguous place names by guesswork. If the subject or target article remains genuinely ambiguous, ask one concise question before editing that entry; proceed with other unambiguous entries if the payload contains several.

## Insert rows and preserve table structure

1. Prefer an existing section/table specifically for related archive cases. Do not put a general case in a metrics, confession-book, census, or other specialized table just because it is the only table present.
2. If a relevant article has no suitable related-cases section, create `## Дотичні справи` with the exact five column headings and order shown above. Place it near the article's other archival material, following the section order used by comparable articles. Do not change other sections to accommodate it.
3. In an existing table, preserve its headings and columns. Map the record into those columns; put dates/pages in the closest fitting existing column. Do not add a column or change the schema for one row.
4. Keep chronological tables chronological: insert the new row at the appropriate date position, following the table's existing date granularity and ordering. If the table is not chronologically ordered, preserve that established order rather than re-sorting existing rows.
5. Before adding a row, compare the normalized archival reference against rows in that table and inspect the same article for the reference in another relevant section. Treat punctuation/spacing variations in an otherwise identical archive/fond/inventory/file designation as the same reference. Never add a duplicate reference to the same table. If the same case is already present there, merge only missing, non-conflicting supplied details or URLs into that row; preserve existing content when values conflict and report the conflict instead of silently overwriting it.
6. A case may appear in separate articles when the routing rules independently call for those perspectives. Avoid duplicates within each target table; do not mistake this intentional cross-reference for a duplicate.
7. Preserve every user-supplied URL exactly, including query parameters. Render it as a Markdown link with a concise service label (for example, `FamilySearch`, `Google Drive`, or `ВікіДжерела`) unless the payload supplies a preferred label. Never construct or guess a missing URL. If no link is supplied, leave the link cell empty.
8. Escape Markdown table delimiters in cell text as needed, and keep each row valid Markdown.

Do not open or claim to have inspected scan links as part of routine intake. They are access links supplied for the table. If the user asks to read or verify scan contents, treat that as a separate research/transcription task and follow the relevant workflow.

## Verify and report

After editing:

- verify every targeted article exists and only the justified target articles changed;
- confirm the new section, when needed, has the exact heading and five canonical columns;
- confirm rows are valid Markdown and chronologically placed where the table's existing order is chronological;
- search the target tables again to confirm no duplicate archival reference was introduced;
- confirm links match the submitted URLs and no URL was inferred;
- inspect the diff for accidental changes to unrelated prose, frontmatter, or table rows.

Report the target articles and sections, any section created, duplicate rows merged/skipped, ambiguous targets left untouched, and checks run. Do not claim that scan contents were verified unless they were separately inspected.
