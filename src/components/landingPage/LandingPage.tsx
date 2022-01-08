import React from 'react';
import styles from './LandingPage.module.scss';
import classNames from 'classnames';

interface Props {
  isOpen: boolean;
}

const LandingPage: React.FC<Props> = ({ isOpen }) => {
  return (
    <div className={classNames(isOpen && styles.active)}>
      <div className={styles.mainContainer}>
        <div className={styles.main}>
          <header>
            <div className={styles.overlay}>
              <div className={styles.inner}>
                <h2 className={styles.title}>Future is here</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium illum tenetur consequatur
                  veritatis?
                </p>
                <button className={styles.btn}>Read more</button>
              </div>
            </div>
          </header>
        </div>
        <div className={classNames(styles.shadow, styles.shadowOne)} />
        <div className={classNames(styles.shadow, styles.shadowTwo)} />
      </div>

      <div className={styles.links}>
        <ul>
          <li>
            <a href="#" style={{ ['--time']: '0.05s' } as React.CSSProperties}>
              Home
            </a>
          </li>
          <li>
            <a href="#" style={{ ['--time']: '0.1s' } as React.CSSProperties}>
              Services
            </a>
          </li>
          <li>
            <a href="#" style={{ ['--time']: '0.15s' } as React.CSSProperties}>
              Portfolio
            </a>
          </li>
          <li>
            <a href="#" style={{ ['--time']: '0.2s' } as React.CSSProperties}>
              Testimonials
            </a>
          </li>
          <li>
            <a href="#" style={{ ['--time']: '0.25s' } as React.CSSProperties}>
              About
            </a>
          </li>
          <li>
            <a href="#" style={{ ['--time']: '0.3s' } as React.CSSProperties}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
