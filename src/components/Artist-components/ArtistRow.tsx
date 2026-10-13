export type ArtistRowProps = {
  rank?: string;
  name?: string;
  genres?: string[];
  imageUrl?: string;
};

const ArtistRow = ({
  rank = "01",
  name = "Harry Styles",
  genres = ["Pop", "Indie pop", "Soft rock"],
  imageUrl,
}: ArtistRowProps) => {
  return (
    <article className="group relative isolate flex min-h-[120px] w-full items-end overflow-hidden border-b border-white/[0.05]  px-5 py-5 sm:min-h-[138px] sm:items-center sm:px-8 sm:py-6 md:min-h-[150px] md:px-12">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-serif text-[9px] tabular-nums text-white/20 sm:left-5">
        {rank}
      </span>

      <div className="ml-5 flex min-w-0 flex-1 flex-col gap-2 sm:ml-0 sm:flex-row sm:items-end sm:gap-8 md:gap-10">
        <h2
          className="truncate font-serif font-normal leading-[0.9] tracking-[-0.055em] text-[#f4f1ec]"
          style={{
            fontSize:
              Number(rank) < 4
                ? "clamp(2.4rem, 8vw, 5.4rem)"
                : Number(rank) < 8
                  ? "clamp(1.8rem, 5vw, 3.5rem)"
                  : "clamp(1.4rem, 3vw, 2.2rem)",
          }}
        >
          {name}
        </h2>
        {genres.length > 0 && (
          <ul
            aria-label="Genres"
            className="flex flex-wrap gap-x-2.5 gap-y-1 pb-0.5 sm:gap-x-2 md:gap-x-3"
          >
            {genres.map((genre) => (
              <li
                key={genre}
                className="text-[8px] uppercase tracking-[0.16em] text-[#827b73] sm:text-[9px]"
              >
                {genre}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
};

export default ArtistRow;
