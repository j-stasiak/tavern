import React from 'react';
import styles from './Navbar.module.scss';
import classNames from 'classnames';
import { useGlobalStates } from '../providers/globalStatesProvider/GlobalStatesProvider';
import { texts } from '../../texts';
import SoundPlayer from '../SoundPlayer/SoundPlayer';

const Navbar: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen } = useGlobalStates();
  return (
    <div className={classNames(styles.navbar, { [styles.active]: isMenuOpen })}>
      <div className={styles.menu}>
        <div>
          <SoundPlayer />
        </div>
        <div>
          <h3 className={styles.logo}>{texts.navBar.logo}</h3>
        </div>
        <div className={styles.hamburgerMenu} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={styles.bar} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
