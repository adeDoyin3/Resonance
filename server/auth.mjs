import { createServer } from "node:http";

const clientId = process.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.VITE_SPOTIFY_REDIRECT_URI;
const allowedOrigin = redirectUri && new URL(redirectUri).origin;
const cookieName = "spotify_refresh_token";
const cookiePath = "/api/auth";
const secure = allowedOrigin?.startsWith("https:") ?? false;

function cookie(value, maxAge) {
  return `${cookieName}=${encodeURIComponent(value)}; HttpOnly; SameSite=Strict; Path=${cookiePath}; Max-Age=${maxAge}${secure ? "; Secure" : ""}`;
}

function send(res, status, body, setCookie) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...(setCookie ? { "Set-Cookie": setCookie } : {}),
  });
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 8192) throw new Error("Request is too large.");
  }
  return JSON.parse(body || "{}");
}

async function spotifyToken(params) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(params),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error_description || data.error || "Spotify token request failed.");
  }
  return data;
}

export async function handleAuthRequest(req, res) {
  if (!req.url?.startsWith("/api/auth/") || req.method !== "POST") {
    send(res, 404, { error: "Not found." });
    return;
  }
  // All three endpoints change authentication state, so reject cross-origin requests.
  if (req.headers.origin !== allowedOrigin) {
    send(res, 403, { error: "Invalid request origin." });
    return;
  }
  if (!clientId || !redirectUri) {
    send(res, 500, { error: "Spotify configuration is missing." });
    return;
  }

  try {
    if (req.url === "/api/auth/logout") {
      send(res, 200, { ok: true }, cookie("", 0));
      return;
    }

    let data;
    if (req.url === "/api/auth/token") {
      const { code, verifier } = await readJson(req);
      if (typeof code !== "string" || !code || typeof verifier !== "string" || !verifier) {
        send(res, 400, { error: "Authorization code and verifier are required." });
        return;
      }
      data = await spotifyToken({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        code_verifier: verifier,
      });
      if (!data.refresh_token) throw new Error("Spotify did not return a refresh token.");
    } else if (req.url === "/api/auth/refresh") {
      const rawCookie = req.headers.cookie?.split("; ").find((part) => part.startsWith(`${cookieName}=`));
      if (!rawCookie) {
        send(res, 401, { error: "No refresh token is available." });
        return;
      }
      const refreshToken = decodeURIComponent(rawCookie.slice(cookieName.length + 1));
      data = await spotifyToken({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: clientId,
      });
    } else {
      send(res, 404, { error: "Not found." });
      return;
    }

    if (!data.access_token) throw new Error("Spotify did not return an access token.");
    const nextCookie = data.refresh_token && cookie(data.refresh_token, 60 * 60 * 24 * 180);
    send(res, 200, { access_token: data.access_token, expires_in: data.expires_in }, nextCookie);
  } catch (error) {
    console.error("Spotify authentication request failed:", error);
    send(res, 502, { error: error.message });
  }
}

export function startAuthServer(port = 3001) {
  return createServer((req, res) => {
    void handleAuthRequest(req, res);
  }).listen(port, "127.0.0.1", () => {
    console.log(`Spotify auth API listening on http://127.0.0.1:${port}`);
  });
}
