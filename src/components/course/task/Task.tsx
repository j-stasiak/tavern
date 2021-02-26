import { LiveError, LivePreview, LiveProvider } from "react-live";
import React, { useEffect, useState } from "react";
import { removeAllWhitespace } from "../../../utils/stringsUtils";
import { PlayerModel } from "../../../constants/PlayerModel";
import { getCourse } from "../../../utils/courseUtils";
import { CourseTypes } from "../../../constants/CourseTypes";
import axios from "axios";

const Task = ({
  task,
  user,
  courseId,
}: {
  task: any;
  user: PlayerModel;
  courseId: any;
}) => {
  const [code, setCode] = useState("<div>Siemka</div>");
  const [taskCompleted, setTaskCompleted] = useState<boolean>(
    user.finishedCoursesIds.includes(courseId)
  );
  useEffect(() => {
    if (
      removeAllWhitespace(code) === removeAllWhitespace(task.result) &&
      !user.finishedCoursesIds.includes(courseId)
    ) {
      axios
        .put(`http://localhost:3000/user/${user.nick}`, {
          finishedCoursesIds: [...user.finishedCoursesIds, courseId],
        })
        .then((response) => {
          setTaskCompleted(true);
        });
      //Todo: if playerCompletedTask === false putRequest to update in db
    }
  }, [code]);
  //      player.finishedCoursesIds.includes(courseId) ||

  return (
    <div className={`task ${taskCompleted ? "task-completed" : ""}`}>
      <h2>{task.instruction}</h2>
      <LiveProvider code={task.result}>
        <h3>Oczekiwany rezultat</h3>
        <LivePreview />
      </LiveProvider>
      <LiveProvider code={code}>
        <div>
          <textarea
            onChange={(event) => setCode(event.target.value)}
            name="styled-textarea"
            id="styled"
          >
            Pisz..
          </textarea>
          <div className={"rendered-code"}>
            <LiveError />
            <LivePreview />
          </div>
        </div>
      </LiveProvider>
    </div>
  );
};

export default Task;
