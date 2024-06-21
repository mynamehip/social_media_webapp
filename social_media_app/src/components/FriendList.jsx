import React from "react";

import avatar from "../assets/img/blankavatar.png";

const FriendList = () => {
  return (
    <div className="bg-glass flex-1 overflow-y-scroll no-scrollbar p-2 flex flex-col gap-2">
      <div className="h-16 flex gap-4 items-center bg-white p-2 rounded-xl">
        <img
          src={avatar}
          alt=""
          className=" h-14 w-14 object-cover rounded-full"
        />
        <div>
          <div className=" text-base font-semibold">Ahihi</div>
          <div className=" text-xs">Ahuhu</div>
        </div>
      </div>
      <div className="h-16 flex gap-4 items-center bg-white p-2 rounded-xl">
        <img
          src={avatar}
          alt=""
          className=" h-14 w-14 object-cover rounded-full"
        />
        <div>
          <div className=" text-base font-semibold">Ahihi</div>
          <div className=" text-xs">Ahuhu</div>
        </div>
      </div>
      <div className="h-16 flex gap-4 items-center bg-white p-2 rounded-xl">
        <img
          src={avatar}
          alt=""
          className=" h-14 w-14 object-cover rounded-full"
        />
        <div>
          <div className=" text-base font-semibold">Ahihi</div>
          <div className=" text-xs">Ahuhu</div>
        </div>
      </div>
      <div className="h-16 flex gap-4 items-center bg-white p-2 rounded-xl">
        <img
          src={avatar}
          alt=""
          className=" h-14 w-14 object-cover rounded-full"
        />
        <div>
          <div className=" text-base font-semibold">Ahihi</div>
          <div className=" text-xs">Ahuhu</div>
        </div>
      </div>
      <div className="h-16 flex gap-4 items-center bg-white p-2 rounded-xl">
        <img
          src={avatar}
          alt=""
          className=" h-14 w-14 object-cover rounded-full"
        />
        <div>
          <div className=" text-base font-semibold">Ahihi</div>
          <div className=" text-xs">Ahuhu</div>
        </div>
      </div>
      <div className="h-16 flex gap-4 items-center bg-white p-2 rounded-xl">
        <img
          src={avatar}
          alt=""
          className=" h-14 w-14 object-cover rounded-full"
        />
        <div>
          <div className=" text-base font-semibold">Ahihi</div>
          <div className=" text-xs">Ahuhu</div>
        </div>
      </div>
      <div className="h-16 flex gap-4 items-center bg-white p-2 rounded-xl">
        <img
          src={avatar}
          alt=""
          className=" h-14 w-14 object-cover rounded-full"
        />
        <div>
          <div className=" text-base font-semibold">Ahihi</div>
          <div className=" text-xs">Ahuhu</div>
        </div>
      </div>
    </div>
  );
};

export default FriendList;
