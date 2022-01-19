import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import LandingPage from '../landingPage/LandingPage';
import Game from '../Game/Game';
import { useToken } from '../../hooks/useToken';
import { useEffectOnce } from 'react-use';
import { GAME_ROUTE } from '../../constants/routes';

const Routing: React.FC = () => {
  const { getToken } = useToken();
  const navigate = useNavigate();

  useEffectOnce(() => {
    if (getToken()) {
      navigate(GAME_ROUTE);
    }
  });
  return (
    <Routes>
      <Route path={GAME_ROUTE} element={<Game />} />
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <main>
              <LandingPage />
            </main>
          </>
        }
      />
    </Routes>
  );
};

export default Routing;
