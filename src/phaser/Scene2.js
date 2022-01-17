import Phaser from 'phaser';
import { onlinePlayers, room } from './SocketServer';

import Player from './Player';
import OnlinePlayer from './OnlinePlayer';

let cursors, socketKey;
let isAllAssetsLoaded = false;
export class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }

  init(data) {
    // Map data
    this.mapName = data.map;

    // Player Texture starter position
    this.playerTexturePosition = data.playerTexturePosition;

    // Set container
    this.container = [];
  }

  preload() {
    this.load.audio('bgMusic', ['assets/audio/world.mp3']);
    !isAllAssetsLoaded && this.handleLoadingScreen();
  }

  handleLoadingScreen() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    const progressBoxXPos = this.cameras.main.width / 3;
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(progressBoxXPos, 270, 320, 50);
    this.load.image('logo', 'assets/images/tavern.png');
    for (var i = 0; i < 500; i++) {
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
      console.log(value);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(progressBoxXPos, 280, 300 * value, 30);
      percentText.setText(parseInt(value * 100) + '%');
    });
    this.load.on('fileprogress', function (file) {
      console.log(file.src);
      assetText.setText('Loading asset: ' + file.key);
    });
    this.load.on('complete', function () {
      console.log('complete');
      isAllAssetsLoaded = true;
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }

  create() {
    room.then((room) =>
      room.onMessage((data) => {
        if (data.event === 'CURRENT_PLAYERS') {
          console.log('CURRENT_PLAYERSr');

          Object.keys(data.players).forEach((playerId) => {
            let player = data.players[playerId];

            if (playerId !== room.sessionId) {
              onlinePlayers[player.sessionId] = new OnlinePlayer({
                scene: this,
                playerId: player.sessionId,
                key: player.sessionId,
                map: player.map,
                x: player.x,
                y: player.y
              });
            }
          });
        }
        if (data.event === 'PLAYER_JOINED') {
          console.log('PLAYER_JOINED');

          if (!onlinePlayers[data.sessionId]) {
            onlinePlayers[data.sessionId] = new OnlinePlayer({
              scene: this,
              playerId: data.sessionId,
              key: data.sessionId,
              map: data.map,
              x: data.x,
              y: data.y
            });
          }
        }
        if (data.event === 'PLAYER_LEFT') {
          console.log('PLAYER_LEFT');

          if (onlinePlayers[data.sessionId]) {
            onlinePlayers[data.sessionId].destroy();
            delete onlinePlayers[data.sessionId];
          }
        }
        if (data.event === 'PLAYER_MOVED') {
          //console.log('PLAYER_MOVED');

          // If player is in same map
          if (this.mapName === onlinePlayers[data.sessionId].map) {
            // If player isn't registered in this scene (map changing bug..)
            if (!onlinePlayers[data.sessionId].scene) {
              onlinePlayers[data.sessionId] = new OnlinePlayer({
                scene: this,
                playerId: data.sessionId,
                key: data.sessionId,
                map: data.map,
                x: data.x,
                y: data.y
              });
            }
            // Start animation and set sprite position
            onlinePlayers[data.sessionId].isWalking(data.position, data.x, data.y);
          }
        }
        if (data.event === 'PLAYER_MOVEMENT_ENDED') {
          // If player is in same map
          if (this.mapName === onlinePlayers[data.sessionId].map) {
            // If player isn't registered in this scene (map changing bug..)
            if (!onlinePlayers[data.sessionId].scene) {
              onlinePlayers[data.sessionId] = new OnlinePlayer({
                scene: this,
                playerId: data.sessionId,
                key: data.sessionId,
                map: data.map,
                x: data.x,
                y: data.y
              });
            }
            // Stop animation & set sprite texture
            onlinePlayers[data.sessionId].stopWalking(data.position);
          }
        }
        if (data.event === 'PLAYER_CHANGED_MAP') {
          console.log('PLAYER_CHANGED_MAP');

          if (onlinePlayers[data.sessionId]) {
            onlinePlayers[data.sessionId].destroy();

            if (data.map === this.mapName && !onlinePlayers[data.sessionId].scene) {
              onlinePlayers[data.sessionId] = new OnlinePlayer({
                scene: this,
                playerId: data.sessionId,
                key: data.sessionId,
                map: data.map,
                x: data.x,
                y: data.y
              });
            }
          }
        }
      })
    );

    this.map = this.make.tilemap({ key: this.mapName });

    // Set current map Bounds
    this.scene.scene.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = this.map.addTilesetImage('tuxmon-sample-32px-extruded', 'TilesTown');

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    this.belowLayer = this.map.createLayer('Below Player', tileset, 0, 0);
    this.worldLayer = this.map.createLayer('World', tileset, 0, 0);
    this.grassLayer = this.map.createLayer('Grass', tileset, 0, 0);
    this.aboveLayer = this.map.createLayer('Above Player', tileset, 0, 0);

    this.worldLayer.setCollisionByProperty({ collides: true });

    // By default, everything gets depth sorted on the screen in the order we created things. Here, we
    // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
    // Higher depths will sit on top of lower depth objects.
    this.aboveLayer.setDepth(10);

    // Get spawn point from tiled map
    const spawnPoint = this.map.findObject('SpawnPoints', (obj) => obj.name === 'Spawn Point');

    // Set player
    this.player = new Player({
      scene: this,
      worldLayer: this.worldLayer,
      key: 'player',
      x: spawnPoint.x,
      y: spawnPoint.y,
      react: this.game.react
    });

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();

    // Help text that has a "fixed" position on the screen
    this.add
      .text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
        font: '18px monospace',
        fill: '#000000',
        padding: { x: 20, y: 10 },
        backgroundColor: '#ffffff'
      })
      .setScrollFactor(0)
      .setDepth(30);

    this.debugGraphics();

    this.movementTimer();

    this.playSound();
  }

  update(time, delta) {
    // Loop the player update method
    this.player.update(time, delta);

    // console.log('PlayerX: ' + this.player.x);
    // console.log('PlayerY: ' + this.player.y);

    // Horizontal movement
    if (cursors.left.isDown) {
      if (socketKey) {
        if (this.player.isMoved()) {
          room.then((room) =>
            room.send({
              event: 'PLAYER_MOVED',
              position: 'left',
              x: this.player.x,
              y: this.player.y
            })
          );
        }
        socketKey = false;
      }
    } else if (cursors.right.isDown) {
      if (socketKey) {
        if (this.player.isMoved()) {
          room.then((room) =>
            room.send({
              event: 'PLAYER_MOVED',
              position: 'right',
              x: this.player.x,
              y: this.player.y
            })
          );
        }
        socketKey = false;
      }
    }

    // Vertical movement
    if (cursors.up.isDown) {
      if (socketKey) {
        if (this.player.isMoved()) {
          room.then((room) =>
            room.send({
              event: 'PLAYER_MOVED',
              position: 'back',
              x: this.player.x,
              y: this.player.y
            })
          );
        }
        socketKey = false;
      }
    } else if (cursors.down.isDown) {
      if (socketKey) {
        if (this.player.isMoved()) {
          room.then((room) =>
            room.send({
              event: 'PLAYER_MOVED',
              position: 'front',
              x: this.player.x,
              y: this.player.y
            })
          );
        }
        socketKey = false;
      }
    }

    // Horizontal movement ended
    if (Phaser.Input.Keyboard.JustUp(cursors.left) === true) {
      room.then((room) => room.send({ event: 'PLAYER_MOVEMENT_ENDED', position: 'left' }));
    } else if (Phaser.Input.Keyboard.JustUp(cursors.right) === true) {
      room.then((room) => room.send({ event: 'PLAYER_MOVEMENT_ENDED', position: 'right' }));
    }

    // Vertical movement ended
    if (Phaser.Input.Keyboard.JustUp(cursors.up) === true) {
      room.then((room) => room.send({ event: 'PLAYER_MOVEMENT_ENDED', position: 'back' }));
    } else if (Phaser.Input.Keyboard.JustUp(cursors.down) === true) {
      room.then((room) => room.send({ event: 'PLAYER_MOVEMENT_ENDED', position: 'front' }));
    }
  }

  movementTimer() {
    setInterval(() => {
      socketKey = true;
    }, 50);
  }

  debugGraphics() {
    // Debug graphics
    this.input.keyboard.once('keydown_D', (event) => {
      // Turn on physics debugging to show player's hitbox
      this.physics.world.createDebugGraphic();

      // Create worldLayer collision graphic above the player, but below the help text
      const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);
      this.worldLayer.renderDebug(graphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      });
    });
  }

  playSound() {
    if (!this.bgMusic) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
    }
    if (!this.bgMusic?.isPlaying) {
      this.bgMusic.play();
    }
  }
}
