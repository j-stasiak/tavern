import { useState } from "react";
import RegisterPanel from "./register-panel/RegisterPanel";
import LoginPanel from "./login-panel/LoginPanel";

const WelcomePanel = ({ submitCallback }: any) => {
  const [loginChosen, setLoginChosen] = useState(false);
  const [registerChosen, setRegisterChosen] = useState(false);
  if (loginChosen) {
    return <LoginPanel submitCallback={submitCallback} />;
  } else if (registerChosen) {
    return <RegisterPanel submitCallback={submitCallback} />;
  }
  return (
    <>
      <button onClick={() => setRegisterChosen(true)}>Rejestracja </button>
      <button onClick={() => setLoginChosen(true)}> Logowanie</button>
    </>
  );
};

export default WelcomePanel;
