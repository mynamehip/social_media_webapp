import React, { useState, useEffect, useRef, useContext } from "react";

import ListUserBox from "../userList/ListUserBox";
import { UserContext } from "../../../layouts/Home";
import { getNewUsers } from "../../../actions/userAction";

//import { listData } from "../../data/fakeList";

const TopList = () => {
  const [newUsers, setNewUsers] = useState([]);
  const [numberUser, setNumberUser] = useState(10);
  const [loadAble, setLoadAble] = useState(true);

  const loadRef = useRef();

  const user = useContext(UserContext);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getNewUsers(numberUser);
        const newUserList = res.data;
        setNewUsers(newUserList.filter((item) => item.id !== user?.id));
        if (res.data.length < numberUser) {
          setLoadAble(false);
          loadRef.current.innerText = "No more for loading";
        }
      } catch (error) {
        console.log(error);
      }
    };

    load();
    // eslint-disable-next-line
  }, [numberUser, loadAble]);

  const handleLoad = () => {
    if (loadAble === true) {
      setNumberUser((prev) => prev + 5);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em]">New Connections</h3>
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
      </div>
      
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-1">
        <ListUserBox users={newUsers} />
        
        {loadAble && (
          <button
            className="w-full py-3 mt-2 text-xs font-bold text-primary-600 hover:bg-primary-50 rounded-xl transition-smooth"
            ref={loadRef}
            onClick={handleLoad}
          >
            Show more people
          </button>
        )}
        
        {!loadAble && (
          <div className="text-center py-4 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
            You're all caught up
          </div>
        )}
      </div>
    </div>
  );
};

export default TopList;
