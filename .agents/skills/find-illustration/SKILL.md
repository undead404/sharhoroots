---
name: find-illustration
description: Find, visually evaluate, and insert a sourced illustration for a vault article, or report that no suitable image was found. Use for article photographs and other existing illustrations, not archival OCR/HTR or generated imagery.
---

# Find an article illustration

Find an existing image that represents the article's own subject, then place it in the article with an honest Ukrainian caption and a source citation. Finding nothing is a complete and acceptable outcome. Do not promise an image for every article.

## Decide what would fit

- Read the target article, its existing illustrations, and related articles before searching. Define the image's subject and exclusions from that context. Search existing `content/media/` uses, relevant `sources/` records, `tasks/`, and local `books/` copies before downloading duplicates.
- If the article has `defunct` in its frontmatter `tags`, require an illustration that depicts the subject during its existence and matches the relevant era discussed in the article. Establish that period from source context; do not guess uncertain dates. A modern photograph of a former constituent settlement, surviving building, landscape, or ruins does not qualify, even with an honest caption. A later reproduction of an image from the relevant era is acceptable when the original depiction and its date are established. If the era cannot be established or no matching image is found, leave the article unchanged.
- Churches and monasteries are the only special subject exclusions for settlement illustrations: reserve photographs dominated by a church or monastery for that institution's own article, even if it has not yet been written. Their incidental appearance in a broader village view is acceptable; judge what dominates the image. Mills, schools, other local buildings, landmarks, and scenes are valid settlement illustrations. Do not reject them because they could have their own articles or insist on a panorama or village-wide view. Caption the particular subject honestly.
- For an administrative area, consider a dated map of its territory or documented constituent settlements. A photograph of a relevant local subject is also acceptable when honestly captioned with its location and scope, subject to the era requirement for `defunct` entities above. Never fabricate boundaries, apply modern boundaries to an earlier period, or turn approximate membership into a boundary polygon. Maps are candidates, not mandatory fallbacks.
- Do not use a nearby village, generic landscape, unrelated period image, generated reconstruction, or imagined likeness to fill a gap. A relevant historical image is not required to exist. No known surviving depiction is a reason to keep the search short, not to invent one.

## Search and evaluate

1. Search the web in Ukrainian, using established name variants and location qualifiers to disambiguate. Use further languages appropriate to the image period and subject under `AGENTS.md`. Search by the desired scene as well as the entity name. Consider relevant image repositories, local publications, photographers' galleries, and accessible community/institutional pages; search results and captions are leads, not automatic acceptance.
2. Inspect the source page or publication and the actual image. For PDFs, use the PDF skill and inspect the relevant illustrations rather than relying on captions alone. Check that extraction yields the photograph itself, not a mask, blank asset, thumbnail, or an unrelated neighbouring image. Inspect the final extracted/cropped file too. Keep exploratory downloads and extractions in `.agent-work/`.
3. **Photograph evaluation is permitted.** Use vision to assess the depicted scene, composition, relevance, quality, and whether it competes with another article's subject. This includes historical photographs reproduced on scanned book pages and crops extracted from them. The archival text-reading/OCR/HTR prohibition does not apply to this evaluation. It still applies if the task shifts to reading or verifying archival names, dates, handwriting, or record entries. For source captions or bibliographic text, use available document text or local OCR and follow the repository's evidence rules.
4. Establish the depicted identity through provenance, source context, and available evidence; appearance alone cannot identify an otherwise unidentified village or person. Separate what is visibly present from what the source identifies. A broad label such as «краєвиди» does not prove that every embedded image shows village habitation or supplies an individual date/photographer.
5. Check resolution and legibility at article size, source/creator credit, and applicable reuse terms. Do not infer permission from public access, a downloadable PDF, or credit alone. Preserve the actual licence and any attribution/crop requirements when applicable. If reuse is unresolved, keep the candidate out of the article and report that limitation; do not claim a publication-ready result.

## Stop honestly

- Bound the search by the available evidence: check plausible local sources and a reasonable spread of relevant web/image routes and name variants. Stop when those routes produce no suitable candidate or repeat the same rejected candidates; do not search indefinitely to force success. Respect the `research-facts` access bound of at most two materially different retrieval methods per blocked resource and stop at access restrictions.
- Reject a candidate when identity, conceptual fit, visual quality, or reuse eligibility fails. Do not relax those criteria merely to fill the article. A source showing that a place existed is not evidence that it was photographed.
- If the bounded search finds no suitable image, say simply **«Вибачте, відповідного зображення не знайдено»** (or “Sorry, no suitable image found” in an English conversation). Briefly distinguish useful rejected candidates if needed. This means not found in the searched sources, not proof that no depiction ever existed.
- If a specific essential source cannot be accessed or a promising candidate's reuse status remains unresolved, state that precise limitation instead of presenting it as an exhaustive negative search. Do not claim success from finding only a caption, search thumbnail, or uninspected candidate.
- On failure, leave the article and its existing illustrations unchanged. Put search/access notes outside `content/`; never insert a failure notice, placeholder, or speculative replacement into the article. Do not create follow-up research tasks merely to avoid accepting a negative outcome.

## Insert an accepted image

- A request to find an illustration for an article using this workflow includes adding the accepted image and caption to that article. If the user explicitly requests candidates or research only, respect that scope instead. Do not publish or push Git changes.
- Save the selected image under `content/media/` with a descriptive, stable filename. Retain a source URL and exact page/image locator. Make only necessary extraction, resizing, or cropping changes, preserving meaning and attribution obligations; do not generate missing details or remove source qualifications.
- Place the figure **immediately after the initial introductory prose paragraph**. If the article has no introductory prose paragraph before its first section, place it **immediately after the closing frontmatter delimiter**, before the first heading, table, or other body block. Do not write a new introduction solely to change image placement. If there is no frontmatter, use the equivalent start-of-body position without adding metadata.
- Use the existing figure-callout convention:

  ```markdown
  > [!figure]
  > ![[descriptive-image-name.jpg]]
  > _Точний опис зображеного. Автор і дата, якщо встановлені. [Джерело](https://example.org/source), с. 123. Ліцензія та відомості про обрізання, якщо застосовні._
  ```

  This is a format example, not text or a URL to copy. Supply real source details only. Caption the actual scene and its evidential limits in Ukrainian. Do not call a mill a village panorama, a modern photograph a historical view, or a publication year the date a photograph was taken. Preserve uncertainty; omit unknown details or state that they are unknown when relevant. Cite the source directly next to the image, with a printed/PDF page distinction where necessary. Do not use Russian-language Wikipedia.

- If replacing an existing lead figure, replace that figure without duplicating it or silently deleting its citation; preserve unrelated illustrations and prose. If the original remains useful in an existing relevant section, it may remain there with its own caption and citation.
- Preserve frontmatter. Load `content-frontmatter` only if a frontmatter edit is actually needed. Do not add image metadata or unrelated historical claims as a side effect.

## Finish

Verify the selected local image visually, the embed path, the source citation, Ukrainian caption, compliance with the church/monastery exception and the era requirement for `defunct` entities, and exact placement. Check the diff for unrelated changes. Report the selected image and any material limits, or the negative outcome. Follow repository checks appropriate to the changed files; do not run a vault-wide formatter.
