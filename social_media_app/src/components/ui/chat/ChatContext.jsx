import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { getUnReaded } from "../../../actions/chatAction";
import { getUser } from "../../../actions/userAction";

const SignalRContext = createContext();

export const useChatContext = () => {
  return useContext(SignalRContext);
};

export const SignalRProvider = ({ children }) => {
  const user = useSelector((state) => {
    return state.authReducer?.data?.user ?? null;
  });

  const [connection, setConnection] = useState(null);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unread, setUnread] = useState([]);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const connect = async () => {
      if (user === null) {
        return;
      }

      const result = await getUnReaded(user?.id);
      if (result.data.length > 0) {
        setHasNewMessages(true);
        setUnread(result.data);
      }

      const conn = new HubConnectionBuilder()
        .withUrl(`https://localhost:7293/Chat?userId=${user?.id}`)
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      conn.on(
        "ReceiveMessage",
        (messageText, senderId, receiverId, timestamp) => {
          if (window.location.pathname.includes("/chat")) {
            changeChatList({ messageText, senderId, receiverId, timestamp });
          } else {
            setHasNewMessages(true);
            changeUnreadList({ messageText, senderId, receiverId, timestamp });
          }
        }
      );

      await conn.start();
      setConnection(conn);
    };

    connect();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
    // eslint-disable-next-line
  }, [user?.id]);

  const changeUnreadList = (value) => {
    setUnread((prev) => {
      if (!prev.some((e) => e.senderId === value.senderId)) {
        return [...prev, value];
      } else {
        return prev;
      }
    });
  };

  const changeChatList = (value) => {
    setChats((prev) => {
      const index = prev.findIndex((e) => e.id === value.senderId);

      if (index !== -1) {
        const element = prev[index];
        const updatedChats = prev.filter((_, i) => i !== index);
        return [element, ...updatedChats];
      } else {
        getUser(value.senderId).then((response) => {
          const newMessager = response.data;
          console.log(newMessager);
          setChats([
            {
              id: newMessager.id,
              avatar: newMessager.avatar,
              userName: newMessager.userName,
            },
            ...prev,
          ]);
        });
      }
    });

    setMessages((prevMessages) => {
      if (
        prevMessages.some(
          (e) =>
            e.senderId === value.senderId || e.receiverId === value.senderId
        )
      ) {
        return [...prevMessages, value];
      }
      changeUnreadList(value);
      return prevMessages;
    });
  };

  return (
    <SignalRContext.Provider
      value={{
        connection,
        hasNewMessages,
        setHasNewMessages,
        messages,
        setMessages,
        unread,
        setUnread,
        chats,
        setChats,
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
};
