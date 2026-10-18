import TrackRow from "./TrackRow";
import { mockTracks } from "../../data/mockData";
const formatDuration = (durationMs) => {
    const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
};
const RankedTrackList = ({ tracks }) => {
    const items = tracks?.length ? tracks : mockTracks;
    return (<section aria-label="Top tracks" className="mx-auto w-full  px-4 pb-12 sm:px-6 md:px-8 ">
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
          {items.length} tracks
        </span>
      </div>
      <div className="overflow-hidden rounded-md border border-white/[0.06]">
        {items.map((track, index) => {
            const spotifyTrack = track?.track ?? track;
            return (<TrackRow key={spotifyTrack.id ?? `${spotifyTrack.name}-${index}`} rank={String(index + 1).padStart(2, "0")} title={spotifyTrack.name ?? "Unknown track"} artist={spotifyTrack.artists?.[0]?.name ?? "Unknown artist"} album={spotifyTrack.album?.name ?? "Unknown album"} duration={formatDuration(spotifyTrack.duration_ms ?? 0)}/>);
        })}
      </div>
    </section>);
};
export default RankedTrackList;
