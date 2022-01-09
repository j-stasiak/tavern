import React from 'react';
import styles from './Navbar.module.scss';
import classNames from 'classnames';
import { useMenu } from '../providers/menuProvider/MenuProvider';
import { texts } from '../../texts';

const Navbar: React.FC = () => {
  const { isOpen, setIsOpen } = useMenu();
  return (
    <div className={classNames(styles.navbar, { [styles.active]: isOpen })}>
      <div className={styles.menu}>
        <h3 className={styles.logo}>{texts.navBar.logo}</h3>
        <div className={styles.hamburgerMenu} onClick={() => setIsOpen(!isOpen)}>
          <div className={styles.bar} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
