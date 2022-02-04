import { Scene } from 'phaser';

export const blockMapBorders = (scene: Scene, map: Phaser.Tilemaps.Tilemap) => {
  scene.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
};
