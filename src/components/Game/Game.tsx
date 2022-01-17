import Phaser from 'phaser';
import React, { useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import { GameConfig } from '../../phaser';

const Game: React.FC = () => {
  useEffect(() => {
    const game = new Phaser.Game(GameConfig);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    game.socketcikMordo = () => {
      console.log('siema');
    };
  }, []);
  return (
    <div id={'phaser-example'}>
      <Navbar />
    </div>
  );
};

export default Game;
