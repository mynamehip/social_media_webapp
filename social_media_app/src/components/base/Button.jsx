import React from "react";

const Button = ({ onClick, fill, disabled, css, children }) => {
  const fillColor =
    "bg-primary-600 text-white hover:bg-transparent hover:text-primary-600";
  const nonFillColor = "text-primary-600 hover:bg-primary-600 hover:text-white";

  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`border border-primary-600 py-2 px-5 rounded-full font-bold ${
          fill ? fillColor : nonFillColor
        } ${css}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
