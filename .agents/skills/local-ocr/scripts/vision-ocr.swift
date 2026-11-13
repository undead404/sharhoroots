import AppKit
import Foundation
import ImageIO
import PDFKit
import Vision
import CoreGraphics
import Darwin

struct Options {
  var languages = ["uk-UA", "ru-RU", "pl-PL"]
  var dpi = 300
  var files: [URL] = []
  var listLanguages = false
}

enum OCRFailure: Error, CustomStringConvertible {
  case usage(String)
  case unreadable(String)
  case invalidPDF(String)
  case render(String)
  case unsupportedLanguage(String)

  var description: String {
    switch self {
    case .usage(let message), .unreadable(let message), .invalidPDF(let message),
         .render(let message), .unsupportedLanguage(let message):
      return message
    }
  }
}

func diagnostic(_ message: String) {
  fputs("\(message)\n", stderr)
}

func reportError(_ error: Error, label: String, depth: Int = 0) {
  let indent = String(repeating: "  ", count: depth)
  let nsError = error as NSError
  diagnostic("\(indent)\(label): \(String(reflecting: error))")
  diagnostic("\(indent)type=\(String(reflecting: type(of: error))) domain=\(nsError.domain) code=\(nsError.code)")
  diagnostic("\(indent)description=\(nsError.localizedDescription)")
  for key in nsError.userInfo.keys.sorted() where key != NSUnderlyingErrorKey {
    diagnostic("\(indent)userInfo[\(key)]=\(String(reflecting: nsError.userInfo[key]!))")
  }
  if depth < 4, let underlying = nsError.userInfo[NSUnderlyingErrorKey] as? Error {
    reportError(underlying, label: "Underlying error", depth: depth + 1)
  }
}

func parseOptions() throws -> Options {
  var options = Options()
  var args = Array(CommandLine.arguments.dropFirst())

  while !args.isEmpty {
    let arg = args.removeFirst()
    switch arg {
    case "--help", "-h":
      print("""
      Usage: swift vision-ocr.swift [--languages uk-UA,ru-RU,pl-PL] [--dpi 300] FILE...
             swift vision-ocr.swift --list-languages

      OCR PDFs page-by-page and ImageIO-supported images using macOS Vision.
      All processing is local. PDF render DPI applies only to PDF inputs.
      """)
      Darwin.exit(0)
    case "--list-languages":
      options.listLanguages = true
    case "--languages":
      guard !args.isEmpty else { throw OCRFailure.usage("--languages needs a comma-separated language list") }
      options.languages = args.removeFirst().split(separator: ",").map(String.init)
    case "--dpi":
      guard !args.isEmpty, let dpi = Int(args.removeFirst()), (72...600).contains(dpi) else {
        throw OCRFailure.usage("--dpi must be an integer from 72 through 600")
      }
      options.dpi = dpi
    case "--":
      options.files += args.map { URL(fileURLWithPath: $0) }
      args.removeAll()
    default:
      if arg.hasPrefix("-") {
        throw OCRFailure.usage("Unknown option: \(arg)")
      }
      options.files.append(URL(fileURLWithPath: arg))
    }
  }

  return options
}

func supportedLanguages() throws -> [String] {
  try VNRecognizeTextRequest().supportedRecognitionLanguages()
}

func makeRequest(
  languages: [String], supported: [String], completion: VNRequestCompletionHandler? = nil
) throws -> VNRecognizeTextRequest {
  let selected = languages.filter { supported.contains($0) }
  guard !selected.isEmpty else {
    throw OCRFailure.unsupportedLanguage(
      "None of the requested languages are supported by this macOS installation: \(languages.joined(separator: ", "))"
    )
  }
  let missing = languages.filter { !supported.contains($0) }
  if !missing.isEmpty {
    fputs("Warning: unsupported language(s) skipped: \(missing.joined(separator: ", "))\n", stderr)
  }

  let request = VNRecognizeTextRequest(completionHandler: completion)
  request.recognitionLevel = .accurate
  request.recognitionLanguages = selected
  request.usesLanguageCorrection = false
  return request
}

func recognize(
  _ image: CGImage,
  orientation: CGImagePropertyOrientation = .up,
  languages: [String],
  supported: [String]
) throws -> String {
  var completionError: Error?
  let request = try makeRequest(languages: languages, supported: supported) { _, error in
    completionError = error
  }
  let handler = VNImageRequestHandler(cgImage: image, orientation: orientation, options: [:])
  do {
    try handler.perform([request])
  } catch {
    diagnostic("Stage: Vision recognition")
    diagnostic("Image: \(image.width)x\(image.height) pixels, bitsPerComponent=\(image.bitsPerComponent), bitsPerPixel=\(image.bitsPerPixel), bytesPerRow=\(image.bytesPerRow), alphaInfo=\(image.alphaInfo.rawValue), colorSpace=\(String(describing: image.colorSpace)), orientation=\(orientation.rawValue)")
    diagnostic("Request: revision=\(request.revision), level=accurate, languages=\(request.recognitionLanguages.joined(separator: ",")), languageCorrection=\(request.usesLanguageCorrection)")
    if let completionError {
      reportError(completionError, label: "Vision completion error")
    } else {
      diagnostic("Vision completion error: none supplied")
    }
    throw error
  }
  if let completionError {
    diagnostic("Stage: Vision completion")
    throw completionError
  }

  let observations = (request.results ?? []).sorted { lhs, rhs in
    let left = lhs.boundingBox
    let right = rhs.boundingBox
    if abs(left.midY - right.midY) > 0.012 {
      return left.midY > right.midY
    }
    return left.minX < right.minX
  }

  return observations.compactMap { $0.topCandidates(1).first?.string }.joined(separator: "\n")
}

