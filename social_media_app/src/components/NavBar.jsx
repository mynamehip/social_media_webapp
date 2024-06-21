import React from "react";
import { AiFillHome, AiFillFire, AiFillRead, AiFillBell } from "react-icons/ai";

const NavBar = () => {
  return (
    <div className=" w-full bg-glass h-10 text-white flex justify-around items-center text-2xl ">
      <AiFillHome />
      <AiFillFire />
      <AiFillRead />
      <AiFillBell />
    </div>
  );
};

export default NavBar;
