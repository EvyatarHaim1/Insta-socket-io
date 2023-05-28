import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import {
  closeRemoveModal,
  updateStory,
  updateImgUrl,
  updateCurrentStory,
  removeStory,
} from "../store/story.actions.js";
import {
  showSuccessMsg,
  showErrorMsg,
} from "../assets/services.js/event-bus.service.js";

import { useSelector } from "react-redux";
import { ImgUploader } from "../cmps/img-uploader.jsx";

const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  borderRadius: "1%",
  "@media (max-width: 500px)": {
    width: "100% !important",
  },
};

export function DeletePostModal() {
  const isRemoveModalOpen = useSelector(
    (storeState) => storeState.storyModule.isRemoveModalOpen
  );
  const updatedImgUrl = useSelector(
    (storeState) => storeState.storyModule.updatedImgUrl
  );
  const currentStory = useSelector(
    (storeState) => storeState.storyModule.currentStory
  );
  const [text, setText] = useState(currentStory?.txt);

  useEffect(() => {
    setText(currentStory?.txt);
  }, [currentStory]);

  function handleChange(e) {
    setText(e.target.value);
  }
  function onUpdateStory() {
    let updatedStory = { ...currentStory, txt: text, postImg: [updatedImgUrl] };
    updateStory(updatedStory);
    closeRemoveModal();
    updateCurrentStory(updatedStory);
    updateImgUrl(null);
  }

  async function onRemoveStory() {
    try {
      await removeStory(currentStory?.id);
      showSuccessMsg("Story removed");
    } catch (err) {
      showErrorMsg("Cannot remove story");
    }
  }

  return (
    <Modal
      open={isRemoveModalOpen}
      onClose={closeRemoveModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <div className="deleteStoryModal">
          {!updatedImgUrl ? (
            <div className="blackBG">
              <img
                src={currentStory?.postImg[0]}
                alt="postImg"
                className="editedImg"
              />
            </div>
          ) : (
            <div className="blackBG">
              <img
                src={updatedImgUrl}
                alt="uploadNewImg"
                className="editedImg"
              />
            </div>
          )}
          <div className="right-section">
            <button
              onClick={() => onRemoveStory(currentStory.id)}
              className="edit-delete-option">
              Remove
            </button>
            <button
              onClick={onUpdateStory}
              className="edit-delete-option"
              disabled={!updatedImgUrl?.length}>
              Edit
            </button>
            <button onClick={closeRemoveModal} className="edit-delete-option">
              Cancel
            </button>
            <ImgUploader changeImage />
            <div className="text-field-container">
              <TextField
                fullWidth
                label="Edit Text"
                id="fullWidth"
                onChange={(e) => handleChange(e)}
                value={text}
              />
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
