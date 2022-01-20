import React, { createContext, useEffect, useState } from 'react';
import { useToken } from '../../../hooks/useToken';

export interface IMenuContext {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
  setIsLoggedIn: (isOpen: boolean) => void;
  isLoggedIn: boolean;
}

const GlobalStatesContext = createContext<IMenuContext>({
  isMenuOpen: false,
  setIsMenuOpen: () => undefined,
  isLoginModalOpen: false,
  setIsLoginModalOpen: () => undefined,
  setIsLoggedIn: () => undefined,
  isLoggedIn: false
});

const GlobalStatesProvider: React.FC = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { getToken } = useToken();
  const token = !!getToken();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(token);
  useEffect(() => {
    setIsLoggedIn(token);
  }, [token]);

  return (
    <GlobalStatesContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isLoggedIn,
        setIsLoggedIn
      }}
    >
      {children}
    </GlobalStatesContext.Provider>
  );
};

export const useGlobalStates = () => React.useContext<IMenuContext>(GlobalStatesContext);

export default GlobalStatesProvider;
