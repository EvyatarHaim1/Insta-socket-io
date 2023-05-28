import React from "react";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";

export function UserMessage({
  u,
  setUserToMsg,
  room,
  setRoom,
  joinRoom,
  setMessageList,
}) {
  const user = useSelector((storeState) => storeState.userModule.user);

  const onJoinToChat = () => {
    setUserToMsg(u);
    setRoom(room);
    let currentRoomChats = user?.messages?.find((r) => r.room === room);
    setMessageList(currentRoomChats?.list);
    joinRoom(room);
  };
  return (
    <div className="user-message" onClick={onJoinToChat}>
      <Avatar
        sx={{
          width: "56px",
          height: "56px",
        }}
        src={u?.avatar}
        alt="user"
      />
      <div className="details-user">
        <div>{u?.fullname}</div>
        <span>{u?.message}</span>
        <span> • {u?.timestamp}</span>
      </div>
    </div>
  );
}
