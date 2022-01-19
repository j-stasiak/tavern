import React from 'react';
import styles from './NavButtons.module.scss';
import classNames from 'classnames';
import sizes from '../../../../styles/sizes.module.scss';
import flex from '../../../../styles/flex.module.scss';
import { texts } from '../../../../texts';
import { useGlobalStates } from '../../../providers/globalStatesProvider/GlobalStatesProvider';
import { routeToPath } from '../../../../redux/sideMenuSlice/sideMenuSlice';
import { RouteEnum } from '../../../../enums/RouteEnum';
import { useAppDispatch } from '../../../../hooks/reduxHooks';

const NavButtons: React.FC = () => {
  const { links, login } = texts.navBar;
  const dispatch = useAppDispatch();
  const { isMenuOpen, setIsLoginModalOpen } = useGlobalStates();
  const handleClick = () => setIsLoginModalOpen(true);
  const handleRouteClick = (path: RouteEnum) => dispatch(routeToPath(path));
  return (
    <div className={classNames({ [styles.active]: isMenuOpen }, sizes.h100)}>
      <div className={classNames(styles.links, sizes.h100, flex.flexColContainer, flex.twoAxisCenter)}>
        <ul>
          {links.map(({ label, delay, path }) => (
            <li key={label}>
              <a onClick={() => handleRouteClick(path)} style={{ ['--time']: `${delay}s` } as React.CSSProperties}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={handleClick}
              style={{ ['--time']: `${login.delay}s` } as React.CSSProperties}
              className={styles.btn}
            >
              {login.label}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavButtons;
