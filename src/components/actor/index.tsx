import Sprite from "../sprite";

const Actor = ({
  // @ts-ignore
  sprite,
  // @ts-ignore
  data,
  step = 0,
  direction = 0,
  position = { xPosition: 0, yPosition: 0 },
}) => {
  const { height, width } = data;
  return (
    <Sprite
      image={sprite}
      position={position}
      parameters={{
        xPosition: step * width,
        yPosition: direction * height,
        width,
        height,
      }}
    />
  );
};

export default Actor;
