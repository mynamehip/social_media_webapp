import React from "react";

import ListUserBox from "./ListUserBox";

const FriendList = () => {
  return (
    <div className="bg-glass flex-1 overflow-y-scroll no-scrollbar pt-2 flex flex-col gap-2">
      <ListUserBox></ListUserBox>
    </div>
  );
};

export default FriendList;
