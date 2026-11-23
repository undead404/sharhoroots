import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export const ISO_TIMESTAMP_WITH_TZ_REGEX =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})$/;

export interface TaskCheckpoint {
  established?: string;
  coverage?: string;
  open?: string;
  nextAction?: string;
}

export interface TaskRecord {
  filePath: string;
  filename: string;
  title: string;
  status: string;
  created: string; // YYYY-MM-DD
  targets: string[];
  articleValue?: "high" | "normal" | "low";
  retryReady?: boolean;
  notBefore?: string;
  notBeforeValid?: boolean;
  notBeforeError?: string;
  checkpoint?: TaskCheckpoint;
  question?: string;
}

export interface EvaluatedTask extends TaskRecord {
  priority: number; // 1 to 5, or Infinity
  isDue: boolean;
  isFutureDeferred: boolean;
  eligibilityMessage?: string;
  guidance: string;
}

export interface TaskSelectionResult {
  tasks: EvaluatedTask[];
  selected?: EvaluatedTask;
  candidates: EvaluatedTask[];
  futureDeferred: EvaluatedTask[];
  blocked: EvaluatedTask[];
  done: EvaluatedTask[];
  doneCount: number;
  invalidTasks: Array<{ filePath: string; error: string }>;
  statusCounts: Record<string, number>;
}

export function validateNotBefore(raw: unknown): {
  valid: boolean;
  date?: Date;
  iso?: string;
  error?: string;
} {
  if (raw === undefined || raw === null || raw === "") {
    return { valid: false, error: "Missing 'not_before' field" };
  }
  if (typeof raw !== "string") {
    return {
      valid: false,
      error: "'not_before' must be a quoted ISO 8601 string",
    };
  }
  const trimmed = raw.trim();
  if (!ISO_TIMESTAMP_WITH_TZ_REGEX.test(trimmed)) {
    return {
      valid: false,
      error: `'not_before' timestamp "${trimmed}" is malformed or lacks an explicit UTC offset or Z`,
    };
  }
  const parsed = Date.parse(trimmed);
  if (Number.isNaN(parsed)) {
    return {
      valid: false,
      error: `'not_before' timestamp "${trimmed}" cannot be parsed into a valid date`,
    };
  }
  return { valid: true, date: new Date(parsed), iso: trimmed };
}

