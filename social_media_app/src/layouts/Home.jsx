import React, { createContext } from "react";
import { Link, Outlet } from "react-router-dom";

import SearchBar from "../components/base/SearchBar";
import TopList from "../components/ui/userList/TopList";
import ProfileBox from "../components/ui/profile/ProfileBox";
import FriendList from "../components/ui/userList/FriendList";
import SettingBar from "../components/ui/option/SettingBar";
import NavBar from "../components/ui/option/NavBar";
import { useSelector } from "react-redux";
//import NewPostBox from "../components/ui/NewPostBox";

export const UserContext = createContext();

//import pic from "../assets/img/signupimg.jpg";

const Home = () => {
  const user = useSelector((state) => {
    return state.authReducer?.data?.user ?? null;
  });

  return (
    <UserContext.Provider value={user}>
      <div className="w-full h-screen bg-gradient-to-br from-[#00F260] to-[#0575E6] p-5 pb-0 flex md:gap-5">
        <div className="left md:block hidden lg:w-3/12 md:w-4/12 h-full">
          <div className="flex flex-col h-full justify-between gap-5 pb-5">
            <SearchBar></SearchBar>
            <TopList></TopList>
            <SettingBar></SettingBar>
          </div>
        </div>
        <div className="middle lg:w-6/12 md:w-8/12 w-full flex-1 flex flex-col gap-5">
          <NavBar></NavBar>
          <Outlet></Outlet>
        </div>
        <div className="right lg:block hidden lg:w-3/12 h-full">
          {user === null ? (
            <div className="bg-glass h-full flex items-center justify-center text-center text-lg">
              <span>
                <Link to={"/sign-in"} className="underline text-blue-800">
                  Sign-in
                </Link>{" "}
                to know more
              </span>
            </div>
          ) : (
            <div className="flex flex-col h-full justify-between gap-5 pb-5">
              <ProfileBox></ProfileBox>
              <FriendList></FriendList>
            </div>
          )}
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default Home;
