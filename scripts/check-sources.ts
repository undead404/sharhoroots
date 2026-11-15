import { checkSources } from "./source-validation";

const args = process.argv.slice(2).filter((arg) => arg !== "--");
const flags = new Set(["--strict", "--inventory", "--json"]);
const unknown = args.filter((arg) => arg.startsWith("--") && !flags.has(arg));
if (unknown.length) throw new Error(`Unknown options: ${unknown.join(", ")}`);
const report = await checkSources(process.cwd(), {
  strict: args.includes("--strict"),
  files: args.filter((arg) => !arg.startsWith("--")),
});
if (args.includes("--json")) console.log(JSON.stringify(report, null, 2));
else {
  for (const diagnostic of report.diagnostics) {
    if (diagnostic.level === "error" || args.includes("--inventory"))
      console.log(
        `${diagnostic.level}: ${diagnostic.file}: ${diagnostic.message}`,
      );
  }
  const s = report.summary;
  console.log(
    `Sources: ${s.records} records (${s.versioned} versioned, ${s.legacy} legacy), ${s.artifacts} retained artifacts; ${s.errors} errors, ${s.warnings} warnings, ${s.info} local notices.`,
  );
  if (s.warnings && !args.includes("--inventory"))
    console.log(
      "Use --inventory for migration diagnostics, or --inventory --json for the full report.",
    );
}
if (report.summary.errors) process.exitCode = 1;
