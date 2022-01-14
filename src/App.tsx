import React from 'react';
import styles from './App.module.scss';
import GlobalStatesProvider from './components/providers/globalStatesProvider/GlobalStatesProvider';
import LoginModal from './components/loginModal/LoginModal';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Routing from './components/Routing/Routing';

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
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className={styles.container}>
          <GlobalStatesProvider>
            <LoginModal />
            <Routing />
          </GlobalStatesProvider>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
