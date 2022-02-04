//@ts-nocheck
import Phaser from 'phaser';
import { ReactPhaserProps } from '../../../components/providers/ReactPhaserCommonsProvider';

export default class Player extends Phaser.GameObjects.Sprite {
  private reactProps: ReactPhaserProps;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private speed = 150;
  private spacebar!: Phaser.Input.Keyboard.Key;
  private playerNickname: Phaser.GameObjects.Text;
  private speechBubble!: Phaser.GameObjects.Graphics;
  private speechBubbleContent!: Phaser.GameObjects.Text;
  private isSpeechBubbleVisible!: boolean;
  private isGlobalCaptureEnabled!: boolean;
  private playerTexturePosition: any;
  private movementContainer = { oldPosition: undefined };

  constructor(config: any) {
    super(config.scene, config.x, config.y, config.key);
    this.reactProps = config.reactProps;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);
    this.scene.physics.add.collider(this, config.worldLayer);
    this.playerNickname = this.scene.add.text(this.x - this.width * 1.4, this.y - this.height / 2, config.nick);
    this.setTexture('currentPlayer', `misa-${this.scene.playerTexturePosition}`);
    this.body.setOffset(0, 24);
    this.body.setCollideWorldBounds(true);
    this.setDepth(1);
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.createSpeechBubble(20, 20, SPEECH_BUBBLE_WIDTH, SPEECH_BUBBLE_HEIGHT);
    this.toggleSpeechBubble('Cześć, jestem tu nowy');
  }

  update(time: number, delta: number) {
    const prevVelocity = this.body.velocity.clone();
    this.handleSpeechBubble();
    this.updatePlayerNickPosition();
    this.handleMapChange();
    this.handleDoorClick();
    // Stop any previous movement from the last frame
    this.handlePlayerMovementPosition();
    this.handlePlayerMovementTexture(prevVelocity);
  }

  updatePlayerNickPosition() {
    this.playerNickname.x = this.x - this.playerNickname.width / 2;
    this.playerNickname.y = this.y - this.height / 2;
  }

  handleMapChange() {
    //@ts-ignore
    this.scene.mapManager.map.findObject('Worlds', (collidingObject) => {
      if (
        this.x >= collidingObject.x &&
        this.x <= collidingObject.x + collidingObject.width &&
        this.y >= collidingObject.y &&
        this.y <= collidingObject.y + collidingObject.height
      ) {
        if (collidingObject.properties) {
          this.playerTexturePosition = collidingObject.properties.find(
            (property: { name: string }) => property.name === 'playerTexturePosition'
          ).value;
        }
        // Load new level (tiles map)
        this.scene.registry.destroy();
        // @ts-ignore
        this.scene.events.off();
        // @ts-ignore
        this.scene.scene.restart({ map: collidingObject.name, playerTexturePosition: this.playerTexturePosition });
        this.reactProps.colyseus.room.then((room) =>
          // @ts-ignore
          room.send('PLAYER_CHANGED_MAP', {
            map: collidingObject.name
          })
        );
      }
    });
  }

  private handlePlayerMovementTexture(prevVelocity: Phaser.Math.Vector2) {
    if (this.cursors.left.isDown) {
      this.enableGlobalCapture();
      this.anims.play('misa-left-walk', true);
    } // @ts-ignore
    else if (this.cursors.right.isDown) {
      this.enableGlobalCapture();
      this.anims.play('misa-right-walk', true);
    } // @ts-ignore
    else if (this.cursors.up.isDown) {
      this.enableGlobalCapture();
      this.anims.play('misa-back-walk', true);
    } // @ts-ignore
    else if (this.cursors.down.isDown) {
      this.enableGlobalCapture();
      this.anims.play('misa-front-walk', true);
    } else {
      this.disableGlobalCapture();
      this.anims.stop();
      if (prevVelocity.x < 0) {
        this.setTexture('currentPlayer', 'misa-left');
      } else if (prevVelocity.x > 0) {
        this.setTexture('currentPlayer', 'misa-right');
      } else if (prevVelocity.y > 0) {
        this.setTexture('currentPlayer', 'misa-front');
      } else if (prevVelocity.y < 0) {
        this.setTexture('currentPlayer', 'misa-back');
      }
    }
  }

  enableGlobalCapture() {
    if (!this.isGlobalCaptureEnabled) {
      this.scene.input.keyboard.enableGlobalCapture();
      this.isGlobalCaptureEnabled = true;
    }
  }

  disableGlobalCapture() {
    if (this.isGlobalCaptureEnabled) {
      this.scene.input.keyboard.disableGlobalCapture();
      this.isGlobalCaptureEnabled = false;
    }
  }

  private handlePlayerMovementPosition() {
    this.body.setVelocity(0);
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-this.speed);
    } else if (this.cursors.right.isDown) {
      this.body.setVelocityX(this.speed);
    }
    if (this.cursors.up.isDown) {
      this.body.setVelocityY(-this.speed);
    } else if (this.cursors.down.isDown) {
      this.body.setVelocityY(this.speed);
    }
  }

  handleSpeechBubble() {
    this.speechBubble.setX(this.x - 10);
    this.speechBubble.setY(this.y - 85);
    const b = this.speechBubbleContent.getBounds();
    this.speechBubbleContent.setPosition(
      this.speechBubble.x + SPEECH_BUBBLE_WIDTH / 2 - b.width / 2,
      this.speechBubble.y + SPEECH_BUBBLE_HEIGHT / 2 - b.height / 2
    );
    //TODO might be dangerous to update it every loop
    this.speechBubbleContent.setWordWrapWidth(SPEECH_BUBBLE_WIDTH);
  }

  createSpeechBubble(x: any, y: any, width: any, height: any) {
    const bubbleWidth = width;
    const bubbleHeight = height;
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
    this.speechBubbleContent = this.scene.add.text(0, 0, 's', {
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
  }

  private setSpeechBubbleColor() {
    this.speechBubble.fillStyle(0xffffff, 1);
    this.speechBubble.lineStyle(4, 0x565656, 1);
  }

  private setSpeechBubbleShadow(bubbleWidth, bubbleHeight) {
    this.speechBubble.fillStyle(0x222222, 0.5);
    this.speechBubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);
  }

  private setSpeechBubbleShape(bubbleWidth, bubbleHeight) {
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

  private setSpeechBubbleArrowShadow(point2X: number, point2Y, point3X: number, point3Y: number) {
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

  handleDoorClick() {
    // @ts-ignore
    this.scene.mapManager.map.findObject('Doors', (obj) => {
      if (this.y >= obj.y && this.y <= obj.y + obj.height && this.x >= obj.x && this.x <= obj.x + obj.width) {
        if (this.spacebar.isDown) {
          if (
            obj.properties?.some((prop: { name: string; value: boolean }) => prop.name === 'isCourse' && prop.value)
          ) {
            this.reactProps.course.selectCourse(obj.name);
          } else {
            this.changeMap();
          }
        }
      }
    });
  }

  changeMap() {
    // @ts-ignore
    this.scene.mapManager.map.findObject('Worlds', (world) => {
      // Get playerTexturePosition from from Worlds object property
      // Load new level (tiles map)
      this.scene.registry.destroy();
      // @ts-ignore
      this.scene.events.off();
      // @ts-ignore
      this.scene.scene.restart({ map: 'bonusMap', playerTexturePosition: this.playerTexturePosition });

      this.reactProps.colyseus.room.then((room) =>
        // @ts-ignore
        room.send('PLAYER_CHANGED_MAP', {
          map: world.name
        })
      );
    });
  }

  hasMoved() {
    if (
      // @ts-ignore
      this.movementContainer?.oldPosition &&
      // @ts-ignore
      (this.movementContainer.oldPosition.x !== this.x || this.movementContainer.oldPosition.y !== this.y)
    ) {
      // @ts-ignore
      this.movementContainer.oldPosition = { x: this.x, y: this.y };
      return true;
    } else {
      // @ts-ignore
      this.movementContainer.oldPosition = { x: this.x, y: this.y };
      return false;
    }
  }
}
export const SPEECH_BUBBLE_WIDTH = 140;
export const SPEECH_BUBBLE_HEIGHT = 60;
