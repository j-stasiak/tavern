import React from "react";
import { useForm } from "react-hook-form";
import "./registerPanel.css";
import axios from "axios";
import { mapUser } from "../../../utils/backendUtils";
const RegisterPanel = ({ submitCallback }: any) => {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const onSubmit = (data: any) => {
    axios
      .post("http://localhost:3000/authentication/register", data)
      .then((response) => submitCallback(mapUser(response)));
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
        type="text"
        placeholder="email"
        name="email"
        ref={register({ required: true, maxLength: 80 })}
      />
      {errors.email && "Email...."}
      <br />
      <input
        type="password"
        placeholder="Password"
        name="password"
        ref={register({ required: true, maxLength: 100 })}
      />
      {errors.password && "Haslo jest wymagane."}
      <br />
      <select name="avatar" ref={register({ required: true })}>
        <option value="avatar_1">Fota Avatara 1</option>
        <option value="avatar_2">Fota Avatara 2</option>
        <option value="avatar_3">Fota Avatara 3</option>
        <option value="avatar_4">Fota Avatara 4</option>
      </select>
      <br />
      <input type="submit" />
    </form>
  );
};

export default RegisterPanel;
