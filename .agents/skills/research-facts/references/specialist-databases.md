# Specialist historical databases: triggers and priorities

This is a reference for the existing `research-facts` and `where-to-dig` workflows. It extends [search-services.md](search-services.md); it does not replace those six services, the local `tasks/`, `sources/`, `books/` checks, Nysh discovery, territorial scope, language rules or evidence standards. Read this routing section, then only the resource sections needed by the question.

## Select the next useful route

Choose by the source likely to answer the question, its documented coverage, existing search coverage, access and cost. The first route below is a preference within a matching trigger, not an obligation on every task. A known original record or an already retained applicable source takes precedence. An unavailable preferred route can be replaced by the next useful route without exhausting irrelevant databases.

| Research trigger                                                                                           | Preferred route                                                                                                                        | Add another route when                                                                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A dated event, local administration, commerce, advertisement or public notice likely reported in the press | LIBRARIA for represented Ukrainian/local titles; Polona for Polish titles; NLI for Jewish-language press                               | A different newspaper, date range, language or OCR search fills a gap. Publication in a regional centre can report a target village; do not restrict searches to newspapers printed inside the project territory. |
| Polish-era estate, institution, owner, parish or Polish-language historical account                        | Polona; FBC for distributed holdings                                                                                                   | The identified edition is absent/incomplete or another institution has a different publication. Use FBC to locate the holding library, then search/read there.                                                    |
| A historical location, name, road, boundary or map sheet is needed                                         | Existing map references first; OldMapsOnline to locate sheets; Arcanum or Etomesto only for a relevant series and available access     | A different survey date, scale, sheet or clearer copy answers a remaining question. Habsburg coverage alone does not establish coverage of Sharhorod/Podolia.                                                     |
| Jewish institutions, communal life, migration or a community's records                                     | Existing JewishGen/Archival.name routes for indexes; Routes to Roots for surviving record groups; YIVO or NLI for community materials  | The question requires organizational papers, memorial books, press or a different collection rather than another copy of the same index.                                                                          |
| Holocaust fate, ghetto, rescue, testimony, forced labour or displacement                                   | Yad Vashem for names/source submissions; USHMM for local collections/testimony; Arolsen for camps, forced labour and displaced persons | The next institution supplies a different document or provenance, or missing coverage. Select by persecution trajectory, not ethnicity alone.                                                                     |
| WWI/WWII service, casualty, captivity, burial or a documented unit's local operations                      | Select the military resource by army, war and record type below                                                                        | A different record type or archive resolves identity/fate. Do not run all military portals for every person.                                                                                                      |
| Soviet repression, exile, arrest, rehabilitation or a local victim list                                    | Relevant volumes of «Реабілітовані історією» and the existing `martyrolog` route                                                       | A missing volume, additional regional coverage or a case reference warrants the national database or archive inventory.                                                                                           |
| A source title, citation, author, modern study or regional bibliography is missing                         | NBUV for Ukrainian bibliography; Scholar for scholarship; Books for book-text discovery; Internet Archive for an accessible edition    | Another host has missing pages, searchable text, a different edition or full access. HathiTrust is valuable for a missing title/edition or different full-text coverage.                                          |
| Which archive, fond, inventory or case holds relevant records?                                             | Known archive's current finding aid; otherwise Duck Inspector / interarchive portal; ЦДІАК-442 when the institution fits               | Routes to Roots, Рідні, UaRoots or FamilySearch covers another genre or supplies a missing shelfmark/copy. Inspect the archive's own inventory to resolve discrepancies.                                          |

Before another query, name its expected contribution in the task log: a different corpus, missing dates, spelling mode, source reference or access route. Stop repeating once the question is answered or no concrete route would materially improve it; retain worthwhile independent leads through the existing atomic-task workflow. Do not use a fixed count of databases as a completion rule.

## Place names and jurisdictions

