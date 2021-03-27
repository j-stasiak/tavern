import React, {createContext, ReactElement, useState} from "react";
import {PlayerModel} from "../constants/PlayerModel";

interface Default {
  user: PlayerModel | undefined;
  setUserWrapper: (user: any) => void;
}

export const UserContext = createContext<Default>({
  user: undefined,
  setUserWrapper: () => {},
});

interface IProps {
  children: ReactElement;
}

const UserProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<PlayerModel>();
  const setUserWrapper = (user: any) => {
    setUser(user);
  };
  return (
    <UserContext.Provider value={{ user, setUserWrapper }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