export function formatKyivTime(date: Date): string {
  return new Intl.DateTimeFormat("uk-UA", {
    timeZone: "Europe/Kyiv",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

export function parseCheckpoint(content: string): TaskCheckpoint {
  const checkpoint: TaskCheckpoint = {};
  const establishedMatch = content.match(
    /[-*]\s+\*\*Установлено(?:\s*(?:й|і|\/)\s*докази)?:\*\*\s*([^\n\r]+(?:\n(?![*-]\s+\*\*|\n|#)[^\n\r]+)*)/i,
  );
  if (establishedMatch) checkpoint.established = establishedMatch[1].trim();

  const coverageMatch = content.match(
    /[-*]\s+\*\*Покриття(?:\s*(?:й|і|\/)\s*вичерпані\s*маршрути)?:\*\*\s*([^\n\r]+(?:\n(?![*-]\s+\*\*|\n|#)[^\n\r]+)*)/i,
  );
  if (coverageMatch) checkpoint.coverage = coverageMatch[1].trim();

  const openMatch = content.match(
    /[-*]\s+\*\*Відкрито(?:\s*(?:й|і|\/)\s*залежність)?:\*\*\s*([^\n\r]+(?:\n(?![*-]\s+\*\*|\n|#)[^\n\r]+)*)/i,
  );
  if (openMatch) checkpoint.open = openMatch[1].trim();

  const nextActionMatch = content.match(
    /[-*]\s+\*\*Наступна\s*дія:\*\*\s*([^\n\r]+(?:\n(?![*-]\s+\*\*|\n|#)[^\n\r]+)*)/i,
  );
  if (nextActionMatch) checkpoint.nextAction = nextActionMatch[1].trim();

  return checkpoint;
}

export function parseQuestion(content: string): string | undefined {
  const match = content.match(/##\s+Питання\s*\n+([\s\S]*?)(?=\n##|\Z)/i);
  return match ? match[1].trim() : undefined;
}

export function parseTaskContent(
  filePath: string,
  content: string,
): TaskRecord {
  const { data, content: body } = matter(content);
  const filename = path.basename(filePath);

  let createdStr = "9999-99-99";
  if (data.created instanceof Date) {
    createdStr = data.created.toISOString().slice(0, 10);
  } else if (typeof data.created === "string") {
    createdStr = data.created.trim().slice(0, 10);
  }

  const targets = Array.isArray(data.targets)
    ? data.targets.filter((t): t is string => typeof t === "string")
    : [];

  const rawNotBefore = data.not_before;
  let notBeforeStr: string | undefined;
  if (typeof rawNotBefore === "string") {
    notBeforeStr = rawNotBefore.trim();
  } else if (rawNotBefore instanceof Date) {
    notBeforeStr = rawNotBefore.toISOString();
  }

  return {
    filePath,
    filename,
    title: typeof data.title === "string" ? data.title.trim() : filename,
    status: typeof data.status === "string" ? data.status.trim() : "unknown",
    created: createdStr,
    targets,
    articleValue:
      data.article_value === "high" || data.article_value === "low"
        ? data.article_value
        : "normal",
    retryReady: data.retry_ready === true,
    notBefore: notBeforeStr,
    checkpoint: parseCheckpoint(body),
    question: parseQuestion(body),
  };
}

export function getNextStepGuidance(
  task: TaskRecord,
  isDueDeferred = false,
): string {
  switch (task.status) {
    case "in_progress":
      return "Read the current-state checkpoint and linked evidence first, then continue the unresolved next step under research-facts.";
    case "deferred":
      return isDueDeferred
        ? "Due retry: read the checkpoint and make one bounded check of the named dependency. If available, change to in_progress, remove not_before, and continue. If still unavailable with a new concrete retry time, update not_before. If no justified retry time, change to blocked."
        : `Deferred until ${task.notBefore}. Before this instant, skip without probing.`;
    case "queued":
      return "Change status to in_progress and begin research under research-facts.";
    case "fail":
      return "Inspect the recorded technical failure; retry only after addressing or working around it, and change to in_progress when work can proceed.";
    case "no_result":
      return "Review the exhausted search and try again only through a materially different or newly available research route; change to in_progress when proceeding.";
    case "found":
      return "Apply and disposition the recorded findings in target articles according to research-facts; this is follow-through, not a new research pass.";
    case "blocked":
      return "Resume only if its named essential dependency is now available; otherwise skip and report the blocker.";
    case "done":
      return "Status 'done': completed tasks are never reopened automatically.";
    default:
      return `Status '${task.status}': review task and proceed accordingly.`;
  }
}

export function evaluateTask(
  task: TaskRecord,
  now: Date = new Date(),
): EvaluatedTask {
  const nowMs = now.getTime();
  let isDue = false;
  let isFutureDeferred = false;
  let eligibilityMessage: string | undefined;

  if (task.notBefore) {
    const val = validateNotBefore(task.notBefore);
    if (!val.valid) {
      task.notBeforeValid = false;
      task.notBeforeError = val.error;
    } else if (val.date) {
      task.notBeforeValid = true;
      if (val.date.getTime() <= nowMs) {
        isDue = true;
        eligibilityMessage = `Due retry since ${task.notBefore}`;
      } else {
        isFutureDeferred = true;
        const diffMinutes = Math.ceil(
          (val.date.getTime() - nowMs) / (60 * 1000),
        );
        eligibilityMessage = `Deferred until ${task.notBefore} (in ${diffMinutes} min)`;
      }
    }
  } else if (task.status === "deferred") {
    task.notBeforeValid = false;
    task.notBeforeError =
      "Status is deferred but lacks required 'not_before' field";
  }

  let priority = Infinity;

  if (task.status === "done") {
    priority = Infinity;
  } else if (task.notBeforeError) {
    // Malformed time gate or missing not_before on deferred: skipped from automatic selection
    priority = Infinity;
  } else if (isFutureDeferred) {
    // Cannot be started before not_before
    priority = Infinity;
  } else if (task.status === "found") {
    priority = 1;
  } else if (task.status === "in_progress") {
    priority = 2;
  } else if (task.status === "deferred") {
    if (task.notBeforeValid && isDue) {
      priority = 2;
    } else {
      priority = Infinity;
    }
  } else if (task.status === "queued") {
    priority = 3;
  } else if (task.status === "fail" && task.retryReady) {
    priority = 4;
  } else if (task.status === "blocked" && task.retryReady) {
    priority = 5;
  }

  const guidance = getNextStepGuidance(
    task,
    task.status === "deferred" && isDue,
  );

  return {
    ...task,
    priority,
    isDue,
    isFutureDeferred,
    eligibilityMessage,
    guidance,
  };
}

export function compareTasks(a: EvaluatedTask, b: EvaluatedTask): number {
  if (a.priority !== b.priority) {
    return a.priority - b.priority;
  }
  // Article value only breaks ties within the same status tier.
  const valueRank = { high: 0, normal: 1, low: 2 };
  const valueComp =
    valueRank[a.articleValue ?? "normal"] -
    valueRank[b.articleValue ?? "normal"];
  if (valueComp !== 0) return valueComp;
  // Then choose oldest created date:
  const dateComp = a.created.localeCompare(b.created);
  if (dateComp !== 0) return dateComp;
  // Tie-breaker by filename ascending:
  return a.filename.localeCompare(b.filename);
}

export async function loadTasks(
  tasksDir: string,
  now: Date = new Date(),
): Promise<TaskSelectionResult> {
  const entries = await fs.readdir(tasksDir, { withFileTypes: true });
  const mdFiles = entries
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith(".md") &&
        entry.name !== "TEMPLATE.md",
    )
    .map((entry) => entry.name);

  const candidates: EvaluatedTask[] = [];
  const tasks: EvaluatedTask[] = [];
  const futureDeferred: EvaluatedTask[] = [];
  const blocked: EvaluatedTask[] = [];
  const done: EvaluatedTask[] = [];
  const invalidTasks: Array<{ filePath: string; error: string }> = [];
  const statusCounts: Record<string, number> = {};
  let doneCount = 0;

  for (const filename of mdFiles) {
    const fullPath = path.join(tasksDir, filename);
    const content = await fs.readFile(fullPath, "utf8");
    const record = parseTaskContent(fullPath, content);
    statusCounts[record.status] = (statusCounts[record.status] || 0) + 1;

    const evaluated = evaluateTask(record, now);
    tasks.push(evaluated);

    if (record.status === "done") {
      doneCount++;
      done.push(evaluated);
      continue;
    }

    if (record.notBeforeError) {
      invalidTasks.push({ filePath: fullPath, error: record.notBeforeError });
    }

    if (evaluated.isFutureDeferred) {
      futureDeferred.push(evaluated);
    } else if (evaluated.status === "blocked") {
      blocked.push(evaluated);
      if (evaluated.priority < Infinity) {
        candidates.push(evaluated);
      }
    } else if (evaluated.priority < Infinity) {
      candidates.push(evaluated);
    }
  }

  candidates.sort(compareTasks);
  futureDeferred.sort((a, b) => {
    const dateComp = (a.notBefore ?? "").localeCompare(b.notBefore ?? "");
    if (dateComp !== 0) return dateComp;
    return a.filename.localeCompare(b.filename);
  });
  blocked.sort(compareTasks);

  const selected = candidates.length > 0 ? candidates[0] : undefined;

  return {
    tasks,
    selected,
    candidates,
    futureDeferred,
    blocked,
    done,
    doneCount,
    invalidTasks,
    statusCounts,
  };
}

export function findTaskByQuery(
  tasks: EvaluatedTask[],
  query: string,
): { match?: EvaluatedTask; ambiguous?: EvaluatedTask[] } {
  const clean = query.trim();
  const lower = clean.toLowerCase();
  const withoutMd = clean.endsWith(".md") ? clean.slice(0, -3) : clean;

  // 1. Exact path or filename match
  const exactFile = tasks.find(
    (t) =>
      t.filePath === clean ||
      t.filename === clean ||
      t.filename === `${clean}.md` ||
      t.filename.replace(/\.md$/, "") === withoutMd,
  );
  if (exactFile) return { match: exactFile };

  // 2. Exact title match (case-insensitive)
  const exactTitle = tasks.find((t) => t.title.toLowerCase() === lower);
  if (exactTitle) return { match: exactTitle };

  // 3. Substring in title or filename
  const substringMatches = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(lower) ||
      t.filename.toLowerCase().includes(lower),
  );

  if (substringMatches.length === 1) {
    return { match: substringMatches[0] };
  }
  if (substringMatches.length > 1) {
    // If one is an exact prefix, prefer it
    const prefixMatch = substringMatches.find((t) =>
      t.filename.toLowerCase().startsWith(lower),
    );
    if (prefixMatch) {
      return { match: prefixMatch, ambiguous: substringMatches };
    }
    return { ambiguous: substringMatches };
  }

  return {};
}
