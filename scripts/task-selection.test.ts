import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test, { type TestContext } from "node:test";
import {
  validateNotBefore,
  evaluateTask,
  compareTasks,
  loadTasks,
  findTaskByQuery,
  parseCheckpoint,
  parseTaskContent,
  type TaskRecord,
} from "./task-selection";

async function createTempTasksDir(
  t: TestContext,
  files: Record<string, string>,
): Promise<string> {
  const dir = await mkdtemp(path.join(os.tmpdir(), "task-selection-"));
  t.after(() => rm(dir, { recursive: true, force: true }));
  for (const [filename, content] of Object.entries(files)) {
    await writeFile(path.join(dir, filename), content, "utf8");
  }
  return dir;
}

test("validateNotBefore enforces ISO 8601 with explicit timezone offset or Z", () => {
  assert.equal(validateNotBefore("2026-11-22T20:15:00+02:00").valid, true);
  assert.equal(validateNotBefore("2026-11-22T20:15:00Z").valid, true);
  assert.equal(validateNotBefore("2026-11-22T20:15:00-05:00").valid, true);

  // Missing timezone or offset
  assert.equal(validateNotBefore("2026-11-22T20:15:00").valid, false);
  assert.equal(validateNotBefore("2026-11-22").valid, false);
  assert.equal(validateNotBefore("").valid, false);
  assert.equal(validateNotBefore(undefined).valid, false);
  assert.equal(validateNotBefore(123456).valid, false);
});

test("parseCheckpoint extracts structured checkpoint fields", () => {
  const content = `
# Some Title

## Поточний стан

- **Установлено / докази:** Документ знайдено в ДАХмО.
- **Покриття й вичерпані маршрути:** Перевірено описи 1 і 2.
- **Відкрито / залежність:** Очікується оцифрування справи 45.
- **Наступна дія:** Перевірити наявність сканів після оновлення.

## Питання
Які межі містечка?
`;

  const cp = parseCheckpoint(content);
  assert.equal(cp.established, "Документ знайдено в ДАХмО.");
  assert.equal(cp.coverage, "Перевірено описи 1 і 2.");
  assert.equal(cp.open, "Очікується оцифрування справи 45.");
  assert.equal(cp.nextAction, "Перевірити наявність сканів після оновлення.");
});

test("evaluateTask assigns priority tiers and evaluates time gates", () => {
  const now = new Date("2026-11-23T12:00:00Z");

  const inProgress: TaskRecord = {
    filePath: "tasks/t1.md",
    filename: "t1.md",
    title: "T1",
    status: "in_progress",
    created: "2026-10-10",
    targets: [],
  };
  assert.equal(evaluateTask(inProgress, now).priority, 2);

  const dueDeferred: TaskRecord = {
    filePath: "tasks/t2.md",
    filename: "t2.md",
    title: "T2",
    status: "deferred",
    created: "2026-10-15",
    targets: [],
    notBefore: "2026-11-23T10:00:00Z", // 2 hours before now
  };
  const evalDue = evaluateTask(dueDeferred, now);
  assert.equal(evalDue.priority, 2);
  assert.equal(evalDue.isDue, true);

  const futureDeferred: TaskRecord = {
    filePath: "tasks/t3.md",
    filename: "t3.md",
    title: "T3",
    status: "deferred",
    created: "2026-10-15",
    targets: [],
    notBefore: "2026-11-23T15:00:00Z", // 3 hours after now
  };
  const evalFuture = evaluateTask(futureDeferred, now);
  assert.equal(evalFuture.priority, Infinity);
  assert.equal(evalFuture.isFutureDeferred, true);

  const malformedDeferred: TaskRecord = {
    filePath: "tasks/t4.md",
    filename: "t4.md",
    title: "T4",
    status: "deferred",
    created: "2026-10-15",
    targets: [],
    notBefore: "invalid-time",
  };
  const evalMalformed = evaluateTask(malformedDeferred, now);
  assert.equal(evalMalformed.priority, Infinity);
  assert.ok(evalMalformed.notBeforeError);

  const missingNotBefore: TaskRecord = {
    filePath: "tasks/t5.md",
    filename: "t5.md",
    title: "T5",
    status: "deferred",
    created: "2026-10-15",
    targets: [],
  };
  const evalMissing = evaluateTask(missingNotBefore, now);
  assert.equal(evalMissing.priority, Infinity);
  assert.ok(evalMissing.notBeforeError);

  const queued: TaskRecord = {
    filePath: "tasks/t6.md",
    filename: "t6.md",
    title: "T6",
    status: "queued",
    created: "2026-10-20",
    targets: [],
  };
  assert.equal(evaluateTask(queued, now).priority, 3);

  const done: TaskRecord = {
    filePath: "tasks/t7.md",
    filename: "t7.md",
    title: "T7",
    status: "done",
    created: "2026-10-01",
    targets: [],
  };
  assert.equal(evaluateTask(done, now).priority, Infinity);
});

