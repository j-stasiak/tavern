import { Scene2 } from '../Scene2';
import { SceneLoader } from '../logic/scenes/sceneLoader/SceneLoader';

export const GameConfig = {
  type: Phaser.AUTO,
  width: 855,
  height: 640,
  parent: 'phaser-example',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [SceneLoader, Scene2],
  zoom: 1.2
};
