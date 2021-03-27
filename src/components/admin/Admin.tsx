import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./admin.scss";
import Users from "./users/Users";

const Admin: React.FC = () => (
  <div className={"wrapper flex-container"}>
    <div className={"sidebar"}>
      <h2>admin menu</h2>
      <div className={"admin-menu-items flex-col-container flex-align-center"}>
        <Link to={"/admin/users"}>users</Link>
        <Link to={"/admin/news"}>news</Link>
        <Link to={"/admin/courses"}>courses</Link>
      </div>
    </div>
    <div className={"admin-content"}>
      <Switch>
        <Route path="/admin/users">
          <Users />
        </Route>
      </Switch>
    </div>
  </div>
);

export default Admin;
