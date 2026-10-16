import matter from "gray-matter";
import yaml from "js-yaml";
import { schemaOrgTypes } from "../quartz/schemaOrgTypes";

const validSchemaOrgTypes = new Set<string>(schemaOrgTypes);

export function validateFrontmatter(
  filePath: string,
  contents: string,
): string | undefined {
  try {
    const { data } = matter(contents, {
      engines: {
        yaml: (source) =>
          yaml.load(source, { schema: yaml.JSON_SCHEMA }) as object,
      },
    });

    const errors: string[] = [];
    if (typeof data.title !== "string" || data.title.trim() === "") {
      errors.push("title must be a nonempty string");
    }
    if (typeof data.type !== "string" || !validSchemaOrgTypes.has(data.type)) {
      errors.push(
        `type must be a supported Schema.org type (${schemaOrgTypes.join(", ")})`,
      );
    }

    return errors.length > 0 ? `${filePath}: ${errors.join("; ")}` : undefined;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return `${filePath}: ${message}`;
  }
}
