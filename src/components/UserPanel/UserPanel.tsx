import React, { useContext } from "react";
import "./UserPanel.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

interface IProps {
  hideUserPanel: () => void;
}

const UserPanel: React.FC<IProps> = ({ hideUserPanel }) => {
  const { user, logoutUser } = useContext(UserContext);
  return (
    <div className="user-panel flex-col-container">
      <p className={""}>Signed in as</p>
      <p className={"username"}>{user?.nick}</p>
      <hr />
      <Link to={"profile"}>Your profile</Link>
      <hr />
      <Link to={"settings"}>Settings</Link>
      <Link
        onClick={() => {
          logoutUser();
          hideUserPanel();
        }}
        to={"/"}
      >
        Sign out
      </Link>
    </div>
  );
};

export default UserPanel;
