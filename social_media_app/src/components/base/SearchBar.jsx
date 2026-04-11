import React, { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";

import ListUserBox from "../ui/userList/ListUserBox";
import { searchUser } from "../../actions/searchAction";

import { FaSearch } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

const SearchBar = ({ sideButtonMethod }) => {
  const [userName, setUserName] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (!userName.length > 0) {
      setUserList([]);
    }
  }, [userName]);

  const handleSearch = async () => {
    if (!userName.length > 0) {
      toast.error("Can not empty!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
    try {
      const res = await searchUser(userName);
      setUserList(res.data);
    } catch (e) {
      console.log(e.response);
      if (e.response.status === 404) {
        toast.error("Can found!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      }
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-2 items-center">
        {sideButtonMethod && (
          <button
            className="text-gray-400 hover:text-gray-600 transition-colors lg:hidden p-2"
            onClick={sideButtonMethod}
          >
            <FaCircleXmark size={20} />
          </button>
        )}
        <div className="flex-1 relative group">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full h-11 bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-smooth text-sm font-medium"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            className="absolute top-1/2 -translate-y-1/2 left-3 p-1.5 text-gray-400 group-focus-within:text-primary-600 transition-colors"
            onClick={handleSearch}
          >
            <FaSearch size={16} />
          </button>
        </div>
      </div>
      
      {userList.length > 0 && (
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl mt-4 p-2 max-h-64 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="px-3 py-1.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">Search Results</span>
          </div>
          <ListUserBox users={userList} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
