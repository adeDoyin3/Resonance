export type MockTrack = {
  rank: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
};

export type MockArtist = {
  rank: string;
  name: string;
  genres: string[];
};

export type MockRankedGenre = {
  rank: string;
  name: string;
  barWidth: string;
};

export type MockGenreCloudItem = {
  name: string;
  style: string;
};

export type MockArtworkTheme =
  | "ember"
  | "studio"
  | "night"
  | "neon"
  | "sand"
  | "violet"
  | "lavender";

export type MockRecentlyPlayed = MockTrack & {
  playedAgo: string;
  artwork: MockArtworkTheme;
};

export const mockTracks: MockTrack[] = [
  { rank: "01", title: "As It Was", artist: "Harry Styles", album: "Harry's House", duration: "2:37" },
  { rank: "02", title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20" },
  { rank: "03", title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23" },
  { rank: "04", title: "Flowers", artist: "Miley Cyrus", album: "Endless Summer Vacation", duration: "3:20" },
  { rank: "05", title: "Heat Waves", artist: "Glass Animals", album: "Dreamland", duration: "3:59" },
  { rank: "06", title: "good 4 u", artist: "Olivia Rodrigo", album: "SOUR", duration: "2:58" },
  { rank: "07", title: "Save Your Tears", artist: "The Weeknd", album: "After Hours", duration: "3:35" },
  { rank: "08", title: "Anti-Hero", artist: "Taylor Swift", album: "Midnights", duration: "3:20" },
  { rank: "09", title: "Stay", artist: "The Kid LAROI, Justin Bieber", album: "F*CK LOVE 3: OVER YOU", duration: "2:21" },
  { rank: "10", title: "Sunflower", artist: "Post Malone, Swae Lee", album: "Spider-Man: Into the Spider-Verse", duration: "2:38" },
  { rank: "11", title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line", duration: "2:54" },
  { rank: "12", title: "drivers license", artist: "Olivia Rodrigo", album: "SOUR", duration: "4:02" },
  { rank: "13", title: "Shivers", artist: "Ed Sheeran", album: "=", duration: "3:27" },
  { rank: "14", title: "Don't Start Now", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:03" },
  { rank: "15", title: "About Damn Time", artist: "Lizzo", album: "Special", duration: "3:11" },
  { rank: "16", title: "Peaches", artist: "Justin Bieber, Daniel Caesar, Giveon", album: "Justice", duration: "3:18" },
  { rank: "17", title: "Bad Habits", artist: "Ed Sheeran", album: "=", duration: "3:50" },
  { rank: "18", title: "Industry Baby", artist: "Lil Nas X, Jack Harlow", album: "MONTERO", duration: "3:32" },
  { rank: "19", title: "Kiss Me More", artist: "Doja Cat, SZA", album: "Planet Her", duration: "3:28" },
  { rank: "20", title: "Until I Found You", artist: "Stephen Sanchez", album: "Easy On My Eyes", duration: "2:57" },
];

export const mockRecentlyPlayed: MockRecentlyPlayed[] = [
  { rank: "01", title: "As It Was", artist: "Harry Styles", album: "Harry's House", duration: "2:37", playedAgo: "12m ago", artwork: "ember" },
  { rank: "02", title: "Kill Bill", artist: "SZA", album: "SOS", duration: "2:33", playedAgo: "15m ago", artwork: "studio" },
  { rank: "03", title: "Anti-Hero", artist: "Taylor Swift", album: "Midnights", duration: "3:20", playedAgo: "19m ago", artwork: "night" },
  { rank: "04", title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", playedAgo: "23m ago", artwork: "neon" },
  { rank: "05", title: "Heat Waves", artist: "Glass Animals", album: "Dreamland", duration: "3:59", playedAgo: "48m ago", artwork: "sand" },
  { rank: "06", title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", playedAgo: "1h ago", artwork: "violet" },
  { rank: "07", title: "Lavender Haze", artist: "Taylor Swift", album: "Midnights", duration: "3:22", playedAgo: "1h ago", artwork: "lavender" },
];

export const mockArtists: MockArtist[] = [
  { rank: "01", name: "Harry Styles", genres: ["Pop", "Indie pop", "Soft rock"] },
  { rank: "02", name: "The Weeknd", genres: ["R&B", "Pop", "Synth-pop"] },
  { rank: "03", name: "Dua Lipa", genres: ["Pop", "Dance-pop", "Disco"] },
  { rank: "04", name: "Taylor Swift", genres: ["Pop", "Synth-pop", "Country"] },
  { rank: "05", name: "Olivia Rodrigo", genres: ["Pop", "Pop rock", "Alt-pop"] },
  { rank: "06", name: "SZA", genres: ["R&B", "Neo-soul", "Alternative R&B"] },
  { rank: "07", name: "Drake", genres: ["Hip-hop", "Rap", "R&B"] },
  { rank: "08", name: "Billie Eilish", genres: ["Alt-pop", "Electropop", "Indie pop"] },
  { rank: "09", name: "Ariana Grande", genres: ["Pop", "R&B", "Dance-pop"] },
  { rank: "10", name: "Bad Bunny", genres: ["Latin trap", "Reggaeton", "Latin pop"] },
];

export const mockGenreCloud: MockGenreCloudItem[] = [
  { name: "Pop", style: "font-serif text-[clamp(42px,4.5vw,67px)] font-light text-[#e7e4df]" },
  { name: "Synth-Pop", style: "font-sans text-[clamp(36px,4vw,58px)] font-normal" },
  { name: "Indie Pop", style: "font-sans text-[clamp(28px,3.2vw,44px)] font-normal text-[#aaa8a5]" },
  { name: "R&B", style: "font-serif text-[clamp(28px,3.2vw,44px)] font-light" },
  { name: "Alternative", style: "font-sans text-[clamp(28px,3.2vw,44px)] font-normal text-[#aaa8a5]" },
  { name: "Dance Pop", style: "font-sans text-[clamp(22px,2.35vw,34px)]" },
  { name: "Soul", style: "font-serif text-[clamp(22px,2.35vw,34px)] font-light" },
  { name: "Art Pop", style: "font-sans text-[clamp(22px,2.35vw,34px)]" },
  { name: "Pop", style: "font-sans text-[clamp(22px,2.35vw,34px)] text-[#777572]" },
  { name: "Electropop", style: "font-sans text-[clamp(22px,2.35vw,34px)] text-[#777572]" },
  { name: "Neo-Soul", style: "font-serif text-[clamp(22px,2.35vw,34px)] font-light text-[#777572]" },
];

export const mockGenres: MockRankedGenre[] = [
  { rank: "01", name: "Pop", barWidth: "100%" },
  { rank: "02", name: "Synth-Pop", barWidth: "86%" },
  { rank: "03", name: "Indie Pop", barWidth: "73%" },
  { rank: "04", name: "R&B", barWidth: "66%" },
  { rank: "05", name: "Alternative", barWidth: "56%" },
  { rank: "06", name: "Dance Pop", barWidth: "48%" },
  { rank: "07", name: "Soul", barWidth: "39%" },
  { rank: "08", name: "Art Pop", barWidth: "32%" },
  { rank: "09", name: "Electropop", barWidth: "25%" },
  { rank: "10", name: "Neo-Soul", barWidth: "19%" },
];