test("compareTasks sorts in_progress and due deferred equally by oldest created date, tie-breaking by filename", () => {
  const now = new Date("2026-11-23T12:00:00Z");

  const dueDeferredOlder = evaluateTask(
    {
      filePath: "tasks/b-due.md",
      filename: "b-due.md",
      title: "B Due",
      status: "deferred",
      created: "2026-10-10",
      targets: [],
      notBefore: "2026-11-23T10:00:00Z",
    },
    now,
  );

  const inProgressNewer = evaluateTask(
    {
      filePath: "tasks/a-prog.md",
      filename: "a-prog.md",
      title: "A Prog",
      status: "in_progress",
      created: "2026-10-15",
      targets: [],
    },
    now,
  );

  // Due deferred created 2026-10-10 must sort ahead of in_progress created 2026-10-15
  assert.ok(compareTasks(dueDeferredOlder, inProgressNewer) < 0);

  // Tie-breaker by filename
  const queuedA = evaluateTask(
    {
      filePath: "tasks/alpha.md",
      filename: "alpha.md",
      title: "Alpha",
      status: "queued",
      created: "2026-10-20",
      targets: [],
    },
    now,
  );

  const queuedB = evaluateTask(
    {
      filePath: "tasks/beta.md",
      filename: "beta.md",
      title: "Beta",
      status: "queued",
      created: "2026-10-20",
      targets: [],
    },
    now,
  );

  assert.ok(compareTasks(queuedA, queuedB) < 0);
});

test("loadTasks ignores TEMPLATE.md and selects highest priority task", async (t) => {
  const dir = await createTempTasksDir(t, {
    "TEMPLATE.md": `---
title: "Template"
status: queued
created: 2026-01-01
---`,
    "task-queued-new.md": `---
title: "New Queued"
status: queued
created: 2026-10-25
---`,
    "task-queued-old.md": `---
title: "Old Queued"
status: queued
created: 2026-10-10
---`,
    "task-deferred-future.md": `---
title: "Future Deferred"
status: deferred
created: 2026-10-05
not_before: "2026-11-23T18:00:00Z"
---`,
  });

  const now = new Date("2026-11-23T12:00:00Z");
  const result = await loadTasks(dir, now);

  assert.equal(result.selected?.filename, "task-queued-old.md");
  assert.equal(result.futureDeferred.length, 1);
  assert.equal(result.futureDeferred[0].filename, "task-deferred-future.md");
});

