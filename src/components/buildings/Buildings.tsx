import Sprite from "../sprite";
import { buildings } from "../../constants/buildingsLocations";
import React from "react";

const Buildings = ({ buildings }: any) => (
  <>
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
    <Sprite
      image={"f1.png"}
      position={{
        xPosition: buildings.noobCourse.xPosition,
        yPosition: buildings.noobCourse.yPosition,
      }}
      parameters={{
        xPosition: 0,
        yPosition: 0,
        width: buildings.noobCourse.width,
        height: buildings.noobCourse.height,
      }}
    />
  </>
);

export default Buildings;
