import React from "react";
import { useForm } from "react-hook-form";
import "./loginPanel.scss";
import axios from "axios";
import { mapUser } from "../../../utils/backendUtils";
import { SERVER_URL } from "../../../constants/endpoints";

const LoginPanel = ({ submitCallback }: any) => {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const onSubmit = (data: any) => {
    axios.post(`${SERVER_URL}/authentication/login`, data).then((response) => {
      localStorage.setItem('access_token', response.data.access_token);
      submitCallback(mapUser(response.data.user));
    });
  };

  return (
    <div className={"wood-login"}>
      <h1>Zaloguj się</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Nick"
          name="nick"
          ref={register({ required: true, maxLength: 80 })}
        />
        {errors.nick && <p className={"error"}>Bez nicku nie przejdziesz.</p>}
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          ref={register({ required: true, maxLength: 100 })}
        />
        {errors.password && <p className={"error"}>Haslo jest wymagane.</p>}
        <br /> <input type="submit" value={"wracam!"} />
      </form>
    </div>
  );
};

export default LoginPanel;
