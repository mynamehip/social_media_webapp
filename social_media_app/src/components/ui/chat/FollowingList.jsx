import React from "react";
import { useSelector } from "react-redux";

import Avatar from "../../base/Avatar";

//import { getAllFollowing } from "../../../actions/userAction";

const FollowingList = ({ handleClickUser }) => {
  const following = useSelector((state) => state.followingReducer);

  //const dispatch = useDispatch();
  // useEffect(() => {
  //   const load = async () => {
  //     try {
  //       if (user !== null) dispatch(getAllFollowing(user.id));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   load();
  //   // eslint-disable-next-line
  // }, [dispatch, user.id]);

  return (
    <div className=" flex flex-col gap-3 pb-2 overflow-y-scroll no-scrollbar">
      {following?.map((item, index) => (
        <div
          key={index}
          className=" flex gap-4 items-center bg-white p-2 rounded-xl"
          onClick={() => handleClickUser(item.id)}
        >
          <div className=" h-12 w-12">
            <Avatar avatar={item.avatar}></Avatar>
          </div>
          <div>
            <div className=" text-base font-semibold">{item.userName}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FollowingList;
