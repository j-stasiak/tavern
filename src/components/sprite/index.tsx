const // @ts-ignore
  Sprite = ({ image, parameters, position }) => {
    const { width, height, xPosition, yPosition } = parameters;
    return (
      <div
        style={{
          position: "absolute",
          top: position.yPosition,
          left: position.xPosition,
          height: `${height}px`,
          width: `${width}px`,
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: `-${xPosition}px -${yPosition}px`,
          borderRadius: "20%",
        }}
      />
    );
  };

export default Sprite;
