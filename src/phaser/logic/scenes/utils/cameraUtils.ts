import Player from '../../gameObjects/Player';

export const createPlayerFollowingCamera = (scene: Phaser.Scene, player: Player, map: Phaser.Tilemaps.Tilemap) => {
  const camera = scene.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  return camera;
};
