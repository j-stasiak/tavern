import { LiveError, LivePreview, LiveProvider } from "react-live";
import React, { useEffect, useState } from "react";
import { removeAllWhitespace } from "../../../utils/stringsUtils";

const Task = ({ task, player }: any) => {
  const [code, setCode] = useState("<div>Siemka</div>");
  const [taskCompleted, setTaskCompleted] = useState<boolean>();
  useEffect(() => {
    if (removeAllWhitespace(code) === removeAllWhitespace(task.result)) {
      setTaskCompleted(true);
      //Todo: if playerCompletedTask === false putRequest to update in db
    }
  }, [code]);

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
