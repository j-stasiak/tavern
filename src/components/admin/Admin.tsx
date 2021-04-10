import React, {useContext} from "react";
import {Link, Route, Switch} from "react-router-dom";
import "./admin.scss";
import Users from "./users/Users";
import {UserContext} from "../../contexts/UserContext";

const Admin: React.FC = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      {
        // @ts-ignore
        user.roles[0] === "admin" ? (
          <div className={"wrapper flex-container"}>
            <div className={"sidebar"}>
              <h2>admin menu</h2>
              <div
                className={
                  "admin-menu-items flex-col-container flex-align-center"
                }
              >
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
        ) : (
          "Nie masz uprawnień do wyświetlenia tej strony!"
        )
      }
    </>
  );
};

export default Admin;
