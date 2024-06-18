import React from "react";

import { listData } from "../data/fakeList";

const TopList = () => {
  return (
    <div className="bg-glass flex-1 overflow-hidden">
      <div className=" font-bold text-3xl pl-5 pt-5">Trend for you</div>
      <div className="p-5">
        {listData.map((data, index) => (
          <div key={index}>
            <div className=" font-semibold">{data.content}</div>
            <div className=" pl-2 text-gray-600">#{data.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopList;
