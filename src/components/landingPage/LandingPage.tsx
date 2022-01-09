import React from 'react';
import styles from './LandingPage.module.scss';
import classNames from 'classnames';
import NavbarLinks from '../navbarLinks/NavbarLinks';
import { useMenu } from '../providers/menuProvider/MenuProvider';
import Shadows from './shadows/Shadows';
import Header from './header/Header';

const LandingPage: React.FC = () => {
  const { isOpen } = useMenu();
  return (
    <div className={classNames({ [styles.active]: isOpen })}>
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
