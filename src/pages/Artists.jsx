import RankedArtistRow from "../components/Artist-components/RankedArtistRow";
import { useGetUserTopArtists } from "../queries/user";

export default function Artists() {
  const { data, isPending, isError, error } = useGetUserTopArtists();

  if (isPending) {
    return <main className="min-h-screen">Loading top artists...</main>;
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
      <RankedArtistRow artists={data?.items ?? []} />
    </main>
  );
}
