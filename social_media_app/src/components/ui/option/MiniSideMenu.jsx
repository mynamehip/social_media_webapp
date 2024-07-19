import React from "react";

import SearchBar from "../../base/SearchBar";
import TopList from "../userList/TopList";
import SettingBar from "../option/SettingBar";

import { FaCircleXmark } from "react-icons/fa6";

const MiniSideMenu = ({ handleOpenMenu, openSideMenu }) => {
  return (
    <div
      className={` absolute md:w-1/2 w-full h-full bg-black px-5 pt-5 top-0 left-0 transform transition-transform ease-in-out duration-300 ${
        openSideMenu ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full justify-between gap-5 pb-5">
        <div className=" flex gap-3 items-center">
          <div className=" text-white text-2xl" onClick={handleOpenMenu}>
            <FaCircleXmark />
          </div>
          <div className=" flex-1">
            <SearchBar></SearchBar>
          </div>
        </div>
        <TopList></TopList>
        <SettingBar></SettingBar>
      </div>
    </div>
  );
};

export default MiniSideMenu;
