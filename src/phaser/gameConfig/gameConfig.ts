import { SceneLoader } from '../logic/scenes/sceneLoader/SceneLoader';
import { MainScene } from '../logic/scenes/mainScene/MainScene';

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
  scene: [SceneLoader, MainScene],
  zoom: 1.2
};
