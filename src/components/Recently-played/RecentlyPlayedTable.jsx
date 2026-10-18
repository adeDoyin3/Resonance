import RecentlyPlayedRow from "./RecentlyPlayedRow";

const formatPlayedAgo = (playedAt) => {
  const playedAtMs = Date.parse(playedAt);
  if (Number.isNaN(playedAtMs)) return "Recently";

  const minutesAgo = Math.max(0, Math.floor((Date.now() - playedAtMs) / 60_000));
  if (minutesAgo < 60) return `${minutesAgo}m ago`;

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo}h ago`;

  return `${Math.floor(hoursAgo / 24)}d ago`;
};

const RecentlyPlayedTable = ({ tracks = [] }) => (
  <section className="w-full max-w-[660px]" aria-label="Recently played tracks">
    {tracks.length ? (
      tracks.map(({ track, played_at }, index) => (
        <RecentlyPlayedRow
          key={`${track.id ?? track.name}-${played_at ?? index}`}
          title={track.name ?? "Unknown track"}
          artist={track.artists?.map((item) => item.name).join(", ") ?? "Unknown artist"}
          album={track.album?.name ?? "Unknown album"}
          imageUrl={track.album?.images?.[0]?.url}
          playedAgo={formatPlayedAgo(played_at)}
        />
      ))
    ) : (
      <p className="py-6 text-sm text-[#777572]">No recently played tracks found.</p>
    )}
  </section>
);

export default RecentlyPlayedTable;
