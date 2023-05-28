import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PostPreview } from "./post-preview.jsx";

export function PostList({ stories }) {
  const users = useSelector((storeState) => storeState.userModule.users);
  const user = useSelector((storeState) => storeState.userModule.user);
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    setCurrentUser(users?.find((u) => u.id === user?.id));
  }, [users, user]);

  const sortedStories = stories?.sort(function (x, y) {
    return new Date(y.timestamp) - new Date(x.timestamp);
  });

  return (
    <div>
      {sortedStories?.map((story) =>
        currentUser?.following?.map((followedUser) =>
          followedUser?.id === story?.by?.id ? (
            <PostPreview story={story} key={story?.id} />
          ) : null
        )
      )}
    </div>
  );
}
