export const playerCollidesWith = (playerPosition: any, building: any) =>
  playerPosition.xPosition > building.xPosition &&
  playerPosition.xPosition < building.xPosition + building.width &&
  playerPosition.yPosition > building.yPosition &&
  playerPosition.yPosition < building.yPosition + building.height;
