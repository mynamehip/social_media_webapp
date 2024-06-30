import React from "react";

import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className=" flex relative h-10">
      <input
        type="search"
        placeholder="Search..."
        name=""
        id=""
        className=" flex-1 bg-white/50 border-2 border-white/40 rounded-full pl-10 pr-3 focus:outline-none"
      />
      <button className=" text-white absolute top-1/2 -translate-y-1/2 left-1 rounded-full p-2 hover:bg-white/50">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
