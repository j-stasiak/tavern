import React from 'react';
import Navbar from './components/navbar/Navbar';
import styles from './App.module.scss';
import LandingPage from './components/landingPage/LandingPage';
import GlobalStatesProvider from './components/providers/globalStatesProvider/GlobalStatesProvider';
import LoginModal from './components/loginModal/LoginModal';
import { createTheme, ThemeProvider } from '@mui/material';

const App: React.FC = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#E1C391'
      },
      text: {
        primary: '#ffffff',
        secondary: '#ffffff'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <GlobalStatesProvider>
          <LoginModal />
          <Navbar />
          <LandingPage />
        </GlobalStatesProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
