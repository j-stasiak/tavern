import React from 'react';
import styles from './App.module.scss';
import GlobalStatesProvider from './components/providers/globalStatesProvider/GlobalStatesProvider';
import LoginModal from './components/loginModal/LoginModal';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { beige, white } from './constants/colors';
import LandingPage from './components/landingPage/LandingPage';
import Navbar from './components/navbar/Navbar';

const App: React.FC = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: beige
      },
      text: {
        primary: white,
        secondary: white
      }
    }
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className={styles.container}>
          <GlobalStatesProvider>
            <LoginModal />
            <Navbar />
            <LandingPage />
          </GlobalStatesProvider>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
