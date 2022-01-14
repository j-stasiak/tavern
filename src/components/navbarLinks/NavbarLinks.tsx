import React from 'react';
import styles from './NavbarLinks.module.scss';
import { texts } from '../../texts';
import classNames from 'classnames';
import { useGlobalStates } from '../providers/globalStatesProvider/GlobalStatesProvider';
import flex from '../../styles/flex.module.scss';

const NavbarLinks: React.FC = () => {
  const { links, login } = texts.navBar;
  const { isMenuOpen, setIsLoginModalOpen } = useGlobalStates();
  const handleClick = () => setIsLoginModalOpen(true);
  return (
    <div className={classNames({ [styles.active]: isMenuOpen })}>
      <div className={classNames(styles.links, flex.flexColContainer, flex.twoAxisCenter)}>
        <ul>
          {links.map(({ label, delay }) => (
            <li key={label}>
              <a href="#" style={{ ['--time']: `${delay}s` } as React.CSSProperties}>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={handleClick}
          style={{ ['--time']: `${login.delay}s` } as React.CSSProperties}
          className={styles.btn}
        >
          {login.label}
        </button>
      </div>
    </div>
  );
};

export default NavbarLinks;
