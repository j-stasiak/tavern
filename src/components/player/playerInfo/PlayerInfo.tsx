import React from "react";
import Avatar from "react-avatar";
import "./playerInfo.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { getCourse } from "../../../utils/courseUtils";
import { CourseTypes } from "../../../constants/CourseTypes";
// @ts-ignore
// @ts-ignore
const PlayerInfo = ({
  avatar,
  nick,
  rank,
  reputation,
  notes,
  finishedCoursesIds,
}: any) => (
  <div className={"stats"}>
    <div className={"stat"}>
      <Avatar size="100" src={avatar} />
    </div>
    <div className={"stat nick"}>{nick}</div>
    <div className={"stat rank"}>{rank}</div>
    <div className={"stat reputation"}>{reputation} lajkuf</div>
    <div className={"stat notes"}>
      <button onClick={() => alert(notes)}>Notatki</button>
    </div>
    <div className={"stat progress"}>
      Ukończone kursy
      <ul>
        {finishedCoursesIds.map((courseId: any) => (
          //@ts-ignore
          <li>{getCourse(courseId).title}</li>
        ))}
      </ul>
      <div className={"progress-bar"}>
        {" "}
        <ProgressBar
          completed={Math.round(
            (finishedCoursesIds.length /
              (Object.values(CourseTypes).length / 2 - 1)) *
              100
          )}
        />
      </div>
    </div>
  </div>
);

export default PlayerInfo;
