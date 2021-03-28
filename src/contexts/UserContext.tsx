import React, { createContext, ReactElement, useState } from "react";

interface Default {
  user: any;
  setUserWrapper: (user: any) => void;
  jwt: string;
  setJwtWrapper: (jwt: string) => void;
  logoutUser: () => void;
  mapShown: boolean;
  setMapShown: (statement: boolean) => void;
}

export const UserContext = createContext<Default>({
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
  const [user, setUser] = useState<any>(
    // @ts-ignore
    JSON.parse(localStorage.getItem("user"))
  );
  const [jwt, setJwt] = useState<string>("");
  const [mapShown, setMapShown] = useState(false);
  const setJwtWrapper = (jwt: string) => {
    setJwt(jwt);
    localStorage.setItem("access_token", jwt);
  };

  const setUserWrapper = (user: any) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setMapShown(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUserWrapper,
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
