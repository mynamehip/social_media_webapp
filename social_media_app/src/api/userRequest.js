import { hostAPI, token } from ".";

export const getUser = async (id) =>
  await hostAPI.get(`/api/User/GetUser?userId=${id}`);

export const getNewUsers = async (number) =>
  await hostAPI.get(`/api/User/GetNewUsers?count=${number}`);

export const getUserActivities = async (userId) => {
  return await hostAPI.get(`/api/User/GetUserActivities?userId=${userId}`);
};

export const getAllFollower = async (userId) => {
  return await hostAPI.get(`/api/User/GetAllFollower?userId=${userId}`);
};

export const getAllFollowing = async (userId) => {
  return await hostAPI.get(`/api/User/GetAllFollowing?userId=${userId}`);
};

export const followUser = async (followerId, followingId) => {
  return await hostAPI.post(
    `/api/User/FollowUser?followerId=${followerId}&followingId=${followingId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );
};

export const unfollowUser = async (followerId, followingId) => {
  return await hostAPI.delete(
    `/api/User/UnfollowUser?followerId=${followerId}&followingId=${followingId}`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );
};

export const changeImage = async (formData) => {
  return await hostAPI.put("/api/User/ChangeUserImage", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token()}`,
    },
  });
};
