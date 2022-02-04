import Phaser from 'phaser';

export class SceneLoader extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    this.handleLoadingScreen();
    // Load Town
    this.load.image('TilesTown', './assets/tilesets/tuxmon-sample-32px-extruded.png');
    this.load.tilemapTiledJSON('town', './assets/tilemaps/town.json');

    // Load Route1
    this.load.tilemapTiledJSON('route1', './assets/tilemaps/route1.json');

    // Load atlas
    this.load.atlas('currentPlayer', './assets/atlas/atlas.png', './assets/atlas/atlas.json');
    this.load.atlas('players', './assets/images/players/players.png', './assets/atlas/players.json');
  }

  handleLoadingScreen() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    const progressBoxXPos = this.cameras.main.width / 3;
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(progressBoxXPos, 270, 320, 50);
    this.load.image('logo', 'assets/images/tavern.png');
    for (var i = 0; i < 20; i++) {
      this.load.image('logo' + i, 'assets/images/tavern.png');
    }
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);
    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      // console.log(value);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(progressBoxXPos, 280, 300 * value, 30);
      percentText.setText(parseInt(value * 100) + '%');
    });
    this.load.on('fileprogress', function (file) {
      // console.log(file.src);
      assetText.setText('Loading asset: ' + file.key);
    });
    this.load.on('complete', function () {
      // console.log('complete');
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }

  create() {
    this.handleLoadingScreen();
    // Create the player's walking animations from the texture currentPlayer. These are stored in the global
    // animation manager so any sprite can access them.
    this.anims.create({
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
    this.anims.create({
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
    this.anims.create({
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
    this.anims.create({
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
    this.anims.create({
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
    this.anims.create({
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
    this.anims.create({
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
    this.anims.create({
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
    this.scene.start('playGame', { map: 'town', playerTexturePosition: 'front' });
  }
}
