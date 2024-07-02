import { hostAPI, token } from ".";

export const getNewUsers = async (number) =>
  hostAPI.get(`/api/User/GetNewUsers?count=${number}`);

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
