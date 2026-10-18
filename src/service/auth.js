const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

 function generateCodeVerifier() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);

  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

const generateCodeChallenge = async (verifier) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);

  const digest = await crypto.subtle.digest("SHA-256", data);

  const hash = String.fromCharCode(...new Uint8Array(digest));

  const base64 = btoa(hash);

  return base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};


 const generateState = () => {
  const randomBytes = crypto.getRandomValues(new Uint8Array(16));

  return btoa(String.fromCharCode(...randomBytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const loginWithSpotify = async () => {
    if (!clientId || !redirectUri) {
    throw new Error("Spotify client ID or redirect URI is missing from the Vite environment.");
  }
  if (new URL(redirectUri).origin !== window.location.origin) {
    throw new Error(
      "Spotify redirect URI must use the same origin as this app so the login state can be verified."
    );
  }
    const verifier = generateCodeVerifier();
    sessionStorage.setItem("verifier", verifier);
    const code_Challenge = await generateCodeChallenge(verifier);
    const state =  generateState();
    sessionStorage.setItem("state", state);
    const scope = [
        "user-top-read",
      "user-read-recently-played",
        "user-read-recently-played",
    ].join(" ");

    const params = new URLSearchParams({
        code_challenge: code_Challenge,
        state,
        redirect_uri: redirectUri,
        client_id: clientId,
        scope,
        response_type: "code",
        code_challenge_method: "S256"
        
    });
  window.location.assign(`https://accounts.spotify.com/authorize?${params.toString()}`);
}


const postAuth = async (path, body) => {
  const response = await fetch(`/api/auth/${path}`, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Spotify authentication failed.");
  return data;
};

export const refreshAccessToken = () => postAuth("refresh");
export const clearRefreshToken = () => postAuth("logout");

export const requestTokens = async () => {
  const urlParams = new URLSearchParams(window.location.search);

  const code = urlParams.get("code");
  const returnedState = urlParams.get("state");

  const storedState = sessionStorage.getItem("state");
  const verifier = sessionStorage.getItem("verifier");

  if (!code) {
    throw new Error("Spotify authorization code is missing.");
  }

  if (!storedState || returnedState !== storedState) {
    throw new Error(
      "Invalid Spotify state. Start the login process again."
    );
  }

  if (!verifier) {
    throw new Error(
      "Spotify PKCE verifier is missing. Start login again."
    );
  }

  try {
    return await postAuth("token", { code, verifier });
  } catch (error) {
    console.error("Error requesting Spotify tokens:", error);
    throw error;
  } finally {
    sessionStorage.removeItem("verifier");
    sessionStorage.removeItem("state");
  }
};
