import React from 'react';
import styles from './Header.module.scss';
import { texts } from '../../../texts';
import classNames from 'classnames';
import flex from '../../../styles/flex.module.scss';
import Game from '../../Game/Game';
import { useGlobalStates } from '../../providers/globalStatesProvider/GlobalStatesProvider';
import SoundPlayer from '../../SoundPlayer/SoundPlayer';
import Chat from '../../chat/Chat';
import { ColyseusContext } from '../../../context/ColyseusContext';
import { onlinePlayers, room } from '../../../phaser/SocketServer';

const Header: React.FC = () => {
  const { header, description, button } = texts.landingPage;
  const { isLoggedIn, setIsMenuOpen } = useGlobalStates();
  const handleClick = () => setIsMenuOpen(false);

  return (
    <header onClick={handleClick} className={classNames(flex.flexRowContainer, flex.twoAxisCenter)}>
      {isLoggedIn ? (
        <ColyseusContext.Provider value={{ onlinePlayers, room }}>
          <SoundPlayer />
          <Game />
          <Chat nick={'Andrzej'} />
        </ColyseusContext.Provider>
      ) : (
        <div className={styles.inner}>
          <h2 className={styles.title}>{header}</h2>
          <p>{description}</p>
          <button className={styles.btn}>{button}</button>
        </div>
      )}
    </header>
  );
};

export default Header;
