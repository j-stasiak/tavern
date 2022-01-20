import Phaser from 'phaser';

import Player from './Player';
import OnlinePlayer from './OnlinePlayer';
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
    this.colyseus = getGameProps(this.game).colyseus;

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    cursors = this.input.keyboard.createCursorKeys();

    // Help text that has a "fixed" position on the screen
    this.add
      .text(16, 16, 'Arrow keys to move', {
        font: '18px monospace',
        fill: '#000000',
        padding: { x: 20, y: 10 },
        backgroundColor: '#ffffff'
      })
      .setScrollFactor(0)
      .setDepth(30);

    this.movementTimer();
    this.handleColyseus();
  }

  handleColyseus() {
    this.colyseus.room.then((room) => {
      console.log(room.state.players);
      for (const [sessionId, player] of room.state.players) {
        this.colyseus.onlinePlayers[sessionId] = new OnlinePlayer({
          scene: this,
          playerId: player.sessionId,
          key: player.sessionId,
          map: player.map,
          x: player.x,
          y: player.y
        });
      }
      room.onMessage('CURRENT_PLAYERS', (data) => {
        console.log('CURRENT_PLAYERS');
        console.log(data);

        Object.keys(data.players).forEach((playerId) => {
          let player = data.players[playerId];

          if (playerId !== room.sessionId) {
            this.colyseus.onlinePlayers[player.sessionId] = new OnlinePlayer({
              scene: this,
              playerId: player.sessionId,
              key: player.sessionId,
              map: player.map,
              x: player.x,
              y: player.y
            });
          }
        });
      });
      room.onMessage('PLAYER_JOINED', (data) => {
        console.log('PLAYER_JOINED');
        console.log(data);
        if (!this.colyseus.onlinePlayers[data.sessionId]) {
          this.colyseus.onlinePlayers[data.sessionId] = new OnlinePlayer({
            scene: this,
            playerId: data.sessionId,
            key: data.sessionId,
            map: data.map,
            x: data.x,
            y: data.y
          });
        }
      });
      room.onMessage('PLAYER_LEFT', (data) => {
        console.log('PLAYER_LEFT');

        if (this.colyseus.onlinePlayers[data.sessionId]) {
          this.colyseus.onlinePlayers[data.sessionId].destroy();
          delete this.colyseus.onlinePlayers[data.sessionId];
        }
      });
      room.onMessage('PLAYER_MOVED', (data) => {
        //console.log('PLAYER_MOVED');
        console.log(data);
        // If player is in same map
        if (this.mapName === this.colyseus.onlinePlayers[data.sessionId].map) {
          // If player isn't registered in this scene (map changing bug..)
          if (!this.colyseus.onlinePlayers[data.sessionId].scene) {
            this.colyseus.onlinePlayers[data.sessionId] = new OnlinePlayer({
              scene: this,
              playerId: data.sessionId,
              key: data.sessionId,
              map: data.map,
              x: data.x,
              y: data.y
            });
          }
          // Start animation and set sprite position
          this.colyseus.onlinePlayers[data.sessionId].isWalking(data.position, data.x, data.y);
        }
      });
      room.onMessage('PLAYER_MOVEMENT_ENDED', (data) => {
        // If player is in same map
        if (this.mapName === this.colyseus.onlinePlayers[data.sessionId].map) {
          // If player isn't registered in this scene (map changing bug..)
          if (!this.colyseus.onlinePlayers[data.sessionId].scene) {
            this.colyseus.onlinePlayers[data.sessionId] = new OnlinePlayer({
              scene: this,
              playerId: data.sessionId,
              key: data.sessionId,
              map: data.map,
              x: data.x,
              y: data.y
            });
          }
          // Stop animation & set sprite texture
          this.colyseus.onlinePlayers[data.sessionId].stopWalking(data.position);
        }
      });
      room.onMessage('PLAYER_CHANGED_MAP', (data) => {
        console.log('PLAYER_CHANGED_MAP');

        if (this.colyseus.onlinePlayers[data.sessionId]) {
          this.colyseus.onlinePlayers[data.sessionId].destroy();

          if (data.map === this.mapName && !this.colyseus.onlinePlayers[data.sessionId].scene) {
            this.colyseus.onlinePlayers[data.sessionId] = new OnlinePlayer({
              scene: this,
              playerId: data.sessionId,
              key: data.sessionId,
              map: data.map,
              x: data.x,
              y: data.y
            });
          }
        }
      });
    });
  }

  update(time, delta) {
    // Loop the player update method
    this.player.update(time, delta);

    // Horizontal movement
    if (cursors.left.isDown) {
      if (socketKey) {
        if (this.player.isMoved()) {
          this.colyseus.room.then((room) =>
            room.send('PLAYER_MOVED', {
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
          this.colyseus.room.then((room) =>
            room.send('PLAYER_MOVED', {
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
          this.colyseus.room.then((room) =>
            room.send('PLAYER_MOVED', {
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
          this.colyseus.room.then((room) =>
            room.send('PLAYER_MOVED', {
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
      this.colyseus.room.then((room) => room.send('PLAYER_MOVEMENT_ENDED', { position: 'left' }));
    } else if (Phaser.Input.Keyboard.JustUp(cursors.right) === true) {
      this.colyseus.room.then((room) => room.send('PLAYER_MOVEMENT_ENDED', { position: 'right' }));
    }

    // Vertical movement ended
    if (Phaser.Input.Keyboard.JustUp(cursors.up) === true) {
      this.colyseus.room.then((room) => room.send('PLAYER_MOVEMENT_ENDED', { position: 'back' }));
    } else if (Phaser.Input.Keyboard.JustUp(cursors.down) === true) {
      this.colyseus.room.then((room) => room.send('PLAYER_MOVEMENT_ENDED', { position: 'front' }));
    }
  }

  movementTimer() {
    setInterval(() => {
      socketKey = true;
    }, 50);
  }
}
