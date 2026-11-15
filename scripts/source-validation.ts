import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { globby } from "globby";
import yaml from "js-yaml";
import { z } from "zod";

const text = z.string().trim().min(1);
const artifactSchema = z
  .object({
    path: text,
    kind: z.enum([
      "copy",
      "transcription",
      "ocr",
      "htr",
      "extracted_text",
      "index",
    ]),
    locator: text,
    provenance: text,
    engine: text.optional(),
    status: z
      .enum(["unverified", "user_provided", "user_confirmed", "source_text"])
      .optional(),
  })
  .strict()
  .superRefine((artifact, ctx) => {
    if (artifact.kind !== "copy" && !artifact.status)
      ctx.addIssue({
        code: "custom",
        message: "text/index artifacts require status",
        path: ["status"],
      });
    if (artifact.kind === "ocr" || artifact.kind === "htr") {
      if (!artifact.engine)
        ctx.addIssue({
          code: "custom",
          message: "OCR/HTR requires engine (or unknown)",
          path: ["engine"],
        });
      if (artifact.status !== "unverified")
        ctx.addIssue({
          code: "custom",
          message:
            "raw OCR/HTR must remain unverified; save human readings separately",
          path: ["status"],
        });
    }
  });

const sourceSchema = z
  .object({
    schema_version: z.literal(1),
    id: text,
    title: text,
    type: z.enum(["primary", "secondary", "catalog", "reference"]),
    creator: text.optional(),
    date: text.optional(),
    language: text.optional(),
    url: z.url().optional(),
    shelfmark: text.optional(),
    local_copy: text.optional(),
    access: z.enum(["open", "restricted", "unavailable", "unknown"]).optional(),
    last_checked: z.iso.date().optional(),
    parent: text.optional(),
    artifacts: z.array(artifactSchema).optional(),
    inspected: z
      .array(
        z
          .object({
            locator: text,
            basis: z.enum([
              "source_text",
              "user_reading",
              "catalog",
              "machine_only",
            ]),
            note: text,
          })
          .strict(),
      )
      .optional(),
  })
  .strict();

type Diagnostic = {
  file: string;
  level: "error" | "warning" | "info";
  message: string;
};
type SourceRecord = { file: string; versioned: boolean; id?: string };

export function isSourceRecord(file: string): boolean {
  return (
    file.startsWith("sources/") &&
    file.endsWith(".md") &&
    !file.startsWith("sources/texts/") &&
    !["sources/README.md", "sources/TEMPLATE.md"].includes(file)
  );
}

