import z from "zod";

const nonEmptyString = z.string().min(1);

export const frontmatterSchema = z.object({
  aliases: z.optional(z.array(nonEmptyString)),
  containedInPlace: z.optional(nonEmptyString),
  coordinates: z.optional(z.tuple([z.number(), z.number()])),
  description: z.optional(nonEmptyString),
  dissolutionDate: z.optional(z.number().min(0)),
  foundingDate: z.optional(z.number().min(0)),
  tags: z.optional(z.nullable(z.array(nonEmptyString))),
  title: nonEmptyString,
  type: z.optional(z.union([
    z.literal("AdministrativeArea"),
    z.literal("GovernmentOrganization"),
    z.literal('Organization'),
    z.literal("Place"),
    z.literal('PlaceOfWorship')
  ])),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;
