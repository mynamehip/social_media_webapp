import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Input from "../base/Input";
import Button from "../base/Button";
import { signUp } from "../../actions/authAction";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);

  const switchForm = () => {
    navigate("/sign-in");
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [formError, setFormError] = useState({
    username: "",
    email: "",
    password: "",
  });
  const errorList = {
    username:
      "Username should be 3-16 characters and shouldn't include any special character!",
    email: "Incorrectly formatted emails!",
    password:
      "Password must be at least 8 characters long, include uppercase letter, lowercase letter, number, and special character!",
  };
  const handleValidate = (e) => {
    const value = e.target.value;
    if (value === "") {
      setFormError({ ...formError, [e.target.name]: "Cannot be empty!" });
    }
    const regex = new RegExp(e.target.pattern);
    if (!regex.test(value)) {
      setFormError({ ...formError, [e.target.name]: errorList[e.target.name] });
      console.log(formError);
    } else {
      setFormError((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
    }
  };

  function checkError(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== "") {
        return false; // Nếu có thuộc tính không rỗng, trả về false
      }
    }
    return true; // Nếu tất cả các thuộc tính đều rỗng, trả về true
  }

  const handleSubmit = () => {
    for (let key in formData) {
      if (formData.hasOwnProperty(key) && formData[key] === "") {
        return;
      }
    }
    if (checkError(formError)) {
      dispatch(signUp(formData, navigate));
    }
  };

  return (
    <div className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 font-inter tracking-tight">Create Account</h1>
        <p className="text-gray-500 text-sm">Sign up to get started.</p>
      </div>

      <div className="space-y-4">
        <Input
          label="Name"
          name="username"
          pattern="^[A-Za-z0-9]{3,16}$"
          errorMessage={formError.username}
          onChange={handleInputChange}
          handleValidate={handleValidate}
        />
        <Input
          label="Email"
          name="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          errorMessage={formError.email}
          onChange={handleInputChange}
          handleValidate={handleValidate}
        />
        <Input
          label="Password"
          isPassword
          name="password"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]*"
          errorMessage={formError.password}
          onChange={handleInputChange}
          handleValidate={handleValidate}
        />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <Button fill onClick={handleSubmit} css="w-full py-3 text-lg font-semibold hover:scale-[1.02] shadow-md transition-all">
          {!loading ? "Sign Up" : "Signing Up..."}
        </Button>
        <div className="text-center text-sm font-medium text-gray-500 mt-2">
          Already have an account?{" "}
          <button onClick={switchForm} className="text-primary-600 hover:text-primary-500 hover:underline transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