- Build a small query list from the article, inspected sources, user-provided forms and reliable gazetteers. Include modern Ukrainian and applicable historical Ukrainian, Russian and Polish forms; for Jewish subjects add attested Hebrew/Yiddish spellings and transliterations used by the particular catalogue. Do not manufacture Hebrew/Yiddish forms or assume a Latin transliteration is a historical Jewish name. JewishGen Communities, YIVO place-name resources and catalogued source titles can supply variants.
- Keep variant, language/script, period and provenance together in the existing research record. Preserve original spellings there; published text remains Ukrainian under `AGENTS.md`. Retain significant historical forms rather than silently replacing them with modern names.
- Search variants separately unless the interface documents OR syntax. Try stems, diacritics, old orthography and documented phonetic modes where supported, recording settings. Do not assume identical wildcard or fuzziness behaviour across sites. OCR zeros need title/date coverage and spelling limitations.
- If locality searches fail, broaden to the **documented jurisdiction at the event date**: parish, volost/gmina, uyezd/powiat, gubernia/voivodeship, diocese, estate or responsible institution. Establish membership rather than guessing it. Distinguish Могилів-Подільський from unrelated namesakes, and distinguish a place-name hit from a surname. For occupation-era material use the relevant wartime jurisdiction only when supported.
- Search the jurisdiction's finding aids, regional publications or collective volumes, then narrow back to the target locality. A regional hit is relevant only insofar as it documents the project territory or its inhabitants; neighbouring settlements remain outside scope without that connection. An omission from an incomplete index is never proof of absence.

## Reading the access notes

Checks below were made **2026-11-15** through web retrieval, provider documentation and, where indicated, interactive browser tests. **Results verified** means a query returned visible results; **interface verified** means controls/records were visible but a completed relevant query was not verified; **documented** means the cited provider explains the capability; **gated** identifies the observed barrier. These labels do not guarantee access in another session or coverage of a particular village. Provider documentation supports routing, not historical claims. Do not call a documented or gated service a completed search.

Use the existing bounded access/human handoff workflow. Keep later query-specific access observations in the relevant task. Recheck an unavailable route only when relevant and access has materially changed; do not probe repeatedly. For Etomesto/GWAR and other sites with certificate problems, treat that as a transport-specific blocker, not a reason to discard the source: try a known canonical hostname or normal retrieval tool within the existing attempt bound, or use a documented equivalent copy. Do not invent mirror URLs. If a browser security-warning override is necessary, follow the tool's required user handoff; the user's willingness to use these sites does not remove that tool requirement. Account creation, payment and acceptance of binding terms require their applicable authorization. Never send archival images to an LLM to read or verify their text.

## Newspapers and Polish publications

### LIBRARIA

