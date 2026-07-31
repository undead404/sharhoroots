import type { GeoCoordinates, Place } from "schema-dts";
import z from "zod";
import type { QuartzComponent, QuartzComponentProps } from "./types";
import { frontmatterSchema } from "../schemata";

export const StructuredData: QuartzComponent = ({
  fileData,
}: QuartzComponentProps) => {
  if (!fileData.frontmatter?.type) {
    return null;
  }
  console.log(fileData.frontmatter);
  const fm = z.parse(frontmatterSchema, fileData.frontmatter);

  const title = fm.title;
  const description = fm.description;
  const explicitType = fm.type;
  const tags: string[] = Array.isArray(fm.tags) ? fm.tags : [];
  const isDefunct = tags.includes("defunct");

  // 1. Resolve @type priority: explicit frontmatter `type` -> folder inferred type
  let schemaType = explicitType;

  if (!schemaType) {
    return null;
  }

  const alternateName = fm.aliases?.find((alias) => alias !== title);

  // 2. Build Schema base structure
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: title,
    ...(description && { description: description }),
    ...(alternateName && { alternateName }),
    ...(fm.foundingDate && { foundingDate: fm.foundingDate }),
  };

  // 3. Handle historical/defunct metadata
  if (isDefunct) {
    schema["dissolutionDate"] = fm.dissolutionDate ?? "Historical/Defunct";
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
