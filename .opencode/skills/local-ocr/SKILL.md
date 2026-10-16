---
name: local-ocr
description: Extract text locally from PDFs and images, especially Ukrainian, Russian, and Polish printed scans; use when asked to OCR, transcribe, or make a scanned PDF searchable.
---

# Local OCR workflow

Keep source material on this machine. Do not upload documents to a remote OCR service.

## Choose the right path

1. For a born-digital PDF, try `pdftotext -layout input.pdf -` first. Prefer its existing text layer over rasterizing and OCRing it.
2. For a scanned PDF or image that needs transcription, use the local Apple Vision utility:

   ```sh
   swift .opencode/skills/local-ocr/scripts/vision-ocr.swift input.pdf
   swift .opencode/skills/local-ocr/scripts/vision-ocr.swift scan.png
   ```

   It processes PDFs page-by-page and common ImageIO image formats locally, defaults to `uk-UA`, `ru-RU`, and `pl-PL`, and prints page-labelled text. It disables language correction to avoid silently normalizing names or historical spelling. Use `--languages uk-UA,pl-PL` to narrow the languages or `--dpi 400` for a higher-resolution PDF render when small print is missed.
3. For cursive or other handwriting, use the local specialist HTR workflow when it is available and appropriate (for example, the `read-case` skill and `nysh read`). Follow that workflow's scope and resource safeguards; do not substitute an LLM's vision for local HTR.
4. If the deliverable is a searchable PDF rather than plain text, use OCRmyPDF/Tesseract:

   ```sh
   ocrmypdf -l ukr+rus+pol --deskew input.pdf output-searchable.pdf
   ```

   Keep the original; write to a different output path. Check `tesseract --list-langs` before use.
   For a direct Tesseract image fallback, use `tesseract scan.png stdout -l ukr+rus+pol`.

## Accuracy and evidence

- Never send scan images, screenshots, or crops to an LLM or ask an LLM to inspect them. All OCR/HTR here must run locally. Text extracted locally may be analyzed as text, but OCR/HTR output is a reading aid, not user-confirmed source text; preserve uncertainty rather than silently repairing names, dates, numbers, or claims. If the user supplies or corrects a transcription, accept that reading as established and preserve only uncertainty the user marks; do not use conflicting OCR output to cast doubt on it.
- Preserve PDF page numbers. The Vision utility labels pages starting at 1; a printed page number may differ.
- The utility emits recognized lines in approximate top-to-bottom order. It is not a table/layout reconstruction tool; use local tools to recover structure where possible, and do not ask an LLM to inspect the page for columns, tables, marginalia, or ambiguous reading order.
- General OCR is not specialist handwriting recognition. For cursive archival records, use local HTR suited to that script and period when available; do not present generic OCR or a fluent model guess as a faithful transcription.
- If local OCR/HTR is unavailable, fails, or leaves task-relevant text unreadable, ask the user to read the specific field or passage. Name the case/path, exact image filename, PDF page (and printed page if known), and the data needed. Do not ask vaguely to "read the scan" or request more transcription than the task requires. If an OCR executable is missing, report which local path could not run and still make the request specific when the target scan and needed field are known.
- Do not run OCR over an entire archive when a few representative pages can establish whether the engine/language works.

## Local helper tools

- The core Vision OCR workflow does not require these helpers. Use OpenCode's built-in file tools for searches when possible; if using a shell search, use `rg` when available and fall back to `grep` rather than assuming `rg` exists.
- For optional image preparation or contact sheets, use ImageMagick's `magick` command (for example, `magick montage ...`). Do not assume standalone `montage` or legacy `convert` executables exist. For basic macOS image inspection, conversion, or resizing, `sips` is also available. The Vision utility reads supported image formats directly, so image conversion is usually unnecessary.
- Do not assume Python's `PIL`/Pillow module is installed, and do not install it into the system Python for this workflow. Prefer the Swift utility's ImageIO support or macOS `sips`; the OCR skill has no Pillow dependency.
- If an optional helper is missing, check it with `command -v` and use the fallback above. If the helper is needed, install the declared Homebrew dependencies using the Reprovisioning command; do not repeatedly retry an unavailable command.

## Local setup checks

```sh
swift --version
swift .opencode/skills/local-ocr/scripts/vision-ocr.swift --list-languages
tesseract --list-langs
ocrmypdf --version
```

## Reprovisioning

On macOS, install Xcode Command Line Tools (for `swift`) and Homebrew, then install the recorded OCR and optional helper CLI dependencies:

```sh
brew bundle install --no-upgrade --file .opencode/skills/local-ocr/Brewfile
```

The Brewfile records direct formulae; Homebrew resolves their transitive dependencies. `--no-upgrade` avoids upgrading unrelated already-installed formulae. The recorded OCR versions are a tested baseline, not a lock: Homebrew installs its current formula versions. Apple Vision, PDFKit, and ImageIO are macOS system frameworks, not Python packages or Brew formulae; the skill utility needs no project Python environment.

Apple Vision is provided by macOS and runs locally. OCRmyPDF/Tesseract are optional complementary tools, not prerequisites for the Vision utility. If a tool is missing, report the exact missing executable and the affected workflow; do not confuse a missing optional tool with Vision being unavailable. OpenCode shell commands may require approval under project permissions.
