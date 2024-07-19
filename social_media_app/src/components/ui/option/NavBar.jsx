import React, { useContext, useState } from "react";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { FaMessage, FaClapperboard, FaBars } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../layouts/Home";
import { useChatContext } from "../chat/ChatContext";

const NavBar = ({ handleOpenMenu }) => {
  const user = useContext(UserContext) || {};

  const { hasNewMessages } = useChatContext();

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
    <div className=" flex gap-2">
      <div
        className=" lg:hidden h-10 w-10 text-white flex items-center text-2xl"
        onClick={handleOpenMenu}
      >
        <FaBars />
      </div>
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
          className={`w-1/4 text-xl flex justify-center hover:bg-[#ffffff80] rounded-2xl ${hightlightIcon(
            "chat"
          )}`}
        >
          <div className=" relative">
            <FaMessage />
            {hasNewMessages === true ? (
              <div className=" w-4 h-4 rounded-full bg-red-500 absolute top-[-0.5rem] right-[-0.5rem]"></div>
            ) : null}
          </div>
        </div>
        <div className=" w-1/4 flex justify-center hover:bg-[#ffffff80] rounded-2xl">
          <FaClapperboard />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
