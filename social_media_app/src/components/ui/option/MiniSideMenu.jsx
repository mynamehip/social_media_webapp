import React from "react";

import SearchBar from "../../base/SearchBar";
import TopList from "../userList/TopList";
import SettingBar from "../option/SettingBar";

const MiniSideMenu = ({ handleOpenMenu, openSideMenu }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform ease-in-out duration-500 lg:hidden ${
        openSideMenu ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        onClick={handleOpenMenu}
      ></div>
      <div className="relative w-4/5 max-w-sm h-full bg-white shadow-2xl p-6 flex flex-col gap-8 overflow-y-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-primary-600/20">
            S
          </div>
          <span className="text-lg font-bold text-gray-900">SMWA</span>
        </div>
        
        <SearchBar sideButtonMethod={handleOpenMenu} />
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <TopList />
        </div>
        <SettingBar />
      </div>
    </div>
  );
};

export default MiniSideMenu;
