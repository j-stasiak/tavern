import React, { createContext, ReactElement, useState } from "react";
import { UserModel } from "../models/UserModel";

export interface UserContextModel {
  user: UserModel | undefined;
  setUserWrapper: (user: UserModel | undefined) => void;
  jwt: string;
  setJwtWrapper: (jwt: string) => void;
  logoutUser: () => void;
  mapShown: boolean;
  setMapShown: (statement: boolean) => void;
}

export const UserContext = createContext<UserContextModel>({
  user: undefined,
  setUserWrapper: () => {},
  jwt: "",
  setJwtWrapper: () => {},
  logoutUser: () => {},
  mapShown: false,
  setMapShown: () => {},
});

interface IProps {
  children: ReactElement;
}

const UserProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<UserModel | undefined>(
    JSON.parse(localStorage.getItem("user") as string)
  );
  const [jwt, setJwt] = useState<string>("");
  const [mapShown, setMapShown] = useState<boolean>(false);
  const setJwtWrapper = (jwt: string) => {
    setJwt(jwt);
    localStorage.setItem("access_token", jwt);
  };

  const setUserWrapper = (user: UserModel | undefined) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logoutUser = () => {
    setUser(undefined);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setMapShown(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUserWrapper: setUserWrapper,
        jwt,
        setJwtWrapper,
        logoutUser,
        mapShown,
        setMapShown,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
