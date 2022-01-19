import Phaser from 'phaser';
import { SceneLoader } from './SceneLoader';
import { Scene2 } from './Scene2';

export const GameConfig = {
  type: Phaser.AUTO,
  width: 855,
  height: 640,
  parent: 'phaser-example',
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [SceneLoader, Scene2],
  zoom: 1.2
};
