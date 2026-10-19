import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useGetUserTopGenres } from "../queries/user";
import RankedGenre from "../components/Genre-components/RankedGenre";

const TIME_RANGES = [
  { value: "short_term", label: "Last 4 weeks" },
  { value: "medium_term", label: "Last 6 months" },
  { value: "long_term", label: "All time" },
];

const CLOUD_STYLES = [
  "font-serif font-light italic text-[#e7e4df]",
  "font-sans font-normal text-[#bbb9b6]",
  "font-sans font-normal text-[#aaa8a5]",
  "font-serif font-light text-[#c7c4bf]",
  "font-sans font-normal text-[#aaa8a5]",
  "font-sans font-normal text-[#96938f]",
  "font-serif font-light text-[#96938f]",
  "font-sans font-normal text-[#85827e]",
];

export default function Genre() {
  const [timeRange, setTimeRange] = useState("medium_term");
  const { accessToken } = useAuth();
  const { data: genres = [], isPending, isError, error } =
    useGetUserTopGenres(timeRange);

  if (!accessToken) {
    return (
      <main className="min-h-[calc(100vh-57px)] px-5 py-8 text-sm text-[#99938b]">
        Connect your Spotify account to see your top genres.
      </main>
    );
  }

  if (isPending) {
    return (
      <main className="min-h-[calc(100vh-57px)] px-5 py-8 text-sm text-[#99938b]">
        Loading your top genres...
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-[calc(100vh-57px)] px-5 py-8">
        <p role="alert" className="text-sm text-[#f2f0ec]">
          {error.message}
        </p>
      </main>
    );
  }

  const featuredGenres = genres.slice(0, 12);
  const topGenre = genres[0];

  return (
    <main className="min-h-[calc(100vh-57px)] overflow-hidden bg-[radial-gradient(ellipse_at_52%_35%,#101010_0%,#090909_55%,#070707_100%)] px-[3.2vw] pb-[72px] text-[#e9e6e2] max-[700px]:px-5 max-[700px]:pb-12">
      <header className="relative h-3 border-t border-white/10 max-[700px]:h-[10px]">
        <span
          className="absolute left-[5.4%] top-0 h-1.5 w-[17px] [clip-path:polygon(20%_0,80%_0,80%_50%,100%_100%,0_100%,20%_50%)] bg-[#e7e4df] max-[700px]:left-[5%]"
          aria-hidden="true"
        />
        <span
          className="absolute right-[14%] top-0 h-0.5 w-[65px] bg-[#e8e5df] max-[700px]:right-[5%] max-[700px]:w-[42px]"
          aria-hidden="true"
        />
      </header>

      <section className="pt-[42px] max-[700px]:pt-9" aria-labelledby="genre-title">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="m-0 font-sans text-[8px] font-medium uppercase leading-[1.4] tracking-[.22em] text-[#696662]">
            Your sound, by the numbers
          </p>
          <div className="flex items-center">
            <label
              htmlFor="genre-time-range"
              className="mr-3 text-[9px] uppercase tracking-[.16em] text-[#77736e]"
            >
              Listening period
            </label>
            <select
              id="genre-time-range"
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
        </div>

        <h1
          id="genre-title"
          className="mb-[44px] mt-[22px] font-serif text-[clamp(76px,8vw,126px)] font-light italic leading-[.92] tracking-[-.075em] max-[700px]:mb-[34px] max-[700px]:mt-5 max-[700px]:text-[clamp(76px,20vw,112px)]"
        >
          {topGenre?.name ?? "Your genres"}
        </h1>

        {featuredGenres.length ? (
          <div
            className="flex min-h-[106px] max-w-[1500px] flex-wrap content-start items-baseline gap-x-[clamp(11px,1.2vw,20px)] gap-y-1 tracking-[-.055em] text-[#bbb9b6] max-[700px]:min-h-0 max-[700px]:gap-x-3 max-[700px]:gap-y-[5px]"
            aria-label="Your top genres"
          >
            {featuredGenres.map((genre, index) => (
              <span
                className={`whitespace-nowrap leading-none max-[700px]:text-[clamp(19px,5.6vw,25px)] ${CLOUD_STYLES[index % CLOUD_STYLES.length]}`}
                style={{
                  fontSize: `clamp(${Math.max(21, 44 - index * 2)}px, ${Math.max(1.8, 3.6 - index * 0.14)}vw, ${Math.max(28, 62 - index * 3)}px)`,
                }}
                key={genre.name}
              >
                {genre.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#77736e]">
            Spotify hasn’t returned genre tags for your top artists yet.
          </p>
        )}

        <p className="mt-3 text-[9px] uppercase tracking-[.14em] text-[#696662]">
          Genre presence across your top 50 artists
        </p>
      </section>

      <RankedGenre genres={genres} />
    </main>
  );
}
