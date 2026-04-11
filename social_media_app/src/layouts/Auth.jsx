import React from "react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#f0f2f5] p-5">
      <div className="w-full max-w-[1000px] h-full max-h-[700px] flex rounded-3xl shadow-2xl overflow-hidden bg-white">
        {/* Left Side: Graphic / Branding */}
        <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-12 bg-gradient-to-br from-primary-500 to-primary-600 text-white relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-[-15%] left-[-15%] w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-white/20 rounded-full blur-3xl"></div>
          
          <div className="z-10 text-center animate-in slide-in-from-bottom-5 duration-700">
            <h1 className="text-5xl font-extrabold mb-6 font-inter tracking-tight">SMWA</h1>
            <p className="text-lg opacity-90 max-w-[280px] mx-auto leading-relaxed">
              Join our community to connect with friends, share moments, and explore what's happening around the world.
            </p>
          </div>
        </div>
        
        {/* Right Side: Form Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12 bg-white relative overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;
