import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { TbLogout, TbSettings, TbUserCircle } from "react-icons/tb";
import { signOut } from "../../../actions/authAction";
import { UserContext } from "../../../layouts/Home";

const SettingBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useContext(UserContext);

  const handleLogin = () => {
    navigate("/sign-in");
  };

  const handleLogout = () => {
    dispatch(signOut(navigate));
  };

  return (
    <div className=" w-full h-10 bg-glass flex text-2xl text-white items-center px-5 gap-5">
      <TbSettings />
      {user === null ? (
        <TbUserCircle onClick={handleLogin} />
      ) : (
        <TbLogout onClick={handleLogout} />
      )}
    </div>
  );
};

export default SettingBar;
