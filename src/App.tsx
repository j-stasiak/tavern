import React from "react";
import GameBoard from "./components/gameBoard/GameBoard";
import NavBar from "./components/navBar/NavBar";
import {Route, Switch} from "react-router-dom";
import Admin from "./components/admin/Admin";
import News from "./components/news/News";
import UserProvider from "./contexts/UserContext";
import UserSettings from "./components/useSettings/UserSettings";

const App: React.FC = () => {
  return (
    <UserProvider>
      <>
        <NavBar />
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/news">
            <News />
          </Route>
          <Route path={"/profile"}>
            <UserSettings />
          </Route>
          <Route path="/">
            <GameBoard />
          </Route>
        </Switch>
      </>
    </UserProvider>
  );
};

export default App;
