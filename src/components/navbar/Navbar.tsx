import React from 'react';
import styles from './Navbar.module.scss';
import classNames from 'classnames';

interface Props {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

const Navbar: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <div className={classNames(styles.navbar, isOpen && styles.active)}>
      <div className={styles.menu}>
        <h3 className={styles.logo}>tavern</h3>
        <div className={styles.hamburgerMenu} onClick={() => setIsOpen(!isOpen)}>
          <div className={styles.bar} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
