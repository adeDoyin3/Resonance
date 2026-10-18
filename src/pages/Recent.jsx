import RecentlyPlayedTable from "../components/Recently-played/RecentlyPlayedTable";
import { useGetRecentlyPlayedTracks } from "../queries/user";

export default function Recent() {
    const { data, isPending, isError, error } = useGetRecentlyPlayedTracks();

    return (<main className="min-h-screen bg-[radial-gradient(ellipse_at_42%_23%,#111111_0%,#090909_52%,#070707_100%)] px-[3vw] pb-16 pt-2 text-[#e9e6e2] max-[700px]:px-5">
      <header className="mb-10 pt-7 sm:mb-12 sm:pt-8">
        <p className="mb-3 font-sans text-[8px] font-medium uppercase tracking-[.22em] text-[#696662]">Your history</p>
        <h1 className="m-0 font-serif text-[clamp(48px,6vw,76px)] font-bold leading-[.98] tracking-[-.045em] text-[#e9e6e2]">
          Recently Played
        </h1>
      </header>
      {isPending ? (
        <p role="status">Loading recently played tracks...</p>
      ) : isError ? (
        <p role="alert">{error.message}</p>
      ) : (
        <RecentlyPlayedTable tracks={data?.items ?? []} />
      )}
    </main>);
}
