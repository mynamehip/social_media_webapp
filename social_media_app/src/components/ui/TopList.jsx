import React, { useState, useEffect, useRef, useContext } from "react";

import ListUserBox from "./ListUserBox";
import { UserContext } from "../../layouts/Home";
import { getNewUsers } from "../../actions/userAction";

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
        setNewUsers(newUserList.filter((item) => item.id !== user.id));
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
    // <div className="bg-glass flex-1 overflow-hidden">
    //   <div className=" font-bold text-3xl pl-5 pt-5">Trend for you</div>
    //   <div className="p-5">
    //     {listData.map((data, index) => (
    //       <div key={index}>
    //         <div className=" font-semibold">{data.content}</div>
    //         <div className=" pl-2 text-gray-600">#{data.name}</div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="bg-glass flex-1 overflow-hidden">
      <div className=" h-[10%] font-bold text-3xl pl-5 flex items-center">
        New users
      </div>
      <div className=" h-[90%] overflow-auto no-scrollbar pb-2">
        <ListUserBox users={newUsers}></ListUserBox>
        <div
          className=" text-center text-blue-800 font-semibold hover:cursor-default"
          ref={loadRef}
          onClick={handleLoad}
        >
          Load more...
        </div>
      </div>
    </div>
  );
};

export default TopList;
