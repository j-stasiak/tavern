import React from 'react';
import styles from './Header.module.scss';
import { texts } from '../../../texts';
import classNames from 'classnames';
import flex from '../../../styles/flex.module.scss';

const Header: React.FC = () => {
  const { header, description, button } = texts.landingPage;
  return (
    <header>
      <div className={classNames(styles.overlay, flex.flexRowContainer, flex.twoAxisCenter)}>
        <div className={styles.inner}>
          <h2 className={styles.title}>{header}</h2>
          <p>{description}</p>
          <button className={styles.btn}>{button}</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
