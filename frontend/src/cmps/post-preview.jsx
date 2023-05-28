import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Storyheader } from "./story-header";
import { HeartSignContainer } from "./heart-sign-container";
import {
  addLikeOrComment,
  updateCurrentStory,
} from "../store/story.actions.js";
import { utilService } from "../assets/services.js/util.service.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Divider } from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import { updateUser, updateOtherUser } from "../store/user.action";

export function PostPreview({ story }) {
  const [text, setText] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const user = useSelector((storeState) => storeState.userModule.user);
  const users = useSelector((storeState) => storeState.userModule.users);

  function handleChange(e) {
    setText(e.target.value);
  }

  async function addNewComment() {
    let updatedStory;
    updatedStory = {
      ...story,
      comments: [
        ...story.comments,
        {
          id: utilService.makeId(),
          timestamp: new Date().getTime(),
          by: {
            id: user.id,
            fullname: user.fullname,
            imgUrl: user.imgUrl,
          },
          txt: text,
          likedBy: [],
        },
      ],
    };
    await addLikeOrComment(updatedStory);
    setText("");
    await updateCurrentStory(updatedStory);

    // add notification of new comment
    let newNotification = {
      id: utilService.makeId(),
      type: `${user.fullname} add a new comment to your story`,
      by: {
        id: user.id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
      },
    };
    let otherUser = users.find((u) => u.id === story.by.id);
    let addNotificationToUser = {
      ...otherUser,
      notifications: [...otherUser.notifications, newNotification],
      isNewNotifications: true,
    };
    await updateOtherUser(addNotificationToUser);
  }
  const lastTwoComments = story.comments.slice(
    Math.max(story.comments.length - 2, 0)
  );

  function openEmojiPicker() {
    setShowEmojiPicker(!showEmojiPicker);
  }

  function onEmojiClick(event, emojiObject) {
    setChosenEmoji(emojiObject);
    setShowEmojiPicker(false);
    setText((prev) => prev + event.emoji);
  }

  return (
    <div>
      <div className="story-container">
        <Storyheader story={story} />
        <div className="img-container">
          {story.postImg.length > 1 ? (
            <Slider dots={true} infinite={false}>
              {story?.postImg?.map((img) => (
                <img key={img} className="story-img" src={img} alt="storyImg" />
              ))}
            </Slider>
          ) : (
            <img src={story.postImg[0]} alt="" />
          )}
        </div>

        <HeartSignContainer story={story} />
        <div className="preview-details">
          <div className="likesContainer">
            <h4>{story.likedBy.length} likes</h4>
          </div>
          <div className="storytitle">
            <strong>{story.by.fullname}</strong> {story.txt}
          </div>
          <h6 className="viewComments">view comments...</h6>
          <div className="comments">
            {lastTwoComments.map((comment) => (
              <span className="comment" key={comment.id}>
                <strong>{comment.by.fullname}</strong> {comment.txt}
              </span>
            ))}
          </div>
          <div className="input-area">
            <input
              className="input-field"
              placeholder="Add a comment..."
              type={"text"}
              size={"55"}
              onChange={(e) => handleChange(e)}
              value={text}
            />
            {text.length ? (
              <button onClick={addNewComment} style={{ marginRight: "12px" }}>
                Post
              </button>
            ) : null}
            <button>
              <div className="emoji" onClick={openEmojiPicker}></div>
            </button>
          </div>
        </div>
        <Divider />
      </div>
      {showEmojiPicker ? (
        <div
          style={{ position: "absolute", bottom: "40px", marginLeft: "80px" }}>
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            disableAutoFocus={true}
            native
          />
        </div>
      ) : null}
    </div>
  );
}
