import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import styles from './App.module.scss';
import LandingPage from './components/landingPage/LandingPage';

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.container}>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <LandingPage isOpen={isOpen} />
    </div>
  );
};

export default App;
