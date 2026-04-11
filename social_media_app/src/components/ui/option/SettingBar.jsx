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
    <div className="w-full pt-4 border-t border-gray-100 flex flex-col gap-1">
      <button className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-xl transition-smooth group">
        <TbSettings size={22} className="text-gray-400 group-hover:text-primary-600 transition-colors" />
        <span className="text-sm font-bold antialiased">Settings</span>
      </button>
      
      {user === null ? (
        <button 
          onClick={handleLogin}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-xl transition-smooth group"
        >
          <TbUserCircle size={22} className="text-gray-400 group-hover:text-primary-600 transition-colors" />
          <span className="text-sm font-bold antialiased">Login</span>
        </button>
      ) : (
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-smooth group"
        >
          <TbLogout size={22} className="text-red-400 group-hover:text-red-600 transition-colors" />
          <span className="text-sm font-bold antialiased">Logout</span>
        </button>
      )}
    </div>
  );
};

export default SettingBar;
