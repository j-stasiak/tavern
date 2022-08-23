import React from 'react';
import styles from './App.module.scss';
import GlobalStatesProvider from './components/providers/globalStatesProvider/GlobalStatesProvider';
import LoginModal from './components/loginModal/LoginModal';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { beige, white } from './constants/colors';
import LandingPage from './components/landingPage/LandingPage';
import Navbar from './components/navbar/Navbar';
import CourseModal from './components/Course/CourseModal';
import ReactPhaserCommonsProvider from './components/providers/ReactPhaserCommonsProvider';
import AdminNavBar from './components/AdminPanel/NavBar/AdminNavBar';
import Dashboard from './components/AdminPanel/Dashboard';
import Users from './components/AdminPanel/Users';
import Tutorials from './components/AdminPanel/Tutorials';
import Messages from './components/AdminPanel/Messages';
import TutorialFormModal from './components/TutorialFormModal/TutorialFormModal';

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
          <ReactPhaserCommonsProvider>
            <GlobalStatesProvider>
              <CourseModal />
              <LoginModal />
              <TutorialFormModal />
              <Routes>
                <Route
                  path={''}
                  element={
                    <>
                      <Navbar />
                      <main>
                        <LandingPage />
                      </main>
                    </>
                  }
                />
                <Route path={'admin'} element={<AdminNavBar />}>
                  <Route path={'dashboard'} element={<Dashboard />} />
                  <Route path={'users'} element={<Users />} />
                  <Route path={'tutorials'} element={<Tutorials />} />
                  <Route path={'messages'} element={<Messages />} />
                </Route>
              </Routes>
            </GlobalStatesProvider>
          </ReactPhaserCommonsProvider>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
