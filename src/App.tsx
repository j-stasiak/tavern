import React from 'react';
import Navbar from './components/navbar/Navbar';
import styles from './App.module.scss';
import LandingPage from './components/landingPage/LandingPage';
import MenuProvider from './components/providers/menuProvider/MenuProvider';

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <MenuProvider>
        <Navbar />
        <LandingPage />
      </MenuProvider>
    </div>
  );
};

export default App;
