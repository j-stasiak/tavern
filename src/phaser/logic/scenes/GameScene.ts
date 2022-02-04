interface Animation {
  key: string;
  frames: Phaser.Types.Animations.AnimationFrame[];
  frameRate: number;
  repeat: number;
}

export abstract class GameScene extends Phaser.Scene {
  loadPng = (key: string, path: string) => {
    this.load.image(key, path);
  };

  loadTileMap = (key: string, path: string) => {
    this.load.tilemapTiledJSON(key, path);
  };

  loadAtlas = (key: string, pngPath: string, jsonPath: string) => {
    this.load.atlas(key, pngPath, jsonPath);
  };

  createAnimation = (animation: Animation) => {
    this.anims.create(animation);
  };
}
