import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test, { type TestContext } from "node:test";
import { checkSources } from "./source-validation";

const header =
  'schema_version: 1\nid: SRC-example\ntitle: "Приклад"\ntype: primary\n';
const record = (extra = "", fields = header) =>
  `---\n${fields}${extra}---\n\n# Приклад\n`;
async function fixture(t: TestContext, files: Record<string, string>) {
  const root = await mkdtemp(path.join(os.tmpdir(), "source-validation-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const [file, content] of Object.entries(files)) {
    await mkdir(path.dirname(path.join(root, file)), { recursive: true });
    await writeFile(path.join(root, file), content);
  }
  return root;
}

test("legacy debt is inventoried; explicit strict checks reject it", async (t) => {
  const root = await fixture(t, {
    "sources/old.md": "# Старий запис\n",
    "sources/README.md": "# Readme",
    "sources/TEMPLATE.md": "template",
  });
  const report = await checkSources(root);
  assert.equal(report.summary.records, 1);
  assert.equal(report.summary.errors, 0);
  assert.equal(report.summary.legacy, 1);
  assert.ok(
    (await checkSources(root, { strict: true, files: ["sources/old.md"] }))
      .summary.errors > 0,
  );
  assert.ok(
    (await checkSources(root, { strict: true, files: ["sources/missing.md"] }))
      .summary.errors > 0,
  );
});

test("invalid YAML, missing identity and unknown fields fail migrated records", async (t) => {
  const root = await fixture(t, {
    "sources/broken.md": "---\nschema_version: 1\ntitle: bad: yaml\n---\n",
    "sources/new.md": record(
      "verified: true\n",
      'schema_version: 1\ntitle: " "\ntype: imaginary\n',
    ),
  });
  const report = await checkSources(root);
  assert.ok(
    report.diagnostics.some((item) => item.message.includes("mapping")),
  );
  assert.ok(report.diagnostics.some((item) => item.message.startsWith("id:")));
  assert.ok(
    report.diagnostics.some((item) => item.message.includes("verified")),
  );
});

test("duplicate IDs are detected across selected and legacy records", async (t) => {
  const root = await fixture(t, {
    "sources/a.md": record(),
    "sources/b.md": record("", header.replace("schema_version: 1\n", "")),
  });
  const report = await checkSources(root, {
    strict: true,
    files: ["sources/a.md"],
  });
  assert.equal(
    report.diagnostics.filter(
      (item) => item.level === "error" && item.message.includes("duplicate id"),
    ).length,
    2,
  );
});

test("human readings stay owned and unchanged; missing local copies are informational", async (t) => {
  const raw = "Ім'я?\nНерозібране [...]\n";
  const root = await fixture(t, {
    "sources/example.md": record(
      `artifacts:\n  - path: sources/texts/example/reading.txt\n    kind: transcription\n    locator: "Арк. 45зв.; кадр 69"\n    provenance: "Надано користувачем без виправлень"\n    status: user_provided\n  - path: books/missing.pdf\n    kind: copy\n    locator: "Повна справа"\n    provenance: "Зареєстровано раніше"\ninspected:\n  - locator: "Арк. 45зв.; кадр 69"\n    basis: user_reading\n    note: "Знаки питання збережено"\n`,
    ),
    "sources/texts/example/reading.txt": raw,
  });
  const report = await checkSources(root);
  assert.equal(report.summary.errors, 0);
  assert.equal(report.summary.warnings, 0);
  assert.equal(report.summary.info, 1);
  assert.deepEqual(report.artifacts[0].owners, ["sources/example.md"]);
  const { readFile } = await import("node:fs/promises");
  assert.equal(
    await readFile(
      path.join(root, "sources/texts/example/reading.txt"),
      "utf8",
    ),
    raw,
  );
});

test("raw machine output requires engine and cannot be promoted to human confirmation", async (t) => {
  const root = await fixture(t, {
    "sources/example.md": record(
      `artifacts:\n  - path: sources/ocr.txt\n    kind: ocr\n    locator: "PDF 12"\n    provenance: "Машинне читання"\n    status: user_confirmed\n`,
    ),
    "sources/ocr.txt": "noise",
  });
  const report = await checkSources(root);
  assert.ok(
    report.diagnostics.some((item) => item.message.includes("requires engine")),
  );
  assert.ok(
    report.diagnostics.some((item) =>
      item.message.includes("must remain unverified"),
    ),
  );
});

test("broken tracked paths, disposable paths and unresolved parents are errors", async (t) => {
  const root = await fixture(t, {
    "sources/example.md": record(
      `parent: SRC-absent\nartifacts:\n  - path: sources/texts/missing.txt\n    kind: transcription\n    locator: "PDF 1"\n    provenance: "Надано"\n    status: user_provided\n  - path: .agent-work/temp.txt\n    kind: ocr\n    locator: "PDF 2"\n    provenance: "Машинне читання"\n    engine: unknown\n    status: unverified\n`,
    ),
  });
  const report = await checkSources(root);
  assert.ok(
    report.diagnostics.some((item) =>
      item.message.includes("missing retained artifact"),
    ),
  );
  assert.ok(
    report.diagnostics.some((item) =>
      item.message.includes("invalid artifact storage"),
    ),
  );
  assert.ok(
    report.diagnostics.some((item) =>
      item.message.includes("parent must identify"),
    ),
  );
});

test("inventory distinguishes legacy mentions from structured ownership", async (t) => {
  const root = await fixture(t, {
    "sources/old.md": "# Запис\nТекст: sources/reading.txt",
    "sources/reading.txt": "читання",
  });
  const report = await checkSources(root);
  assert.deepEqual(report.artifacts[0].owners, []);
  assert.deepEqual(report.artifacts[0].mentionedBy, ["sources/old.md"]);
  assert.ok(
    report.diagnostics.some((item) =>
      item.message.includes("no structured owner"),
    ),
  );
  assert.ok(
    (await checkSources(root, { strict: true, files: ["sources/reading.txt"] }))
      .summary.errors > 0,
  );
});

test("primary local_copy remains supported without an artifact entry", async (t) => {
  const root = await fixture(t, {
    "sources/example.md": record(
      'url: "https://example.org/book"\nlocal_copy: "books/example.pdf"\nlast_checked: "2026-11-06"\n',
    ),
  });
  const report = await checkSources(root);
  assert.equal(report.summary.errors, 0);
  assert.equal(report.summary.info, 1);
});

test("tracked text cannot silently acquire two owning records", async (t) => {
  const extra =
    'artifacts:\n  - path: sources/texts/reading.txt\n    kind: transcription\n    locator: "PDF 1"\n    provenance: "Надано користувачем"\n    status: user_provided\n';
  const root = await fixture(t, {
    "sources/a.md": record(extra),
    "sources/b.md": record(extra, header.replace("SRC-example", "SRC-second")),
    "sources/texts/reading.txt": "текст",
  });
  assert.ok(
    (await checkSources(root)).diagnostics.some(
      (item) =>
        item.level === "error" && item.message.includes("multiple owners"),
    ),
  );
});
