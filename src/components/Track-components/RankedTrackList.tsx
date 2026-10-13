import TrackRow from "./TrackRow";
import { mockTracks } from "../../data/mockData";
import { useFilter } from "../../hooks/useFilter";

const RankedTrackList = () => {
  // const filteredTracks = useFilter(mockTracks, (data) => {
  //   data.filter(d=>d.)
  // });
  return (
    <section
      aria-label="Top tracks"
      className="mx-auto w-full  px-4 pb-12 sm:px-6 md:px-8 "
    >
      <div className="mb-3 flex items-end justify-between px-1 sm:mb-4 ">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#77736e]">
            Your rotation
          </p>
          <h2 className="mt-1 font-serif text-xl text-[#f2f0ec] sm:text-2xl">
            Top tracks
          </h2>
        </div>
        <span className="text-[10px] uppercase tracking-[0.16em] text-[#77736e]">
          20 tracks
        </span>
      </div>
      <div className="overflow-hidden rounded-md border border-white/[0.06]">
        {mockTracks.map((track, i) => (
          <TrackRow key={track.rank} {...track} />
        ))}
      </div>
    </section>
  );
};

export default RankedTrackList;
