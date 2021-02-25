import { useState } from "react";

// @ts-ignore
export const useWalk = (maxSteps) => {
  const [position, setPosition] = useState({ xPosition: 600, yPosition: 500 });
  const [direction, setDirection] = useState(0);
  const [step, setStep] = useState(0);
  const directions: any = {
    down: 0,
    left: 1,
    right: 2,
    up: 3,
  };

  const stepSize = 16;

  const modifier = {
    down: { xPosition: 0, yPosition: stepSize },
    left: { xPosition: -stepSize, yPosition: 0 },
    right: { xPosition: stepSize, yPosition: 0 },
    up: { xPosition: 0, yPosition: -stepSize },
  };

  // @ts-ignore
  const move = (direction) => {
    setPosition((prev) => ({
      // @ts-ignore
      xPosition: prev.xPosition + modifier[direction].xPosition,
      // @ts-ignore
      yPosition: prev.yPosition + modifier[direction].yPosition,
    }));
  };
  // @ts-ignore
  const walk = (direction) => {
    setDirection((previous) => {
      if (directions[direction] == previous) {
        move(direction);
      }
      return directions[direction];
    });
    setStep((previousValue) =>
      previousValue < maxSteps - 1 ? previousValue + 1 : 0
    );
  };

  return { walk, direction, step, directions, position, setPosition };
};
