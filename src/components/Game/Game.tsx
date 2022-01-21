import Phaser from 'phaser';
import React, { useEffect } from 'react';
import { GameConfig } from '../../phaser';
import styles from './Game.module.scss';
import classNames from 'classnames';
import Course from '../Course/Course';
import { ReactPhaserProps, useReactPhaserCommons } from '../../react-phaser-middleware/ReactPhaserTransmitter';
import { useColyseus } from '../../context/ColyseusContext';

const courseMock = {
  answer: '<div>finito</div>',
  description: "Return <div>finito</div> to finish this course. That's a hard task..."
};

interface OwnProps {
  setMessages: any; // :)
  nick: string;
}

const Game: React.FC<OwnProps> = ({ setMessages, nick }) => {
  const { selectCourse, isCourseOpen, exitCourse, selectedCourseName } = useReactPhaserCommons();
  const { room, onlinePlayers } = useColyseus();
  useEffect(() => {
    room.then((room) => {
      //@ts-ignore
      for (const message of room.state.messages) {
        console.log(message.message);
      }
      //@ts-ignore
      room.state.messages.onAdd = (message, _) => {
        console.log(' no siema', message);
      };
    });
  }, []);
  useEffect(() => {
    const game = new Phaser.Game(GameConfig);
    const reactProps: ReactPhaserProps = {
      colyseus: {
        room,
        onlinePlayers
      },
      principal: { nick },
      course: { selectCourse, exitCourse },
      chat: { setMessages }
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
