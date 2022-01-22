import Phaser from 'phaser';
import React, { useEffect } from 'react';
import { GameConfig } from '../../phaser';
import styles from './Game.module.scss';
import classNames from 'classnames';
import { ReactPhaserProps, useReactPhaserCommons } from '../../react-phaser-middleware/ReactPhaserTransmitter';
import { useColyseus } from '../../context/ColyseusContext';
import { useGlobalStates } from '../providers/globalStatesProvider/GlobalStatesProvider';

const Game: React.FC = () => {
  const { setIsChatOpen, selectCourse, isCourseOpen, exitCourse, selectedCourseName } = useReactPhaserCommons();
  const { room, onlinePlayers } = useColyseus();
  const { setIsCourseOpen } = useGlobalStates();
  useEffect(() => {
    setIsCourseOpen(isCourseOpen);
  }, [isCourseOpen]);
  useEffect(() => {
    const game = new Phaser.Game(GameConfig);
    const reactProps: ReactPhaserProps = {
      colyseus: {
        room,
        onlinePlayers
      },
      course: { selectCourse, exitCourse },
      chat: { openChat: () => setIsChatOpen(true), closeChat: () => setIsChatOpen(false) }
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
