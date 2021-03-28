import React, { useContext, useEffect, useState } from "react";
import "./navBar.scss";
import { Link } from "react-router-dom";
import SoundPlayer from "../soundPlayer/SoundPlayer";
import { UserContext } from "../../contexts/UserContext";
import UserPanel from "../UserPanel/UserPanel";

const NavBar: React.FC = () => {
  const { user } = useContext(UserContext);
  const [userPanelHidden, setUserPanelHidden] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(false);

  useEffect(() => {
    setIsAdmin(user?.roles?.some((role: string) => role === "admin"));
  }, [user]);

  const avatarUrl = user?.avatar !== "none" ? user?.avatar : "none_avatar.png";

  return (
    <header>
      <div className="header">
        <Link to={"/"} className={"logo-part flex-container flex-align-center"}>
          <h2>tavern</h2>
        </Link>
        <div className="buttons flex-container flex-justify-end">
          <SoundPlayer />
          {isAdmin ? <Link to={"/admin"}>Admin panel</Link> : null}
          <Link to={"/news"}>News</Link>
          {user && (
            <div
              className="user-panel-header"
              onClick={() => setUserPanelHidden(!userPanelHidden)}
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + avatarUrl})`,
              }}
            />
          )}
        </div>
      </div>
      {!userPanelHidden && (
        <UserPanel hideUserPanel={() => setUserPanelHidden(true)} />
      )}
    </header>
  );
};

export default NavBar;
