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
  const [code, setCode] = useState("<div></div>");
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
    <>
      <div className={"flex-col-container flex-align-center task"}>
        <h2>{task.instruction}</h2>
        <div className={"flex-container editor"}>
          <div>
            <LiveProvider code={code}>
              <div>
                <div className={"flex-container"}>
                  <div className={"box box1"}>
                    <textarea
                      onChange={(event) => setCode(event.target.value)}
                      name="styled-textarea"
                      id="styled"
                      placeholder={"Miejsce na Twój kod html..."}
                    />
                  </div>

                  <div
                    className={`box box2 ${
                      taskCompleted ? "green-border" : "red-border"
                    }`}
                  >
                    <h3>Twój rezultat:</h3>
                    <LiveError />
                    <LivePreview />
                  </div>
                </div>
              </div>
            </LiveProvider>
          </div>
          <div className={"box box3"}>
            <LiveProvider code={task.result}>
              <h3>Oczekiwany rezultat:</h3>
              <LivePreview />
            </LiveProvider>
          </div>
        </div>
        <div
          className={`finished-box finish-border ${
            taskCompleted ? "" : "hide"
          }`}
        >
          GRATULACJE KURS UKOŃCZONY!!!
        </div>
      </div>
    </>
  );
};

export default Task;
