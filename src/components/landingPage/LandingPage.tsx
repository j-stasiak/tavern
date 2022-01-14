import React from 'react';
import styles from './LandingPage.module.scss';
import classNames from 'classnames';
import NavbarLinks from '../navbarLinks/NavbarLinks';
import { useGlobalStates } from '../providers/globalStatesProvider/GlobalStatesProvider';
import Shadows from './shadows/Shadows';
import Header from './header/Header';

const LandingPage: React.FC = () => {
  const { isMenuOpen } = useGlobalStates();
  return (
    <div className={classNames({ [styles.active]: isMenuOpen })}>
      <div className={styles.mainContainer}>
        <div className={styles.main}>
          <Header />
        </div>
        <Shadows />
      </div>
      <NavbarLinks />
    </div>
  );
};

export default LandingPage;
