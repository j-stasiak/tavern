import React from 'react';
import styles from './NavbarLinks.module.scss';
import { texts } from '../../texts';
import classNames from 'classnames';
import { useMenu } from '../providers/menuProvider/MenuProvider';
import flex from '../../styles/flex.module.scss';

const NavbarLinks: React.FC = () => {
  const { links } = texts.navBar;
  const { isOpen } = useMenu();
  return (
    <div className={classNames({ [styles.active]: isOpen })}>
      <div className={classNames(styles.links, flex.flexRowContainer, flex.twoAxisCenter)}>
        <ul>
          {links.map(({ label, delay }) => (
            <li key={label}>
              <a href="#" style={{ ['--time']: `${delay}s` } as React.CSSProperties}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavbarLinks;
