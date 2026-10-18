import ArtistRow from "./ArtistRow";
const RankedArtistRow = ({ artists = [] }) => {
    return (<section aria-label="Top artists" className="mx-auto w-full  px-4 pb-12 sm:px-6 md:px-8">
      <div className="mb-3 flex items-end justify-between px-1 sm:mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#77736e]">
            Your rotation
          </p>
          <h2 className="mt-1 font-serif text-xl text-[#f2f0ec] sm:text-2xl">
            Top artists
          </h2>
        </div>
        <span className="text-[10px] uppercase tracking-[0.16em] text-[#77736e]">
          {artists.length} artists
        </span>
      </div>
      <div className="overflow-hidden rounded-md border border-white/[0.06]">
        {artists.length ? artists.map((artist, index) => (
          <ArtistRow
            key={artist.id ?? artist.name}
            rank={String(index + 1).padStart(2, "0")}
            name={artist.name ?? "Unknown artist"}
            genres={artist.genres ?? []}
          />
        )) : <p className="px-5 py-6 text-sm text-[#77736e]">No top artists found.</p>}
      </div>
    </section>);
};
export default RankedArtistRow;