func render(_ page: PDFPage, dpi: Int) throws -> CGImage {
  let bounds = page.bounds(for: .mediaBox).standardized
  guard bounds.width > 0, bounds.height > 0 else {
    throw OCRFailure.render("PDF page has empty dimensions")
  }

  let scale = CGFloat(dpi) / 72.0
  let width = Int((bounds.width * scale).rounded(.up))
  let height = Int((bounds.height * scale).rounded(.up))
  guard width > 0, height > 0, width <= 16000, height <= 16000 else {
    throw OCRFailure.render("Rendered page dimensions exceed the 16000-pixel safety limit")
  }

  let thumbnail = page.thumbnail(of: CGSize(width: width, height: height), for: .mediaBox)
  var proposedRect = CGRect(origin: .zero, size: thumbnail.size)
  guard let image = thumbnail.cgImage(forProposedRect: &proposedRect, context: nil, hints: nil) else {
    throw OCRFailure.render("Could not create a rendered PDF page image")
  }
  return image
}

func processPDF(_ url: URL, dpi: Int, languages: [String], supported: [String]) throws {
  guard let document = PDFDocument(url: url), document.pageCount > 0 else {
    throw OCRFailure.invalidPDF("Could not open PDF or it contains no pages: \(url.path)")
  }

  for index in 0..<document.pageCount {
    var stage = "PDF page loading"
    let text: String
    do {
      guard let page = document.page(at: index) else {
        throw OCRFailure.unreadable("Could not load PDF page \(index + 1)")
      }
      stage = "PDF rendering"
      let image = try render(page, dpi: dpi)
      stage = "Vision recognition"
      text = try recognize(image, languages: languages, supported: supported)
    } catch {
      diagnostic("Context: file=\(url.path), PDF page=\(index + 1)/\(document.pageCount), dpi=\(dpi), stage=\(stage)")
      throw error
    }
    print("=== \(url.lastPathComponent) | PDF page \(index + 1) of \(document.pageCount) ===")
    print(text)
  }
}

func processImage(_ url: URL, languages: [String], supported: [String]) throws {
  guard let source = CGImageSourceCreateWithURL(url as CFURL, nil) else {
    throw OCRFailure.unreadable("Could not read image: \(url.path)")
  }
  let frameCount = CGImageSourceGetCount(source)
  guard frameCount > 0 else { throw OCRFailure.unreadable("Image contains no frames: \(url.path)") }

  for index in 0..<frameCount {
    guard let image = CGImageSourceCreateImageAtIndex(source, index, nil) else {
      throw OCRFailure.unreadable("Could not decode image frame \(index + 1): \(url.path)")
    }
    let properties = CGImageSourceCopyPropertiesAtIndex(source, index, nil) as? [CFString: Any]
    let orientationValue = properties?[kCGImagePropertyOrientation] as? NSNumber
    let orientation = orientationValue.flatMap { CGImagePropertyOrientation(rawValue: $0.uint32Value) } ?? .up
    let text: String
    do {
      text = try recognize(image, orientation: orientation, languages: languages, supported: supported)
    } catch {
      diagnostic("Context: file=\(url.path), image frame=\(index + 1)/\(frameCount)")
      throw error
    }
    let label = frameCount == 1 ? "image" : "image frame \(index + 1) of \(frameCount)"
    print("=== \(url.lastPathComponent) | \(label) ===")
    print(text)
  }
}

func run() throws {
  let options = try parseOptions()
  let supported = try supportedLanguages()

  if options.listLanguages {
    print(supported.joined(separator: "\n"))
    return
  }
  guard !options.files.isEmpty else {
    throw OCRFailure.usage("Provide one or more image/PDF paths, or use --list-languages")
  }

  var failures = 0
  for url in options.files {
    do {
      guard FileManager.default.isReadableFile(atPath: url.path) else {
        throw OCRFailure.unreadable("File is missing or unreadable: \(url.path)")
      }
      if url.pathExtension.lowercased() == "pdf" {
        try processPDF(url, dpi: options.dpi, languages: options.languages, supported: supported)
      } else {
        try processImage(url, languages: options.languages, supported: supported)
      }
    } catch {
      failures += 1
      diagnostic("OCR failed: \(url.path)")
      reportError(error, label: "OCR error")
    }
  }

  if failures > 0 {
    throw OCRFailure.unreadable("\(failures) input file(s) could not be processed")
  }
}

do {
  try run()
} catch {
  reportError(error, label: "OCR terminated")
  Darwin.exit(1)
}
