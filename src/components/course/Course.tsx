import React from "react";
import "./course.scss";
import Task from "./task/Task";

const Course = ({ content, user }: any) => {
  return (
    <div className={'course'}>
      <h1>{content.title}</h1>
      <h2>{content.guide}</h2>
      {content.tasks.map((task: any) => (
        // @ts-ignore
        <Task courseId={content.id} task={task} user={user} />
      ))}
    </div>
  );
};

export default Course;
