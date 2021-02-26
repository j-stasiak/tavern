import React, { useEffect } from "react";
import "./course.css";
import Task from "./task/Task";

const Course = ({ content, user }: any) => {
  console.log("courseuser-", user);
  return (
    <>
      <h1>{content.title}</h1>
      <h2>{content.guide}</h2>
      {content.tasks.map((task: any) => (
        // @ts-ignore
        <Task courseId={content.id} task={task} user={user} />
      ))}
    </>
  );
};

export default Course;
