const APIENDPOINT = `https://api.spotify.com/v1`;

export const getUserTopTracks = async () => {
  const accessToken = sessionStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error("Spotify access token is missing.");
  }

  const endpoint = `${APIENDPOINT}/me/top/tracks`;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message ||
        `Failed to fetch top tracks: ${response.status}`
    );
  }

  return response.json();
};