const RankedAlbumList = ({ albums = [] }) => {
  return (
    <section
      aria-label="Top albums"
      className="mx-auto w-full px-4 pb-12 sm:px-6 md:px-8"
    >
      <div className="mb-3 flex items-end justify-between px-1 sm:mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#77736e]">
            Your rotation
          </p>
          <h2 className="mt-1 font-serif text-xl text-[#f2f0ec] sm:text-2xl">
            Top albums
          </h2>
        </div>
        <span className="text-[10px] uppercase tracking-[0.16em] text-[#77736e]">
          {albums.length} {albums.length === 1 ? "album" : "albums"}
        </span>
      </div>

      {albums.length ? (
        <ol className="overflow-hidden rounded-md border border-white/[0.06]">
          {albums.map((album, index) => {
            const artists = album.artists?.map((artist) => artist.name).filter(Boolean) ?? [];

            return (
              <li
                key={album.id}
                className="grid min-h-[112px] grid-cols-[36px_64px_minmax(0,1fr)] items-center gap-4 border-b border-white/[0.06] bg-gradient-to-r from-[#111111] to-[#0c0c0c] px-4 py-4 last:border-b-0 sm:grid-cols-[56px_80px_minmax(0,1fr)_auto] sm:gap-5 sm:px-6 md:px-8"
              >
                <span
                  className="font-serif text-3xl font-light leading-none tracking-[-0.06em] text-white/30 sm:text-[42px]"
                  aria-label={`Rank ${index + 1}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="h-16 w-16 overflow-hidden rounded-[3px] border border-white/10 bg-[#171717] sm:h-20 sm:w-20">
                  {album.images?.[0]?.url ? (
                    <img
                      src={album.images[0].url}
                      alt={`${album.name} album artwork`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : null}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-serif text-base font-semibold leading-5 text-[#f2f0ec] sm:text-lg">
                    {album.name || "Unknown album"}
                  </h3>
                  <p className="mt-1 truncate text-[11px] tracking-wide text-[#99938b]">
                    {artists.length ? artists.join(", ") : "Unknown artist"}
                  </p>
                  <p className="mt-2 text-[10px] text-[#77736e]">
                    Featured in {album.trackCount}{" "}
                    {album.trackCount === 1 ? "top track" : "top tracks"}
                    {album.release_date
                      ? ` · ${album.release_date.slice(0, 4)}`
                      : ""}
                  </p>
                </div>

                <ul
                  aria-label={`Top tracks from ${album.name}`}
                  className="col-start-3 mt-1 flex min-w-0 flex-wrap gap-x-2 gap-y-1 sm:col-start-auto sm:mt-0 sm:max-w-64 sm:justify-end"
                >
                  {album.tracks.slice(0, 2).map((track) => (
                    <li
                      key={track.id}
                      className="max-w-full truncate rounded-sm border border-white/[0.07] px-2 py-1 text-[9px] text-[#77736e]"
                    >
                      {track.name}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="rounded-md border border-white/[0.06] px-5 py-8 text-sm text-[#77736e]">
          No top albums found for this time range.
        </p>
      )}
    </section>
  );
};

export default RankedAlbumList;
