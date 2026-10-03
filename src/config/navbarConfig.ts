type NavbarConfig = {
  label: string;
  path: string;
};

export const navbarConfig: NavbarConfig[] = [
  { label: "Track", path: "/track" },
  { label: "Artist", path: "/artist" },
  { label: "Genres", path: "/genres" },
  { label: "Albums", path: "/albums" },
  { label: "Recent", path: "/recent" },
];
