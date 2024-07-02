import React, { useContext } from "react";

import { UserContext } from "../../layouts/Home";

import blankAvatar from "../../assets/img/blankavatar.png";

const Avatar = ({ avtar }) => {
  const user = useContext(UserContext);
  return (
    <div className=" h-full w-full">
      <img
        src={avtar ?? blankAvatar}
        alt=""
        className={` h-full w-full object-cover rounded-full`}
      />
    </div>
  );
};

export default Avatar;
