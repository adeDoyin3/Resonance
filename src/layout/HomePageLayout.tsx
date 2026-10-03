import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared-components/Navbar";
import Hero from "../components/shared-components/Hero";
const HomePageLayout = () => {
  return (
    <div className="min-h-screen  text-white">
      <Navbar />
      <Hero  />
      <Outlet />
    </div>
  );
};

export default HomePageLayout;
