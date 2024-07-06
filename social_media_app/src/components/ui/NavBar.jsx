import React, { useContext } from "react";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { AiFillRead, AiFillBell } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../layouts/Home";

const NavBar = () => {
  const user = useContext(UserContext);

  const navigate = useNavigate();
  const switchToHome = (value) => {
    navigate(value, { replace: true });
  };

  return (
    <div className="w-full bg-glass h-10 text-white flex items-center text-2xl px-2">
      <div
        onClick={() => switchToHome("/")}
        className=" w-1/4 flex justify-center hover:bg-[#ffffff80] rounded-2xl"
      >
        <FaHome />
      </div>
      <div
        onClick={() => switchToHome(`/profile/${user.id}`)}
        className=" w-1/4 flex justify-center hover:bg-[#ffffff80] rounded-2xl"
      >
        <FaUserCircle />
      </div>
      <div className=" w-1/4 flex justify-center hover:bg-[#ffffff80] rounded-2xl">
        <AiFillRead />
      </div>
      <div className=" w-1/4 flex justify-center hover:bg-[#ffffff80] rounded-2xl">
        <AiFillBell />
      </div>
    </div>
  );
};

export default NavBar;
