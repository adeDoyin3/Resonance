import { useState } from "react";
import RankedAlbumList from "../components/Album-components/RankedAlbumList";
import useAuth from "../hooks/useAuth";
import { useGetUserTopAlbums } from "../queries/user";

const TIME_RANGES = [
  { value: "short_term", label: "Last 4 weeks" },
  { value: "medium_term", label: "Last 6 months" },
  { value: "long_term", label: "All time" },
];

export default function Album() {
  const [timeRange, setTimeRange] = useState("medium_term");
  const { accessToken } = useAuth();
  const { data: albums, isPending, isError, error } =
    useGetUserTopAlbums(timeRange);

  if (!accessToken) {
    return (
      <main className="min-h-screen px-5 py-8 text-sm text-[#99938b]">
        Connect your Spotify account to see your top albums.
      </main>
    );
  }

  if (isPending) {
    return (
      <main className="min-h-screen px-5 py-8 text-sm text-[#99938b]">
        Loading top albums...
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen px-5 py-8">
        <p role="alert" className="text-sm text-[#f2f0ec]">
          {error.message}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex w-full items-center justify-end px-4 pb-5 sm:px-6 md:px-8">
        <label
          htmlFor="album-time-range"
          className="mr-3 text-[10px] uppercase tracking-[0.16em] text-[#77736e]"
        >
          Listening period
        </label>
        <select
          id="album-time-range"
          value={timeRange}
          onChange={(event) => setTimeRange(event.target.value)}
          className="rounded-sm border border-white/[0.12] bg-[#111] px-3 py-2 text-xs text-[#f2f0ec] focus:outline-none focus:ring-1 focus:ring-white/40"
        >
          {TIME_RANGES.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>
      <RankedAlbumList albums={albums ?? []} />
    </main>
  );
}
