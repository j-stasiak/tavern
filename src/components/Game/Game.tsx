import Phaser from 'phaser';
import React, { useEffect } from 'react';
import Navbar from './Navbar/Navbar';
import { GameConfig } from '../../phaser';

const Game: React.FC = () => {
  useEffect(() => {
    const game = new Phaser.Game(GameConfig);
  }, []);
  return (
    <div id={'phaser-example'}>
      <Navbar />
    </div>
  );
};

export default Game;
