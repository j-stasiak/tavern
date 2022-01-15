import React from 'react';
import classNames from 'classnames';
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import { texts } from '../../../texts';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const iconSize = { fontSize: '25px' };

const Navbar: React.FC = () => {
  return (
    <div className={classNames(styles.header)}>
      <h4 className={styles.logo}>{texts.navBar.logo}</h4>
      <div className={styles.links}>
        {texts.gameNavbar.map(({ label, link }) => (
          <div key={label} className={styles.container}>
            <Link to={link}>{label}</Link>
          </div>
        ))}
      </div>
      <div className={styles.social}>
        <FacebookIcon sx={iconSize} />
        <TwitterIcon sx={iconSize} />
        <InstagramIcon sx={iconSize} />
        <AccountBoxIcon sx={{ fontSize: '40px' }} />
      </div>
    </div>
  );
};

export default Navbar;
