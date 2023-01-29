import Phaser from 'phaser';
import React, { useEffect } from 'react';
import styles from './Game.module.scss';
import classNames from 'classnames';
import { useColyseus } from '../../context/ColyseusContext';
import { ReactPhaserProps, useReactPhaserCommons } from '../providers/ReactPhaserCommonsProvider';
import { GameConfig } from '../../phaser/gameConfig/gameConfig';

interface OwnProps {
  setMessages: any;
  nick: string;
}

const Game: React.FC<OwnProps> = ({ setMessages, nick }) => {
  const { selectCourse, exitCourse, isCourseOpen } = useReactPhaserCommons();
  const { room, onlinePlayers } = useColyseus();

  useEffect(() => {
    const game: Partial<Phaser.Game> = new Phaser.Game(GameConfig);
    const reactProps: ReactPhaserProps = {
      colyseus: {
        // @ts-ignore
        room,
        onlinePlayers
      },
      principal: { nick },
      course: { selectCourse, exitCourse },
      chat: { setMessages }
    };
    // @ts-ignore
    game.reactProps = { ...reactProps };
  }, []);
  return (
    <div className={styles.frame}>
      <div id={'phaser-example'} className={classNames(styles.gameWrapper)} />
    </div>
  );
};
export default Game;
