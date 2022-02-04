import Phaser from 'phaser';
import { getGameProps } from '../../../util/configUtils';
import { blockMapBorders } from './mainSceneUtil';
import { LayerStorage, MapManager } from './interfaces';
import { getLayers } from '../utils/layerUtils';
import { ReactPhaserProps } from '../../../../components/providers/ReactPhaserCommonsProvider';
import { renderHint } from '../utils/hintUtils';
import { createPlayerFollowingCamera } from '../utils/cameraUtils';
import { handleColyseus } from './colysesusHandler';
import { GameScene } from '../GameScene';
import Player from '../../gameObjects/Player';

export class MainScene extends GameScene {
  private mapManager!: MapManager;
  private playerTexturePosition!: 'front';
  private layerStorage!: LayerStorage;
  private gameProps!: ReactPhaserProps;
  private player!: Player;
  private cursorKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
  private camera!: Phaser.Cameras.Scene2D.Camera;
  private socketKey!: boolean;

  constructor() {
    super('mainMapScene');
  }

  init(data: { map: any; playerTexturePosition: any }) {
    this.mapManager = { mapName: data.map, map: this.make.tilemap({ key: data.map }) };
    this.playerTexturePosition = data.playerTexturePosition;
  }

  create() {
    this.gameProps = getGameProps(this.game);
    blockMapBorders(this, this.mapManager.map);
    this.createLayers();
    this.createPlayer();
    this.camera = createPlayerFollowingCamera(this, this.player, this.mapManager.map);
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.input.keyboard.disableGlobalCapture();
    renderHint(this);
    this.startMovementInterval();
    handleColyseus(this.gameProps, this.player, this);
  }

  update(time: number, delta: number) {
    this.invokePlayerUpdateMethod(time, delta);
    this.invokeOnlinePlayersUpdateMethods(time, delta);
    this.sendLastPlayerActionToServer();
  }

  private invokePlayerUpdateMethod(time: number, delta: number) {
    this.player.update(time, delta);
  }

  private invokeOnlinePlayersUpdateMethods(time: number, delta: number) {
    for (const onlinePlayer in this.gameProps.colyseus.onlinePlayers) {
      this.gameProps.colyseus.onlinePlayers[onlinePlayer].update(time, delta);
    }
  }

  private sendLastPlayerActionToServer() {
    // Horizontal movement
    if (this.cursorKeys.left.isDown) {
      if (this.socketKey) {
        if (this.player.hasMoved()) {
          this.gameProps.colyseus.room.then((room: any) =>
            room.send('PLAYER_MOVED', {
              position: 'left',
              walking: true,
              x: this.player.x,
              y: this.player.y
            })
          );
        }
        this.socketKey = false;
      }
    } else if (this.cursorKeys.right.isDown) {
      if (this.socketKey) {
        if (this.player.hasMoved()) {
          this.gameProps.colyseus.room.then((room: any) =>
            room.send('PLAYER_MOVED', {
              position: 'right',
              walking: true,
              x: this.player.x,
              y: this.player.y
            })
          );
        }
        this.socketKey = false;
      }
    }

    // Vertical movement
    if (this.cursorKeys.up.isDown) {
      if (this.socketKey) {
        if (this.player.hasMoved()) {
          this.gameProps.colyseus.room.then((room: any) =>
            room.send('PLAYER_MOVED', {
              position: 'back',
              walking: true,
              x: this.player.x,
              y: this.player.y
            })
          );
        }
        this.socketKey = false;
      }
    } else if (this.cursorKeys.down.isDown) {
      if (this.socketKey) {
        if (this.player.hasMoved()) {
          this.gameProps.colyseus.room.then((room: any) =>
            room.send('PLAYER_MOVED', {
              position: 'front',
              walking: true,
              x: this.player.x,
              y: this.player.y
            })
          );
        }
        this.socketKey = false;
      }
    }
    // Vertical movement ended
    if (Phaser.Input.Keyboard.JustUp(this.cursorKeys.up)) {
      this.gameProps.colyseus.room.then((room: any) =>
        room.send('PLAYER_MOVEMENT_ENDED', { position: 'back', walking: false })
      );
    } else if (Phaser.Input.Keyboard.JustUp(this.cursorKeys.down)) {
      this.gameProps.colyseus.room.then((room: any) =>
        room.send('PLAYER_MOVEMENT_ENDED', { position: 'front', walking: false })
      );
    }
    // Horizontal movement ended
    if (Phaser.Input.Keyboard.JustUp(this.cursorKeys.left)) {
      this.gameProps.colyseus.room.then((room: any) =>
        room.send('PLAYER_MOVEMENT_ENDED', { position: 'left', walking: false })
      );
    } else if (Phaser.Input.Keyboard.JustUp(this.cursorKeys.right)) {
      this.gameProps.colyseus.room.then((room: any) =>
        room.send('PLAYER_MOVEMENT_ENDED', { position: 'right', walking: false })
      );
    }
  }

  private createPlayer() {
    const spawnPoint = this.mapManager.map.findObject('SpawnPoints', (obj) => obj.name === 'Spawn Point');
    this.player = new Player({
      scene: this,
      nick: this.gameProps.principal.nick,
      worldLayer: this.layerStorage.worldLayer,
      key: 'player',
      x: spawnPoint.x,
      y: spawnPoint.y,
      reactProps: this.gameProps
    });
  }

  private createLayers() {
    this.layerStorage = getLayers(this.mapManager.map);
    this.layerStorage.worldLayer.setCollisionByProperty({ collides: true });
    this.layerStorage.aboveLayer.setDepth(1);
    this.layerStorage.worldLayer.setDepth(2);
  }

  startMovementInterval() {
    setInterval(() => {
      this.socketKey = true;
    }, 50);
  }
}
