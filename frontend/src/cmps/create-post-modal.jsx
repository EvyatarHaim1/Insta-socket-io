import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import { ImgUploader } from "./img-uploader.jsx";
import {
  closeCreateModal,
  addStory,
  updateImgUrl,
} from "../store/story.actions.js";
import { newStory } from "../assets/services.js/story-service.js";
import Avatar from "@mui/material/Avatar";
import Smiley from "../assets/icons/smiley.svg";
import mapIcon from "../assets/icons/map icon.svg";
import arrowDown from "../assets/icons/arrow down.svg";
import createPostIcon from "../assets/icons/createPostIcon.svg";
import EmojiPicker from "emoji-picker-react";
import { utilService } from "../assets/services.js/util.service.js";

export function CreatePostModal() {
  const isCreateModalOpen = useSelector(
    (storeState) => storeState.storyModule.isCreateModalOpen
  );
  const updatedImgUrl = useSelector(
    (storeState) => storeState.storyModule.updatedImgUrl
  );
  const user = useSelector((storeState) => storeState.userModule.user);
  const [text, setText] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  function handleChange(e) {
    setText(e.target.value);
  }

  const style = {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: updatedImgUrl?.length ? "55%" : 690,
    height: 728,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "1%",
    padding: "0px !important",
  };

  function onCreateNewPost() {
    if (updatedImgUrl) {
      let story = {
        ...newStory,
        id: utilService.makeId(),
        timestamp: new Date().getTime(),
        postImg: [updatedImgUrl],
        txt: text,
        by: {
          id: user.id,
          fullname: user.fullname,
          userImg: user.imgUrl,
        },
      };
      addStory(story);
      closeCreateModal();
      updateImgUrl(null);
    }
    setText("");
  }

  function openEmojiPicker() {
    setShowEmojiPicker(!showEmojiPicker);
  }

  function onEmojiClick(event, emojiObject) {
    setChosenEmoji(emojiObject);
    setShowEmojiPicker(false);
    setText((prev) => prev + event.emoji);
  }

  return (
    <Modal
      open={isCreateModalOpen}
      onClose={closeCreateModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <div className="createPostModal">
          <div className="modal-header">
            <div className="create-modal-title">Create new post </div>
            {updatedImgUrl?.length ? (
              <div onClick={onCreateNewPost}>
                <div className="share-btn">Share</div>
              </div>
            ) : null}
          </div>
          <Divider />
          {updatedImgUrl?.length ? (
            <div className="modalContent">
              <div className="imageContainer">
                <img src={updatedImgUrl} alt="newImg" className="newImg" />
              </div>
              <div className="detailsContainer">
                <div className="avatar-row">
                  <Avatar
                    sx={{
                      width: "28px",
                      height: "28px",
                      marginRight: "12px",
                      alignSelf: "center",
                    }}
                    src={user.imgUrl}
                  />
                  {user.fullname}
                </div>
                <input
                  className="caption area"
                  placeholder="Write a caption..."
                  onChange={(e) => handleChange(e)}
                  value={text}
                />
                {showEmojiPicker ? (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "40px",
                      marginLeft: "80px",
                    }}>
                    <EmojiPicker
                      onEmojiClick={onEmojiClick}
                      disableAutoFocus={true}
                      native
                    />
                  </div>
                ) : null}
                <div className="smiley-row">
                  <img src={Smiley} alt="smiley" onClick={openEmojiPicker} />
                  <span>{text.length}/2200</span>
                </div>
                <Divider />
                <div className="row-space-between">
                  <span>Add location</span>
                  <img src={mapIcon} alt="arrowIcon" />
                </div>
                <Divider />
                <div className="row-space-between">
                  <span>Accessibility</span>
                  <img src={arrowDown} alt="lost" className="arrowDownImg" />
                </div>
                <Divider />
                <div className="row-space-between">
                  <span>Advanced settings</span>
                  <img
                    src={arrowDown}
                    alt="arrowIcon"
                    className="arrowDownImg"
                  />
                </div>
                <Divider />
              </div>
            </div>
          ) : (
            <div className="img-create-container">
              <img src={createPostIcon} alt="newPostImg" />
              <span className="dragPhotos">Drag photos and videos here</span>
              <ImgUploader />
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
}
