import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { gUsers } from "../assets/services.js/user-service.js";
import { SwitchAcoountsModal } from "../cmps/switch-accounts-modal.jsx";
import { openSwitchUsersModal, updateUser } from "../store/user.action.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Suggestions() {
  const user = useSelector((storeState) => storeState.userModule.user);
  let allUsersExceptMe = gUsers?.filter((u) => u?.id !== user?.id);
  const [lastFourUsers, setLastFourUsers] = useState(
    allUsersExceptMe?.slice(Math.max(allUsersExceptMe.length - 4, 0))
  );
  const navigate = useNavigate();

  let defaultImg =
    "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png";

  function addFollow(u) {
    let updatedUser = {
      ...user,
      following: [
        ...user.following,
        {
          id: u.id,
          fullname: u.fullname,
          imgUrl: u.imgUrl,
        },
      ],
    };
    updateUser(updatedUser);
    let removeElement = lastFourUsers.indexOf(u);
    setLastFourUsers(lastFourUsers.slice(removeElement));
  }

  return (
    <div className="suggestion-container">
      <SwitchAcoountsModal />
      <div className="main-avatar">
        <Stack onClick={() => navigate(`/instagram/${user?.username}`)}>
          <Avatar
            alt="user"
            src={user ? user.imgUrl : defaultImg}
            sx={{
              width: 56,
              height: 56,
              marginRight: "12px",
            }}
          />
        </Stack>
        <div className="user-details-top">
          <span className="user-fullname">{user ? user.fullname : ""}</span>
          <span className="user-bio">{user ? user.bio : ""}</span>
        </div>
        <button className="switch-btn" onClick={openSwitchUsersModal}>
          Switch
        </button>
      </div>
      <div className="suggestions-for-you">
        <span className="title">Suggestions for you</span>
        <span className="see-all-btn">See All</span>
      </div>
      <div className="suggestions-users">
        <ul>
          {lastFourUsers?.map((u) => (
            <li className="user-suggestion" key={u?.id}>
              <Stack>
                <Avatar alt={u.username} src={u.imgUrl} />
              </Stack>
              <div className="user-details">
                <div className="user-fullname">{u.username}</div>
                {u?.followers[0] && (
                  <div>Followed by {u?.followers[0]?.fullname}</div>
                )}
              </div>
              <button className="follow-btn" onClick={() => addFollow(u)}>
                Follow
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
