#!/usr/bin/env node
import {
  loadTasks,
  findTaskByQuery,
  formatKyivTime,
  validateNotBefore,
  type EvaluatedTask,
} from "./task-selection";

interface CliOptions {
  query?: string;
  tasksDir: string;
  pathOnly: boolean;
  json: boolean;
  list: boolean;
  summary: boolean;
}

function parseCliArgs(argv: string[]): CliOptions {
  const args = argv.slice(2).filter((a) => a !== "--");
  let tasksDir = "tasks";
  let pathOnly = false;
  let json = false;
  let list = false;
  let summary = false;
  const positional: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--path") {
      pathOnly = true;
    } else if (arg === "--json") {
      json = true;
    } else if (arg === "--list" || arg === "--all") {
      list = true;
    } else if (arg === "--summary") {
      summary = true;
    } else if (arg === "--dir" && i + 1 < args.length) {
      tasksDir = args[++i];
    } else if (!arg.startsWith("--")) {
      positional.push(arg);
    }
  }

  return {
    query: positional.length > 0 ? positional.join(" ") : undefined,
    tasksDir,
    pathOnly,
    json,
    list,
    summary,
  };
}

function formatTaskDetails(task: EvaluatedTask): string {
  const lines: string[] = [];
  lines.push(`Selected task:`);
  lines.push(`  Path: ${task.filePath}`);
  lines.push(`  Title: ${task.title}`);

  let statusLine = `  Status: ${task.status}`;
  if (task.notBefore) {
    const timeVal = validateNotBefore(task.notBefore);
    const kyivStr = timeVal.date ? ` (${formatKyivTime(timeVal.date)})` : "";
    if (task.isDue) {
      statusLine += ` [DUE retry since ${task.notBefore}${kyivStr}]`;
    } else if (task.isFutureDeferred) {
      statusLine += ` [DEFERRED until ${task.notBefore}${kyivStr}]`;
    }
  }
  lines.push(statusLine);
  lines.push(`  Created: ${task.created}`);

  if (task.targets.length > 0) {
    lines.push(`  Targets:`);
    for (const target of task.targets) {
      lines.push(`    - ${target}`);
    }
  }

  lines.push(``);
  lines.push(`Next action:`);
  lines.push(`  ${task.guidance}`);

  if (task.checkpoint) {
    const cp = task.checkpoint;
    lines.push(``);
    lines.push(`Current checkpoint:`);
    if (cp.established) lines.push(`  - Established: ${cp.established}`);
    if (cp.coverage) lines.push(`  - Coverage: ${cp.coverage}`);
    if (cp.open) lines.push(`  - Open/dependency: ${cp.open}`);
    if (cp.nextAction) lines.push(`  - Next action: ${cp.nextAction}`);
  }

  if (task.question) {
    lines.push(``);
    lines.push(`Question:`);
    lines.push(`  ${task.question}`);
  }

  return lines.join("\n");
}

