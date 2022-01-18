import Phaser from 'phaser';
import { onlinePlayers, room } from './SocketServer';
import { ReactPhaserProps } from '../react-phaser-middleware/ReactPhaserTransmitter';

export default class Player extends Phaser.GameObjects.Sprite {
  private reactProps: ReactPhaserProps;
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
    this.playerNickname = this.scene.add.text(this.x - this.width * 1.4, this.y - this.height / 2, 'Player');

    // Add spacebar input
    // @ts-ignore
    this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  // @ts-ignore
  update(time, delta) {
    // @ts-ignore
    const prevVelocity = this.body.velocity.clone();

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
          console.log(this.reactProps);
          this.reactProps.course.selectCourse(obj.name);
          // console.log('Door is open!');
          this.worldInteraction2();
        }
      }
    });
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

        room.then((room) =>
          // @ts-ignore
          room.send({
            event: 'PLAYER_CHANGED_MAP',
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

      room.then((room) =>
        // @ts-ignore
        room.send({
          event: 'PLAYER_CHANGED_MAP',
          map: world.name
        })
      );
    });
  }
}
