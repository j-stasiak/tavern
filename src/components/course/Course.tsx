import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import ReactModal from "react-modal";
import React from "react";

const Course = ({ content }: any) => {
  console.log(content);
  console.log("elo", content);
  return (
    <LiveProvider code="<strong>Hello World!</strong>">
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  );
};

export default Course;
