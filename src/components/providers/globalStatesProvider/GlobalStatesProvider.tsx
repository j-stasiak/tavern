import React, { createContext, useState } from 'react';

export interface IMenuContext {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
}

const GlobalStatesContext = createContext<IMenuContext>({
  isMenuOpen: false,
  setIsMenuOpen: () => undefined,
  isLoginModalOpen: false,
  setIsLoginModalOpen: () => undefined
});

const GlobalStatesProvider: React.FC = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <GlobalStatesContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        isLoginModalOpen,
        setIsLoginModalOpen
      }}
    >
      {children}
    </GlobalStatesContext.Provider>
  );
};

export const useGlobalStates = () => React.useContext<IMenuContext>(GlobalStatesContext);

export default GlobalStatesProvider;
