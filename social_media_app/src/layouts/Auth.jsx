import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="bgGradient w-screen h-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default Auth;
