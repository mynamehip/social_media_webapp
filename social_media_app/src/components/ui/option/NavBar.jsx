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

  const getIconClass = (icon) => {
    return activeIcon === icon 
      ? "text-primary-600 bg-primary-50 shadow-sm" 
      : "text-gray-400 hover:text-gray-600 hover:bg-gray-50";
  };

  return (
    <nav className="flex items-center gap-4 w-full sticky top-0 z-30 bg-[#F1F5F9]/80 backdrop-blur-md py-2">
      <div
        className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
        onClick={handleOpenMenu}
      >
        <FaBars size={24} />
      </div>
      
      <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-1 shadow-sm flex items-center justify-between">
        <button
          onClick={() => switchToHome("/", "home")}
          className={`flex-1 flex justify-center py-2.5 rounded-xl transition-smooth ${getIconClass("home")}`}
        >
          <FaHome size={22} />
        </button>
        
        <button
          onClick={() => switchToHome(`/profile/${user?.id}`, "profile")}
          className={`flex-1 flex justify-center py-2.5 rounded-xl transition-smooth ${getIconClass("profile")}`}
        >
          <FaUserCircle size={22} />
        </button>
        
        <button
          onClick={() => switchToHome(`/chat`, "chat")}
          className={`flex-1 flex justify-center py-2.5 rounded-xl transition-smooth relative ${getIconClass("chat")}`}
        >
          <FaMessage size={20} />
          {hasNewMessages && (
            <span className="absolute top-2 right-[35%] w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          )}
        </button>
        
        <button
          onClick={() => switchToHome(`/watch`, "watch")}
          className={`flex-1 md:flex hidden justify-center py-2.5 rounded-xl transition-smooth ${getIconClass("watch")}`}
        >
          <FaClapperboard size={20} />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
