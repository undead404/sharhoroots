---
name: manage-sources
description: "Find and maintain source records, retained copies/texts, OCR/HTR provenance, and inspected passages in sources/."
---

# Manage reusable external sources

Keep source identity, retrieval details, and the current state of inspected passages reusable across research tasks. Read `sources/README.md` and `sources/TEMPLATE.md` from the repository root for the schema and storage contract. This skill handles records and artifacts; `research-facts` owns research questions and historical interpretation, and `citations-and-notes` owns article citations. Registering or migrating a record does not require a fresh web search or imply new source inspection.

## Find and identify

- For source eligibility, document exceptions, and potentially excluded article links, load and follow [evaluate-external-source](../evaluate-external-source/SKILL.md). Store its source-specific decision and provenance within the existing record schema; source registration does not confer credibility.

- Create a record only for a source likely to help another research task, and explain that reuse value in the body. Do not register every requested URL, search result, article citation, or failed retrieval. Keep one-off references in the current task/evidence record unless a concrete reuse reason emerges. A new URL for an existing source is an update, not a new source.

- Search `sources/`, relevant `tasks/`, and local `books/` before creating a record or downloading. Match title, edition, archive/shelfmark, stable URL, and existing IDs, not just filenames.
- Usually keep one record per edition, article, archival case, or catalog. Preserve substantial passage records as children using `parent: <source-id>` when the relationship is established. A thematic research summary spanning several sources belongs in a task; do not invent a single bibliographic identity for it.
- Reuse stable IDs and paths. Keep a catalog and the work it describes distinct; translations and editions may differ in pagination and content. Do not infer identity or frame-to-folio mappings.

## Register or update

- Write authored source-record prose, headings, descriptive labels, coverage summaries, provenance explanations, and inspection limits in Ukrainian. Preserve exact publication titles, bibliographic/source spellings of people and institutions, quoted passages, and raw transcriptions in their original languages when useful for identification, searching, or verification. Keep schema keys, enum values, engine/model names, identifiers, URLs, paths, and machine-required syntax unchanged. This research-record convention permits original-language evidence and names beyond the stricter rules for published `content/`.
- Apply the language convention to new records and substantively revised passages. Do not make translation of untouched legacy material a prerequisite for retrieving or using a source, and do not translate or normalize retained text artifacts during record maintenance.
- Use schema version 1 for new and normalized records. Keep unknown optional values absent. Migration dates are not access dates: preserve `last_checked` unless the source was actually checked again.
- Preserve useful `url`, `local_copy`, and `last_checked` fields. `local_copy` identifies the primary local file/directory; `artifacts` adds additional copies and retained texts with provenance. Do not replace these fields merely to normalize the record or duplicate the primary copy in `artifacts`.
- Store durable, shareable source texts under `sources/texts/<record-slug>/`; existing tracked text paths can remain where referenced. Register each retained artifact with its exact locator and provenance. Keep local PDFs/scans in `books/` or their existing specialist workspace; temporary processing belongs in `.agent-work/`.
- Keep raw OCR/HTR and human readings separate. Label machine output `unverified`, identify the engine/model when known (otherwise explicitly `unknown`), and preserve errors. User-provided or confirmed readings are established as readings within their stated scope; preserve their question marks, gaps, and qualifications verbatim. This does not establish the historical accuracy of what the document asserts. Record reading provenance and source reliability limits separately in existing `inspected.note` or body sections; keep claim-specific assessments and publication privacy decisions in the task/evidence record. Never overwrite human readings with a machine reading or silently normalize them.
- Record inspection by passage in `inspected`, with its basis and limits. Machine-only coverage is not confirmation, catalog inspection is not inspection of the described document, and a few inspected pages are not a verified whole work.
- Make source-specific assessments reusable: identify the exact passage/edition, useful terminology or name variants, what it establishes, and material coverage or reliability limits. Point to retained text rather than duplicating it. Keep cross-source interpretations in the originating task and link it; no separate fact registry is needed. Prior inspection metadata guides retrieval, not automatic acceptance of a new claim.
- Put a concise current summary first. Keep searches, processing failures, application history, and sharing receipts in the relevant existing task. When migrating, preserve old material under an explicitly superseded/history section or move it with a precise backlink; never discard readings, source links, conflicts, or substantive qualifications. Do not create artificial historical research tasks just to clean metadata.
- Preserve text bytes and existing links when reorganizing artifacts; update all repository references if a move is necessary. Do not commit restricted source copies or private notes. This skill does not authorize retrieval, OCR/HTR, or sharing workflows by itself; follow their relevant skills and existing authorization.

## Validate

- Run `npm run lint:sources -- --strict sources/<edited-record>.md` for each edited record (multiple paths are supported). The checker scans all IDs for duplicates while strictly validating the selected records.
- Run `npm run lint:sources` to check all migrated records and summarize legacy debt. Use `npm run lint:sources -- --inventory --json` for a read-only inventory with per-record diagnostics, text ownership, and legacy mentions. Save disposable reports in `.agent-work/`, outside `sources/`.
- Missing tracked artifacts are errors. Missing local-only copies are informational and never justify inventing availability or deleting their metadata. Unregistered retained texts need ownership and provenance; a filename ending in `human` or `ocr` alone does not establish either.
- Report actual checks and remaining migration debt. Validation checks structure and paths, not historical truth or transcription accuracy.
