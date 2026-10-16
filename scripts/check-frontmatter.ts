import { readFile } from "node:fs/promises";
import { globby } from "globby";
import { validateFrontmatter } from "./frontmatter-validation";

const requestedFiles = process.argv
  .slice(2)
  .filter((file) => file.endsWith(".md"));
const files =
  requestedFiles.length > 0 ? requestedFiles : await globby("content/**/*.md");
const errors: string[] = [];

for (const file of files) {
  const contents = await readFile(file, "utf8");
  const error = validateFrontmatter(file, contents);
  if (error) errors.push(error);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated frontmatter in ${files.length} Markdown files.`);
}
