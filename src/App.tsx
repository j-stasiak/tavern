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
import { resolveSprite } from "./utils/playerUtils";
import ReactModal from "react-modal";
import Chat from "./components/chat/Chat";
import { SERVER_URL } from "./constants/endpoints";
import useSound from "use-sound";

function App() {
  const [mapShown, setMapShown] = useState(false);
  const [selectedCourseId, setSelectedCourse] = useState(0);
  const [selectedCourseContent, setSelectedCourseContent] = useState<any>();
  //TODO: user will hold all user data retrieved after login/register
  const [user, setUser] = useState<PlayerModel>();
  const [playWelcomeSound] = useSound("sounds/register sound.mp3", {
    volume: 0.2,
  });
  useEffect(() => {
    setSelectedCourseContent(getCourse(selectedCourseId));
  }, [selectedCourseId]);

  const getUser = () =>
    axios.get(`${SERVER_URL}/user/${user?.nick}`).then((result) => {
      // @ts-ignore
      setUser(mapUser(result.data));
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
              skin={resolveSprite(user.finishedCoursesIds.length)}
            />
            <Buildings buildings={buildings} />
            <div className="player-info">
              <PlayerInfo
                avatar={user.avatar}
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
              <ReactModal
                isOpen={!mapShown}
                contentLabel="Inline Styles Modal Example"
                style={{
                  content: {
                    color: "ThreeDDarkShadow",
                  },
                }}
              >
                <button onClick={() => setMapShown(true)}>WRACAM DO GRY</button>

                <Course content={selectedCourseContent} user={user} />
              </ReactModal>
            )}
          </div>
        )
      ) : (
        <WelcomePanel
          submitCallback={(user: any) => {
            setUser(user);
            playWelcomeSound();
          }}
        />
      )}
    </div>
  );
}

export default App;
