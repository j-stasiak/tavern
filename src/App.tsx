import React, { useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import styles from './App.module.scss';
import LandingPage from './components/landingPage/LandingPage';
import MenuProvider from './components/providers/menuProvider/MenuProvider';
import Phaser from 'phaser';

const App: React.FC = () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: 'phaser-example',
      width: 400,
      height: 400,
      scene: {
        preload: preload,
        create: create
      }
    };
    function preload() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.load.image('logo', './logo512.png');
    }
    function create() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const logo = this.add.image(400, 150, 'logo');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
      });
    }
    const game = new Phaser.Game(config);
  }, []);
  return (
    <div className={styles.container}>
      <MenuProvider>
        <Navbar />
        <LandingPage />
      </MenuProvider>
    </div>
  );
};

export default App;
