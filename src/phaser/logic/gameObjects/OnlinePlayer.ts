import Phaser from 'phaser';
import { MainScene } from '../scenes/mainScene/MainScene';
import SpeechBubbleManager from './SpeechBubbleManager';

export default class OnlinePlayer extends Phaser.GameObjects.Sprite {
  public speechBubbleManager: SpeechBubbleManager;
  private playerNickname: any;
  private map: any;

  constructor(config: {
    x: number;
    y: number;
    map: any;
    key: any;
    scene: MainScene;
    playerId: string | Phaser.Textures.Texture | string[];
    nick: string;
  }) {
    // @ts-ignore
    super(config.scene, config.x, config.y, config.playerId);
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);
    // @ts-ignore
    this.scene.physics.add.collider(this, config.worldLayer);
    this.setTexture('players', 'bob_front.png').setScale(1.9, 2.1);
    this.speechBubbleManager = new SpeechBubbleManager(this.scene);
    this.map = config.map;

    // Player Offset
    // @ts-ignore
    this.body.setOffset(0, 24);

    // Display playerId above player
    // @ts-ignore
    this.playerNickname = this.scene.add.text(this.x - 40, this.y - 25, config.nick);
    this.speechBubbleManager.createSpeechBubble(20, 20);
  }

  // @ts-ignore
  move(axis, value) {
    // Player
    if (axis === 'x') {
      this.setX(value);
      // @ts-ignore
      this.playerNickname.x = this.x - 40;
    } else if (axis === 'y') {
      this.setY(value);
      // @ts-ignore
      this.playerNickname.y = this.y - 25;
    }
  }

  playWalkingAnimation(position: string) {
    this.anims?.play(`onlinePlayer-${position}-walk`, true);
  }

  stopWalkingAnimation(position: string) {
    this.anims?.stop();
    this.setTexture('players', `bob_${position}.png`);
  }

  destroy() {
    super.destroy();
    this.playerNickname.destroy();
  }

  update() {
    this.speechBubbleManager.handleSpeechBubble(this.x, this.y);
  }
}

export const DYNAMIC_PLAYER_FIELDS = ['x', 'y', 'position', 'walking', 'map'];
