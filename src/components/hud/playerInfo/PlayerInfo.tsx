import React, { useState } from "react";
import Avatar from "react-avatar";
import "./playerInfo.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { getCourse } from "../../../utils/courseUtils";
import { CourseTypes } from "../../../constants/CourseTypes";
import Notes from "../../notes/Notes";
import ReactModal from "react-modal";
// @ts-ignore
const PlayerInfo = ({
  avatar,
  nick,
  rank,
  reputation,
  notes,
  finishedCoursesIds,
}: any) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className={"stats"}>
      <ReactModal
        isOpen={editMode}
        contentLabel="Inline Styles Modal Example"
        style={{
          content: {
            color: "ThreeDDarkShadow",
          },
        }}
      >
        <Notes notes={notes} disableModal={() => setEditMode(false)} />
      </ReactModal>

      <div className={"stat"}>
        <Avatar size="100" src={avatar} />
      </div>
      <div className={"stat nick"}>{nick}</div>
      <div className={"stat rank"}>{rank}</div>
      <div className={"stat reputation"}>{reputation} lajkuf</div>
      <div className={"stat notes"}>
        <button onClick={() => setEditMode(true)}>Notatki</button>
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
};
export default PlayerInfo;
