import type { GeoCoordinates, Place } from "schema-dts";
import z from "zod";
import type { QuartzComponent, QuartzComponentProps } from "./types";
import { frontmatterSchema } from "../schemata";
import { canonicalUrl } from "../util/canonical";

export const StructuredData: QuartzComponent = ({
  fileData,
  cfg,
}: QuartzComponentProps) => {
  if (!cfg.baseUrl || !fileData.slug || fileData.slug === "404") {
    return null;
  }
  const pageUrl = canonicalUrl(cfg.baseUrl, fileData.slug);
  const siteUrl = canonicalUrl(cfg.baseUrl, "index" as typeof fileData.slug);
  const publisher = cfg.publisher && {
    "@type": "Person",
    "@id": `${cfg.publisher.url}#person`,
    name: cfg.publisher.name,
    url: cfg.publisher.url,
  };
  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    name: cfg.pageTitle,
    url: siteUrl,
    inLanguage: cfg.locale,
    ...(publisher && { publisher: { "@id": publisher["@id"] } }),
  };
  const page: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: fileData.frontmatter?.title ?? cfg.pageTitle,
    ...(fileData.frontmatter?.description && {
      description: fileData.frontmatter.description,
    }),
    inLanguage: cfg.locale,
    isPartOf: { "@id": website["@id"] },
    ...(publisher && { publisher: { "@id": publisher["@id"] } }),
  };
  const graph: Record<string, unknown>[] = [website, page];
  if (publisher) graph.push(publisher);

  if (fileData.frontmatter?.type) {
    const fm = z.parse(frontmatterSchema, fileData.frontmatter);

    const title = fm.title;
    const description = fm.description;
    const explicitType = fm.type;

    const alternateName = fm.aliases?.find((alias) => alias !== title);

    // 2. Build Schema base structure
    const schema: Record<string, unknown> = {
      "@type": explicitType,
      name: title,
      ...(description && { description: description }),
      ...(alternateName && { alternateName }),
      ...(fm.foundingDate !== undefined && {
        foundingDate: String(fm.foundingDate),
      }),
    };

    // An unknown date is omitted rather than represented by a non-date label.
    if (fm.dissolutionDate !== undefined) {
      schema["dissolutionDate"] = String(fm.dissolutionDate);
    }

    // 4. Spatial / Location details
    if (fm.coordinates) {
      schema["geo"] = {
        "@type": "GeoCoordinates",
        latitude: fm.coordinates[0],
        longitude: fm.coordinates[1],
      } satisfies GeoCoordinates;
    }

    if (fm.containedInPlace) {
      schema["containedInPlace"] = {
        "@type": "Place",
        name: fm.containedInPlace,
      } satisfies Place;
    }

    if (explicitType === "WebPage" || explicitType === "CollectionPage") {
      Object.assign(page, schema);
    } else if (
      explicitType === "Person" &&
      publisher &&
      pageUrl === publisher.url
    ) {
      // The profile describes the publisher; its page title is not their name.
      Object.assign(publisher, schema, { name: cfg.publisher!.name });
      page.mainEntity = { "@id": publisher["@id"] };
    } else {
      schema["@id"] = `${pageUrl}#subject`;
      schema.mainEntityOfPage = { "@id": page["@id"] };
      page.mainEntity = { "@id": schema["@id"] };
      graph.push(schema);
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
};
