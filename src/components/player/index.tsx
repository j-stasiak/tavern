import Actor from "../actor";
import React, { useEffect } from "react";
import { useKeyPress } from "../../hooks/useKeyPress";
import { useWalk } from "../../hooks/useWalk";

const Player = ({ skin, buildings }: any) => {
  const data = { width: 32, height: 32 };
  const { direction, step, walk, position, setPosition } = useWalk(3);
  // @ts-ignore
  useKeyPress((event) => {
    walk(event.key.replace("Arrow", "").toLowerCase());
    event.preventDefault();
  });

  useEffect(() => {
    if (
      position.xPosition > buildings.tavern.xPosition &&
      position.xPosition <
        buildings.tavern.xPosition + buildings.tavern.width &&
      position.yPosition > buildings.tavern.yPosition &&
      position.yPosition < buildings.tavern.yPosition + buildings.tavern.height
    ) {
      alert("elo");
    }
  }, [position]);

  return (
    <Actor
      sprite={`${skin}.png`}
      data={data}
      direction={direction}
      step={step}
      position={position}
    />
  );
};

export default Player;
