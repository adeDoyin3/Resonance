const RecentlyPlayedRow = ({ title, artist, playedAgo, album, imageUrl }) => (<article className="flex min-h-[71px] items-center justify-between gap-5 border-b border-white/[0.055] py-2.5 pr-2 sm:min-h-[72px] sm:pr-3">
    <div className="flex min-w-0 items-center gap-4">
      <div className="grid h-[46px] w-[46px] shrink-0 place-items-center overflow-hidden rounded-[3px] border border-white/10 bg-[#151515] shadow-[0_5px_18px_rgba(0,0,0,.35)]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${album ?? title} cover artwork`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <span
            className="max-w-[38px] overflow-hidden text-center font-sans text-[6px] font-black uppercase leading-[1.05] tracking-[.12em] text-[#f0e7db]"
            role="img"
            aria-label={`${album ?? title} cover artwork unavailable`}
          >
            {album ?? title}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <h2 className="truncate font-sans text-[12px] font-medium leading-5 text-[#e7e5e2]">{title}</h2>
        <p className="truncate font-sans text-[10px] leading-4 text-[#777572]">{artist}</p>
      </div>
    </div>
    <time className="w-14 shrink-0 text-right font-sans text-[9px] text-[#575552]">{playedAgo}</time>
  </article>);
export default RecentlyPlayedRow;
