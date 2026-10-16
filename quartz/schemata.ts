import z from "zod";
import { schemaOrgTypes } from "./schemaOrgTypes";

const nonEmptyString = z.string().min(1);

export const frontmatterSchema = z.object({
  aliases: z.optional(z.array(nonEmptyString)),
  containedInPlace: z.optional(nonEmptyString),
  coordinates: z.optional(z.tuple([z.number(), z.number()])),
  description: z.optional(nonEmptyString),
  dissolutionDate: z.optional(z.number().min(0)),
  foundingDate: z.optional(z.number().min(0)),
  tags: z.optional(z.nullable(z.array(nonEmptyString))),
  title: z.string().trim().min(1),
  type: z.enum(schemaOrgTypes),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;
