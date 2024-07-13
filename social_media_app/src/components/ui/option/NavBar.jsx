import React, { useContext, useState } from "react";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { AiFillRead, AiFillBell } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../layouts/Home";

const NavBar = () => {
  const user = useContext(UserContext) || {};

  const [activeIcon, setActiveIcon] = useState("home");

  const navigate = useNavigate();
  const switchToHome = (value, icon) => {
    navigate(value, { replace: true });
    setActiveIcon(icon);
  };

  const hightlightIcon = (icon) => {
    return activeIcon === icon ? "bg-[#ffffff80]" : "";
  };

  return (
    <div className="w-full bg-glass h-10 text-white flex items-center text-2xl px-2">
      <div
        onClick={() => switchToHome("/", "home")}
        className={` w-1/4 flex justify-center hover:bg-[#ffffff80] rounded-2xl ${hightlightIcon(
          "home"
        )} `}
      >
        <FaHome />
      </div>
      <div
        onClick={() => switchToHome(`/profile/${user?.id}`, "profile")}
        className={` w-1/4 flex justify-center hover:bg-[#ffffff80] rounded-2xl ${hightlightIcon(
          "profile"
        )}`}
      >
        <FaUserCircle />
      </div>
      <div
        onClick={() => switchToHome(`/chat`, "chat")}
        className={`w-1/4 flex justify-center hover:bg-[#ffffff80] rounded-2xl ${hightlightIcon(
          "chat"
        )}`}
      >
        <AiFillRead />
      </div>
      <div className=" w-1/4 flex justify-center hover:bg-[#ffffff80] rounded-2xl">
        <AiFillBell />
      </div>
    </div>
  );
};

export default NavBar;
