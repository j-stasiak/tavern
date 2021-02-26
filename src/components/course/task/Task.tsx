import { LiveError, LivePreview, LiveProvider } from "react-live";
import React, { useEffect, useState } from "react";
import { removeAllWhitespace } from "../../../utils/stringsUtils";
import { PlayerModel } from "../../../constants/PlayerModel";
import axios from "axios";
import useSound from "use-sound";
import { SERVER_URL } from "../../../constants/endpoints";
import { resolveRank } from "../../../utils/playerUtils";

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
  const [play] = useSound("sounds/level up sound.mp3", { volume: 0.3 });
  const [taskCompleted, setTaskCompleted] = useState<boolean>(
    user.finishedCoursesIds.includes(courseId)
  );
  useEffect(() => {
    if (
      removeAllWhitespace(code) === removeAllWhitespace(task.result) &&
      !user.finishedCoursesIds.includes(courseId)
    ) {
      axios
        .put(`${SERVER_URL}/user/${user.nick}`, {
          rank: resolveRank(user.rank),
          finishedCoursesIds: [...user.finishedCoursesIds, courseId],
        })
        .then((response) => {
          setTaskCompleted(true);
          play();
        });
      //Todo: if playerCompletedTask === false putRequest to update in db
    }
  }, [code]);

  return (
    <div className={`task ${taskCompleted ? "task-completed" : ""}`}>
      <div className={"flex-col-container"}>
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
      <h2>{task.instruction}</h2>
    </div>
  );
};

export default Task;
