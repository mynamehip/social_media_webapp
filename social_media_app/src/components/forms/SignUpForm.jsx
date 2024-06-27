import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Input from "../ui/Input";
import Button from "../ui/Button";
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
    console.log(formData);
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
    <div className="md:p-10 p-5 lg:w-2/5 sm:w-3/5 w-full mx-5 bg-glass">
      <h1 className="text-[34px] font-bold pb-5">Sign Up</h1>
      <Input
        label="Name"
        name="username"
        pattern="^[A-Za-z0-9]{3,16}$"
        errorMessage={formError.username}
        onChange={handleInputChange}
        handleValidate={handleValidate}
      ></Input>
      <Input
        label="Email"
        name="email"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
        errorMessage={formError.email}
        onChange={handleInputChange}
        handleValidate={handleValidate}
      ></Input>
      <Input
        label="Password"
        isPassword
        name="password"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]*"
        errorMessage={formError.password}
        onChange={handleInputChange}
        handleValidate={handleValidate}
      ></Input>
      <div className="flex gap-10 mt-5">
        <Button fill onClick={handleSubmit}>
          {!loading ? "Sign Up" : "Loading..."}
        </Button>
        <Button onClick={switchForm}>Sign In</Button>
      </div>
    </div>
  );
};

export default SignUpForm;
