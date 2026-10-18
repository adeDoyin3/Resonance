import assert from "node:assert/strict";
import { createServer } from "node:http";
import { after, before, test } from "node:test";

process.env.VITE_SPOTIFY_CLIENT_ID = "test-client";
process.env.VITE_SPOTIFY_REDIRECT_URI = "http://127.0.0.1:5173";
const { handleAuthRequest } = await import("./auth.mjs");

let server;
let baseUrl;
const originalFetch = globalThis.fetch;

before(async () => {
  server = createServer((req, res) => void handleAuthRequest(req, res));
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
  globalThis.fetch = async (_url, options) => {
    const params = new URLSearchParams(options.body);
    if (params.get("grant_type") === "authorization_code") {
      assert.equal(params.get("redirect_uri"), "http://127.0.0.1:5173");
      return Response.json({ access_token: "access-1", refresh_token: "refresh-1", expires_in: 3600 });
    }
    assert.equal(params.get("refresh_token"), "refresh-1");
    return Response.json({ access_token: "access-2", expires_in: 3600 });
  };
});

after(async () => {
  globalThis.fetch = originalFetch;
  await new Promise((resolve) => server.close(resolve));
});

test("exchange hides refresh token in an HttpOnly cookie and refresh uses it", async () => {
  const exchange = await originalFetch(`${baseUrl}/api/auth/token`, {
    method: "POST",
    headers: { Origin: "http://127.0.0.1:5173", "Content-Type": "application/json" },
    body: JSON.stringify({ code: "code", verifier: "verifier" }),
  });
  assert.deepEqual(await exchange.json(), { access_token: "access-1", expires_in: 3600 });
  const cookie = exchange.headers.get("set-cookie");
  assert.match(cookie, /HttpOnly; SameSite=Strict; Path=\/api\/auth/);
  const refresh = await originalFetch(`${baseUrl}/api/auth/refresh`, {
    method: "POST",
    headers: { Origin: "http://127.0.0.1:5173", Cookie: cookie.split(";")[0] },
  });
  assert.deepEqual(await refresh.json(), { access_token: "access-2", expires_in: 3600 });
});

test("rejects a request from another origin", async () => {
  const response = await originalFetch(`${baseUrl}/api/auth/logout`, {
    method: "POST",
    headers: { Origin: "http://example.com" },
  });
  assert.equal(response.status, 403);
});
