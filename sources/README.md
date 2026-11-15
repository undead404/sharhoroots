# Reusable source records

Use this directory for tracked records of external sources worth reusing. Load `.agents/skills/manage-sources/SKILL.md` when creating or maintaining a record, copy reference, retained text, or inspection entry. Check existing records and local copies before searching or downloading again.

Create a record only when the source is likely to help another research task: for example, a reference work covering several settlements, an archival case with further useful passages, or a publication repeatedly consulted. Do not register every requested URL, search result, citation, or failed retrieval. One-off sources stay in the current task/evidence record unless a concrete reuse reason emerges. Updating an existing reusable record is preferable to another record for a new URL or passage.

## Storage and identity

| Location                       | Contents                                                                                |
| ------------------------------ | --------------------------------------------------------------------------------------- |
| `sources/<stable-slug>.md`     | Source identity, retrieval details, current coverage, passage locators and limits       |
| `sources/texts/<stable-slug>/` | Intentionally retained, shareable transcriptions and useful machine texts               |
| `books/` (ignored)             | Local PDFs, scans, publications and large derived texts                                 |
| `tasks/`                       | Research questions, searches, interpretations, application history and operational logs |
| `.agent-work/` (ignored)       | Disposable downloads, renders, OCR experiments and reports                              |

Usually use one record per identifiable edition, article, archival case, or catalog. Match bibliographic identity, shelfmark and URLs before creating another record. Preserve existing IDs and paths. Substantial passage records may remain children of an identified source using `parent: SRC-…`. Do not merge different editions, translations, or a catalog and its described work merely because they concern the same subject.

Existing tracked `.txt` paths remain valid; moving them is optional and requires updating every reference. A tracked reading must not be moved into ignored storage just to make the directory uniform. Local copies may be absent on another checkout; their metadata remains useful.

## Schema version 1

### Language convention

Write authored record prose, headings, descriptive labels, coverage summaries, provenance explanations, and inspection limits in Ukrainian. Preserve exact publication titles, bibliographic/source spellings of names and institutions, quotations, and raw transcriptions in their original languages when useful for identification, searching, or verification. For example, a human-readable `language` value can be `французька`; an existing language code such as `fra` remains data.

Keep schema keys, enum values (`primary`, `unverified`, etc.), engine/model names, identifiers, URLs, paths, and machine-required syntax unchanged. Unlike published `content/`, research records may retain original-language names and wording for verification. Do not translate or normalize text artifacts as part of this convention.

Apply this to new records and substantively revised passages; translating untouched legacy material is not required before using a source. These are editorial rules: the structural validator does not determine language or attempt to translate mixed source material.

### Fields

Start from [TEMPLATE.md](TEMPLATE.md). Required fields are `schema_version: 1`, a stable nonempty `id`, `title`, and `type` (`primary`, `secondary`, `catalog`, or `reference`). This classification is separate from Schema.org types used in `content/`.

Optional fields: `creator`, `date` (quoted text, including approximate dates), `language`, `url`, `local_copy`, `shelfmark`, `access` (`open`, `restricted`, `unavailable`, `unknown`), `last_checked` (quoted `YYYY-MM-DD`), `parent` (another record's ID), `artifacts`, and `inspected`. Keep `url` as the primary stable online address, `local_copy` as the primary local file or directory, and `last_checked` as the date of an actual source/access check. Omit unknown values and unused collections. Do not refresh access dates during cleanup. Literal titles, identifiers, and source spellings may retain their original language here.

```yaml
artifacts:
  - path: books/example.pdf
    kind: copy
    locator: "Повне видання"
    provenance: "Отримано з URL видання; походження відоме з дослідницького запису"
  - path: sources/texts/example/pdf-012-ocr.txt
    kind: ocr
    locator: "PDF 12; друкована с. 8"
    provenance: "Локальне розпізнавання без виправлень"
    engine: "Tesseract fra"
    status: unverified
  - path: sources/texts/example/pdf-012-human.txt
    kind: transcription
    locator: "PDF 12; друкована с. 8, другий абзац"
    provenance: "Читання, надане користувачем; знаки питання збережено"
    status: user_provided
inspected:
  - locator: "PDF 12; друкована с. 8, другий абзац"
    basis: user_reading
    note: "Підтверджено лише цей абзац; непевність імені збережена в тексті"
```

Every artifact requires `path`, `kind`, `locator`, and `provenance`. Kinds: `copy`, `transcription`, `ocr`, `htr`, `extracted_text`, `index`. Texts and indexes also require `status`: `unverified`, `user_provided`, `user_confirmed`, or `source_text`. Raw `ocr`/`htr` must remain `unverified` and require `engine` (use `unknown` if it cannot be recovered). Store a confirmed reading as a separate transcription. `source_text` identifies an available publication text or text layer; it does not guarantee embedded OCR accuracy.

Use repository-relative paths under `sources/` or `books/`. Absolute paths are supported for existing local specialist workspaces; they are local-only references. A `copy` belongs in `books/` or an external local workspace. Do not register `.agent-work/` files as durable artifacts. Tracked texts under `sources/` must exist and have one owning record; other records may refer to the owner. Keep provenance in metadata and raw text unchanged.

Each `inspected` entry requires `locator`, `basis` (`source_text`, `user_reading`, `catalog`, `machine_only`), and `note` describing scope and relevant limits. An entry records the supplied inspection history; schema validation cannot verify it. Do not assign a whole-source verification flag. A catalog establishes its own description, and machine output remains machine output. User-provided readings are established with exactly the uncertainty the user expressed.

`local_copy` remains supported for the primary local copy; use `artifacts` for additional copies and retained texts with passage-level provenance. Do not duplicate the primary copy in both fields. Neither field requires redownloading or asserts availability on every checkout. Preserve old operational or superseded material explicitly as history until it can be moved safely to the relevant task; keep a concise current summary above it. A source record is a retrieval aid, not a substitute for inspecting and citing underlying evidence.

## Validation and gradual migration

- `npm run lint:sources` checks versioned records and reports legacy debt without failing solely because legacy records remain.
- `npm run lint:sources -- --strict sources/example.md` strictly checks selected records, including the version marker. Multiple paths are supported. With no paths, `--strict` checks every record.
- `npm run lint:sources -- --inventory --json` emits a read-only inventory of records, diagnostics, retained files, structured ownership and legacy mentions. Store reports in `.agent-work/`. For JSON without npm's command banner, use `npm run --silent lint:sources -- --inventory --json`.

The normal repository check includes source validation. The staged-file hook strictly validates edited source records. Root `README.md`, `TEMPLATE.md`, and Markdown text artifacts under `sources/texts/` are not source records. Missing local copies are informational; missing tracked attachments, duplicate IDs involving migrated records, malformed metadata, and invalid provenance are errors. Legacy issues and unregistered artifacts remain visible as warnings until migrated.

Do not bypass access restrictions. Actual retrieval and research follow `research-facts`; archival text work follows relevant OCR/HTR or Nysh skills. Source maintenance does not authorize publishing or sharing material.
