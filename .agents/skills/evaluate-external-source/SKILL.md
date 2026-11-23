---
name: evaluate-external-source
description: Evaluate an external source under the repository credibility policy, establish historical-document exceptions, and route excluded article links to replacement research tasks.
---

# Evaluate an external source

The **Source credibility and replacement policy** in repository-root `AGENTS.md` is the single source of truth for exclusions, the age threshold, and mandatory replacement scheduling. Apply it to the exact item and passage being used. This skill determines eligibility under that policy; passing it does not establish a claim's truth or replace normal source criticism and document inspection under `research-facts`.

## Identify the item

- Reuse relevant evidence in `tasks/` and source records in `sources/`, plus local copies in `books/`. An existing citation, retained copy, or source record is not proof of eligibility.
- Identify the supplied URL, actual hostname, redirects when known, publication identity, language, and publication date. Match exact hostnames and their subdomains, not substrings in URL paths or query strings. Recognize mirrored or translated copies of the same excluded publication; a different host or language does not rehabilitate it.
- Distinguish the publication date from the period described, access date, upload date, and original document date. Do not guess an unknown date. Domain exclusions apply regardless of publication language or date; the Russian-language cutoff applies on every domain. An unresolved date matters to eligibility when the language/date exclusion could apply, not to unrelated publications.
- Inspect only what is needed for the current decision. Follow the archival-reading restrictions in `AGENTS.md`; never send Cyrillic or Latin handwritten scans to an LLM for verification. This workflow does not authorize a new download, OCR/HTR run, paid service, or bulk audit by itself.

## Establish any document exception

For material from an excluded resource, check whether the relevant passage is an unchanged reproduction of a textual historical document meeting the age threshold in `AGENTS.md`.

- Identify the original document, its creator when known, original date, and precise page, folio, entry, or other locator. Calculate age at the date of use from the original date. If only a year or date range is known, accept the age condition only when the whole possible range meets the threshold; otherwise leave it unresolved.
- Prefer scans such as PDFs or JPEGs; faithful, unaltered textual transcriptions also qualify. Establish the basis for reproduction fidelity from the document and available provenance, within the permitted reading methods. A host's unsupported claim of authenticity does not establish this. Reuse established user readings within their stated scope; do not demand independent corroboration of them.
- Separate the original text from modern introductions, captions, annotations, summaries, interpretations, and authenticity claims. Those additions remain hints only. A scan format alone does not qualify a modern text, unrelated image, or altered reproduction.
- Record the basis and limits for the exception at the exact passage used. Prefer an archival or other credible copy when available. Unknown age, identity, or fidelity means the exception remains unresolved.

## Record and use the decision

Record the URL, item/passage locator, exclusion or eligibility basis, relevant dates, exception evidence, and remaining uncertainty in the existing task/evidence record. For reusable source-specific metadata, follow `../manage-sources/SKILL.md`; do not introduce new frontmatter fields or a separate decision registry. A brief resolved decision needs no standalone task or source record unless another workflow requires one. Keep process details outside `content/`.

Use one of these outcomes in ordinary prose:

- **Not excluded by this policy:** continue normal source evaluation; this is not a reliability endorsement.
- **Document exception established:** the original textual document may be used and cited at the inspected locator; follow `../citations-and-notes/SKILL.md`. Do not extend approval to other passages or the host's commentary.
- **Hint only:** use names, dates, search terms, archival references, and candidate sources to pursue eligible underlying evidence. Do not cite the excluded material as proof or promote its assertions into article facts.
- **Unresolved eligibility or exception:** preserve the uncertainty and treat the item only as a hint until resolved. Do not imply inspection or eligibility from a search snippet or existing citation.

## Hand off encountered article links

When a link encountered in `content/` is excluded or unresolved under the policy, and the document exception has not been established, load `../create-research-task/SKILL.md`. Scheduling is mandatory even during editorial work and does not require completing replacement research in the current assignment.

Supply the task workflow with:

- The exact URL and all affected article paths encountered in scope.
- The passage/claim or link function requiring a replacement, with its local heading or footnote identifier when available.
- The exclusion reason and any unresolved date or document-exception question.
- One focused question seeking a credible replacement for that claim or function, plus plausible source leads clearly labelled as leads.
- A completion condition requiring a verified credible replacement or an explicit, evidence-based editorial resolution, with article application tracked through the normal task states.

Use the existing template and semantic duplicate check across every status. Report a matching task instead of creating, reopening, or editing it. Group occurrences only when the same research answer resolves them. The ordinary low-value-gap, wording-only, and no-image/no-follow-up gates do not waive this requirement.

Keep existing citations traceable until a verified replacement or explicit editorial resolution is applied. Do not silently delete facts or substitute an uninspected source. Report the eligibility decision, its material limits, and any created or matching replacement-task paths. Do not claim a vault-wide audit when only encountered links were evaluated.
