import Phaser from 'phaser';
import { Scene2 } from './Scene2';
import { SPEECH_BUBBLE_HEIGHT, SPEECH_BUBBLE_WIDTH } from './Player';

export const DYNAMIC_PLAYER_FIELDS = ['x', 'y', 'position', 'walking', 'map'];

export default class OnlinePlayer extends Phaser.GameObjects.Sprite {
  //@ts-ignore
  private speechBubble: Phaser.GameObjects.Graphics;
  //@ts-ignore
  private speechBubbleContent: Phaser.GameObjects.Text;

  constructor(config: {
    x: number;
    y: number;
    map: any;
    key: any;
    scene: Scene2;
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

    // @ts-ignore
    this.map = config.map;

    // Player Offset
    // @ts-ignore
    this.body.setOffset(0, 24);

    // Display playerId above player
    // @ts-ignore
    this.playerNickname = this.scene.add.text(this.x - 40, this.y - 25, config.nick);

    this.createSpeechBubble(20, 20, SPEECH_BUBBLE_WIDTH, SPEECH_BUBBLE_HEIGHT, 'Ludzie zawsze gadają');
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

  // @ts-ignore
  playWalkingAnimation(position) {
    this.anims.play(`onlinePlayer-${position}-walk`, true);
  }

  // @ts-ignore
  stopWalkingAnimation(position) {
    this.anims.stop();
    this.setTexture('players', `bob_${position}.png`);
  }

  destroy() {
    super.destroy();
    // @ts-ignore
    this.playerNickname.destroy();
  }

  update() {
    // console.log('online playter update');
    this.handleSpeechBubble();
  }

  isSpeechBubbleVisible = false;

  toggleSpeechBubble(message: string) {
    this.speechBubbleContent.setText(message);
    this.showSpeechBubble();
    setTimeout(() => {
      this.hideSpeechBubble();
    }, 5000);
  }

  showSpeechBubble() {
    this.isSpeechBubbleVisible = true;
    this.speechBubble.setVisible(this.isSpeechBubbleVisible);
    this.speechBubbleContent.setVisible(this.isSpeechBubbleVisible);
  }

  hideSpeechBubble() {
    this.isSpeechBubbleVisible = false;
    this.speechBubble.setVisible(this.isSpeechBubbleVisible);
    this.speechBubbleContent.setVisible(this.isSpeechBubbleVisible);
  }

  handleSpeechBubble() {
    this.speechBubble.setX(this.x - 10);
    this.speechBubble.setY(this.y - 85);
    const b = this.speechBubbleContent.getBounds();
    this.speechBubbleContent.setPosition(
      this.speechBubble.x + SPEECH_BUBBLE_WIDTH / 2 - b.width / 2,
      this.speechBubble.y + SPEECH_BUBBLE_HEIGHT / 2 - b.height / 2
    );
    //Todo might be dangerous to update it every loop
    this.speechBubbleContent.setWordWrapWidth(SPEECH_BUBBLE_WIDTH);
  }

  createSpeechBubble(x: any, y: any, width: any, height: any, quote: any) {
    const bubbleWidth = width;
    const bubbleHeight = height;
    const arrowHeight = bubbleHeight / 4;

    this.speechBubble = this.scene.add.graphics({ x: x, y: y });
    this.speechBubble.alpha = 0.6;
    //  Bubble shadow
    this.speechBubble.fillStyle(0x222222, 0.5);
    this.speechBubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

    //  Bubble color
    this.speechBubble.fillStyle(0xffffff, 1);

    //  Bubble outline line style
    this.speechBubble.lineStyle(4, 0x565656, 1);

    //  Bubble shape and outline
    this.speechBubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    this.speechBubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    //  Calculate arrow coordinates
    const point1X = Math.floor(bubbleWidth / 7);
    const point1Y = bubbleHeight;
    const point2X = Math.floor((bubbleWidth / 7) * 2);
    const point2Y = bubbleHeight;
    const point3X = Math.floor(bubbleWidth / 7);
    const point3Y = Math.floor(bubbleHeight + arrowHeight);

    //  Bubble arrow shadow
    this.speechBubble.lineStyle(4, 0x222222, 0.5);
    this.speechBubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

    //  Bubble arrow fill
    this.speechBubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    this.speechBubble.lineStyle(4, 0x565656, 1);
    this.speechBubble.lineBetween(point2X, point2Y, point3X, point3Y);
    this.speechBubble.lineBetween(point1X, point1Y, point3X, point3Y);

    this.speechBubbleContent = this.scene.add.text(0, 0, quote, {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      color: '#862d2d',
      align: 'center'
    });
    this.speechBubbleContent.setFontSize(16);

    const b = this.speechBubbleContent.getBounds();

    this.speechBubbleContent.setPosition(
      this.speechBubble.x + bubbleWidth / 2 - b.width / 2,
      this.speechBubble.y + bubbleHeight / 2 - b.height / 2
    );

    this.hideSpeechBubble();
  }
}