export async function checkSources(
  root: string,
  options: { strict?: boolean; files?: string[] } = {},
) {
  root = path.resolve(root);
  const selected = options.files?.map((file) =>
    path.relative(root, path.resolve(root, file)).split(path.sep).join("/"),
  );
  const files = (
    await globby("sources/**/*", { cwd: root, onlyFiles: true })
  ).sort();
  const recordFiles = files.filter(isSourceRecord);
  const diagnostics: Diagnostic[] = [];
  const records: SourceRecord[] = [];
  const contents = new Map<string, string>();
  const ids = new Map<string, SourceRecord[]>();
  const parents: {
    record: SourceRecord;
    parent: string;
    level: "error" | "warning";
  }[] = [];
  const ownership = new Map<string, string[]>();
  const add = (file: string, level: Diagnostic["level"], message: string) =>
    diagnostics.push({ file, level, message });
  for (const file of selected ?? []) {
    if (isSourceRecord(file) && !recordFiles.includes(file))
      add(file, "error", "selected source record does not exist");
    else if (!isSourceRecord(file) && !files.includes(file))
      add(file, "error", "selected path does not exist under sources/");
  }
  for (const file of recordFiles) {
    const content = await readFile(path.join(root, file), "utf8");
    contents.set(file, content);
    let data: Record<string, unknown> = {};
    let parseError: string | undefined;
    const match = content.match(
      /^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/,
    );
    try {
      if (!match) throw new Error("missing or unclosed YAML frontmatter");
      const parsed: unknown = yaml.load(match[1], { schema: yaml.JSON_SCHEMA });
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
        throw new Error("frontmatter must be a mapping");
      data = parsed as Record<string, unknown>;
    } catch (error) {
      parseError = error instanceof Error ? error.message : String(error);
    }
    const versioned =
      Object.hasOwn(data, "schema_version") ||
      /^schema_version\s*:/m.test(match?.[1] ?? "");
    const strict =
      versioned ||
      (options.strict && (!selected?.length || selected.includes(file)));
    const level = strict ? "error" : "warning";
    const record = {
      file,
      versioned,
      id: typeof data.id === "string" ? data.id.trim() : undefined,
    };
    records.push(record);
    if (record.id) ids.set(record.id, [...(ids.get(record.id) ?? []), record]);
    if (!versioned)
      add(file, level, "legacy record: migrate to schema_version: 1");
    if (parseError) {
      add(file, level, parseError);
      continue;
    }
    const result = sourceSchema.safeParse(data);
    if (!result.success) {
      for (const issue of result.error.issues)
        add(
          file,
          level,
          `${issue.path.join(".") || "frontmatter"}: ${issue.message}`,
        );
    }
    if (typeof data.parent === "string")
      parents.push({ record, parent: data.parent, level });
    // Inspect paths even if another metadata field is invalid, so the inventory stays useful.
    const artifactEntries: unknown[] = Array.isArray(data.artifacts)
      ? [...data.artifacts]
      : [];
    if (typeof data.local_copy === "string" && data.local_copy.trim())
      artifactEntries.push({ path: data.local_copy, kind: "copy" });
    for (const raw of artifactEntries) {
      if (
        !raw ||
        typeof raw !== "object" ||
        !("path" in raw) ||
        typeof raw.path !== "string"
      )
        continue;
      const artifact = raw as { path: string; kind?: string };
      const absolute = path.resolve(root, artifact.path);
      const relative = path.relative(root, absolute).split(path.sep).join("/");
      const tracked = relative.startsWith("sources/");
      const local =
        relative.startsWith("books/") ||
        (path.isAbsolute(artifact.path) &&
          (relative.startsWith("../") || relative === ".."));
      const canonical =
        !artifact.path.includes("\\") &&
        (path.isAbsolute(artifact.path) || relative === artifact.path);
      if (
        !canonical ||
        (!tracked && !local) ||
        (artifact.kind === "copy" && tracked)
      ) {
        add(file, level, `invalid artifact storage path: ${artifact.path}`);
        continue;
      }
      if (tracked) {
        if (
          isSourceRecord(relative) ||
          ["sources/README.md", "sources/TEMPLATE.md"].includes(relative)
        ) {
          add(
            file,
            level,
            `artifact points to a source record/documentation: ${artifact.path}`,
          );
          continue;
        }
        ownership.set(relative, [...(ownership.get(relative) ?? []), file]);
      }
      try {
        const entry = await stat(absolute);
        if (artifact.kind !== "copy" && !entry.isFile())
          add(
            file,
            level,
            `text/index artifact must be a file: ${artifact.path}`,
          );
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === "ENOENT")
          add(
            file,
            tracked ? level : "info",
            `${tracked ? "missing retained artifact" : "local copy unavailable on this checkout"}: ${artifact.path}`,
          );
        else
          add(
            file,
            level,
            `cannot inspect artifact path ${artifact.path}: ${String(error)}`,
          );
      }
    }
  }
  for (const [id, group] of ids) {
    if (group.length < 2) continue;
    const level = group.some(
      (record) =>
        record.versioned ||
        (options.strict &&
          (!selected?.length || selected.includes(record.file))),
    )
      ? "error"
      : "warning";
    for (const record of group)
      add(
        record.file,
        level,
        `duplicate id ${id}: ${group.map((item) => item.file).join(", ")}`,
      );
  }
  for (const { record, parent, level } of parents) {
    if (!ids.has(parent) || parent === record.id)
      add(
        record.file,
        level,
        `parent must identify another existing record: ${parent}`,
      );
  }
  const artifacts = files
    .filter(
      (file) =>
        !isSourceRecord(file) &&
        !["sources/README.md", "sources/TEMPLATE.md"].includes(file),
    )
    .map((file) => {
      const owners = ownership.get(file) ?? [];
      const mentionedBy = [...contents]
        .filter(([, content]) => content.includes(file))
        .map(([record]) => record);
      if (owners.length === 0)
        add(
          file,
          options.strict && (!selected?.length || selected.includes(file))
            ? "error"
            : "warning",
          "retained file has no structured owner/provenance",
        );
      if (owners.length > 1)
        add(
          file,
          "error",
          `retained file has multiple owners: ${owners.join(", ")}`,
        );
      return { file, owners, mentionedBy };
    });
  return {
    summary: {
      records: records.length,
      versioned: records.filter((record) => record.versioned).length,
      legacy: records.filter((record) => !record.versioned).length,
      artifacts: artifacts.length,
      errors: diagnostics.filter((item) => item.level === "error").length,
      warnings: diagnostics.filter((item) => item.level === "warning").length,
      info: diagnostics.filter((item) => item.level === "info").length,
    },
    records,
    artifacts,
    diagnostics,
  };
}
