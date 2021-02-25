import React from "react";
import "./course.css";
import Task from "./task/Task";

const Course = ({ content }: any) => {
  return (
    <>
      <h1>{content.title}</h1>
      <h2>{content.guide}</h2>
      {content.tasks.map((task: any) => (
        <Task task={task} />
      ))}
    </>
  );
};

export default Course;
