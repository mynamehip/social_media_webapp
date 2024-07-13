import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../layouts/Home";
import {
  TbArrowBigUp,
  TbArrowBigDown,
  TbArrowBigUpFilled,
  TbArrowBigDownFilled,
} from "react-icons/tb";
import {
  getVoteById,
  getAllVote,
  votePost,
  updateVote,
  deleteVote,
} from "../../../actions/postAction";

const VoteBox = ({ post }) => {
  const [voteValue, setVoteValue] = useState(0);
  const [votedNumber, setVotedNumber] = useState({
    up: 0,
    down: 0,
  });

  const user = useContext(UserContext);

  const getVote = async () => {
    try {
      const response = await getAllVote(post.postId);
      setVotedNumber({
        up: response.data.upVotes,
        down: response.data.downVotes,
      });
    } catch (error) {
      console.log(error);
    }

    try {
      if (user !== null) {
        const response = await getVoteById(user.id, post.postId);
        if (response.status === 200) {
          setVoteValue(response.data.value);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVote();
    // eslint-disable-next-line
  }, []);

  const handleVoteAction = async (actionType, newVoteValue) => {
    try {
      if (actionType === "vote") {
        await votePost({
          value: newVoteValue,
          postId: post.postId,
          userId: user.id,
        });
      } else if (actionType === "update") {
        await updateVote({
          value: newVoteValue,
          postId: post.postId,
          userId: user.id,
        });
      } else if (actionType === "delete") {
        await deleteVote(user.id, post.postId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVote = (value) => {
    setVoteValue((prevVoteValue) => {
      let actionType;
      let newVoteValue;

      if (prevVoteValue === value) {
        actionType = "delete";
        newVoteValue = 0;
        updateVotedNumber(value, -1);
      } else if (prevVoteValue === 0) {
        actionType = "vote";
        newVoteValue = value;
        updateVotedNumber(value, 1);
      } else {
        actionType = "update";
        updateVotedNumber(prevVoteValue, -1);
        updateVotedNumber(value, 1);
        newVoteValue = value;
      }

      handleVoteAction(actionType, newVoteValue);
      return newVoteValue;
    });
  };

  const updateVotedNumber = (value, delta) => {
    if (value === 1) {
      setVotedNumber((prev) => ({ ...prev, up: prev.up + delta }));
    } else if (value === -1) {
      setVotedNumber((prev) => ({ ...prev, down: prev.down + delta }));
    }
  };

  return (
    <div className="flex items-center">
      <div className="text-xl pr-1">
        <div onClick={() => handleVote(1)}>
          {voteValue === 1 ? <TbArrowBigUpFilled /> : <TbArrowBigUp />}
        </div>
      </div>
      {votedNumber.up}
      <div className="text-xl pl-5 pr-1">
        <div onClick={() => handleVote(-1)}>
          {voteValue === -1 ? <TbArrowBigDownFilled /> : <TbArrowBigDown />}
        </div>
      </div>
      {votedNumber.down}
    </div>
  );
};

export default VoteBox;
