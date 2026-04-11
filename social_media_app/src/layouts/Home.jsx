import React, { createContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import SearchBar from "../components/base/SearchBar";
import TopList from "../components/ui/userList/TopList";
import ProfileBox from "../components/ui/profile/ProfileBox";
import FriendList from "../components/ui/userList/FriendList";
import SettingBar from "../components/ui/option/SettingBar";
import NavBar from "../components/ui/option/NavBar";
import MiniSideMenu from "../components/ui/option/MiniSideMenu";
import { useSelector } from "react-redux";
import Button from "../components/base/Button";
//import NewPostBox from "../components/ui/NewPostBox";

export const UserContext = createContext();

//import pic from "../assets/img/signupimg.jpg";

const Home = () => {
  const user = useSelector((state) => {
    return state.authReducer?.data?.user ?? null;
  });

  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <UserContext.Provider value={user}>
      <div className="w-full h-screen bg-[#F1F5F9] flex justify-center font-inter overflow-hidden">
        <div className="w-full max-w-[1440px] flex h-full overflow-hidden">
          {/* Left Sidebar */}
          <aside className="lg:block hidden lg:w-[280px] xl:w-[300px] h-full p-6 border-r border-gray-200/50 bg-white shrink-0">
            <div className="flex flex-col h-full gap-8">
              <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-600/20">
                  S
                </div>
                <span className="text-xl font-extrabold tracking-tight text-gray-900">SMWA</span>
              </div>
              <SearchBar />
              <div className="flex-1 overflow-y-auto no-scrollbar">
                <TopList />
              </div>
              <SettingBar />
            </div>
          </aside>

          {/* Main Feed Area */}
          <main className="flex-1 h-full flex flex-col items-center overflow-y-auto bg-[#F1F5F9]">
            <div className="w-full max-w-[740px] min-h-full flex flex-col gap-6 p-4 md:p-6 pb-20">
              <NavBar handleOpenMenu={() => setOpenSideMenu((prev) => !prev)} />
              <div className="flex-1">
                <Outlet />
              </div>
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className="xl:block hidden xl:w-[320px] h-full p-6 bg-white shrink-0">
            {user === null ? (
              <div className="h-full flex items-center justify-center text-center p-8 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <div className="space-y-4">
                  <p className="text-gray-500 font-medium whitespace-pre-wrap">Connect with friends and join the conversation.</p>
                  <Link to={"/sign-in"} className="block">
                    <Button fill css="w-full py-3">Sign In Now</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full gap-6">
                <ProfileBox />
                <div className="flex-1 overflow-y-auto no-scrollbar">
                  <FriendList />
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Mobile Menu Overlay */}
        <MiniSideMenu
          handleOpenMenu={() => setOpenSideMenu((prev) => !prev)}
          openSideMenu={openSideMenu}
        />
      </div>
    </UserContext.Provider>
  );
};

export default Home;
