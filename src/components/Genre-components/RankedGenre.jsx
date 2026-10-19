import GenreRow from "./GenreRow";
const RankedGenre = ({ genres = [] }) => {
  const highestScore = genres[0]?.score ?? 0;

  return (<section className="mt-[42px] border-t border-white/[0.09] pt-[39px] max-[700px]:mt-[34px] max-[700px]:pt-7" aria-labelledby="genre-breakdown-title">
    <p className="m-0 font-sans text-[8px] font-medium uppercase leading-[1.4] tracking-[.22em] text-[#696662]" id="genre-breakdown-title">Full breakdown</p>
    <div className="mt-[22px] max-[700px]:mt-[18px]">
      {genres.length ? genres.map((genre, index) => (
        <GenreRow
          key={genre.name}
          rank={String(index + 1).padStart(2, "0")}
          name={genre.name}
          artistCount={genre.artistCount}
          barWidth={`${Math.max(5, (genre.score / highestScore) * 100)}%`}
        />
      )) : <p className="py-4 text-sm text-[#77736e]">No genre data found for this listening period.</p>}
    </div>
  </section>);
};
export default RankedGenre;
