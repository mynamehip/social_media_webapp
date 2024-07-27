import React from "react";
import { Outlet } from "react-router-dom";
import { WatchHubProvider } from "../components/ui/watch/WatchContext";

const Watch = () => {
  return (
    <WatchHubProvider>
      <Outlet></Outlet>
    </WatchHubProvider>
  );
};

export default Watch;
