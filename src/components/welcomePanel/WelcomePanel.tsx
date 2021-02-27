import { useState } from "react";
import RegisterPanel from "./register-panel/RegisterPanel";
import LoginPanel from "./login-panel/LoginPanel";
import "./WelcomePanel.scss";

const WelcomePanel = ({ submitCallback }: any) => (
  <div className={"welcome-panel"}>
    <LoginPanel submitCallback={submitCallback} />
    <RegisterPanel submitCallback={submitCallback} />
  </div>
);

export default WelcomePanel;
