import Phaser from 'phaser';
import { onlinePlayers, room } from './SocketServer';

import Player from './Player';
import OnlinePlayer, { DYNAMIC_PLAYER_FIELDS } from './OnlinePlayer';
import { getGameProps } from './util/configUtils';

let cursors, socketKey;

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

  create() {
    this.map = this.make.tilemap({ key: this.mapName });

    // Set current map Bounds
    this.scene.scene.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = this.map.addTilesetImage('tuxmon-sample-32px-extruded', 'TilesTown');

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    this.belowLayer = this.map.createStaticLayer('Below Player', tileset, 0, 0);
    this.worldLayer = this.map.createStaticLayer('World', tileset, 0, 0);
    this.grassLayer = this.map.createStaticLayer('Grass', tileset, 0, 0);
    this.aboveLayer = this.map.createStaticLayer('Above Player', tileset, 0, 0);

    this.worldLayer.setCollisionByProperty({ collides: true });

    // By default, everything gets depth sorted on the screen in the order we created things. Here, we
    // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
    // Higher depths will sit on top of lower depth objects.
    this.aboveLayer.setDepth(10);

    // Get spawn point from tiled map
    const spawnPoint = this.map.findObject('SpawnPoints', (obj) => obj.name === 'Spawn Point');

    // Set player
    const gameProps = getGameProps(this.game);
    this.player = new Player({
      scene: this,
      worldLayer: this.worldLayer,
      key: 'player',
      x: spawnPoint.x,
      y: spawnPoint.y,
      reactProps: gameProps
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

    const addPlayerToGame = (sessionId, player) => {
      console.log(sessionId);
      console.log(player);
      onlinePlayers[sessionId] = new OnlinePlayer({
        scene: this,
        playerId: sessionId,
        key: sessionId,
        map: player.map,
        x: player.x,
        y: player.y
      });

      player.onChange = (changes) => {
        // Do some proper dictionary for field changes?
        changes.forEach((change) => {
          if (DYNAMIC_PLAYER_FIELDS.includes(change.field) && change.previousValue !== change.value) {
            if (change.field === 'x' || change.field === 'y') {
              onlinePlayers[sessionId].move(change.field, change.value);
            } else if (change.field === 'walking') {
              if (change.value === true) {
                onlinePlayers[sessionId].playWalkingAnimation(player.position);
              } else {
                onlinePlayers[sessionId].stopWalkingAnimation(player.position);
              }
            } else if (change.field === 'map') {
              onlinePlayers[sessionId].destroy();

              if (change.value === this.mapName && !onlinePlayers[sessionId].scene) {
                onlinePlayers[sessionId] = new OnlinePlayer({
                  scene: this,
                  playerId: sessionId,
                  key: sessionId,
                  map: change.value,
                  x: player.x,
                  y: player.y
                });
              }
            } else {
              onlinePlayers[sessionId][change.field] = change.value;
            }
          }
        });
      };
    };
    // this.openSocketConnection();
    room.then((room) => {
      for (const [sessionId, player] of room.state.players) {
        if (sessionId !== room.sessionId) {
          console.log('Adding another players...');
          addPlayerToGame(sessionId, player);
        }
      }
      room.state.players.onAdd = (player, sessionId) => {
        console.log('Player joined, setting up listeners...');
        addPlayerToGame(sessionId, player);
      };

      room.state.players.onRemove = (player, sessionId) => {
        if (onlinePlayers[sessionId]) {
          onlinePlayers[sessionId].destroy();
          delete onlinePlayers[sessionId];
        }
      };
    });
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
            room.send('PLAYER_MOVED', {
              position: 'left',
              walking: true,
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
            room.send('PLAYER_MOVED', {
              position: 'right',
              walking: true,
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
            room.send('PLAYER_MOVED', {
              position: 'back',
              walking: true,
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
            room.send('PLAYER_MOVED', {
              position: 'front',
              walking: true,
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
      room.then((room) => room.send('PLAYER_MOVEMENT_ENDED', { position: 'left', walking: false }));
    } else if (Phaser.Input.Keyboard.JustUp(cursors.right) === true) {
      room.then((room) => room.send('PLAYER_MOVEMENT_ENDED', { position: 'right', walking: false }));
    }

    // Vertical movement ended
    if (Phaser.Input.Keyboard.JustUp(cursors.up) === true) {
      room.then((room) => room.send('PLAYER_MOVEMENT_ENDED', { position: 'back', walking: false }));
    } else if (Phaser.Input.Keyboard.JustUp(cursors.down) === true) {
      room.then((room) => room.send('PLAYER_MOVEMENT_ENDED', { position: 'front', walking: false }));
    }
  }

  movementTimer() {
    setInterval(() => {
      socketKey = true;
    }, 50);
  }

  debugGraphics() {
    // Debug graphics
    this.input.keyboard.once('keydown_D', (_) => {
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
}
