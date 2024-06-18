import React from "react";

const InputWithLabel = ({ label }) => {
  return (
    <div>
      {label && (
        <label htmlFor={label} className=" font-semibold">
          {label}
        </label>
      )}
      <input
        id={label}
        type="text"
        className="boder border-b-2 bg-transparent border-b-slate-950 outline-none focus:outline-none w-full px-2"
      />
    </div>
  );
};

export default InputWithLabel;
