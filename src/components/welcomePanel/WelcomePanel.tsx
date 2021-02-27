import { useState } from "react";
import RegisterPanel from "./register-panel/RegisterPanel";
import LoginPanel from "./login-panel/LoginPanel";
import "./WelcomePanel.scss";

const WelcomePanel = ({ submitCallback }: any) => {
  const [loginChosen, setLoginChosen] = useState(false);
  const [registerChosen, setRegisterChosen] = useState(false);
  if (loginChosen) {
    return <LoginPanel submitCallback={submitCallback} />;
  } else if (registerChosen) {
    return <RegisterPanel submitCallback={submitCallback} />;
  }
  return (
    <div className={"welcome-panel"}>
      <LoginPanel />
      <RegisterPanel />
    </div>
  );
};

export default WelcomePanel;
