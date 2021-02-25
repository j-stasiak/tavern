import React, { useEffect, useState } from "react";
import "./App.css";
import Player from "./components/player";
import { buildings } from "./constants/buildingsLocations";
import Buildings from "./components/buildings/Buildings";
import ReactModal from "react-modal";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import Course from "./components/course/Course";
import { CourseTypes } from "./constants/CourseTypes";
import { getCourse } from "./utils/courseUtils";
function App() {
  const [mapShown, setMapShown] = useState(true);
  const [selectedCourseId, setSelectedCourse] = useState(1);
  const [selectedCourseContent, setSelectedCourseContent] = useState<any>();
  useEffect(() => {
    setSelectedCourseContent(getCourse(selectedCourseId));
  }, [selectedCourseId]);

  return (
    <div className="App">
      <div onClick={() => setMapShown(!mapShown)}>dupa xD</div>
      {mapShown ? (
        <div className={"map"}>
          <Player
            selectCourse={setSelectedCourse}
            buildings={buildings}
            skin={"m1"}
          />
          <Buildings buildings={buildings} />
        </div>
      ) : (
        <ReactModal
          isOpen={!mapShown}
          contentLabel="Inline Styles Modal Example"
          style={{
            overlay: {
              backgroundColor: "papayawhip",
            },
            content: {
              color: "ThreeDDarkShadow",
            },
          }}
        >
          <button onClick={() => setMapShown(true)}>WRACAM DO GRY</button>
          {selectedCourseId === CourseTypes.TAVERN ? (
            <div>mysiorowy chat</div>
          ) : (
            <Course content={selectedCourseContent} />
          )}
        </ReactModal>
      )}
    </div>
  );
}

export default App;
