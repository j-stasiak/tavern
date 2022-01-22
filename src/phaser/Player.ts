import Phaser from 'phaser';
import { ReactPhaserProps } from '../react-phaser-middleware/ReactPhaserTransmitter';

export const SPEECH_BUBBLE_WIDTH = 140;
export const SPEECH_BUBBLE_HEIGHT = 60;

export default class Player extends Phaser.GameObjects.Sprite {
  private reactProps: ReactPhaserProps;
  //@ts-ignore
  private speechBubble: Phaser.GameObjects.Graphics;
  //@ts-ignore
  private speechBubbleContent: Phaser.GameObjects.Text;
  private spacebar: Phaser.Input.Keyboard.Key;

  constructor(config: any) {
    super(config.scene, config.x, config.y, config.key);
    this.reactProps = config.reactProps;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);
    this.scene.physics.add.collider(this, config.worldLayer);

    // @ts-ignore
    this.setTexture('currentPlayer', `misa-${this.scene.playerTexturePosition}`);
    // Register cursors for player movement
    // @ts-ignore
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.scene.input.keyboard.disableGlobalCapture();
    // Player Offset
    // @ts-ignore
    this.body.setOffset(0, 24);

    // Player can't go out of the world
    // @ts-ignore
    this.body.setCollideWorldBounds(true);

    // Set depth (z-index)
    this.setDepth(5);

    // Container to store old data
    // @ts-ignore
    this.container = [];

    // Player speed
    // @ts-ignore
    this.speed = 150;

    // @ts-ignore
    this.canChangeMap = true;

    // Player nickname text
    // @ts-ignore
    this.playerNickname = this.scene.add.text(this.x - this.width * 1.4, this.y - this.height / 2, config.nick);

    // Add spacebar input
    // @ts-ignore
    this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.createSpeechBubble(20, 20, SPEECH_BUBBLE_WIDTH, SPEECH_BUBBLE_HEIGHT, 'Ludzie zawsze gadają');
    this.toggleSpeechBubble('Cześć, jestem tu nowy');
  }

  // @ts-ignore
  update(time, delta) {
    // @ts-ignore
    const prevVelocity = this.body.velocity.clone();
    this.handleSpeechBubble();
    // Show player nickname above player
    this.showPlayerNickname();

    // Player door interaction
    this.doorInteraction();

    // Player world interaction
    this.worldInteraction();

    // Stop any previous movement from the last frame
    // @ts-ignore
    this.body.setVelocity(0);

    // Horizontal movement
    // @ts-ignore
    if (this.cursors.left.isDown) {
      // @ts-ignore
      this.body.setVelocityX(-this.speed);
    }
    // @ts-ignore
    else if (this.cursors.right.isDown) {
      // @ts-ignore
      this.body.setVelocityX(this.speed);
    }

    // Vertical movement
    // @ts-ignore
    if (this.cursors.up.isDown) {
      // @ts-ignore
      this.body.setVelocityY(-this.speed);
      // @ts-ignore
    } else if (this.cursors.down.isDown) {
      // @ts-ignore
      this.body.setVelocityY(this.speed);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    // this.body.velocity.normalize().scale(this.speed);

    // Update the animation last and give left/right animations precedence over up/down animations
    // @ts-ignore
    if (this.cursors.left.isDown) {
      this.anims.play('misa-left-walk', true);
    } // @ts-ignore
    else if (this.cursors.right.isDown) {
      this.anims.play('misa-right-walk', true);
    } // @ts-ignore
    else if (this.cursors.up.isDown) {
      this.anims.play('misa-back-walk', true);
    } // @ts-ignore
    else if (this.cursors.down.isDown) {
      this.anims.play('misa-front-walk', true);
    } else {
      this.anims.stop();

      // If we were moving, pick and idle frame to use
      if (prevVelocity.x < 0) this.setTexture('currentPlayer', 'misa-left');
      else if (prevVelocity.x > 0) this.setTexture('currentPlayer', 'misa-right');
      else if (prevVelocity.y < 0) this.setTexture('currentPlayer', 'misa-back');
      else if (prevVelocity.y > 0) this.setTexture('currentPlayer', 'misa-front');
    }
  }

  showPlayerNickname() {
    // @ts-ignore
    this.playerNickname.x = this.x - this.playerNickname.width / 2;
    // @ts-ignore
    this.playerNickname.y = this.y - this.height / 2;
  }

  isMoved() {
    if (
      // @ts-ignore
      this.container.oldPosition &&
      // @ts-ignore
      (this.container.oldPosition.x !== this.x || this.container.oldPosition.y !== this.y)
    ) {
      // @ts-ignore
      this.container.oldPosition = { x: this.x, y: this.y };
      return true;
    } else {
      // @ts-ignore
      this.container.oldPosition = { x: this.x, y: this.y };
      return false;
    }
  }

  doorInteraction() {
    // @ts-ignore
    this.scene.map.findObject('Doors', (obj) => {
      if (this.y >= obj.y && this.y <= obj.y + obj.height && this.x >= obj.x && this.x <= obj.x + obj.width) {
        // console.log('Player is by ' + obj.name);
        // @ts-ignore
        if (this.spacebar.isDown) {
          // console.log(this.reactProps);
          if (
            obj.properties?.some((prop: { name: string; value: boolean }) => prop.name === 'isCourse' && prop.value)
          ) {
            this.reactProps.course.selectCourse(obj.name);
          } else {
            this.worldInteraction2();
          }
        }
      }
    });
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
  }

  worldInteraction() {
    // @ts-ignore
    this.scene.map.findObject('Worlds', (world) => {
      if (
        this.y >= world.y &&
        this.y <= world.y + world.height &&
        this.x >= world.x &&
        this.x <= world.x + world.width
      ) {
        // console.log('Player is by world entry: ' + world.name);

        // Get playerTexturePosition from from Worlds object property
        let playerTexturePosition;
        if (world.properties)
          // @ts-ignore
          playerTexturePosition = world.properties.find((property) => property.name === 'playerTexturePosition');
        // @ts-ignore
        if (playerTexturePosition) this.playerTexturePosition = playerTexturePosition.value;

        // Load new level (tiles map)
        this.scene.registry.destroy();
        // @ts-ignore
        this.scene.events.off();
        // @ts-ignore
        this.scene.scene.restart({ map: world.name, playerTexturePosition: this.playerTexturePosition });
        this.reactProps.colyseus.room.then((room) =>
          // @ts-ignore
          room.send('PLAYER_CHANGED_MAP', {
            map: world.name
          })
        );
      }
    });
  }

  worldInteraction2() {
    // @ts-ignore
    this.scene.map.findObject('Worlds', (world) => {
      // console.log('Player is by world entry: ' + world.name);

      // Get playerTexturePosition from from Worlds object property
      // Load new level (tiles map)
      this.scene.registry.destroy();
      // @ts-ignore
      this.scene.events.off();
      // @ts-ignore
      this.scene.scene.restart({ map: 'route1', playerTexturePosition: this.playerTexturePosition });

      this.reactProps.colyseus.room.then((room) =>
        // @ts-ignore
        room.send('PLAYER_CHANGED_MAP', {
          map: world.name
        })
      );
    });
  }
}
