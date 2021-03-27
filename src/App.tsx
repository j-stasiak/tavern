import React from "react";
import "./App.scss";
import GameBoard from "./components/gameBoard/GameBoard";
import NavBar from "./components/navBar/NavBar";
import {Route, Switch} from "react-router-dom";
import Admin from "./components/admin/Admin";
import News from "./components/news/News";
import Users from "./components/admin/users/Users";

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      {/*<GameBoard />*/}
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/news">
          <News />
        </Route>
        <Route path="/">
          <GameBoard />
        </Route>
      </Switch>
    </>
  );
};

export default App;
