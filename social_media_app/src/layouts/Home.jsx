import React from "react";

import SearchBar from "../components/ui/SearchBar";
import TopList from "../components/TopList";
import ProfileBox from "../components/ProfileBox";
import FriendList from "../components/FriendList";

//import pic from "../assets/img/signupimg.jpg";

const Home = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#00F260] to-[#0575E6] p-5 pb-0 flex md:gap-5">
      <div className="left md:block hidden lg:w-3/12 md:w-4/12 h-full sticky top-5">
        <div className="flex flex-col h-full justify-between gap-5 pb-5">
          <SearchBar></SearchBar>
          <TopList></TopList>
        </div>
      </div>
      <div className="middle bg-white lg:w-6/12 md:w-8/12 w-full flex-1"></div>
      <div className="right lg:block hidden lg:w-3/12 h-full sticky top-5">
        <div className="flex flex-col h-full justify-between gap-5 pb-5">
          <ProfileBox></ProfileBox>
          <FriendList></FriendList>
        </div>
      </div>
    </div>
  );
};

export default Home;
