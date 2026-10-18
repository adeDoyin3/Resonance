import { mockRecentlyPlayed } from "../../data/mockData";
import RecentlyPlayedRow from "./RecentlyPlayedRow";
const RecentlyPlayedTable = () => (<section className="w-full max-w-[660px]" aria-label="Recently played tracks">
    {mockRecentlyPlayed.map((track) => (<RecentlyPlayedRow key={`${track.title}-${track.artist}`} title={track.title} artist={track.artist} album={track.album} playedAgo={track.playedAgo} artwork={track.artwork}/>))}
  </section>);
export default RecentlyPlayedTable;
