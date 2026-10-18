const TrackRow = ({ rank = "01", title = "As It Was", artist = "Harry Styles", album = "Harry's House", duration = "2:37", }) => {
    return (<article className="group grid min-h-[106px] grid-cols-[48px_56px_minmax(0,1fr)_42px] items-center gap-4 border-b border-white/[0.06] bg-gradient-to-r from-[#111111] to-[#0c0c0c] px-5 transition-colors duration-200 hover:from-[#171717] hover:to-[#101010] sm:grid-cols-[64px_56px_minmax(0,1fr)_48px] sm:gap-5 sm:px-6 md:min-h-[108px] md:grid-cols-[80px_56px_minmax(0,1fr)_52px] md:gap-6 md:px-8">
      <span className={`font-serif text-[34px] font-light leading-none tracking-[-0.06em] text-[#8d8b88] sm:text-[42px] md:text-[48px] `} style={{
            color: Number(rank) === 1
                ? "rgba(237,234,228,0.65)"
                : Number(rank) < 4
                    ? "rgba(237,234,228,0.3)"
                    : "rgba(237,234,228,0.07)",
        }}>
        {rank}
      </span>

      <div aria-label={`${album} album artwork`} role="img" className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[3px] border border-white/10 bg-[#c9c6bf] shadow-[0_5px_18px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-[5px] flex items-center justify-center overflow-hidden bg-[#23333a]">
          <span className="-rotate-90 whitespace-nowrap font-serif text-[10px] font-light tracking-[0.16em] text-[#df4935]">
            {album}
          </span>
          <span className="absolute -right-2 bottom-1 h-6 w-6 rounded-full bg-[#dc4c27]"/>
        </div>
      </div>

      <div className="min-w-0 ">
        <h2 className="truncate font-serif text-[15px] font-semibold leading-5 text-[#f2f0ec] sm:text-base">
          {title}
        </h2>
        <p className="mt-1 truncate text-[10px] leading-4 tracking-wide text-[#77736e] sm:text-[11px]">
          {artist}
          <span className="mx-1.5 text-[#484540]">·</span>
          <span className="mx-1.5 text-[#484540]">{album}</span>
        </p>
      </div>

      <time className="text-right text-[9px] tabular-nums text-[#77736e] sm:text-[10px]">
        {duration}
      </time>
    </article>);
};
export default TrackRow;