test("findTaskByQuery matches by filename, path, and title substring", () => {
  const now = new Date("2026-11-23T12:00:00Z");
  const tasks = [
    evaluateTask(
      {
        filePath: "tasks/research-sharhorod-history.md",
        filename: "research-sharhorod-history.md",
        title: "Історія містечка Шаргород",
        status: "queued",
        created: "2026-10-10",
        targets: [],
      },
      now,
    ),
    evaluateTask(
      {
        filePath: "tasks/research-dzhuryn-parish.md",
        filename: "research-dzhuryn-parish.md",
        title: "Парафія села Джурин",
        status: "queued",
        created: "2026-10-12",
        targets: [],
      },
      now,
    ),
  ];

  // Path / filename match
  assert.equal(
    findTaskByQuery(tasks, "tasks/research-sharhorod-history.md").match
      ?.filename,
    "research-sharhorod-history.md",
  );
  assert.equal(
    findTaskByQuery(tasks, "research-dzhuryn-parish").match?.filename,
    "research-dzhuryn-parish.md",
  );

  // Title match
  assert.equal(
    findTaskByQuery(tasks, "Джурин").match?.filename,
    "research-dzhuryn-parish.md",
  );
  assert.equal(
    findTaskByQuery(tasks, "Шаргород").match?.filename,
    "research-sharhorod-history.md",
  );
});

test("found precedes all research tiers, even with lower article value", async (t) => {
  const statuses = [
    "found",
    "in_progress",
    "deferred",
    "queued",
    "fail",
    "blocked",
  ];
  const files = Object.fromEntries(
    statuses.map((status, index) => [
      `${status}.md`,
      `---
title: ${status}
status: ${status}
created: 2026-10-${20 - index}
article_value: ${status === "found" ? "low" : "high"}
retry_ready: true
${status === "deferred" ? 'not_before: "2026-11-23T10:00:00Z"' : ""}
---`,
    ]),
  );
  const dir = await createTempTasksDir(t, files);
  const result = await loadTasks(dir, new Date("2026-11-23T12:00:00Z"));
  assert.equal(result.selected?.status, "found");
  assert.deepEqual(
    result.candidates.map((task) => task.status),
    ["found", "deferred", "in_progress", "queued", "fail", "blocked"],
  );
});

test("automatic selection skips exhausted and unready tasks but explicit lookup retains them", async (t) => {
  const dir = await createTempTasksDir(t, {
    "exhausted.md": "---\nstatus: no_result\nretry_ready: true\n---",
    "failed.md": "---\nstatus: fail\n---",
    "blocked.md": "---\nstatus: blocked\nretry_ready: 'true'\n---",
    "invalid.md": "---\nstatus: deferred\nnot_before: invalid\n---",
  });
  const result = await loadTasks(dir);
  assert.equal(result.selected, undefined);
  assert.equal(result.candidates.length, 0);
  assert.equal(result.invalidTasks.length, 1);
  for (const filename of [
    "exhausted.md",
    "failed.md",
    "blocked.md",
    "invalid.md",
  ]) {
    assert.equal(
      findTaskByQuery(result.tasks, filename).match?.filename,
      filename,
    );
  }
});

test("article value precedes age only within a tier, with normal as the default", async (t) => {
  const dir = await createTempTasksDir(t, {
    "old-low.md":
      "---\nstatus: queued\ncreated: 2026-01-01\narticle_value: low\n---",
    "new-high.md":
      "---\nstatus: queued\ncreated: 2026-11-01\narticle_value: high\n---",
    "default.md": "---\nstatus: queued\ncreated: 2026-02-01\n---",
    "normal.md":
      "---\nstatus: queued\ncreated: 2026-02-01\narticle_value: normal\n---",
  });
  const result = await loadTasks(dir);
  assert.deepEqual(
    result.candidates.map((task) => task.filename),
    ["new-high.md", "default.md", "normal.md", "old-low.md"],
  );
  assert.equal(
    parseTaskContent("unknown.md", "---\narticle_value: unexpected\n---")
      .articleValue,
    "normal",
  );
});

test("found and retry readiness cannot bypass time gates", () => {
  const base: TaskRecord = {
    filePath: "tasks/gated.md",
    filename: "gated.md",
    title: "Gated",
    status: "found",
    created: "2026-01-01",
    targets: [],
    retryReady: true,
  };
  const now = new Date("2026-11-23T12:00:00Z");
  for (const status of ["found", "fail", "blocked"]) {
    for (const notBefore of ["invalid", "2026-11-24T12:00:00Z"]) {
      assert.equal(
        evaluateTask({ ...base, status, notBefore }, now).priority,
        Infinity,
      );
    }
  }
});
