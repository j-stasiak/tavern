import Phaser from 'phaser';
import React, { useEffect } from 'react';

const Game: React.FC = () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: 'phaser-example',
      width: 800,
      height: 800,
      scene: {
        preload: preload,
        create: create
      }
    };
    function preload() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.load.image('logo', './logo512.png');
    }
    function create() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const logo = this.add.image(400, 150, 'logo');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.tweens.add({
        targets: logo,
        y: 550,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
      });
    }
    // const game = new Phaser.Game(config);
  }, []);
  return <div id={'phaser-example'} />;
};

export default Game;
