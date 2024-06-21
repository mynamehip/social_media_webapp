import React from "react";
import { TbLogout, TbSettings } from "react-icons/tb";

const SettingBar = () => {
  return (
    <div className=" w-28 h-10 bg-glass flex text-2xl text-white items-center px-5 gap-5">
      <TbSettings />
      <TbLogout />
    </div>
  );
};

export default SettingBar;
