import RankedTrackList from "../components/Track-components/RankedTrackList";
import TrackListSkeleton from "../components/Track-components/TrackListSkeleton";
import { useGetUserTopTracks } from "../queries/user";

export default function Tracks() {
  const { data, isPending, isError, error } = useGetUserTopTracks();

  if (isPending) {
    return (
      <main className="min-h-screen">
        <TrackListSkeleton />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen">
        <p role="alert">{error.message}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <RankedTrackList tracks={data?.items ?? []} />
    </main>
  );
}
