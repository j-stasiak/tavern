import Phaser from 'phaser';

export default class SpeechBubbleManager {
  private speechBubbleContent!: Phaser.GameObjects.Text;
  private speechBubble!: Phaser.GameObjects.Graphics;
  private isSpeechBubbleVisible!: boolean;
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public handleSpeechBubble(playerX: number, playerY: number) {
    this.speechBubble.setX(playerX - 10);
    this.speechBubble.setY(playerY - 85);
    const b = this.speechBubbleContent.getBounds();
    this.speechBubbleContent.setPosition(
      this.speechBubble.x + SPEECH_BUBBLE_WIDTH / 2 - b.width / 2,
      this.speechBubble.y + SPEECH_BUBBLE_HEIGHT / 2 - b.height / 2
    );
    //TODO might be dangerous to update it every loop
    this.speechBubbleContent.setWordWrapWidth(SPEECH_BUBBLE_WIDTH);
  }

  createSpeechBubble(x: any, y: any) {
    const bubbleWidth = SPEECH_BUBBLE_WIDTH;
    const bubbleHeight = SPEECH_BUBBLE_HEIGHT;
    const arrowHeight = bubbleHeight / 4;

    this.speechBubble = this.scene.add.graphics({ x: x, y: y });
    this.speechBubble.alpha = 0.6;
    this.setSpeechBubbleShadow(bubbleWidth, bubbleHeight);
    this.setSpeechBubbleColor();
    this.setSpeechBubbleShape(bubbleWidth, bubbleHeight);
    const point1X = Math.floor(bubbleWidth / 7);
    const point1Y = bubbleHeight;
    const point2X = Math.floor((bubbleWidth / 7) * 2);
    const point2Y = bubbleHeight;
    const point3X = Math.floor(bubbleWidth / 7);
    const point3Y = Math.floor(bubbleHeight + arrowHeight);
    this.setSpeechBubbleArrowShadow(point2X, point2Y, point3X, point3Y);
    this.setSpeechBubbleArrowFill(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    this.speechBubbleContent = this.scene.add.text(0, 0, '', {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      color: '#86522d',
      align: 'center'
    });
    this.speechBubbleContent.setFontSize(16);

    const b = this.speechBubbleContent.getBounds();

    this.speechBubbleContent.setPosition(
      this.speechBubble.x + bubbleWidth / 2 - b.width / 2,
      this.speechBubble.y + bubbleHeight / 2 - b.height / 2
    );
    this.speechBubble.depth = 7;
    this.speechBubbleContent.depth = 7;
    this.speechBubble.setVisible(false);
    this.speechBubbleContent.setVisible(false);
  }

  private setSpeechBubbleColor() {
    this.speechBubble.fillStyle(0xffffff, 1);
    this.speechBubble.lineStyle(4, 0x565656, 1);
  }

  private setSpeechBubbleShadow(bubbleWidth: number, bubbleHeight: number) {
    this.speechBubble.fillStyle(0x222222, 0.5);
    this.speechBubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);
  }

  private setSpeechBubbleShape(bubbleWidth: number, bubbleHeight: number) {
    this.speechBubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    this.speechBubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
  }

  private setSpeechBubbleArrowFill(
    point1X: number,
    point1Y: number,
    point2X: number,
    point2Y: number,
    point3X: number,
    point3Y: number
  ) {
    this.speechBubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    this.speechBubble.lineStyle(4, 0x565656, 1);
    this.speechBubble.lineBetween(point2X, point2Y, point3X, point3Y);
    this.speechBubble.lineBetween(point1X, point1Y, point3X, point3Y);
  }

  private setSpeechBubbleArrowShadow(point2X: number, point2Y: number, point3X: number, point3Y: number) {
    this.speechBubble.lineStyle(4, 0x222222, 0.5);
    this.speechBubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);
  }

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
}
const SPEECH_BUBBLE_WIDTH = 140;
const SPEECH_BUBBLE_HEIGHT = 60;
