import RankedTrackList from "../components/Track-components/RankedTrackList";
import { getUserTopTracks } from "../service/user";
export default function Tracks() {
    const tracks = async () => {
        const track = await getUserTopTracks();
        console.log(track);
    };
    tracks();
    return (<main className="min-h-screen">
      <RankedTrackList tracks={tracks}/>
    </main>);
}
