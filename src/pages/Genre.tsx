import RankedGenre from "../components/Genre-components/RankedGenre";
import { mockGenreCloud } from "../data/mockData";

export default function Genre() {
  return (
    <main className="min-h-[calc(100vh-57px)] overflow-hidden bg-[radial-gradient(ellipse_at_52%_35%,#101010_0%,#090909_55%,#070707_100%)] px-[3.2vw] pb-[72px] text-[#e9e6e2] max-[700px]:px-5 max-[700px]:pb-12">
      <header className="relative h-3 border-t border-white/10 max-[700px]:h-[10px]">
        <span className="absolute left-[5.4%] top-0 h-1.5 w-[17px] [clip-path:polygon(20%_0,80%_0,80%_50%,100%_100%,0_100%,20%_50%)] bg-[#e7e4df] max-[700px]:left-[5%]" aria-hidden="true" />
        <span className="absolute right-[14%] top-0 h-0.5 w-[65px] bg-[#e8e5df] max-[700px]:right-[5%] max-[700px]:w-[42px]" aria-hidden="true" />
      </header>

      <section className="pt-[42px] max-[700px]:pt-9" aria-labelledby="genre-title">
        <p className="m-0 font-sans text-[8px] font-medium uppercase leading-[1.4] tracking-[.22em] text-[#696662]">You are, above all</p>
        <h1 id="genre-title" className="mb-[44px] mt-[22px] font-serif text-[clamp(76px,8vw,126px)] font-light italic leading-[.92] tracking-[-.075em] max-[700px]:mb-[34px] max-[700px]:mt-5 max-[700px]:text-[clamp(76px,20vw,112px)]">Pop</h1>
        <div className="flex min-h-[106px] max-w-[1500px] flex-wrap content-start items-baseline gap-x-[clamp(11px,1.2vw,20px)] gap-y-0 tracking-[-.055em] text-[#bbb9b6] max-[700px]:min-h-0 max-[700px]:gap-x-3 max-[700px]:gap-y-[5px]" aria-label="Your top genres">
          {mockGenreCloud.map(({ name, style }, index) => (
            <span
              className={`whitespace-nowrap leading-none max-[700px]:text-[clamp(19px,5.6vw,25px)] ${style}`}
              key={`${name}-${index}`}
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      <RankedGenre />
    </main>
  );
}
