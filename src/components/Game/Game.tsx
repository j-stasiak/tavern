import Phaser from 'phaser';
import React, { useEffect } from 'react';
import { GameConfig } from '../../phaser';
import styles from './Game.module.scss';
import classNames from 'classnames';
import { useColyseus } from '../../context/ColyseusContext';
import { ReactPhaserProps, useReactPhaserCommons } from '../providers/ReactPhaserCommonsProvider';

interface OwnProps {
  setMessages: any; // :)
  nick: string;
}

const Game: React.FC<OwnProps> = ({ setMessages, nick }) => {
  const { selectCourse, exitCourse } = useReactPhaserCommons();
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
