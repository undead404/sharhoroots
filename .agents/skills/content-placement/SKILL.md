---
name: content-placement
description: "Choose article destinations, cross-references, and entity extraction for historical information."
---

# Place content by historical subject

Use this skill when choosing where historical or genealogical information belongs, deciding cross-references, or assessing an extraction or merge. Apply it within the calling workflow's evidence and editing permissions; it does not authorize research, new articles, or reorganization on its own. Paths in the examples below are relative to `content/`.

## Choose the primary home

Identify the subject and period of each finding and inspect plausible existing pages. Put the detailed account where readers would look for that subject. Treat record creation and custody as provenance. A document may support different findings on different pages, even if one of those pages describes the body that produced it.

Settlement pages (`content/settlement/`) cover the whole settlement and its inhabitants across its documented history. Include geography, place names, landownership and territorial development alongside the chronology. Keep population, families, settlement-specific genealogical discoveries, and socioeconomic conditions discoverable there. Include dated administrative affiliations, the local effects of major events such as wars and reforms, and significant developments in local institutions.

Institutional pages cover the following when supported.

- Founding, reorganization, dissolution, and succession.
- Jurisdiction and settlements or populations served, with documented periods of coverage.
- Leadership, personnel, and organizational structure.
- Activities and decisions.
- Fonds and records the body produced, with links to the affected settlements and other entities.

Attribute a record to its documented creator or registration authority and distinguish it from the current holder. A registrar page may bring together records from different bodies or periods. Distinguish the institutions represented there where the evidence permits. The same place, building, name, or page can be shared by separate bodies. Preserve dated distinctions and leave uncertain identity, subordination, jurisdiction, and succession explicit.

## Decide whether to extract

Check for an existing page about the same documented entity first. A separate page is warranted if at least one of these applies.

- The institution produced identifiable records of genealogical value.
- It has a dedicated archival fond.
- It served multiple settlements, populations, or jurisdictions.
- It has a substantial independently documented history.
- Its organizational identity or continuity is difficult to represent within a single settlement chronology.
- Keeping the detailed account in a settlement article creates a meaningful structural or maintenance problem.

Apply the same test to village councils, parishes, monasteries, schools, collective farms, enterprises, and other organizations. Require enough supported material to make the page useful. A named entity, a new record genre, or the length of a settlement article alone does not require extraction. Add no placeholder pages to complete an entity category. Keep relevant material in existing articles while a separate page is unwarranted or out of scope. Use [curate-articles](../curate-articles/SKILL.md) for authorized structural changes.

## Classify institutional pages

- **Registrars (`content/registrar/`)** cover registration authorities and the institutions responsible for relevant religious or civil records. Parish pages may cover worship, clergy, institutional history, and parish jurisdiction. Judaic registrar pages may cover metrical practice, synagogues, rabbis, and kahal administration. Keep the broader history of inhabitants in the settlement.
- **Organizations (`content/organization/`)** include institutions such as collective farms, enterprises, and schools. For a new article whose subject is a village council as a governing body, use this folder and the existing `GovernmentOrganization` type. Use `content/administrative-division/` for a territorial unit as the subject, such as a volost. A territorial unit and its governing body are distinct subjects. Use `content/registrar/` for a distinct registration authority or record guide when that is the actual subject. Reuse an existing council page for material about the same council.
- **Village councils** can cover their full documented remit. Include civil acts, household registers, electoral and tax records, other administrative records, chairpersons, secretaries, executive committees, decisions, territorial changes, and relevant fonds as supported. Establish which body created the records and which settlements it served during the relevant years. A later council's jurisdiction cannot establish an earlier registration authority's coverage.
- **Existing `*-civil.md` council pages** retain their routes and may carry this broader council history. Their filename, registrar folder, and `civil-registry` tag reflect the registration function. Use a council title and government-body type when the council itself is the subject. Handle any approved reclassification or path migration separately through [curate-articles](../curate-articles/SKILL.md), preserving inbound links and public routes through redirects where needed.

## Keep settlements useful as research entry points

Use the settlement's own chronology for significant events and their supported local effects. Keep a sourced summary and an Obsidian link to the detailed institutional account when extracting or updating those events. A narrow institutional detail can stay on its own page. Give each affected page the context its readers need, with citations and qualifications for the claims it makes. A single event may support substantive treatment from different perspectives. Maintain the shared detailed account in its primary home to avoid copying the full narrative across pages.

Give readers a direct route from the settlement page to every known relevant record category that serves it.

- Parish registers and related religious records.
- Civil registration records.
- Household registers.
- Censuses and revision lists.
- Relevant archival fonds and cases.
- Other sources about the population, households, or families.

Use existing sections and specialized table conventions. Keep settlement-specific entries where useful. When a fuller inventory lives elsewhere, put a descriptive wikilink on the settlement page that names the record category and points to the relevant section where practical. State applicable dates, coverage, subgroups, and gaps when known. A reader should be able to choose the right records without already knowing which historical authority served the settlement. Link back from institutional pages to the settlements within their documented remit. Use existing notes and headings, and avoid empty sections or claims about holdings that are still unknown.

Use these existing pages as decision tests, not as proof that all their current material is correctly placed:

- In `settlement/Sharhorod.md`, city population figures and the lives of Jewish residents belong to the city's history; `registrar/Sharhorod-judaic.md` owns rabbis, synagogues, metrical practice, and kahal jurisdiction. A kahal total including attached settlements must not become the city's population total. A resident's dispute with the monastery can inform both city life and the monastery's property history; the resident's religion alone does not route it to the Judaic registrar.
- For `settlement/Murafa.md` and `settlement/Nova-Murafa.md`, pogroms, named victims, trade, and population counts belong to the relevant settlement history. The Stara/Nova Murafa Judaic registrars own their documented institutional and registration aspects. Identify which settlement or institution a source actually describes; do not assign earlier events to later communities, or equate proprietary halves with registrar jurisdictions, without evidence.
- **Лозова:** `settlement/Lozova.md` links to two Orthodox parish pages, as well as a Catholic parish in Sharhorod, and lists revision cases. Preserve those routes and distinguish the Orthodox parishes' documented coverage. Keep the village's administrative changes in its chronology and use `administrative-division/Lozova-volost.md` for the volost's history and jurisdiction. The cited fond and documented merger with the Teklivka farm make «Прогрес» a candidate for an institutional page. If extracted, keep the cited merger and its locally relevant consequences in both settlement chronologies, with links to the detailed account.
- **Політанки:** `registrar/Politanky-civil.md` already combines civil acts with a section on other records. Use it for documented council offices, decisions, and records. Keep dated changes of affiliation and the local significance of elections in `settlement/Politanky.md`. Assess what the 1927 cards establish before treating a candidate as an officeholder. The Orthodox parish page remains the home of its own clergy and parish registers.
- **Лопатинці:** `registrar/Lopatyntsi-civil.md` is a short council page with an identifiable civil-record inventory. Preserve that route from `settlement/Lopatyntsi.md` alongside parish and archival routes. Attribute the listed cases to the documented authority for those years before drawing conclusions about council continuity. The settlement's economic history stays useful even if the separately listed mill fond later supports an institutional page.
- `organization/Sharhorod-orthodox-monastery.md` is justified by the monastery as a distinct institution, with its brotherhood, property, schools, and institutional history—not by the length of the Sharhorod article. Keep meaningful city milestones and links in Sharhorod; distinguish the Basilian and Orthodox phases and associated schools without assuming their institutional equivalence.
