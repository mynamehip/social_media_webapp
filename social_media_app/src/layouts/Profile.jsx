import React, { useContext, useRef, useState } from "react";

import Avatar from "../components/base/Avatar";
import Button from "../components/base/Button";
import NewPostBox from "../components/ui/NewPostBox";
import UserInforBox from "../components/ui/UserInforBox";
import ChangeImageBox from "../components/ui/ChangeImageBox";

import { FaPen } from "react-icons/fa";
import { UserContext } from "./Home";
import { hostURL } from "../api";

const Profile = () => {
  const user = useContext(UserContext);
  const scrollDiv = useRef();

  if (user !== null) {
    user.cover = hostURL + user.cover;
  }

  const [isOpenNewPost, setOpenNewPost] = useState(false);
  const [type, setType] = useState();

  const handleOpenForm = (value) => {
    if (value !== null) {
      setType(value);
    }
    setOpenNewPost(!isOpenNewPost);
  };

  return (
    <div className="overflow-y-scroll w-full flex-1">
      {isOpenNewPost && (
        <ChangeImageBox
          type={type}
          handleOpenForm={handleOpenForm}
        ></ChangeImageBox>
      )}
      <div className=" space-y-5" id="scrollableDivRef" ref={scrollDiv}>
        <div className=" bg-glass rounded-xl">
          <div className=" relative max-h-80">
            <div className=" rounded-t-xl min-h-48 max-h-80 flex flex-col items-center justify-center overflow-hidden bg-white">
              <img
                src={user.cover ?? ""}
                alt=""
                className=" w-full object-cover"
              />
              <div
                className=" h-8 w-8 bg-black hover:bg-gray-500 text-white flex items-center justify-center rounded-full absolute right-2 bottom-2"
                onClick={() => handleOpenForm("cover")}
              >
                <FaPen></FaPen>
              </div>
              <div className=" h-28 w-28 absolute bottom-[-3.5rem] left-7 mb-1">
                <Avatar avatar={user.avatar}></Avatar>
                <div
                  className=" h-8 w-8 bg-black hover:bg-gray-500 text-white flex items-center justify-center rounded-full absolute right-0 bottom-1"
                  onClick={() => handleOpenForm("avatar")}
                >
                  <FaPen></FaPen>
                </div>
              </div>
            </div>
          </div>
          <div className=" py-2 pr-7 flex justify-end">
            <Button fill>Change information</Button>
          </div>
          <div className=" border-t-2 border-white/40">
            <UserInforBox></UserInforBox>
          </div>
          <div className="flex p-2 border-t-2 border-white/40">
            <div className=" w-1/3 p-1 flex flex-col items-center hover:cursor-pointer hover:bg-[#ffffff80] rounded-xl">
              <div className=" text-base font-semibold">Following</div>
              <div className=" text-sm">5000000000</div>
            </div>
            <div className=" w-1/3 p-1 flex flex-col items-center hover:cursor-pointer hover:bg-[#ffffff80] rounded-xl">
              <div className=" text-base font-semibold">Follower</div>
              <div className=" text-sm">5000000000</div>
            </div>
            <div className=" w-1/3 p-1 flex flex-col items-center hover:cursor-pointer hover:bg-[#ffffff80] rounded-xl">
              <div className=" text-base font-semibold">Post</div>
              <div className=" text-sm">0</div>
            </div>
          </div>
        </div>
        <div className=" ">
          <NewPostBox userId={user.id}></NewPostBox>
        </div>
      </div>
    </div>
  );
};

export default Profile;
