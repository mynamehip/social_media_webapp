import React from "react";
import Button from "../../base/Button";

const ConfrimDialog = ({ header, message, actionMethod, cancelMethod }) => {
  return (
    <div className=" absolute bg-white w-3/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl">
      <div className=" p-2 text-xl font-bold border-b-2">{header}</div>
      <div className=" max-h-28 m-2 text-lg overflow-hidden">{message}</div>
      <div className=" text-sm flex justify-end items-center gap-2 border-t-2 p-2">
        <Button onClick={cancelMethod}>Cancle</Button>
        <Button fill onClick={actionMethod}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ConfrimDialog;
