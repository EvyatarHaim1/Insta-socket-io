import React, { Fragment } from "react";
import { PostIndex } from "../cmps/post-index";
import { Suggestions } from "../cmps/suggestions";

export function HomePage() {
  return (
    <Fragment>
      <div className="post-container">
        <PostIndex />
        <Suggestions />
      </div>
    </Fragment>
  );
}
