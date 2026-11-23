---
name: llm-vision
description: "Help with vision tasks involving illustrations, images, and scanned documents."
---

# Vision workflow

Are you looking for an illustration? Use LLM vision to assess the actual image under [find-illustration](../find-illustration/SKILL.md). This includes photographs reproduced on scanned pages and extracted crops. Assess the scene, composition, relevance, and quality; establish identity through source provenance and context.

For document reading, choose the route by script:

- **Cyrillic or Latin:** Do not send source images, page screenshots, or crops to an LLM for inspection, transcription, verification, or OCR/HTR arbitration. Reading source captions and bibliographic details also follows the text routes below.
- **Other scripts (for example, Hebrew, Yiddish, or Ottoman Arabic):** LLM vision is allowed for reading and verification when catalog metadata, existing text, or tools reliably establish the expected script; subject matter alone is not enough. Record the routing basis. On mixed-script pages, isolate the non-Cyrillic/non-Latin passage before sending it to an LLM.

## Read source text

- Reuse an existing document text layer or transcription when available.
- For Cyrillic or Latin printed material, use local OCR under [local-ocr](../local-ocr/SKILL.md). Apple Vision OCR is a local recognition engine, not LLM vision.
- For Cyrillic or Latin handwritten documents, use Nysh HTR under [read-case](../read-case/SKILL.md) and the [Nysh and archival rules](../research-facts/references/nysh-archival.md). Follow that workflow's scope and resource safeguards. For other scripts, suitable OCR/HTR may also be used alongside the permitted vision route.
- For other scripts, use suitable OCR/HTR or permitted vision; if unresolved, seek an existing transcription or a competent reader. Do not ask the user to transcribe other scripts.

## Ask for a user reading

When asking the user to read Cyrillic or Latin archival text, provide automated OCR/HTR alongside the request whenever possible. Reuse existing output for the exact passage or run a bounded attempt under the relevant Nysh skill; for printed text, follow `local-ocr`. For handwriting, prefer Nysh HTR over generic OCR and follow its scope and resource safeguards.

Include the raw machine transcription labelled as unverified OCR/HTR, identify the engine/model when known, and preserve errors, gaps, and competing readings. Ask the user to confirm or correct the needed passage. This applies whenever requesting a user reading, not only after machine recognition fails.

When OCR/HTR is unavailable, fails, or reaches its useful limit after a bounded attempt, stop automated attempts and ask for the particular piece needed. Identify the case/path, exact filename, PDF page and printed page if known, and the specific field or passage. State the concrete limitation if no useful machine text is available. Request only the needed piece, not an entire page or document. Do not ask users to transcribe other scripts.

Machine output remains unverified until confirmed. Accept user-supplied or user-confirmed readings as established readings and preserve their explicit uncertainty; confirmation of a reading does not establish the historical truth of the document's assertion.
