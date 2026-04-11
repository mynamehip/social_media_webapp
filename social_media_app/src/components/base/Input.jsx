import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  label,
  name,
  pattern,
  errorMessage,
  onChange,
  handleValidate,
  isPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Xử lý type của input: nếu là password thì dựa vào trạng thái showPassword, nếu không thì dùng type text (hoặc email dựa theo name)
  let inputType = "text";
  if (isPassword) {
    inputType = showPassword ? "text" : "password";
  } else if (name === "email") {
    inputType = "email";
  }

  return (
    <div className="mb-2">
      {label && (
        <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          name={name}
          onChange={onChange}
          pattern={pattern}
          onBlur={handleValidate}
          className={`w-full px-4 py-3 rounded-xl border ${
            errorMessage ? "border-red-500 ring-red-100" : "border-gray-200"
          } bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200`}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        )}
      </div>
      <div className="text-sm text-red-500 min-h-6 mt-1">{errorMessage}</div>
    </div>
  );
};

export default Input;
