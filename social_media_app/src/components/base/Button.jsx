import React from "react";

const Button = ({ onClick, fill, disabled, ref, css, children }) => {
  const fillColor =
    "bg-primary-600 text-white hover:bg-transparent hover:text-primary-600";
  const nonFillColor = "text-primary-600 hover:bg-primary-600 hover:text-white";

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleClick}>
      <button
        onClick={onClick}
        disabled={disabled}
        ref={ref}
        className={`border border-primary-600 py-1 px-2 lg:py-2 lg:px-5 rounded-full font-bold ${
          fill ? fillColor : nonFillColor
        } ${css}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
