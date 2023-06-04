import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import ChatBoxReciever, { ChatBoxSender } from "./chat-box";
import { useMediaQuery } from "@mui/material";

export function Chat({ messageList, room }) {
  const user = useSelector((storeState) => storeState.userModule.user);
  const isMobile = useMediaQuery("(max-width:480px)");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: isMobile ? "73%" : "80%",
        maxHeight: isMobile ? "73%" : "80%",
        zIndex: "0",
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
