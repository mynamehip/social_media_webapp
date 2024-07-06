import React from "react";

import { hostURL } from "../../api";

import blankAvatar from "../../assets/img/blankavatar.png";

const Avatar = ({ avatar }) => {
  return (
    <div className=" h-full w-full">
      <img
        src={avatar === null ? blankAvatar : hostURL + avatar}
        alt=""
        className={` h-full w-full object-cover rounded-full`}
      />
    </div>
  );
};

export default Avatar;
