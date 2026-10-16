import assert from "node:assert/strict";
import test from "node:test";
import { validateFrontmatter } from "./frontmatter-validation";

test("rejects an unquoted colon followed by a space in YAML frontmatter", () => {
  const result = validateFrontmatter(
    "broken.md",
    '---\ntitle: "Broken"\ntype: Place\ndescription: Заголовок: пояснення\n---\n',
  );

  assert.match(
    result ?? "",
    /^broken\.md: .*bad indentation of a mapping entry/,
  );
});

test("accepts a quoted colon in YAML frontmatter", () => {
  const result = validateFrontmatter(
    "valid.md",
    '---\ntitle: "Valid"\ntype: Place\ndescription: "Заголовок: пояснення"\n---\n',
  );

  assert.equal(result, undefined);
});

test("rejects missing and empty required fields", () => {
  const result = validateFrontmatter("missing.md", '---\ntitle: "  "\n---\n');

  assert.match(result ?? "", /title must be a nonempty string/);
  assert.match(result ?? "", /type must be a supported Schema.org type/);
});

test("rejects unknown Schema.org types", () => {
  const result = validateFrontmatter(
    "unknown-type.md",
    '---\ntitle: "Unknown type"\ntype: NotARealType\n---\n',
  );

  assert.match(result ?? "", /type must be a supported Schema.org type/);
});

test("rejects Markdown without required frontmatter", () => {
  const result = validateFrontmatter("plain.md", "# A note\n");

  assert.match(result ?? "", /title must be a nonempty string/);
  assert.match(result ?? "", /type must be a supported Schema.org type/);
});
