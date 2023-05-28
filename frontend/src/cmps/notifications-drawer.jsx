import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { gUsers } from "../assets/services.js/user-service";
import { Avatar, Backdrop } from "@mui/material";
import { useSelector } from "react-redux";
import { toggleNotificationsDrawer } from "../store/user.action";
import { useNavigate } from "react-router-dom";

export default function NotificationsDrawer() {
  const isNotificationsOpen = useSelector(
    (storeState) => storeState.userModule.isNotificationsOpen
  );
  const user = useSelector((storeState) => storeState.userModule.user);
  const users = useSelector((storeState) => storeState.userModule.users);

  const navigate = useNavigate();

  const otherUsers = gUsers.filter((u) => u.id !== user?.id);

  function goToOtherProfile(chosenUser) {
    let navigatedUser = users.filter((u) => u.id === chosenUser.by.id);
    console.log(navigatedUser[0].username);
    navigate(`/instagram/${navigatedUser[0].username}`, {
      state: { otherUser: navigatedUser[0] },
    });
    toggleNotificationsDrawer(false);
  }
  const style = {
    width: "349px",
    padding: "40px 24px 0px 24px",
    zIndex: 1000,
  };
  const [text, setText] = useState("");

  useEffect(() => {
    toggleDrawer("left", isNotificationsOpen);
  }, [isNotificationsOpen]);

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleClose = (event, reason) => {
    toggleNotificationsDrawer(false);
    if (reason && reason === "backdropClick") return;
  };
  const list = () => (
    <Box
      sx={style}
      role="presentation"
      // onClick={toggleDrawer("left", false)}
      // onKeyDown={toggleDrawer("left", false)}
    >
      <div className="search-drawer">
        <h2 className="title">Notifications</h2>
        <Divider />
        <div className="notifications-list">
          {user?.notifications?.map((n) => (
            <div key={n.id}>
              <div
                className="notification-row"
                onClick={() => goToOtherProfile(n)}>
                <Avatar src={n.by.imgUrl} alt="user" />
                <span style={{ marginRight: "12px" }}>{n.by.fullname}</span>
                <span>{n.type}</span>
              </div>
              <Divider />
            </div>
          ))}
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Drawer anchor={"left"} open={isNotificationsOpen}>
          {list()}
        </Drawer>
        <Backdrop
          sx={{
            left: "400px",
            height: "100%",
            color: "#ffffff",
            opacity: 0.1,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isNotificationsOpen}
          onClick={handleClose}></Backdrop>
      </React.Fragment>
    </div>
  );
}
