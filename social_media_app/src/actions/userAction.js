import * as UserAPI from "../api/userRequest";

export const getNewUsers = async (number) => {
  try {
    const response = await UserAPI.getNewUsers(number);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllFollower = async (userId) => {
  try {
    const response = await UserAPI.getAllFollower(userId);
    return response;
  } catch (error) {
    throw error;
  }
};

// export const getAllFollowing = async (userId) => {
//   try {
//     const response = await UserAPI.getAllFollowing(userId);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const followUser = async (followerId, followingId) => {
//   try {
//     const response = await UserAPI.followUser(followerId, followingId);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const unfollowUser = async (followerId, followingId) => {
//   try {
//     const response = await UserAPI.unfollowUser(followerId, followingId);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

export const getAllFollowing = (userId) => async (dispatch) => {
  try {
    const res = await UserAPI.getAllFollowing(userId);
    dispatch({ type: "SET_FOLLOWING", payload: res.data });
  } catch (e) {
    console.log(e);
  }
};

export const followUser = (followerId, user) => async (dispatch) => {
  try {
    await UserAPI.followUser(followerId, user.id);
    dispatch({ type: "ADD_FOLLOWING", payload: user });
  } catch (e) {
    console.log(e);
  }
};

export const unfollowUser = (followerId, user) => async (dispatch) => {
  try {
    await UserAPI.unfollowUser(followerId, user.id);
    dispatch({ type: "REMOVE_FOLLOWING", payload: user.id });
  } catch (e) {
    console.log(e);
  }
};
