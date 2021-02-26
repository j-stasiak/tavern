import React from "react";
import { useForm } from "react-hook-form";
import "./registerPanel.css";
const RegisterPanel = ({ submitCallback }: any) => {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const onSubmit = (data: any) => {
    console.log(data);
    submitCallback(true);
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
      <br />
      <select name="avatar" ref={register({ required: true })}>
        <option value="1">Mr</option>
        <option value="2">Mrs</option>
        <option value="3">Miss</option>
        <option value="4">Dr</option>
      </select>
      <br />
      <input type="submit" />
    </form>
  );
};

export default RegisterPanel;
