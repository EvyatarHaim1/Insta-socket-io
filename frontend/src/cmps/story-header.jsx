import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useSelector } from "react-redux";
import { utilService } from "../assets/services.js/util.service.js";
import { openRemoveModal, updateCurrentStory } from "../store/story.actions.js";

export function Storyheader({ story }) {
  const [name, setName] = useState(story.by.fullname);
  const currentStory = useSelector(
    (storeState) => storeState.storyModule.currentStory
  );

  return (
    <div className="story-header">
      <div className="avatar-section">
        <Stack direction="row" spacing={2}>
          <Avatar src={story.by.userImg} sx={{ alignSelf: "center" }} />
        </Stack>
        <span className="userName">{name.toLowerCase()}</span>
        <span className="creationDate">
          {" "}
          • {utilService.msToTime(story?.timestamp)}
        </span>
      </div>
      <span className="threeDots">
        <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
      </span>
    </div>
  );
}
