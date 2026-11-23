---
name: local-ocr
description: "Extract local OCR from scanned PDFs/images or make printed scans searchable."
---

# Local OCR workflow

Keep source material on this machine for local OCR/HTR. Do not upload documents to a remote OCR service. Load [llm-vision](../llm-vision/SKILL.md) for vision routing and the user-transcription handoff when OCR/HTR reaches its limit.

## Swift cache location

Run the commands below from the repository root. Always pass `-module-cache-path "$PWD/.agent-work/swift-module-cache"` before the Swift script path to keep compiled framework modules in the writable, Git-ignored workspace instead of Swift's default cache outside it. Swift creates the cache directory as needed. This addresses compiler-cache access; installing tools and other restricted operations may still require approval.

## Choose the right path

1. For a born-digital PDF, try `pdftotext -layout input.pdf -` first. Prefer its existing text layer over rasterizing and OCRing it.
2. For a scanned PDF or image that needs transcription, use the local Apple Vision utility:

   ```sh
   swift -module-cache-path "$PWD/.agent-work/swift-module-cache" .agents/skills/local-ocr/scripts/vision-ocr.swift input.pdf
   swift -module-cache-path "$PWD/.agent-work/swift-module-cache" .agents/skills/local-ocr/scripts/vision-ocr.swift scan.png
   ```

   It processes PDFs page-by-page and common ImageIO image formats locally, defaults to `uk-UA`, `ru-RU`, and `pl-PL`, and prints page-labelled text. It disables language correction to avoid silently normalizing names or historical spelling. Use `--languages uk-UA,pl-PL` to narrow the languages or `--dpi 400` for a higher-resolution PDF render when small print is missed.
3. For cursive or other handwriting, use Nysh HTR under [read-case](../read-case/SKILL.md). Follow that workflow's scope and resource safeguards.
4. If the deliverable is a searchable PDF rather than plain text, use OCRmyPDF/Tesseract:

   ```sh
   ocrmypdf -l ukr+rus+pol --deskew input.pdf output-searchable.pdf
   ```

   Keep the original; write to a different output path. Check `tesseract --list-langs` before use.
   For a direct Tesseract image fallback, use `tesseract scan.png stdout -l ukr+rus+pol`.

## Accuracy and evidence

- OCR/HTR output is a reading aid, not user-confirmed source text; label machine readings and preserve uncertainty rather than silently repairing names, dates, numbers, or claims. Follow `llm-vision` for user-supplied or user-confirmed readings.
- Preserve PDF page numbers. The Vision utility labels pages starting at 1; a printed page number may differ.
- The utility emits recognized lines in approximate top-to-bottom order. It is not a table/layout reconstruction tool; use local tools to recover structure where possible. Follow `llm-vision` when columns, tables, marginalia, or ambiguous reading order remain unresolved.
- General OCR is not specialist handwriting recognition. For cursive archival records, use local HTR suited to that script and period when available; do not present generic OCR or a fluent model guess as a faithful transcription.
- Reuse existing OCR/HTR for the exact passage or make a bounded attempt with a suitable engine before requesting a user reading. Follow the specific handoff in `llm-vision`; report the exact executable or local path that could not run if tooling is unavailable.
- Do not run OCR over an entire archive when a few representative pages can establish whether the engine/language works.

## Local helper tools

- The core Vision OCR workflow does not require these helpers. Use the agent's built-in file tools for searches when possible; if using a shell search, use `rg` when available and fall back to `grep` rather than assuming `rg` exists.
- For optional image preparation or contact sheets, use ImageMagick's `magick` command (for example, `magick montage ...`). Do not assume standalone `montage` or legacy `convert` executables exist. For basic macOS image inspection, conversion, or resizing, `sips` is also available. The Vision utility reads supported image formats directly, so image conversion is usually unnecessary.
- Do not assume Python's `PIL`/Pillow module is installed, and do not install it into the system Python for this workflow. Prefer the Swift utility's ImageIO support or macOS `sips`; the OCR skill has no Pillow dependency.
- If an optional helper is missing, check it with `command -v` and use the fallback above. If the helper is needed, install the declared Homebrew dependencies using the Reprovisioning command; do not repeatedly retry an unavailable command.

## Local setup checks

```sh
swift --version
swift -module-cache-path "$PWD/.agent-work/swift-module-cache" .agents/skills/local-ocr/scripts/vision-ocr.swift --list-languages
tesseract --list-langs
ocrmypdf --version
```

## Reprovisioning

On macOS, install Xcode Command Line Tools (for `swift`) and Homebrew, then install the recorded OCR and optional helper CLI dependencies:

```sh
brew bundle install --no-upgrade --file .agents/skills/local-ocr/Brewfile
```

The Brewfile records direct formulae; Homebrew resolves their transitive dependencies. `--no-upgrade` avoids upgrading unrelated already-installed formulae. The recorded OCR versions are a tested baseline, not a lock: Homebrew installs its current formula versions. Apple Vision, PDFKit, and ImageIO are macOS system frameworks, not Python packages or Brew formulae; the skill utility needs no project Python environment.

Apple Vision is provided by macOS and runs locally. OCRmyPDF/Tesseract are optional complementary tools, not prerequisites for the Vision utility. If a tool is missing, report the exact missing executable and the affected workflow; do not confuse a missing optional tool with Vision being unavailable. Shell commands may require approval under the active agent’s project permissions.
