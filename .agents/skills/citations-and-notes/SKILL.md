---
name: citations-and-notes
description: Create or revise source citations, footnotes, quotations, and author/editor notes in vault articles, including when paraphrasing evidence or moving cited passages.
---

# Citations and notes

Load this skill whenever creating or revising quotations, source citations, footnotes, or author/editor notes in `content/`, including cited passages edited through another workflow. Apply it to the passages in scope; do not convert unrelated passages or undertake a vault-wide cleanup. This skill governs presentation and attribution, not permission to research or change article meaning.

## Prose first

- Prefer extracting useful facts into natural Ukrainian paraphrases with precise references. Use direct quotations sparingly, when the wording itself matters. A paraphrase has no quotation marks and must preserve the source's meaning, scope, attribution, and uncertainty.
- Follow `AGENTS.md` language and evidence rules unchanged: all reader-facing wording, including quotations and notes, is Ukrainian; foreign names use Ukrainian script. Exact publication titles and literal identifiers retain their required forms. Translate foreign-language quotations and explicitly identify the translation; retain original wording in research records outside `content/` when useful. Do not treat a translation as the source's exact Ukrainian wording.
- Keep facts and useful interpretation in the article body. Keep attribution and uncertainty there when necessary to understand a claim correctly without opening its footnote. Footnotes hold references and brief supplementary evidence explanations; they should not become a parallel article.
- Keep original wording, lengthy source comparisons, transcription issues, and research-process details in research records. Reader-useful limits of the evidence may belong in prose or a supplementary note; tool/access failures belong outside the article.
- This skill does not prescribe how conflicting event dates are structured. Preserve the applicable evidence rules and the user's explicit qualifications; do not resolve a conflict through citation formatting.

## Source footnotes

- Use Markdown footnotes for source citations in new or revised article prose. Put the reference immediately after the supported sentence or paragraph: `Текст твердження.[^source-locator]`. Split references at claim boundaries when a paragraph contains claims supported by different evidence.
- Define notes separately, normally together at the end of the article, following an existing suitable placement. Keep the reference and definition in the same article. Do not use inline footnote syntax or manually numbered superscripts.
- Link the source title to the supplied or inspected source URL. Include known bibliographic details: author/editor, place, publisher, year, volume/issue, and ISBN when supplied. Add the exact supporting page, folio, entry, archival reference, section, or other locator. Distinguish printed page numbers from PDF/image numbers when necessary. Do not invent missing metadata, URLs, or locators; disclose a material missing locator rather than claiming precision.
- Citation explanations are Ukrainian; preserve exact publication titles, URLs, archival references, and other literal identifiers. Distinguish a document's author from its editor and the repository article's compiler.
- Use stable, descriptive IDs based on source and locator, such as `register-1897-p42` or `register-1897-p42-editor`. Retain existing usable IDs. Reuse an ID only for the same citation and locator; different locators need different IDs. Avoid positional references such as «Там само» or «див. вище»: each note should remain intelligible after passages move.
- Preserve relevant attribution, links, locators, and qualifications when converting a revised passage's citation. A source cited through another work remains an indirect citation; identify the inspected intermediary and do not imply inspection of the original.
- User-stated facts without a supplied source do not acquire a citation or independent-verification requirement. A formatting pass is not source verification. Follow `research-facts` only when research or verification is part of the request.
- Keep navigation links, illustration credits, and links in established table schemas in their appropriate format. This skill does not replace specialized table rules or require turning every link into a footnote.

## Authors' and editors' notes

- Treat a source's footnote, endnote, marginal note, or editorial annotation as evidence with its own authorship. Extract useful information into Ukrainian prose rather than copying its numbering or note structure. Cite its page and note number when available.
- When information comes from an editor's annotation rather than the original author, say so where it affects the claim, and identify it in the citation as «Примітка редактора видання». Use «Примітка автора джерела» when needed to distinguish an author's note. Do not guess who wrote an unattributed note.
- For a useful supplementary explanation added to the vault article, use a separate footnote beginning «Примітка упорядника статті:». Add supporting source details within that note if it introduces a research-derived assertion. Do not bury essential facts or uncertainty there, and do not put routine agent commentary into published notes.
- Distinguish omissions and additions inside quotations from source wording. Mark omissions with `[…]` and necessary compiler clarifications with square brackets, identifying their authorship when ambiguous. Do not silently repair, combine, or polish quoted wording; paraphrase when exact wording is unnecessary. Preserve meaning when shortening a quotation.

## Examples

The following are schematic formatting examples, not historical claims. Replace bracketed placeholders with known details; never publish them as source data.

Paraphrase and separate locators from one source:

```markdown
У виданні перелічено населені пункти парафії.[^parish-register-p42]
В окремому розділі наведено відомості про школу.[^parish-register-p57]

[^parish-register-p42]: [Назва видання](<URL джерела>), [рік], с. 42.
[^parish-register-p57]: [Назва видання](<URL джерела>), [рік], с. 57.
```

Attribution of a source editor's note:

```markdown
Редактор видання пов'язує цю назву з давнішою назвою поселення.[^edition-p42-note3]

[^edition-p42-note3]: [Назва видання](<URL джерела>), [рік], с. 42, прим. 3. Примітка редактора видання.
```

Quotation only when its wording matters:

```markdown
Автор уживає означення «[український переклад потрібного вислову]».[^edition-p18]

[^edition-p18]: [Назва видання](<URL джерела>), [рік], с. 18. Цитату перекладено українською упорядником статті.
```

A supplementary compiler note uses its own reference, such as `[^note-calendar]`, and definition:

```markdown
[^note-calendar]: Примітка упорядника статті: [коротке додаткове пояснення та його джерело, якщо потрібне].
```

## Editing and completion check

- Move supporting references with their claims. When moving text between articles, copy the required definitions, resolve ID collisions by meaning, and retain definitions still referenced in the source article. Do not merge notes merely because their IDs match.
- Check changed articles for undefined references, duplicate definitions, and definitions orphaned by the edit. Repeated references to one definition are valid. Preserve unrelated pre-existing issues and report them if material.
- Read each revised passage with its notes: the reference supports that claim at that locator; author/editor/compiler voices remain distinguishable; no evidence, attribution, or qualification was lost; quotation or paraphrase is identified correctly; and new reader-facing wording complies with the Ukrainian-language rules.
- Report any missing source details or unresolved attribution. State whether underlying sources were inspected; do not claim verification from formatting checks alone.
