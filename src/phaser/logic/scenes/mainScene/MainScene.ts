import Phaser from 'phaser';
import { getGameProps } from '../../../util/configUtils';
import Player from '../../../Player';
import { blockMapBorders } from './mainSceneUtil';
import { LayerStorage, MapManager } from './interfaces';
import { getLayers } from '../utils/layerUtils';
import { ReactPhaserProps } from '../../../../components/providers/ReactPhaserCommonsProvider';
import { renderHint } from '../utils/hintUtils';
import { createPlayerFollowingCamera } from '../utils/cameraUtils';
import OnlinePlayer, { DYNAMIC_PLAYER_FIELDS } from '../../../OnlinePlayer';

export class MainScene extends Phaser.Scene {
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
    // this.openSocketConnection();
    // this.handleColyseus();
  }

  // private handleColyseus() {
  //   this.gameProps.colyseus.room.then((room) => {
  //     if (room) {
  //       room.state.messages.onAdd = (message, _) => {
  //         this.gameProps.chat.setMessages([...room.state.messages]);
  //         this.gameProps.principal.nick === message.nick && this.player.toggleSpeechBubble(message.message); //
  //         for (const [sessionId, player] of room.state.players) {
  //           message.nick === player.nick &&
  //             this.gameProps.colyseus.onlinePlayers[sessionId].toggleSpeechBubble(message.message);
  //         }
  //
  //         for (const onlinePlayer in this.gameProps.colyseus.onlinePlayers) {
  //           this.gameProps.colyseus.onlinePlayers[onlinePlayer].update();
  //         }
  //
  //         //message.nick === principalNick && player.showBubble
  //
  //         // this.gameProps.colyseus.this.gameProps.colyseus.onlinePlayers.find(value => value.)
  //       };
  //       for (const [sessionId, player] of room.state.players) {
  //         if (sessionId !== room.sessionId) {
  //           console.log('Adding another players...');
  //           this.addPlayerToGame(sessionId, player);
  //         }
  //       }
  //       room.state.players.onAdd = (player, sessionId) => {
  //         console.log('Player joined, setting up listeners...');
  //         this.addPlayerToGame(sessionId, player);
  //       };
  //
  //       room.state.players.onRemove = (player, sessionId) => {
  //         if (this.gameProps.colyseus.onlinePlayers[sessionId]) {
  //           this.gameProps.colyseus.onlinePlayers[sessionId].destroy();
  //           delete this.gameProps.colyseus.onlinePlayers[sessionId];
  //         }
  //       };
  //     }
  //   });
  // }

  private addPlayerToGame() {
    return (
      sessionId: any,
      player: {
        nick: string;
        map: Phaser.Tilemaps.Tilemap;
        x: any;
        y: any;
        onChange: (changes: any) => void;
        position: any;
      }
    ) => {
      this.gameProps.colyseus.onlinePlayers[sessionId] = new OnlinePlayer({
        scene: this,
        playerId: sessionId,
        nick: player.nick,
        key: sessionId,
        map: player.map,
        x: player.x,
        y: player.y
      });
      player.onChange = (changes) => {
        changes.forEach((change: { field: string; previousValue: any; value: boolean }) => {
          if (DYNAMIC_PLAYER_FIELDS.includes(change.field) && change.previousValue !== change.value) {
            if (change.field === 'x' || change.field === 'y') {
              this.gameProps.colyseus.onlinePlayers[sessionId].move(change.field, change.value);
            } else if (change.field === 'walking') {
              if (change.value) {
                this.gameProps.colyseus.onlinePlayers[sessionId].playWalkingAnimation(player.position);
              } else {
                this.gameProps.colyseus.onlinePlayers[sessionId].stopWalkingAnimation(player.position);
              }
            } else if (change.field === 'map') {
              this.gameProps.colyseus.onlinePlayers[sessionId].destroy();

              if (
                /*change.value === this.mapManager.mapName && */ !this.gameProps.colyseus.onlinePlayers[sessionId].scene
              ) {
                this.gameProps.colyseus.onlinePlayers[sessionId] = new OnlinePlayer({
                  scene: this,
                  nick: player.nick,
                  playerId: sessionId,
                  key: sessionId,
                  map: change.value,
                  x: player.x,
                  y: player.y
                });
              }
            } else {
              this.gameProps.colyseus.onlinePlayers[sessionId][change.field] = change.value;
            }
          }
        });
      };
    };
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
    // By default, everything gets depth sorted on the screen in the order we created things. Here, we
    // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
    // Higher depths will sit on top of lower depth objects.
    this.layerStorage.aboveLayer.setDepth(10);
    this.layerStorage.worldLayer.setDepth(10);
  }

  startMovementInterval() {
    setInterval(() => {
      this.socketKey = true;
    }, 50);
  }
}
