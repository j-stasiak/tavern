import React from 'react';
import styles from './Header.module.scss';
import { texts } from '../../../texts';
import classNames from 'classnames';
import flex from '../../../styles/flex.module.scss';
import { useGlobalStates } from '../../providers/globalStatesProvider/GlobalStatesProvider';
import PrincipalZone from '../../principalZone/PrincipalZone';
import { TokenInfo } from '../../../hooks/useToken';
import useToken from '../../../hooks/useToken';
import AdminIcon from './AdminPanel/AdminIcon';
import jwtDecode from 'jwt-decode';

const Header: React.FC = () => {
  const { header, description, button } = texts.landingPage;
  const { isLoggedIn, setIsMenuOpen } = useGlobalStates();
  const { token } = useToken();
  const role = token && jwtDecode<TokenInfo>(token)?.role;
  const handleClick = () => setIsMenuOpen(false);
  return (
    <header onClick={handleClick} className={classNames(flex.flexRowContainer, flex.twoAxisCenter)}>
      {isLoggedIn && token ? (
        <>
          <PrincipalZone token={token} />
          {
            // TODO: change it later
          }
          {role === 'admin' && <AdminIcon />}
        </>
      ) : (
        <div className={styles.inner}>
          <h2 className={styles.title}>{header}</h2>
          <p>{description}</p>
          <button className={styles.btn}>{button}</button>
        </div>
      )}
    </header>
  );
};

export default Header;
