import React, {useContext, useEffect, useState} from "react";
import "./navBar.scss";
import {Link} from "react-router-dom";
import SoundPlayer from "../soundPlayer/SoundPlayer";
import {UserContext} from "../../contexts/UserContext";

const NavBar: React.FC = () => {
  const avatarUrl = "/img/user/user.jpeg";
  const { user } = useContext(UserContext);
  const [userPanelHidden, setUserPanelHidden] = useState(true);
  // const isAdmin = user?.roles?.some((role: string) => role === "admin");
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(false);

  useEffect(() => {
    console.log("roles", user?.roles);
    setIsAdmin(user?.roles?.some((role: string) => role === "admin"));
  }, [user]);

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
        </div>
        {/*<div*/}
        {/*  className="user-panel-header m-r-1 m-l-1"*/}
        {/*  onClick={() => setUserPanelHidden(!userPanelHidden)}*/}
        {/*  style={{*/}
        {/*    backgroundImage: `url(${process.env.PUBLIC_URL + avatarUrl})`,*/}
        {/*  }}*/}
        {/*/>*/}
      </div>
    </header>
  );
  //     <header>
  //         <div className={"header p-l-6 p-r-6"}>
  //             <Link to={"/"}>
  //                 <div
  //                     className={classNames(
  //                         "logo-part",
  //                         "flex-row-container",
  //                         "flex-align-items-center"
  //                     )}
  //                 >
  //                     <img className={"logo"} src={logo} alt="app logo" height={70} />
  //                     <h2>React Gallery</h2>
  //                 </div>
  //             </Link>
  //             <div className="links-part flex-row-container">
  //                 <div className="buttons flex-row-container flex-justify-end">
  //                     <Link to={"/"}>Galleries</Link>
  //                     <Link to={`${NEWS_URL}`}>News</Link>
  //                 </div>
  //                 <div
  //                     className="user-panel-header m-r-1 m-l-1"
  //                     onClick={() => setUserPanelHidden(!userPanelHidden)}
  //                     style={{
  //                         backgroundImage: `url(${process.env.PUBLIC_URL + avatarUrl})`,
  //                     }}
  //                 />
  //             </div>
  //         </div>
  //         {!userPanelHidden && <UserPanel />}
  //     </header>
  // );
};

export default NavBar;
