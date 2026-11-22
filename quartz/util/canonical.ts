import { FullSlug, joinSegments, simplifySlug } from "./path";

/** Match the ContentIndex sitemap: simplify index routes, preserve other slugs. */
export function canonicalUrl(baseUrl: string, slug: FullSlug): string {
  return new URL(
    joinSegments(`https://${baseUrl}`, encodeURI(simplifySlug(slug))),
  ).href;
}