async function main() {
  const options = parseCliArgs(process.argv);
  const now = new Date();
  const result = await loadTasks(options.tasksDir, now);

  if (options.summary) {
    if (options.json) {
      console.log(
        JSON.stringify(
          {
            statusCounts: result.statusCounts,
            futureDeferred: result.futureDeferred.map((t) => ({
              filePath: t.filePath,
              title: t.title,
              notBefore: t.notBefore,
            })),
            invalidTasks: result.invalidTasks,
          },
          null,
          2,
        ),
      );
      return;
    }

    console.log(`Task status summary (directory: ${options.tasksDir}):`);
    for (const [status, count] of Object.entries(result.statusCounts).sort()) {
      console.log(`  ${status.padEnd(12)}: ${count}`);
    }
    if (result.futureDeferred.length > 0) {
      console.log(`\nFuture-deferred tasks (${result.futureDeferred.length}):`);
      for (const t of result.futureDeferred) {
        console.log(`  - ${t.filePath}: deferred until ${t.notBefore}`);
      }
    }
    if (result.invalidTasks.length > 0) {
      console.log(`\nMetadata issues (${result.invalidTasks.length}):`);
      for (const inv of result.invalidTasks) {
        console.log(`  - ${inv.filePath}: ${inv.error}`);
      }
    }
    return;
  }

  if (options.list) {
    if (options.json) {
      console.log(
        JSON.stringify(
          {
            candidates: result.candidates,
            futureDeferred: result.futureDeferred,
            blocked: result.blocked,
          },
          null,
          2,
        ),
      );
      return;
    }

    console.log(`Top actionable candidates (${result.candidates.length}):`);
    for (let i = 0; i < Math.min(result.candidates.length, 15); i++) {
      const c = result.candidates[i];
      console.log(
        `  ${(i + 1).toString().padStart(2)}. [P${c.priority}] ${c.filePath} (${c.status}, ${c.created}) - ${c.title}`,
      );
    }
    if (result.futureDeferred.length > 0) {
      console.log(`\nFuture-deferred tasks (${result.futureDeferred.length}):`);
      for (const t of result.futureDeferred) {
        console.log(`  - ${t.filePath}: deferred until ${t.notBefore}`);
      }
    }
    return;
  }

  // Handle explicit query argument if supplied
  if (options.query) {
    // Collect all loaded tasks (including futureDeferred, blocked, done)
    const allLoaded = [
      ...result.candidates,
      ...result.futureDeferred,
      ...result.blocked,
      ...result.done,
    ];
    // Also include any tasks with metadata errors or done if needed
    const queryResult = findTaskByQuery(allLoaded, options.query);

    if (!queryResult.match && queryResult.ambiguous) {
      console.error(
        `Ambiguous match for query "${options.query}". Multiple tasks matched:`,
      );
      for (const m of queryResult.ambiguous) {
        console.error(`  - ${m.filePath} (${m.status}): ${m.title}`);
      }
      process.exitCode = 1;
      return;
    }

    if (!queryResult.match) {
      // Check if it's a done task or not loaded
      console.error(`No matching task found for "${options.query}".`);
      process.exitCode = 1;
      return;
    }

    const task = queryResult.match;

    // Check time gate for explicit task argument
    if (task.notBeforeError) {
      console.error(
        `Metadata error in ${task.filePath}: ${task.notBeforeError}`,
      );
      process.exitCode = 1;
      return;
    }

    if (task.isFutureDeferred && task.notBefore) {
      const timeVal = validateNotBefore(task.notBefore);
      const kyivStr = timeVal.date ? ` (${formatKyivTime(timeVal.date)})` : "";
      console.error(
        `Task ${task.filePath} is deferred until ${task.notBefore}${kyivStr}.\nEarliest retry time has not arrived. Merely naming the task does not waive the delay.`,
      );
      process.exitCode = 1;
      return;
    }

    if (task.status === "done") {
      console.error(
        `Task ${task.filePath} is marked 'done'. Completed tasks are never reopened automatically.`,
      );
      process.exitCode = 1;
      return;
    }

    if (options.pathOnly) {
      console.log(task.filePath);
      return;
    }

    if (options.json) {
      console.log(JSON.stringify(task, null, 2));
      return;
    }

    console.log(formatTaskDetails(task));
    return;
  }

  // Default mode: select best candidate
  if (!result.selected) {
    if (options.json) {
      console.log(
        JSON.stringify(
          {
            selected: null,
            message: "No actionable tasks found.",
            statusCounts: result.statusCounts,
            futureDeferred: result.futureDeferred,
          },
          null,
          2,
        ),
      );
    } else {
      console.log("No actionable tasks found.");
      if (result.futureDeferred.length > 0) {
        console.log(
          `\nFuture-deferred tasks awaiting retry (${result.futureDeferred.length}):`,
        );
        for (const t of result.futureDeferred) {
          console.log(`  - ${t.filePath}: deferred until ${t.notBefore}`);
        }
      }
    }
    return;
  }

  if (options.pathOnly) {
    console.log(result.selected.filePath);
    return;
  }

  if (options.json) {
    console.log(
      JSON.stringify(
        {
          selected: result.selected,
          summary: {
            totalActionable: result.candidates.length,
            statusCounts: result.statusCounts,
          },
        },
        null,
        2,
      ),
    );
    return;
  }

  console.log(formatTaskDetails(result.selected));
}

main().catch((err) => {
  console.error("Error in find-task:", err);
  process.exitCode = 1;
});
