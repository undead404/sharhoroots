import assert from "node:assert/strict";
import test from "node:test";
import { fetchCanonical } from "./util";

test("SPA follows alias redirects but never fetches production canonicals during preview", async (t) => {
  const requests: string[] = [];
  let body = '<link rel="canonical" href="https://production.example/article">';
  t.mock.method(globalThis, "fetch", async (url: string) => {
    requests.push(String(url));
    return new Response(body, { headers: { "content-type": "text/html" } });
  });
  const local = new URL("http://localhost:8080/article");
  await fetchCanonical(local);
  assert.deepEqual(requests, [local.href]);
  body =
    '<meta http-equiv="refresh" content="0; url=./target"><link rel="canonical" href="./target">';
  requests.length = 0;
  await fetchCanonical(local);
  assert.deepEqual(requests, [local.href, "http://localhost:8080/target"]);
});
