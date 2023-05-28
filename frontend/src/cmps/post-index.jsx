import React from "react";
import { useSelector } from "react-redux";
import { PostList } from "./post-list.jsx";
import { StoryForwardModal } from "./story-details-modal.jsx";

export function PostIndex() {
  const stories = useSelector((storeState) => storeState.storyModule.stories);

  return (
    <div className="post-index-container">
      <StoryForwardModal />
      <PostList stories={stories} />
    </div>
  );
}
