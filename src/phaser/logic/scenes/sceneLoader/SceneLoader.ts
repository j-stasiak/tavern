import Phaser from 'phaser';
import { PLAYER_KEY, PLAYERS_KEY } from '../../consts/assets';

export class SceneLoader extends Phaser.Scene {
  constructor() {
    super('sceneLoader');
  }

  preload() {
    // this.handleLoadingScreen();

    // Load Town
    this.load.image('TilesTown', './assets/tilesets/tuxmon-sample-32px-extruded.png');
    this.load.tilemapTiledJSON('mainMap', './assets/tilemaps/mainMap.json');

    // Load bonusMap
    this.load.tilemapTiledJSON('bonusMap', './assets/tilemaps/bonusMap.json');

    // Load atlas
    this.load.atlas(PLAYER_KEY, './assets/atlas/atlas.png', './assets/atlas/atlas.json');
    this.load.atlas(PLAYERS_KEY, './assets/images/players/players.png', './assets/atlas/players.json');
  }
}
