import Phaser from 'phaser';
import React, { useEffect } from 'react';
import { GameConfig } from '../../phaser';
import styles from './Game.module.scss';
import classNames from 'classnames';
import Course from '../Course/Course';
import { ReactPhaserProps, useReactPhaserCommons } from '../../react-phaser-middleware/ReactPhaserTransmitter';
import { onlinePlayers, room } from '../../react-phaser-middleware/SocketServer';

const courseMock = {
  answer: '<div>finito</div>',
  description: "Return <div>finito</div> to finish this course. That's a hard task..."
};
const Game: React.FC = () => {
  const { setIsChatOpen, selectCourse, isCourseOpen, exitCourse, selectedCourseName } = useReactPhaserCommons();
  useEffect(() => {
    const game = new Phaser.Game(GameConfig);
    const reactProps: ReactPhaserProps = {
      colyseus: {
        onlinePlayers,
        room,
        chat: {
          messages: [
            { playerId: 'player', message: 'Jestem playerem i chuj' },
            { playerId: 'otherPlayer', message: 'A ja ci kladę na twarz banana' }
          ]
        }
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
      <div id={'phaser-example'} className={classNames(styles.gameWrapper)}>
        {isCourseOpen && <Course course={courseMock} onExit={() => console.log('finito')} name={selectedCourseName} />}
      </div>
    </div>
  );
};

export default Game;
