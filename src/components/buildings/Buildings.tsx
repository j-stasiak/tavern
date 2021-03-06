import Sprite from "../sprite";
import { buildings } from "../../constants/buildingsLocations";
import React from "react";

const Buildings = ({ buildings }: any) => (
  <>
    <Sprite
      image={
        "https://cdnb.artstation.com/p/assets/images/images/022/260/263/large/gonzalo-tomas-fernandez-pixel-2.jpg?1574735651"
      }
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
      image={"nowicjusz_arena_signed.png"}
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
      image={"adept_arena_signed.png"}
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
      image={"pro_arena_signed.png"}
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
      image={"ultra_arena_signed.png"}
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
