import Phaser from 'phaser';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import { GameConfig } from '../../phaser';

const Game: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  useEffect(() => {
    const game = new Phaser.Game(GameConfig);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    game.socketcikMordo = () => {
      console.log('siema');
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    game.react = { chat: { openChat: () => setIsChatOpen(true), closeChat: () => setIsChatOpen(false) } };
  }, []);
  return (
    <div id={'phaser-example'}>
      <Navbar />
    </div>
  );
};

export default Game;
