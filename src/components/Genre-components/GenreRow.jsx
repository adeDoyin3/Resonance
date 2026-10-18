const GenreRow = ({ rank, name, barWidth }) => (<div className="grid min-h-[30px] grid-cols-[30px_minmax(130px,1fr)_minmax(100px,11%)] items-center pl-[15px] max-[700px]:min-h-9 max-[700px]:grid-cols-[28px_minmax(0,1fr)_minmax(55px,21%)] max-[700px]:pl-0">
    <span className="font-serif text-[10px] text-[#6f6c67]">{rank}</span>
    <span className="font-sans text-xs leading-[1.2] text-[#e3e0dc]">{name}</span>
    <span className="h-px w-full bg-white/[0.06]" aria-hidden="true">
      <span className="block h-px bg-[#45423f]" style={{ width: barWidth }}/>
    </span>
  </div>);
export default GenreRow;
