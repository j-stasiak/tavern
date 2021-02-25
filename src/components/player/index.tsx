import Actor from "../actor";
import React, { useEffect } from "react";
import { useKeyPress } from "../../hooks/useKeyPress";
import { useWalk } from "../../hooks/useWalk";
import { playerCollidesWith } from "../../utils/collisionUtils";
import { CourseTypes } from "../../constants/CourseTypes";
import useSound from "use-sound";

const Player = ({ skin, buildings, selectCourse }: any) => {
  const data = { width: 32, height: 32 };
  const { direction, step, walk, position, setPosition } = useWalk(3);
  const [playTavern] = useSound("sounds/tavern enter.mp3", {
    volume: 0.3,
  });
  const [playNoobEnter] = useSound("sounds/course 1.mp3", {
    volume: 0.3,
  });
  const [playAdeptEnter] = useSound("sounds/course 2.mp3", {
    volume: 0.3,
  });
  const [playProEnter] = useSound("sounds/course 3.mp3", {
    volume: 0.3,
  });
  const [playLaugh] = useSound("sounds/hihi.mp3", {
    volume: 0.6,
  });
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
      playTavern();
    } else if (playerCollidesWith(position, buildings.noobCourse)) {
      selectCourse(CourseTypes.NOOB_COURSE);
      playNoobEnter();
    } else if (playerCollidesWith(position, buildings.adeptCourse)) {
      selectCourse(CourseTypes.ADEPT_COURSE);
      playAdeptEnter();
    } else if (playerCollidesWith(position, buildings.proCourse)) {
      selectCourse(CourseTypes.PRO_COURSE);
      playProEnter();
    } else if (playerCollidesWith(position, buildings.ultraCourse)) {
      selectCourse(CourseTypes.ULTRA_COURSE);
      playLaugh();
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
