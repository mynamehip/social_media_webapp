import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "../base/Button";
import Avatar from "../base/Avatar";

const ProfileBox = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <div className="bg-glass min-h-80">
      <div onClick={handleClick}>
        <div className=" h-28 bg-white rounded-xl m-2 flex items-center justify-center overflow-hidden">
          {props.cover && (
            <img src={props.cover} alt="" className="object-cover" />
          )}
          <div className="absolute h-20 w-20 object-cover rounded-full top-20">
            <Avatar></Avatar>
          </div>
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
      </div>
      <div className="flex justify-center pb-4 items-center">
        <Button fill onClick={props.handleOpenNewPost}>
          New Post
        </Button>
      </div>
    </div>
  );
};

export default ProfileBox;
