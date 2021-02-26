import React, { useEffect, useState } from "react";
import "./App.css";
import Player from "./components/player";
import { buildings } from "./constants/buildingsLocations";
import Buildings from "./components/buildings/Buildings";
import Course from "./components/course/Course";
import { CourseTypes } from "./constants/CourseTypes";
import { getCourse } from "./utils/courseUtils";
import PlayerInfo from "./components/hud/playerInfo/PlayerInfo";
import SoundPlayer from "./components/soundPlayer/SoundPlayer";
import WelcomePanel from "./components/welcomePanel/WelcomePanel";
import { PlayerModel } from "./constants/PlayerModel";
import axios from "axios";
import { mapUser } from "./utils/backendUtils";
import Chat from "./components/chat/Chat";

function App() {
  const [mapShown, setMapShown] = useState(false);
  const [notesUpdated, setNotesUpdated] = useState(false);
  const [selectedCourseId, setSelectedCourse] = useState(1);
  const [selectedCourseContent, setSelectedCourseContent] = useState<any>();
  //TODO: user will hold all user data retrieved after login/register
  const [user, setUser] = useState<PlayerModel>();
  useEffect(() => {
    setSelectedCourseContent(getCourse(selectedCourseId));
  }, [selectedCourseId]);

  const getUser = () =>
    axios.get(`http://localhost:3000/user/${user?.nick}`).then((result) => {
      // @ts-ignore
      setUser(mapUser(result));
    });

  useEffect(() => {
    if (mapShown) {
      getUser();
    }
  }, [mapShown]);

  const showTavern = !mapShown && selectedCourseId === CourseTypes.TAVERN;

  return (
    <div className={`App ${showTavern ? "tavernBackground" : "mapBackground"}`}>
      <SoundPlayer />
      {user ? (
        mapShown ? (
          <div className={"map"}>
            <Player
              selectCourse={(selectedCourse: any) => {
                setSelectedCourse(selectedCourse);
                setMapShown(false);
              }}
              buildings={buildings}
              skin={"m1"}
            />
            <Buildings buildings={buildings} />
            <div className="player-info">
              <PlayerInfo
                avatar={
                  "http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3"
                }
                nick={user.nick}
                rank={user.rank}
                reputation={user.reputation}
                notes={user.notes}
                finishedCoursesIds={user.finishedCoursesIds}
                getUser={getUser}
              />
            </div>
          </div>
        ) : (
          <div className={`${mapShown ? "hide" : ""}`}>
            <button onClick={() => setMapShown(true)}>WRACAM DO GRY</button>
            {selectedCourseId === CourseTypes.TAVERN ? (
              <Chat nick={user.nick} />
            ) : (
              <Course content={selectedCourseContent} user={user} />
            )}
          </div>
        )
      ) : (
        <WelcomePanel
          submitCallback={(user: any) => {
            setUser(user);
          }}
        />
      )}
    </div>
  );
}

export default App;
