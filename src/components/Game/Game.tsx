import Phaser from 'phaser';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import { GameConfig } from '../../phaser';
import Course from '../Course/Course';
import { ReactPhaserProps, useReactPhaserCommons } from '../../react-phaser-middleware/ReactPhaserTransmitter';

const Game: React.FC = () => {
  const { setIsChatOpen, isChatOpen, selectCourse, isCourseOpen, exitCourse, selectedCourseName } =
    useReactPhaserCommons();
  useEffect(() => {
    const game = new Phaser.Game(GameConfig);
    const reactProps: ReactPhaserProps = {
      course: { selectCourse, exitCourse },
      chat: { openChat: () => setIsChatOpen(true), closeChat: () => setIsChatOpen(false) }
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    game.reactProps = { ...reactProps };
  }, []);
  return (
    <div id={'phaser-example'}>
      <Navbar />
      {isCourseOpen && <Course name={selectedCourseName} />}
    </div>
  );
};

export default Game;
