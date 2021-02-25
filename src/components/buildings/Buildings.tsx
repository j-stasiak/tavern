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
    <Sprite
      image={"f1.png"}
      position={{
        xPosition: buildings.adeptCourse.xPosition,
        yPosition: buildings.adeptCourse.yPosition,
      }}
      parameters={{
        xPosition: 0,
        yPosition: 0,
        width: buildings.adeptCourse.width,
        height: buildings.adeptCourse.height,
      }}
    />
    <Sprite
      image={"f1.png"}
      position={{
        xPosition: buildings.proCourse.xPosition,
        yPosition: buildings.proCourse.yPosition,
      }}
      parameters={{
        xPosition: 0,
        yPosition: 0,
        width: buildings.proCourse.width,
        height: buildings.proCourse.height,
      }}
    />
    <Sprite
      image={"f1.png"}
      position={{
        xPosition: buildings.ultraCourse.xPosition,
        yPosition: buildings.ultraCourse.yPosition,
      }}
      parameters={{
        xPosition: 0,
        yPosition: 0,
        width: buildings.ultraCourse.width,
        height: buildings.ultraCourse.height,
      }}
    />
  </>
);

export default Buildings;
