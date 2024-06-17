import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <div>Root</div>
      <Outlet />
    </div>
  );
};

export default RootLayout;
