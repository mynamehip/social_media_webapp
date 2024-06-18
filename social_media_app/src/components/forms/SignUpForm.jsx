import React from "react";
import { useNavigate } from "react-router-dom";

import Input from "../ui/InputWithLabel";
import Button from "../ui/Button";

// import pic from "../../assets/img/signupimg.jpg";

const SignUpForm = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/sign-in");
  };

  return (
    <div className="bgGradient w-screen h-screen flex items-center justify-center">
      <div className="md:w-3/5 w-4/5 bg-white/30 rounded-xl border-2 border-white/60 flex shadow-black shadow-2xl backdrop-blur-md">
        {/* <div className="md:w-2/5 w-0">
          <img src={pic} alt="" className="h-full object-cover" />
        </div> */}
        <div className="md:p-10 p-5 md:w-3/5 w-full space-y-10">
          <h1 className="text-[34px] font-bold">Sign up</h1>
          <Input label="Name"></Input>
          <Input label="Email"></Input>
          <Input label="Password"></Input>
          <div className="flex gap-5">
            <Button fill>Sign Up</Button>
            <Button onClick={handleClick}>Sign In</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
