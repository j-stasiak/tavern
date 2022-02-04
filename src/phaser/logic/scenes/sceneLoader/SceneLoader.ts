import { PLAYER_KEY, PLAYERS_KEY } from '../../consts/assets';
import { GameScene } from '../GameScene';
import { handleLoadingScreen } from './loadingScreenUtils';

export class SceneLoader extends GameScene {
  constructor() {
    super('loaderScene');
  }

  preload() {
    handleLoadingScreen(this);
    this.loadMainMapAssets();
    this.loadBonusMapAssets();
    this.loadPlayersAtlases();
  }

  create() {
    // Create the player's walking animations from the texture currentPlayer. These are stored in the global
    // animation manager so any sprite can access them.
    this.createPlayersAnimations();
    this.scene.start('mainMapScene', { map: 'mainMap', playerTexturePosition: 'front' });
  }

  private createPlayersAnimations() {
    this.createAnimation({
      key: 'misa-left-walk',
      frames: this.anims.generateFrameNames('currentPlayer', {
        prefix: 'misa-left-walk.',
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.createAnimation({
      key: 'misa-right-walk',
      frames: this.anims.generateFrameNames('currentPlayer', {
        prefix: 'misa-right-walk.',
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.createAnimation({
      key: 'misa-front-walk',
      frames: this.anims.generateFrameNames('currentPlayer', {
        prefix: 'misa-front-walk.',
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.createAnimation({
      key: 'misa-back-walk',
      frames: this.anims.generateFrameNames('currentPlayer', {
        prefix: 'misa-back-walk.',
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    // onlinePlayer animations
    this.createAnimation({
      key: 'onlinePlayer-left-walk',
      frames: this.anims.generateFrameNames('players', {
        start: 0,
        end: 3,
        zeroPad: 3,
        prefix: 'bob_left_walk.',
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    });
    this.createAnimation({
      key: 'onlinePlayer-right-walk',
      frames: this.anims.generateFrameNames('players', {
        start: 0,
        end: 3,
        zeroPad: 3,
        prefix: 'bob_right_walk.',
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    });
    this.createAnimation({
      key: 'onlinePlayer-front-walk',
      frames: this.anims.generateFrameNames('players', {
        start: 0,
        end: 3,
        zeroPad: 3,
        prefix: 'bob_front_walk.',
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    });
    this.createAnimation({
      key: 'onlinePlayer-back-walk',
      frames: this.anims.generateFrameNames('players', {
        start: 0,
        end: 3,
        zeroPad: 3,
        prefix: 'bob_back_walk.',
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    });
  }

  private loadPlayersAtlases() {
    this.loadAtlas(PLAYER_KEY, './assets/atlas/atlas.png', './assets/atlas/atlas.json');
    this.loadAtlas(PLAYERS_KEY, './assets/images/players/players.png', './assets/atlas/players.json');
  }

  private loadBonusMapAssets() {
    this.loadTileMap('bonusMap', './assets/tilemaps/bonusMap.json');
  }

  private loadMainMapAssets() {
    this.loadPng('TilesTown', './assets/tilesets/tuxmon-sample-32px-extruded.png');
    this.loadTileMap('mainMap', './assets/tilemaps/mainMap.json');
  }
}
