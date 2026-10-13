import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/shared-components/Navbar";
import Hero from "../components/shared-components/Hero";
const HomePageLayout = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="min-h-screen  text-white">
      <Navbar />
      {/* <Hero title="Your listening" /> */}
      {location.pathname === "/track" ? (
        <Hero title="Your listening" />
      ) : location.pathname === "/artist" ? (
        <Hero title="Top Artist " />
      ) : location.pathname === "/genres" || location.pathname === "/recent" ? null : location.pathname === "/albums" ? (
        <Hero title="Top Albulm" />
      ) : (
        <Hero title="RECENT PLAYS" />
      )}
      <Outlet />
    </div>
  );
};

export default HomePageLayout;
