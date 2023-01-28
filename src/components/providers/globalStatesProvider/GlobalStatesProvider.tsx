import { Room } from 'colyseus.js';
import React, { createContext, useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';

export interface IMenuContext {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isLoginModalOpen: boolean;
  isAdminModalOpen: boolean;
  isTutorialFormModalOpen: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
  setTutorialFormModalOpen: (isOpen: boolean) => void;
  setIsAdminModalOpen: (isOpen: boolean) => void;
  setIsLoggedIn: (isOpen: boolean) => void;
  isLoggedIn: boolean;
  selectedCourseId: string;
  setSelectedCourseId: (id: string) => void;
  room: undefined | Promise<void | Room<unknown>>;
  setRoom: (room: undefined | Promise<void | Room<unknown>>) => void;
}

const GlobalStatesContext = createContext<IMenuContext>({
  isMenuOpen: false,
  setIsMenuOpen: () => undefined,
  isAdminModalOpen: false,
  isLoginModalOpen: false,
  isTutorialFormModalOpen: false,
  setIsLoginModalOpen: () => undefined,
  setIsAdminModalOpen: () => undefined,
  setTutorialFormModalOpen: () => undefined,
  setIsLoggedIn: () => undefined,
  isLoggedIn: false,
  selectedCourseId: '',
  setSelectedCourseId: () => undefined,
  room: undefined,
  setRoom: () => undefined
});

const GlobalStatesProvider: React.FC = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isTutorialFormModalOpen, setTutorialFormModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const { getToken } = useToken();
  const [room, setRoom] = useState<undefined | Promise<void | Room<unknown>>>(undefined);

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
        setIsLoggedIn,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isTutorialFormModalOpen,
        setTutorialFormModalOpen,
        selectedCourseId,
        setSelectedCourseId,
        room,
        setRoom
      }}
    >
      {children}
    </GlobalStatesContext.Provider>
  );
};

export const useGlobalStates = () => React.useContext<IMenuContext>(GlobalStatesContext);

export default GlobalStatesProvider;
