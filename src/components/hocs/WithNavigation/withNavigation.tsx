import React from 'react';
import styles from './WithNavigation.module.scss';
import { texts } from '../../../texts';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { routeToPath } from '../../../redux/sideMenuSlice/sideMenuSlice';
import { RouteEnum } from '../../../enums/RouteEnum';

// eslint-disable-next-line react/display-name
const WithNavigation = (WrappedComponent: any) => (props: any) => {
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch(routeToPath(RouteEnum.Home));
  return (
    <div className={styles.container}>
      <WrappedComponent className={styles.wrappedComponent} {...props} />
      <button onClick={handleClick} className={styles.button}>
        {texts.backToMenu}
      </button>
    </div>
  );
};

export default WithNavigation;
