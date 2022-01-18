import Phaser from 'phaser';
import React, { useEffect, useState } from 'react';
import { GameConfig } from '../../phaser';
import styles from './Game.module.scss';
import classNames from 'classnames';

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
    <div className={styles.frame}>
      <div id={'phaser-example'} className={classNames(styles.gameWrapper)} />
    </div>
  );
};

export default Game;
