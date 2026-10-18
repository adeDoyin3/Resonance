import RankedTrackList from "../components/Track-components/RankedTrackList";
import { useGetUserTopTracks } from "../queries/user";

export default function Tracks() {
  const { data, isPending, isError, error } = useGetUserTopTracks();
  console.log(data)

  if (isPending) {
    return <main className="min-h-screen">Loading top tracks...</main>;
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
