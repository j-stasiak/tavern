import React from "react";
import "./App.css";
import Actor from "./components/actor";
import Player from "./components/player";
import Sprite from "./components/sprite";

function App() {
  const buildings = {
    tavern: { xPosition: 100, yPosition: 100, width: 100, height: 100 },
  };

  return (
    <div className="App">
      <Player buildings={buildings} skin={"m1"} />
      <Sprite
        image={"f1.png"}
        position={{
          xPosition: buildings.tavern.xPosition,
          yPosition: buildings.tavern.yPosition,
        }}
        parameters={{
          xPosition: 0,
          yPosition: 0,
          width: buildings.tavern.width,
          height: buildings.tavern.height,
        }}
      />
    </div>
  );
}

export default App;
