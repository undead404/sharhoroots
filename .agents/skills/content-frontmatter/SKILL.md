---
name: content-frontmatter
description: Define, review, and edit the semantic frontmatter fields used by articles under content/.
---

# Maintain article frontmatter

Use this skill whenever creating or editing YAML frontmatter in `content/`. Frontmatter is structured metadata about the entity or page, not a place to infer facts that the article does not establish.

## General rules

- Read the target note and relevant nearby entity notes before editing metadata. Follow the repository's language rule: authored reader-facing metadata, especially `description`, is Ukrainian; preserve literal identifiers and machine-required syntax.
- Keep optional fields optional. Omit a value that is unknown or not established; do not fill fields merely for completeness. Never invent names, relationships, dates, or coordinates. Treat user-provided facts as established, preserving any uncertainty they express.
- When new evidence or a requested correction changes a metadata value, update that value consistently with the article and preserve relevant uncertainty and citations in the prose. Do not perform a metadata sweep of unrelated notes.
- Preserve existing YAML style and field types. The Quartz schema expects `aliases` and `tags` as lists of strings, `containedInPlace` as a string, `coordinates` as a pair of numbers, dates as numbers, and `description` and `title` as strings. Keep the existing coordinate pair order/convention; do not guess or change it.
- Check related notes for title collisions or established naming before choosing a title or relationship. If the correct entity, disambiguation, or metadata value remains unclear, leave it unresolved and ask or report the ambiguity instead of guessing.

## Field meanings and editing rules

- `aliases` (optional): other names of this entity. Include only genuine alternate names, not descriptions or unrelated nearby entities.
- `containedInPlace` (optional): the entity this one merged into, when applicable; otherwise, the settlement, administrative area, or state in which it is or was located. Use the existing plain-string style and name the supported entity; do not turn this into an unsupported relationship or add a link syntax that nearby frontmatter does not use.
- `coordinates` (optional): precise or approximate coordinates for where the entity is or was located. For an administrative area, use its latest known administrative center. Add coordinates only when supported; do not estimate them by guesswork.
- `description` (optional): a short, accurate Ukrainian announcement for Quartz preview images and other previews. Summarize the page's subject and scope, preserve uncertainty, and keep it concise (aim for about 150 characters or fewer). Don't duplicate the `title` field here.
- `dissolutionDate` (optional): the year the entity ceased to exist, when known. Use a numeric year; do not imply a precise day or treat a reorganization date as dissolution without support.
- `foundingDate` (optional): the year the entity was created, when known. Use a numeric year and do not infer it from the earliest surviving record unless the evidence supports that conclusion.
- `tags` (optional): a list of topical/entity-category labels. Prefer the established vocabulary where applicable: `area`, `catholicism`, `city`, `defunct`, `eastern-orthodox`, `governorate`, `greek-catholic`, `hamlet`, `judaism`, `khutir`, `monastery`, `oblast`, `raion`, `suburb`, `town`, `uezd`, `village`, `volost`. These are recommended values, not a reason to force a tag that does not fit.
- `title` (required): the entity's full, unique, most-recently-relevant title. If it is not unique in Ukraine, append in parentheses the Ukrainian possessive adjective of the municipality it currently belongs to. If a settlement was completely dissolved by merger, append in parentheses the title of the settlement it merged with. Verify ambiguity from the vault/context; do not manufacture a disambiguator.
- `type` (required): a valid Schema.org type supported by this vault. The recommended entity types are `AdministrativeArea`, `PlaceOfWorship`, `Organization`, `Place`, and `GovernmentOrganization`. Other types already supported by `quartz/schemaOrgTypes.ts` remain valid for pages and people; if a new type is needed, do not use it until it has been added to the registry.

## Before finishing

- Confirm that required `title` and `type` are present and that edited values match the expected YAML types and meanings above.
- Re-read the frontmatter and affected prose together. Check that a metadata value does not claim more than the text or inspected evidence supports, and report any unresolved ambiguity.
