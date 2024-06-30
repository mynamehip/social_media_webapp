import React from "react";

import blankAvatar from "../../assets/img/blankavatar.png";

const Avatar = ({ size, avatar }) => {
  return (
    <div>
      <img
        src={avatar ?? blankAvatar}
        alt=""
        className={` h-${size} w-${size} object-cover rounded-full top-20`}
      />
    </div>
  );
};

export default Avatar;
