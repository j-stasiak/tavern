import React from 'react';
import classNames from 'classnames';
import { useGlobalStates } from '../../providers/globalStatesProvider/GlobalStatesProvider';
import styles from './Shadows.module.scss';

const Shadows: React.FC = () => {
  const { isMenuOpen } = useGlobalStates();
  return (
    <div className={classNames({ [styles.active]: isMenuOpen })}>
      <div className={classNames(styles.shadow, styles.shadowOne)} />
      <div className={classNames(styles.shadow, styles.shadowTwo)} />
    </div>
  );
};

export default Shadows;
