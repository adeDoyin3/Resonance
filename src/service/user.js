const APIENDPOINT = `https://api.spotify.com/v1`;

export const getUserTopTracks = async ({
  timeRange = "medium_term",
  limit,
} = {}) => {
  const accessToken = sessionStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error("Spotify access token is missing.");
  }

  const params = new URLSearchParams({ time_range: timeRange });
  if (limit) {
    params.set("limit", String(limit));
  }
  const endpoint = `${APIENDPOINT}/me/top/tracks?${params}`;

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

export const getUserTopAlbums = async (timeRange = "medium_term") => {
  const { items: tracks = [] } = await getUserTopTracks({
    timeRange,
    limit: 50,
  });
  const albumsById = new Map();

  tracks.forEach((track, index) => {
    const album = track?.album;
    if (!album?.id) {
      return;
    }

    const existing = albumsById.get(album.id);
    if (existing) {
      existing.tracks.push(track);
      return;
    }

    albumsById.set(album.id, {
      ...album,
      artists: album.artists ?? track.artists ?? [],
      tracks: [track],
      firstTrackIndex: index,
    });
  });

  return [...albumsById.values()]
    .map(({ firstTrackIndex, ...album }) => ({
      ...album,
      trackCount: album.tracks.length,
      firstTrackIndex,
    }))
    .sort(
      (first, second) =>
        second.trackCount - first.trackCount ||
        first.firstTrackIndex - second.firstTrackIndex
    )
    .map(({ firstTrackIndex, ...album }) => album);
};

export const getRecentlyPlayedTracks = async () => {
  const accessToken = sessionStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error("Spotify access token is missing.");
  }

  const endpoint = `${APIENDPOINT}/me/player/recently-played`;

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

  }


  export const getUserTopArtists = async ({
    timeRange = "medium_term",
    limit,
  } = {}) => {
    const accessToken = sessionStorage.getItem("access_token");

    if (!accessToken) {
      throw new Error("Spotify access token is missing.");
    }

    const params = new URLSearchParams({ time_range: timeRange });
    if (limit) {
      params.set("limit", String(limit));
    }
    const endpoint = `${APIENDPOINT}/me/top/artists?${params}`;

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

  }

export const getUserTopGenres = async (timeRange = "medium_term") => {
  const { items: artists = [] } = await getUserTopArtists({
    timeRange,
    limit: 50,
  });
  const genresByName = new Map();

  artists.forEach((artist, index) => {
    for (const rawGenre of artist.genres ?? []) {
      const name = rawGenre
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      const existing = genresByName.get(name) ?? {
        name,
        artistCount: 0,
        score: 0,
        artists: [],
      };

      existing.artistCount += 1;
      existing.score += artists.length - index;
      existing.artists.push(artist.name);
      genresByName.set(name, existing);
    }
  });

  return [...genresByName.values()].sort(
    (first, second) =>
      second.score - first.score ||
      second.artistCount - first.artistCount ||
      first.name.localeCompare(second.name)
  );
};