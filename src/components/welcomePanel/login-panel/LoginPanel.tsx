import React from "react";
import { useForm } from "react-hook-form";
import "./loginPanel.css";
import axios from "axios";
import { mapUser } from "../../../utils/backendUtils";
import { SERVER_URL } from "../../../constants/endpoints";

const LoginPanel = ({ submitCallback }: any) => {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const onSubmit = (data: any) => {
    axios.post(`${SERVER_URL}/authentication/login`, data).then((response) => {
      console.log("kurwa", response.data);
      submitCallback(mapUser(response.data.user));
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Nick"
        name="nick"
        ref={register({ required: true, maxLength: 80 })}
      />
      {errors.nick && "Bez nicku nie przejdziesz."}
      <br />
      <input
        type="password"
        placeholder="Password"
        name="password"
        ref={register({ required: true, maxLength: 100 })}
      />
      {errors.password && "Haslo jest wymagane."}
      <br /> <input type="submit" />
    </form>
  );
};

export default LoginPanel;
