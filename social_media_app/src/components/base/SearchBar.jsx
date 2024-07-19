import React, { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";

import ListUserBox from "../ui/userList/ListUserBox";
import { searchUser } from "../../actions/searchAction";

import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
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
    <div className={` flex flex-col max-h-1/2 overflow-hidden`}>
      <div className=" flex relative">
        <input
          type="search"
          placeholder="Search..."
          name=""
          id=""
          className=" h-10 flex-1 bg-white/50 border-2 border-white/40 rounded-full pl-10 pr-3 focus:outline-none"
          onChange={(e) => setUserName(e.target.value)}
        />
        <button
          className=" text-white absolute top-1/2 -translate-y-1/2 left-1 rounded-full p-2 hover:bg-white/50"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
      </div>
      {userList.length > 0 && (
        <div className=" bg-glass flex-1 rounded-2xl mt-2 pt-2">
          <ListUserBox users={userList}></ListUserBox>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
