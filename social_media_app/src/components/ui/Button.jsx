import React from "react";

const Button = ({ onClick, fill, children }) => {
  return (
    <div>
      {fill ? (
        <button
          onClick={onClick}
          className="border bg-primary-600 border-primary-600 py-2 px-5 rounded-full font-bold text-white hover:bg-white hover:text-primary-600"
        >
          {children}
        </button>
      ) : (
        <button
          onClick={onClick}
          className="border border-primary-600 text-primary-600 py-2 px-5 rounded-full font-bold hover:bg-primary-600 hover:text-white"
        >
          {children}
        </button>
      )}
    </div>
  );
};

export default Button;
