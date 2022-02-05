import PrincipalPlayer from '../../gameObjects/PrincipalPlayer';

export const createPlayerFollowingCamera = (
  scene: Phaser.Scene,
  player: PrincipalPlayer,
  map: Phaser.Tilemaps.Tilemap
) => {
  const camera = scene.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  return camera;
};
