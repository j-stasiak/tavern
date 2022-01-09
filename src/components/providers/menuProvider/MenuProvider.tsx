import React, { createContext, useState } from 'react';

export interface IMenuContext {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MenuContext = createContext<IMenuContext>({ isOpen: false, setIsOpen: () => undefined });

const MenuProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MenuContext.Provider
      value={{
        isOpen,
        setIsOpen
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => React.useContext<IMenuContext>(MenuContext);

export default MenuProvider;
