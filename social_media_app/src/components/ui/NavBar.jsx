import React from "react";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { AiFillFire, AiFillRead, AiFillBell } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const switchToHome = (value) => {
    navigate(value, { replace: true });
  };

  return (
    <div className="w-full bg-glass h-10 text-white flex justify-around items-center text-2xl">
      <div onClick={() => switchToHome("/")}>
        <FaHome />
      </div>
      <div onClick={() => switchToHome("/profile")}>
        <FaUserCircle />
      </div>
      <AiFillFire />
      <AiFillRead />
      <AiFillBell />
    </div>
  );
};

export default NavBar;
