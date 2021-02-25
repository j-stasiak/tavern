import Actor from "../actor";
import React, { useEffect } from "react";
import { useKeyPress } from "../../hooks/useKeyPress";
import { useWalk } from "../../hooks/useWalk";
import { playerCollidesWith } from "../../utils/collisionUtils";
import { CourseTypes } from "../../constants/CourseTypes";

const Player = ({ skin, buildings, selectCourse }: any) => {
  const data = { width: 32, height: 32 };
  const { direction, step, walk, position, setPosition } = useWalk(3);
  // @ts-ignore
  useKeyPress((event) => {
    if (event.key.includes("Arrow")) {
      walk(event.key.replace("Arrow", "").toLowerCase());
      event.preventDefault();
    }
  });

  useEffect(() => {
    if (playerCollidesWith(position, buildings.tavern)) {
      selectCourse(CourseTypes.TAVERN);
    } else if (playerCollidesWith(position, buildings.noobCourse)) {
      selectCourse(CourseTypes.NOOB_COURSE);
    } else if (playerCollidesWith(position, buildings.adeptCourse)) {
      selectCourse(CourseTypes.ADEPT_COURSE);
    } else if (playerCollidesWith(position, buildings.proCourse)) {
      selectCourse(CourseTypes.PRO_COURSE);
    } else if (playerCollidesWith(position, buildings.ultraCourse)) {
      selectCourse(CourseTypes.ULTRA_COURSE);
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
