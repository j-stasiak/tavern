import React, {useState} from "react";
import Avatar from "react-avatar";
import "./playerInfo.scss";
import ProgressBar from "@ramonak/react-progress-bar";
import {getCourse} from "../../../utils/courseUtils";
import {CourseTypes} from "../../../constants/CourseTypes";
import Notes from "../../notes/Notes";
import ReactModal from "react-modal";
import Stat from "./stat/stat";
// @ts-ignore
const PlayerInfo = ({
  avatar,
  nick,
  rank,
  reputation,
  notes,
  finishedCoursesIds,
  getUser,
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
            backgroundColor: "#282828",
          },
        }}
      >
        <Notes
          nick={nick}
          notes={notes}
          disableModal={() => setEditMode(false)}
          getUser={getUser}
        />
      </ReactModal>

      <div className={"stat avatar"}>
        <Avatar size="200" src={`${avatar}`} />
      </div>
      <Stat stat={nick} description={"Nick"} />
      <Stat stat={rank} description={"Ranga"} />
      <Stat stat={reputation} description={"Reputacja"} />
      <div
        className={
          "stat notes flex-col-container flex-justify-center flex-align-center"
        }
      >
        <button
          className={"gold-button"}
          id={"notes-button"}
          onClick={() => setEditMode(true)}
        >
          Notatki
        </button>
      </div>
      <div className={"stat progress flex-col-container flex-justify-center"}>
        <p>Ukończone kursy</p>
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
