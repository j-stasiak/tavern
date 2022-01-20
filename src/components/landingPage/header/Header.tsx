import React from 'react';
import styles from './Header.module.scss';
import { texts } from '../../../texts';
import classNames from 'classnames';
import flex from '../../../styles/flex.module.scss';
import Game from '../../Game/Game';
import { useGlobalStates } from '../../providers/globalStatesProvider/GlobalStatesProvider';
import SoundPlayer from '../../SoundPlayer/SoundPlayer';

const Header: React.FC = () => {
  const { header, description, button } = texts.landingPage;
  const { isLoggedIn } = useGlobalStates();

  return (
    <header>
      <SoundPlayer />
      <div className={classNames(styles.overlay, flex.flexRowContainer, flex.twoAxisCenter)}>
        {isLoggedIn ? (
          <Game />
        ) : (
          <div className={styles.inner}>
            <h2 className={styles.title}>{header}</h2>
            <p>{description}</p>
            <button className={styles.btn}>{button}</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
