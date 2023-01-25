import Phaser from 'phaser';
import { ReactPhaserProps } from '../../../components/providers/ReactPhaserCommonsProvider';
import SpeechBubbleManager from './SpeechBubbleManager';

export default class PrincipalPlayer extends Phaser.GameObjects.Sprite {
  public reactProps: ReactPhaserProps;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private speed = 150;
  private spacebar!: Phaser.Input.Keyboard.Key;
  private playerNickname: Phaser.GameObjects.Text;
  private isGlobalCaptureEnabled!: boolean;
  private playerTexturePosition: any;
  private movementContainer = { oldPosition: undefined };
  public speechBubbleManager: SpeechBubbleManager;

  constructor(config: any) {
    super(config.scene, config.x, config.y, config.key);
    this.reactProps = config.reactProps;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this);
    this.scene.physics.add.collider(this, config.worldLayer);
    this.playerNickname = this.scene.add.text(this.x - this.width * 1.4, this.y - this.height / 2, config.nick);
    this.speechBubbleManager = new SpeechBubbleManager(this.scene);
    // @ts-ignore
    this.setTexture('currentPlayer', `misa-${this.scene.playerTexturePosition}`);
    // @ts-ignore
    this.body.setOffset(0, 24);
    // @ts-ignore
    this.body.setCollideWorldBounds(true);
    this.setDepth(1);
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.speechBubbleManager.createSpeechBubble(20, 20);
    this.speechBubbleManager.toggleSpeechBubble('Cześć, jestem tu nowy');
  }

  update(time: number, delta: number) {
    // @ts-ignore
    const velocityClone = this.body.velocity.clone();
    this.speechBubbleManager.handleSpeechBubble(this.x, this.y);
    this.updatePlayerNickPosition();
    this.handleMapChange();
    this.handleDoorClick();
    // Stop any previous movement from the last frame
    this.handlePlayerMovementPosition();
    this.handlePlayerMovementTexture(velocityClone);
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
    // @ts-ignore
    this.body.setVelocity(0);
    if (this.cursors.left.isDown) {
      // @ts-ignore
      this.body.setVelocityX(-this.speed);
    } else if (this.cursors.right.isDown) {
      // @ts-ignore
      this.body.setVelocityX(this.speed);
    }
    if (this.cursors.up.isDown) {
      // @ts-ignore
      this.body.setVelocityY(-this.speed);
    } else if (this.cursors.down.isDown) {
      // @ts-ignore
      this.body.setVelocityY(this.speed);
    }
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
