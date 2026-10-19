import RankedArtistRow from "../components/Artist-components/RankedArtistRow";
import ArtistListSkeleton from "../components/Artist-components/ArtistListSkeleton";
import { useGetUserTopArtists } from "../queries/user";

export default function Artists() {
  const { data, isPending, isFetching, isError, error } =
    useGetUserTopArtists();

  if (isPending || isFetching) {
    return (
      <main className="min-h-screen">
        <ArtistListSkeleton />
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
      <RankedArtistRow artists={data?.items ?? []} />
    </main>
  );
}
