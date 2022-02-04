import { Scene } from 'phaser';

export const loadPng = (scene: Scene, key: string, path: string) => {
  scene.load.image(key, path);
};

export const loadTileMap = (scene: Scene, key: string, path: string) => {
  scene.load.tilemapTiledJSON(key, path);
};
