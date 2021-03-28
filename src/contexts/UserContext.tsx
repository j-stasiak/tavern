import React, {createContext, ReactElement, useState} from "react";
import {PlayerModel} from "../constants/PlayerModel";

interface Default {
  user: any;
  setUserWrapper: (user: any) => void;
  jwt: string;
  setJwtWrapper: (jwt: string) => void;
  logoutUser: () => void;
}

export const UserContext = createContext<Default>({
  user: undefined,
  setUserWrapper: () => {},
  jwt: "",
  setJwtWrapper: () => {},
  logoutUser: () => {},
});

interface IProps {
  children: ReactElement;
}

const UserProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<PlayerModel>();
  const [jwt, setJwt] = useState<string>("");

  const setJwtWrapper = (jwt: string) => {
    setJwt(jwt);
    localStorage.setItem("access_token", jwt);
  };

  const setUserWrapper = (user: any) => {
    setUser(user);
    localStorage.setItem("user", user);
  };

  const logoutUser = () => {
    // @ts-ignore
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ user, setUserWrapper, jwt, setJwtWrapper, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
