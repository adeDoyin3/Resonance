import GenreRow from "./GenreRow";
import { mockGenres } from "../../data/mockData";
const RankedGenre = () => (<section className="mt-[42px] border-t border-white/[0.09] pt-[39px] max-[700px]:mt-[34px] max-[700px]:pt-7" aria-labelledby="genre-breakdown-title">
    <p className="m-0 font-sans text-[8px] font-medium uppercase leading-[1.4] tracking-[.22em] text-[#696662]" id="genre-breakdown-title">Full breakdown</p>
    <div className="mt-[22px] max-[700px]:mt-[18px]">
      {mockGenres.map(({ rank, name, barWidth }) => (<GenreRow key={rank} rank={rank} name={name} barWidth={barWidth}/>))}
    </div>
  </section>);
export default RankedGenre;
