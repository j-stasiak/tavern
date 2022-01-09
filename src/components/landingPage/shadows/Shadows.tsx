import React from 'react';
import classNames from 'classnames';
import { useMenu } from '../../providers/menuProvider/MenuProvider';
import styles from './Shadows.module.scss';

const Shadows: React.FC = () => {
  const { isOpen } = useMenu();
  return (
    <div className={classNames({ [styles.active]: isOpen })}>
      <div className={classNames(styles.shadow, styles.shadowOne)} />
      <div className={classNames(styles.shadow, styles.shadowTwo)} />
    </div>
  );
};

export default Shadows;
