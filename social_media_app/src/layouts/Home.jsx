import React, { useState } from "react";

import SearchBar from "../components/ui/SearchBar";
import TopList from "../components/TopList";
import ProfileBox from "../components/ProfileBox";
import FriendList from "../components/FriendList";
import SettingBar from "../components/SettingBar";
import NavBar from "../components/NavBar";
import PostBox from "../components/PostBox";
import NewPostBox from "../components/NewPostBox";

//import pic from "../assets/img/signupimg.jpg";

const Home = () => {
  const [isOpenNewPost, setOpenNewPost] = useState(false);
  const handleOpenNewPost = () => {
    setOpenNewPost(!isOpenNewPost);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#00F260] to-[#0575E6] p-5 pb-0 flex md:gap-5">
      {isOpenNewPost && (
        <NewPostBox handleOpenNewPost={handleOpenNewPost}></NewPostBox>
      )}

      <div className="left md:block hidden lg:w-3/12 md:w-4/12 h-full sticky top-5">
        <div className="flex flex-col h-full justify-between gap-5 pb-5">
          <SearchBar></SearchBar>
          <TopList></TopList>
          <SettingBar></SettingBar>
        </div>
      </div>
      <div className="middle lg:w-6/12 md:w-8/12 w-full flex-1 flex flex-col gap-5">
        <NavBar></NavBar>
        <PostBox></PostBox>
      </div>
      <div className="right lg:block hidden lg:w-3/12 h-full sticky top-5">
        <div className="flex flex-col h-full justify-between gap-5 pb-5">
          <ProfileBox handleOpenNewPost={handleOpenNewPost}></ProfileBox>
          <FriendList></FriendList>
        </div>
      </div>
    </div>
  );
};

export default Home;