[Search](https://libraria.ua/); [advanced search](https://libraria.ua/all-titles/filter/); [provider help](https://libraria.ua/help/).

- **Trigger/value:** contemporary press and journals; Ukrainian territories, including represented Vinnytsia/Podolia titles, Soviet and occupation-era press, and some Polish/Jewish periodicals. Check title and issue holdings for the relevant years; this is not all historical Ukrainian press.
- **Search/access:** **results verified**, query `Шаргород` returned OCR excerpts with publication, date, issue and page links. Filters include publication, date, publication region and language. Full reading can require subscription or partner-library access; [access terms](https://libraria.ua/terms-and-conditions/) distinguish public metadata/search from full access. Do not purchase automatically.
- **Overlap/evidence:** search a second newspaper host only for distinct titles/issues or better access/OCR. Capture issue/page/article locator; an OCR excerpt alone is a discovery lead, not confirmed source text.

### Polona

[Search](https://polona.pl/).

- **Trigger/value:** Polish publications, historical accounts, directories, maps and images; Polish institutional holdings include material about former Commonwealth lands and Podolia, beyond present Poland.
- **Search/access:** **results verified**, `Szarogród` returned eight catalogue objects, including books and images. Search, advanced controls, format/availability filters and OCR-marked objects were visible. Full-text availability varies by object; do not equate catalogue search with searching every page.
- **Overlap/evidence:** use Polona first for its actual digitized copy, FBC to discover other repositories. The same Rolle volume on Books/IA is one edition, not corroboration. Preserve object UUID, edition, page and holding institution; inspect text through permitted methods before citing.

### Federacja Bibliotek Cyfrowych (FBC)

[Portal](https://fbc.pionier.net.pl/); [operator's service description](https://pionier.net.pl/uslugi/).

- **Trigger/value:** locate Polish publications across distributed Polish libraries, repositories and museums when Polona or a known host lacks the needed work. Holdings concern Poland and historical territories, but local relevance must be checked per object.
- **Search/access:** **documented/gated**. PIONIER confirms public search; web retrieval returned 403 and the browser showed high-load browser verification. No completed query was verified. Ask for a focused human search if important.
- **Overlap/evidence:** a discovery aggregator, not an independent copy of every object or proof of universal full-text coverage. Follow the holding institution's record. Avoid repeating a Polona search merely to count the same object again.

## Historical maps

### OldMapsOnline

[Map discovery](https://www.oldmapsonline.org/en); [provider description](https://www.oldmapsonline.org/en/project).

- **Trigger/value:** find which institution holds a map for an area and date. Worldwide participating collections; geographic browse and timeline can find sheets even when town-name metadata is sparse.
- **Search/access:** **interface verified**: map results, date/timeline and advanced-search controls loaded, including maps describing Podolia/Ukraine. A targeted locality query was not completed. Features beyond basic discovery may require membership; verify the selected map's host and access.
- **Overlap/evidence:** follow the original library catalogue; an OldMapsOnline entry and its host's entry are the same map. Record survey/publication dates separately, sheet, scale, edition and original identifier. A modern basemap or georeferenced overlay does not prove a historical boundary or label.

### Mapire / Arcanum Maps

[Current portal](https://maps.arcanum.com/en/).

- **Trigger/value:** a specific georeferenced military, cadastral or other European map series fits the question. Check the actual series footprint/date before use; Austrian surveys are not a substitute for a map covering Russian Podolia.
- **Search/access:** **interface verified/gated**. The browser listed European, country, city, cadastral and thematic maps and stated that full access requires subscription. Map search is documented by the [contributing Moravian Library](https://www.mzk.cz/en/catalogues-databases/databases/maps/arcanum-maps); no local-sheet search was verified.
- **Overlap/evidence:** compare a second host only for another edition, legibility or access. Record the survey/sheet and original institution rather than citing a modern overlay as the source.

### Etomesto

[Schubert series entry](https://www.etomesto.ru/shubert/).

- **Trigger/value:** a known imperial topographic sheet or settlement variant, especially the Schubert series, warrants a sheet/coordinate lookup. Existing coverage notes and map references are in [where-to-dig-archives.md](../../where-to-dig/references/where-to-dig-archives.md), including Podolia; those are earlier observations, not a new access test.
- **Search/access:** **transport blocked in this environment**: web retrieval failed and the browser reported a certificate-name error for both `www.etomesto.ru` and `etomesto.ru`. The bare hostname retry did not resolve it. Keep the source eligible when relevant and use a working permitted route or equivalent sheet copy; do not claim a completed query. If access requires overriding a browser warning, hand that action to the user as required by the browser tool, then continue after access is restored.
- **Overlap/evidence:** avoid reacquiring the same sheet already retained or available through another map host. Coordinates locate an area; historical names/dates still require source inspection under the archival-reading rules.

## Jewish community history and record discovery

### Routes to Roots Foundation

[Town/district record-group search](https://www.rtrfoundation.org/search.php); [matching modes](https://www.rtrfoundation.org/aboutsearches.html).

- **Trigger/value:** determine which surviving Jewish/civil record groups may exist for a town or district. Coverage documented for Ukraine, Moldova, Belarus, Lithuania and Poland, including historical Galicia, Bukovina and Bessarabia; it is not a universal person index.
- **Search/access:** **results verified**: exact `Shargorod` returned 21 record groups. Exact, BMPM, D-M Soundex and Begins With modes are offered. Prefix search can reveal district-level entries omitted by a town-only query.
- **Overlap/evidence:** complements person indexes and current inventories. Capture archive, record type, years and shelfmark; check the archive's current finding aid before ordering, because older repository names/references can differ. Do not bulk reproduce the database; retain necessary locators and links, respecting its stated reuse terms.

### YIVO

[Digital-resource directory](https://www.yivo.org/online-resources); [archives overview](https://www.yivo.org/archives); [current finding-aid catalogue](https://archives.cjh.org/repositories/7).

- **Trigger/value:** Eastern European Jewish communal organizations, schools, migration, photographs, Yiddish culture and related papers. The provider explicitly includes Ukraine and the former Commonwealth. Choose a named collection/place, not an expectation that all Podolian records are held here.
- **Search/access:** **documented/gated**: provider pages are readable and direct users to the new finding-aid catalogue; that catalogue failed web retrieval and returned browser 403. The provider also warns of technical problems with older archive guides. Its directory links library search, digitized collections, encyclopedia and Yiddish place-name resources. Do not assume a finding aid implies online scans.
- **Overlap/evidence:** useful for a different organizational corpus from JewishGen or Archival.name; copies hosted on IA/CJH remain the same YIVO material. Preserve collection/record-group, series, box/folder and item identifiers. Encyclopedia articles are secondary context, not primary communal records.

### National Library of Israel (NLI)

[Historical Jewish Press](https://www.nli.org.il/en/discover/newspapers/jpress); [newspaper search](https://www.nli.org.il/en/newspapers/search); [search help](https://www.nli.org.il/en/newspapers/help); [catalogue guide](https://www.nli.org.il/en/research-and-teach/catalogs/how-to-search).

- **Trigger/value:** Hebrew/Yiddish and other Jewish press, memorial/community books, manuscript/archive catalogue leads and diaspora reports about local communities. Collections cover Jewish communities internationally; verify title dates and item geography rather than limiting to Israel or assuming a Podolia-wide index.
- **Search/access:** **documented/gated**. Help confirms newspaper full-text, phrase/Boolean and title/date filtering, with basic newspaper use available without registration. Direct web access returned 403 and the browser showed a verification screen; a live query was not completed. Catalogue and digitization access are item-specific.
- **Overlap/evidence:** select titles or archive collections missing from LIBRARIA/JewishGen. Preserve NLI item ID and original holding archive, or newspaper/date/issue/page/article ID. Match Hebrew-script forms from a reliable source; OCR coverage does not verify readings.

## Holocaust documentation

### Yad Vashem

[Names database](https://collections.yadvashem.org/en/names).

- **Trigger/value:** Holocaust-era names/fates, source submissions and testimony leads, including Ukraine and people deported to Transnistria. Search the relevant birth, prewar, wartime or other place field; these relationships are not interchangeable.
- **Search/access:** **results verified**: `Shargorod` in the combined place field returned results and source/fate filters. Literal, synonym and Soundex options and family/date fields were visible. A broad result count is not a count of unique local victims; the interface includes different fates and multiple source records.
- **Overlap/evidence:** JewishGen/USHMM can reference the same lists. Deduplicate source IDs and people cautiously; preserve Pages of Testimony's submitter/date/provenance and contradictions rather than treating the index as an official death certificate. Follow the actual source record, not the search snippet.

### United States Holocaust Memorial Museum (USHMM)

[Collections Search](https://collections.ushmm.org/search/); [Survivors and Victims resource centre](https://www.ushmm.org/remember/the-holocaust-survivors-and-victims-resource-center).

- **Trigger/value:** local ghetto history, oral testimony, memoirs, administrative records, photos and collection inventories. Relevant coverage includes Ukraine/Transnistria, with access varying by collection.
- **Search/access:** **results verified**: `Shargorod` returned memoir and oral-history catalogue records, accession/RG identifiers and finding-aid matches. Field search and digital-availability filters were visible. The separate person-search endpoint failed retrieval; do not claim that search was tested successfully or confuse it with Collections Search.
- **Overlap/evidence:** use for a distinct testimony/document or accession context, not as another count of a Yad Vashem list. Preserve accession/RG, original archive reference, file/page or interview/timecode. A catalogue summary establishes the description, not the full unviewed testimony.

### Arolsen Archives

[Online archive](https://collections.arolsen-archives.org/en/); [collection overview](https://arolsen-archives.org/en/archive/explore-the-collection/).

- **Trigger/value:** Nazi persecution, concentration camps, forced labour and displaced-person trajectories connected to target inhabitants. Geographic relevance can be a birthplace in Podolia followed by imprisonment/labour elsewhere; this does not make every foreign camp a separate local article.
- **Search/access:** **interface verified/gated**: names/topics, person filters and archival-tree browse were visible. Browser use then required a declaration of consent/acceptance; it was not accepted and no query results were verified. Use an already authorized session or request human results under applicable tool approval rules.
- **Overlap/evidence:** USHMM or other services may hold copies of Arolsen/ITS material. Compare document IDs/provenance before counting as corroboration. Record archive signature, document ID and page, separating original wartime records from postwar tracing information.

## Military records: choose by army and document type

Army, conflict and known service/fate must determine the route; never infer service or nationality from a surname alone. An external battle is locally relevant through the documented person/unit action, not mere geographic proximity.

### WWI: «Памяти героев Великой войны» (GWAR)

[Portal](https://gwar.mil.ru/); [provider search guide](https://gwar.mil.ru/note/).

- **Trigger/value:** Russian-imperial WWI service/casualty or unit/operation leads involving relevant inhabitants. This is a military corpus, not a complete census of imperial subjects.
- **Search/access:** **documented/transport blocked**. The indexed provider guide describes parameter and unit/event search, but direct retrieval failed and the browser reported an untrusted-certificate error. A later normal retrieval of the guide returned 502. No successful live search was verified. Keep this source eligible for a relevant question and use a working permitted route when available; if a browser-warning override is needed, hand that action to the user under the browser tool's rules. Existing Archival.name military lists or specific human retrieval remain useful alternatives.
- **Overlap/evidence:** casualty lists may duplicate printed lists indexed by Archival.name. Preserve original list/date/page or archive/unit reference; a name match alone does not establish identity.

### WWI: International Committee of the Red Cross (ICRC)

[Prisoner archive search](https://grandeguerre.icrc.org/en/file/search/).

- **Trigger/value:** a relevant person may have been a WWI prisoner or civilian internee in a covered nationality/index series. Verify the available series before assuming coverage of Russian-imperial or other prisoners.
- **Search/access:** **interface verified** by web retrieval: status, nationality, surname and index-file selection. This is digitized card/list discovery, not guaranteed searchable full transcription. The site displayed a notice that requests were not currently being answered; distinguish that from browsing the digitized archive. No person query was completed.
- **Overlap/evidence:** use for a captivity record absent from casualty indexes; preserve index-card and referenced list/page numbers. Cards/list images still require permitted OCR/HTR or human reading.

### WWII: ОБД «Мемориал»

[Search and provider description](https://obd-memorial.ru/html/).

- **Trigger/value:** Soviet military death, missing status, captivity, hospital and burial records during WWII and the postwar period; Ukrainian birthplaces/conscription places are included within the Soviet military corpus, not a separate exhaustive Ukrainian database.
- **Search/access:** **interface verified** by web retrieval: surname, given name, patronymic, birth year, rank and advanced search; the provider describes source-document images and archive holdings. A submitted person query was not verified.
- **Overlap/evidence:** substantial overlap with «Память народа». Choose this route for loss/captivity documents; follow another portal only for missing document types, legibility or identity resolution. Capture record ID and original archive/fond/inventory/file/folio where available; do not adopt the site's political narrative as evidence.

### WWII: «Память народа»

[Portal](https://pamyat-naroda.ru/); [provider FAQ](https://pamyat-naroda.ru/faq/).

- **Trigger/value:** Soviet service/award files or unit documents that can explain a relevant person's service or a unit's documented local action. Use a known unit/time window for operational documents rather than a broad all-war search.
- **Search/access:** **documented/gated**: provider FAQ discusses digitized award documents and limits; direct retrieval returned 401 and the browser showed automated-request protection. A live query was not verified. Request focused human results if this corpus matters.
- **Overlap/evidence:** shared holdings with ОБД «Мемориал» and award databases; the same scan/document is one source. Prefer source references over a composite biography and keep conflicting documents distinct.

### WWI/WWII: Volksbund Gräbersuche

[Search](https://www.volksbund.de/erinnern-gedenken/graebersuche-online).

- **Trigger/value:** a documented German military casualty or burial connected to the locality/person question. Covers German war dead/missing across both wars; it is not an all-armies casualty register or a list of all inhabitants of a birthplace.
- **Search/access:** **interface verified** by web retrieval: name, birthplace and birth/death dates, with wildcard guidance. The provider warns of incomplete birthplace information and ongoing additions. No person query was completed.
- **Overlap/evidence:** useful for burial information missing from another military record, not generic surname matching. Preserve individual record URL, cemetery/grave and retrieval date; seek original service/casualty references where needed.

## Soviet repression and Ukrainian genealogical indexes

### «Реабілітовані історією»

[Regional books](https://www.reabit.org.ua/); [Vinnytsia volumes](https://www.reabit.org.ua/books/vn/); [national name database](https://www.reabit.org.ua/nbr/).

- **Trigger/value:** Soviet political repression in Ukraine, a named person or a supported locality question. Select volumes by relevant region of birth/residence/arrest; modern region labels need not match the historical institution or present archive holding the case.
- **Search/access:** **interface/holdings verified**: the national database exposes name, birth/residence place, year and text/logic filters and visible record rows; the Vinnytsia volume page is available. No new query was submitted. Prefer retained volumes or the existing Nysh `reabilitovani` channel, with `martyrolog` as its distinct archive-index route; their capabilities/commands must be discovered under the existing specialist skills.
- **Overlap/evidence:** Nysh's IA text and the printed regional book are the same source. The national database may overlap that book: compare entry provenance. Capture region, volume, page and case number; a biographical notice is not the uninspected criminal file and recorded accusations are not established guilt.

### Рідні

[Catalogue](https://ridni.org/catalog/); [Open Index](https://ridni.org/openindex/); [surname map](https://ridni.org/karta/).

- **Trigger/value:** Ukrainian metrical holdings or an explicit person-index question. The catalogue also lists specialized regional series; Hetmanate/Habsburg series do not automatically cover Podolia.
- **Search/access:** **settlement results verified** in the browser: enter the locality name and **press Enter** to submit; typing alone does not run the search. `Шаргород` returned settlement matches with county/governorate labels and a source-availability calendar. Select the matching settlement entry or entries, then a year to display the cases, as the interface instructs. The parish-membership switch is a separate search scope; record whether it is enabled. This retry supersedes the earlier typing-only attempt. The Open Index's person search was not tested. Distinguish surname distribution from historical person records.
- **Overlap/evidence:** the metrical catalogue overlaps the printed consolidated catalogue, Nysh parish discovery, UaRoots and other holdings aggregators. Reuse the existing route when the same corpus is covered; use Рідні for an uncovered index/series or specific discrepancy. Modern surname frequency and folk etymology do not prove ancestry, identity or historical origin.

## Historical bibliography and accessible editions

These collections are international and multilingual, with uneven holdings about Podolia. They discover publications rather than exhaust all archival records. Select an exact work/edition before downloading and check `sources/` and `books/` first.

### Google Books

[Search](https://books.google.com/); [provider help](https://support.google.com/books/answer/43729?hl=en).

- **Trigger/value:** identify books or occurrences inside books by place, person, title, author or quoted phrase.
- **Search/access:** **results verified**, `Szarogród` returned books with full-reading, preview or snippet distinctions. Broad discovery can find a book not described by locality in its catalogue title. Visibility varies by book and geography; search snippets are not inspected pages.
- **Overlap/evidence:** after identifying the edition, use a full copy on Polona/IA/HathiTrust or the publisher if needed. Preserve volume ID, edition and printed page; the same digitization on multiple sites is not independent evidence.

### Google Scholar

[Search](https://scholar.google.com/); [provider help](https://scholar.google.com/intl/en/scholar/help.html).

- **Trigger/value:** find modern studies, bibliographies, citation chains or newer interpretations of a historical question; not the first route for an already known archival reference.
- **Search/access:** **results verified**, `Шаргород` returned scholarly results, version and citation links; it also matched an author's surname, demonstrating the need for topic/place disambiguation. Use exact titles, author and subject terms, date filters and All versions/Cited by selectively. Full-text access depends on the host.
- **Overlap/evidence:** retrieve the actual article/edition from its publisher or repository; a citation count or Scholar snippet proves no historical claim. Deduplicate versions and do not mistake publication-date filters for the period studied.

### Internet Archive

[Search](https://archive.org/search); [search/API documentation](https://archive.org/developers/search.html).

- **Trigger/value:** retrieve historical books, directories, serials, regional memorial volumes or another accessible edition; search a known title/author/collection before very broad locality text.
- **Search/access:** **results verified**, `Sharhorod` loaded item results in the browser after web retrieval failed. Distinguish catalogue/metadata searches from text-content searches. Access, downloads and OCR files vary by item; do not promise full access to every listed book.
- **Overlap/evidence:** existing local books and Nysh `reabilitovani` may already supply exactly the same IA item. Use stable item ID plus printed page/viewer leaf, uploader/holding provenance and edition. OCR is machine text, not a verified reading.

### HathiTrust

[Current entry point](https://www.hathitrust.org/); [search/access guide](https://www.hathitrust.org/the-collection/search-access/).

- **Trigger/value:** a missing book/serial edition, alternative scan or full-text occurrence not resolved by the existing copy/Books/IA. Global library collections, not a region-complete historical corpus.
- **Search/access:** **results verified**, `Podolia` in Full Text & All Fields returned results with All Items/Full View and bibliographic filters. The old catalogue root redirected to the current site. Rights, location and institutional affiliation affect reading/downloads; Limited View can permit searching without readable pages. Login is not a universal access upgrade.
- **Overlap/evidence:** many editions overlap Books and IA. Record the Hathi handle/item, edition, printed page and actual access level; use a different host only when it adds useful access or content.

### Vernadsky National Library of Ukraine (NBUV)

[Catalogue directory](https://www.nbuv.gov.ua/node/554/); [electronic resources](https://www.nbuv.gov.ua/e-resources/).

- **Trigger/value:** Ukrainian local-history bibliography, dissertations, articles, rare books, newspapers, maps or manuscript holdings not found through general scholarly search. Search the relevant catalogue/database, not the website's news search.
- **Search/access:** **directory/capabilities verified**: the library lists integrated/book/serial catalogues, manuscript and special-collection catalogues, newspaper/map catalogues and scanned card catalogues. Actual catalogue query results were not tested; an old linked instruction URL returned 404. Earlier IRBIS access notes are in the existing [archive reference](../../where-to-dig/references/where-to-dig-archives.md); check the current selected subsystem in the browser.
- **Overlap/evidence:** complements Scholar with Ukrainian and special holdings; catalogue-only records do not imply digitized full text. Preserve catalogue/database and record ID, bibliographic edition, library shelfmark and page. Scanned cards remain subject to the archival-reading restriction.

## Archival inventories and original references

### Interarchive search portal and archive finding aids

[Міжархівний пошуковий портал](https://searcharchives.net.ua/).

- **Trigger/value:** identify fonds, inventories, case titles or digital copies across **participating** Ukrainian ARCHIUM resources. The portal lists participating archives; it is not all Ukrainian archives, and no Vinnytsia-wide coverage should be inferred from the project's regional focus.
- **Search/access:** **interface/capability verified** by web retrieval: general versus digitized-case search, archive selection and provider description of searching finding-aid texts, annotations, titles and indexes. A submitted query was not tested.
- **Overlap/evidence:** Duck Inspector, Archival.name inventories and FamilySearch can lead to the same case. When the archive/fond is known, inspect its current original inventory and relevant neighbouring entries rather than repeating broad aggregators. Load `keep-fond` when the task needs its specialist registry/ordering workflow. Record archive–fond–inventory–case, inventory page/entry, dates, old/new numbers and withdrawal notes; never assume matching titles prove matching references or that catalogue text proves case contents.

## Maintain coverage without a second research system

Log queries and selected/skipped routes with a short reason in the existing task/evidence record. For useful results retain original identifiers and precise locators, following `manage-sources` only when a reusable source record/artifact is warranted. This registry is operational guidance, not a historical-source record or a new task database.

Deduplicate by publication/edition/page, archival reference/document ID, interview/accession or map edition/sheet, not by host URL. A second independently created source can corroborate a claim; a mirror, reindexed transcription or catalogue pointing to the same original cannot. Index fields with independently verifiable source references can be reported at their actual evidential scope; do not promote their unverified machine extraction or a merged identity into an original-record fact. Keep user-provided established facts and marked uncertainty under the unchanged project rules.

For an important gate, use [the existing human search handoff](search-services.md#ask-the-user-to-run-a-search): exact terms/variants, database/collection, dates and modes; request the relevant rows, original references and links, plus page/coverage limits. A failed access test is neither a search zero nor a reason to label an investigation `no_result` while essential evidence is pending.
