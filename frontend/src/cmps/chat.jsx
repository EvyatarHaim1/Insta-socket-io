import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import ChatBoxReciever, { ChatBoxSender } from "./chat-box";

export function Chat({ messageList, room }) {
  const user = useSelector((storeState) => storeState.userModule.user);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "80%",
        maxHeight: "80%",
        overflowY: "scroll",
      }}>
      {messageList?.map((chat) => (
        <div key={uuidv4()}>
          {chat?.fullname === user?.fullname ? (
            <ChatBoxSender
              room={room}
              timestamp={chat.timestamp}
              userId={chat.userId}
              fullname={chat.fullname}
              avatar={chat.avatar}
              message={chat.message}
            />
          ) : (
            <ChatBoxReciever
              room={room}
              timestamp={chat.timestamp}
              userId={chat.userId}
              fullname={chat.fullname}
              avatar={chat.avatar}
              message={chat.message}
            />
          )}
        </div>
      ))}
    </div>
  );
}
