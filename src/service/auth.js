import axios from "axios";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const scope = [
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
];
const verifierKeyPrefix = "spotify_pkce_verifier:";

function randomBase64Url(byteLength) {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function generateCodeVerifier() {
  // 64 random bytes encode to an 86-character PKCE-compliant verifier.
  return randomBase64Url(64);
}

async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const hash = await crypto.subtle.digest("SHA-256", data);
  let binary = "";
  new Uint8Array(hash).forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export async function loginToSpotify() {
  if (!clientId || !redirectUri) {
    throw new Error("Spotify client ID or redirect URI is missing from the Vite environment.");
  }

  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  const state = randomBase64Url(16);
  localStorage.setItem(`${verifierKeyPrefix}${state}`, verifier);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: scope.join(" "),
    state,
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  window.location.assign(`https://accounts.spotify.com/authorize?${params.toString()}`);
}

export async function requestTokens(code, state) {
  if (!state) {
    throw new Error("Spotify callback is missing its state value. Start a fresh login.");
  }

  const storageKey = `${verifierKeyPrefix}${state}`;
  const verifier = localStorage.getItem(storageKey);
  if (!verifier) {
    throw new Error(
      "Spotify PKCE verifier is missing for this callback. Start login again from the same app URL and tab.",
    );
  }

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: verifier,
  });

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      params,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );

    if (response.data.access_token) {
      
      localStorage.setItem("access_token", response.data.access_token);
    }
    if (response.data.refresh_token) {
      localStorage.setItem("refresh_token", response.data.refresh_token);
    }
    return response.data;
  } catch (error) {
    console.error("Error requesting Spotify tokens:", error.response?.data || error.message);
    throw error;
  } finally {
    // Each state gets its own verifier, so cleanup cannot affect another login attempt.
    localStorage.removeItem(storageKey);
  }
}


  const getRefreshToken = async () => {

   // refresh token that has been previously stored
   const refreshToken = localStorage.getItem('refresh_token');
   const url = "https://accounts.spotify.com/api/token";

   const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId
      }),
   }
   const result = await fetch(url, payload);
   const response = await result.json();

   if (!result.ok) {
     if (response.error === 'invalid_grant') {
       localStorage.removeItem('access_token');
       localStorage.removeItem('refresh_token');
       window.location.href = '/login';
       return;
     }

     throw new Error(`Token refresh failed: ${response.error}`);
   }

   localStorage.setItem('access_token', response.access_token);
   if (response.refresh_token) {
     localStorage.setItem('refresh_token', response.refresh_token);
   }
  }


