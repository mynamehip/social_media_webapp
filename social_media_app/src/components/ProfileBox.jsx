import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "./ui/Button";

import avatar from "../assets/img/blankavatar.png";
import bg from "../assets/img/profilebackground.png";

const ProfileBox = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <div className="bg-glass min-h-80">
      <div className=" h-28 bg-blue-500 rounded-xl m-2 flex items-center justify-center overflow-hidden">
        <img src={bg} alt="" className="object-cover" />
        <img
          src={avatar}
          alt=""
          className=" absolute h-20 w-20 object-cover rounded-full top-20"
        />
      </div>
      <div className="flex flex-col items-center pt-10">
        <div className=" text-base font-semibold">Ahihi</div>
        <div className=" text-sm">Ahuhu</div>
      </div>
      <div className="flex justify-around m-4 p-2 border-t-2 border-b-2 border-white/40">
        <div className="flex flex-col items-center">
          <div className=" text-base font-semibold">Follower</div>
          <div className=" text-sm">5000000000</div>
        </div>
        <div className="flex flex-col items-center">
          <div className=" text-base font-semibold">Post</div>
          <div className=" text-sm">0</div>
        </div>
      </div>
      <div className="flex justify-center pb-2 items-center gap-5">
        <Button fill onClick={props.handleOpenNewPost}>
          New Post
        </Button>
        <Button fill onClick={handleClick}>
          Change Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileBox;
