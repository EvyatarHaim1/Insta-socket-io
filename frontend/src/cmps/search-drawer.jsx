import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { gUsers } from "../assets/services.js/user-service";
import { Avatar, Backdrop } from "@mui/material";
import close from "../assets/icons/search-close.svg";
import closeGray from "../assets/icons/closeGray.svg";
import { useSelector } from "react-redux";
import { toggleSearchDrawer } from "../store/user.action";
import AutocompleteInput from "./input-autocomplete";
import { useNavigate } from "react-router-dom";

export default function SearchDrawer() {
  const isSearchOpen = useSelector(
    (storeState) => storeState.userModule.isSearchOpen
  );
  const user = useSelector((storeState) => storeState.userModule.user);
  const navigate = useNavigate();

  const otherUsers = gUsers?.filter((u) => u.id !== user?.id);

  function goToOtherProfile(u) {
    navigate(`/instagram/${u?.username}`, { state: { otherUser: u } });
    toggleSearchDrawer(false);
  }
  const style = {
    width: "349px",
    padding: "40px 24px 0px 24px",
    zIndex: 1000,
  };
  const [text, setText] = useState("");

  useEffect(() => {
    toggleDrawer("left", isSearchOpen);
  }, [isSearchOpen]);

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
    toggleSearchDrawer(false);
    if (reason && reason === "backdropClick") return;
  };
  const list = () => (
    <Box sx={style} role="presentation">
      <div className="search-drawer">
        <h2 className="title">Search</h2>
        <div className="search-input">
          <AutocompleteInput />
          <div className="closeBtnAvatar">
            <img src={close} alt="close" className="closeImg" />
          </div>
        </div>
        <Divider />
        <div className="list">
          <div className="first-row">
            <span className="recentTxt">Recent</span>
            <span className="clearAlltxt">Clear all</span>
          </div>
          {otherUsers?.map((u) => (
            <div key={u?.id}>
              <div className="row" onClick={() => goToOtherProfile(u)}>
                <Avatar src={u?.imgUrl} alt="user" />
                <div className="details-user">
                  <span>{u?.username}</span>
                  <span>{u?.fullname}</span>
                </div>
                <img src={closeGray} alt="" />
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
        <Drawer anchor={"left"} open={isSearchOpen}>
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
          open={isSearchOpen}
          onClick={handleClose}></Backdrop>
      </React.Fragment>
    </div>
  );
}
