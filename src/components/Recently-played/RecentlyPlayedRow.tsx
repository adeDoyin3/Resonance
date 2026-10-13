import type { MockRecentlyPlayed } from "../../data/mockData";

type RecentlyPlayedRowProps = {
  title: string;
  artist: string;
  playedAgo: string;
  album?: string;
  artwork: MockRecentlyPlayed["artwork"];
};

const artworkStyles: Record<MockRecentlyPlayed["artwork"], string> = {
  ember: "from-[#27171d] via-[#823b2d] to-[#11131a]",
  studio: "from-[#151617] via-[#745136] to-[#251b18]",
  night: "from-[#090c39] via-[#5522a1] to-[#10091f]",
  neon: "from-[#063f68] via-[#1494a6] to-[#341053]",
  sand: "from-[#5d4435] via-[#aa8a70] to-[#29252d]",
  violet: "from-[#190b48] via-[#4c21a1] to-[#11102a]",
  lavender: "from-[#31213f] via-[#72518b] to-[#1c1428]",
};

const RecentlyPlayedRow = ({ title, artist, playedAgo, album, artwork }: RecentlyPlayedRowProps) => (
  <article className="flex min-h-[71px] items-center justify-between gap-5 border-b border-white/[0.055] py-2.5 pr-2 sm:min-h-[72px] sm:pr-3">
    <div className="flex min-w-0 items-center gap-4">
      <div
        className={`relative grid h-[46px] w-[46px] shrink-0 place-items-center overflow-hidden rounded-[3px] border border-white/10 bg-gradient-to-br ${artworkStyles[artwork]} shadow-[0_5px_18px_rgba(0,0,0,.35)]`}
        role="img"
        aria-label={`${album ?? title} cover artwork`}
      >
        <span className="absolute -right-2 top-1 h-8 w-8 rotate-[-20deg] rounded-full bg-[#d35a2e]/80 blur-[1px]" />
        <span className="relative max-w-[38px] overflow-hidden text-center font-sans text-[6px] font-black uppercase leading-[1.05] tracking-[.12em] text-[#f0e7db]">
          {album ?? title}
        </span>
        <span className="absolute bottom-1 left-1 h-px w-3/5 bg-white/50" />
      </div>
      <div className="min-w-0">
        <h2 className="truncate font-sans text-[12px] font-medium leading-5 text-[#e7e5e2]">{title}</h2>
        <p className="truncate font-sans text-[10px] leading-4 text-[#777572]">{artist}</p>
      </div>
    </div>
    <time className="w-14 shrink-0 text-right font-sans text-[9px] text-[#575552]">{playedAgo}</time>
  </article>
);

export default RecentlyPlayedRow;
