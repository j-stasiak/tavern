import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import LandingPage from '../landingPage/LandingPage';
import Game from '../Game/Game';

const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/game" element={<Game />} />
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <LandingPage />
          </>
        }
      />
    </Routes>
  );
};

export default Routing;
