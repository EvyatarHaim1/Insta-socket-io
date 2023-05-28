import React from "react";
import Avatar from "@mui/material/Avatar";

export default function ChatBoxReciever({
  room,
  timestamp,
  userId,
  fullname,
  avatar,
  message,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
      }}>
      <Avatar size={50} src={avatar} />
      <div
        style={{
          padding: 10,
          backgroundColor: "#dcf8c6",
          borderRadius: 10,
          maxWidth: "60%",
        }}>
        <strong style={{ fontSize: 13 }}>{fullname}</strong> <br></br>
        <p>{message}</p>
        <p>{timestamp}</p>
      </div>
    </div>
  );
}

export function ChatBoxSender({
  room,
  timestamp,
  userId,
  fullname,
  avatar,
  message,
}) {
  return (
    <div
      style={{
        display: "flex",
        paddingRight: 10,
        justifyContent: "flex-end",
        flexDirection: "row",
      }}>
      <Avatar size={50} src={avatar} />
      <div
        style={{
          padding: 10,
          backgroundColor: "#fff",
          borderRadius: 10,
          maxWidth: "60%",
        }}>
        <strong style={{ fontSize: 13 }}>{fullname}</strong> <br></br>
        <p>{message}</p>
        <p>{timestamp}</p>
      </div>
    </div>
  );
}
