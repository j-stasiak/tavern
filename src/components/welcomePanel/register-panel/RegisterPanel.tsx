import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import "./registerPanel.scss";
import axios from "axios";
import { SERVER_URL } from "../../../constants/endpoints";
import { UserContext } from "../../../contexts/UserContext";

const avatars = [
  "avatar_1.png",
  "avatar_2.png",
  "avatar_3.png",
  "avatar_4.png",
];

const RegisterPanel = ({ submitCallback }: any) => {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const { setUserWrapper, setJwtWrapper } = useContext(UserContext);
  const [avatar, setAvatar] = useState(avatars[0]);
  const onSubmit = (data: any) => {
    axios
      .post(`${SERVER_URL}/authentication/register`, {
        ...data,
        avatar,
      })
      .then((response) => {
        alert("Konto utworzone! Możesz się zalogować!");
      });
  };

  return (
    <div className={"wood-register"}>
      <h1>Zarejestruj się</h1>
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
          type="text"
          placeholder="email"
          name="email"
          ref={register({ required: true, maxLength: 80 })}
        />
        {errors.email && <p className={"error"}>Email....</p>}
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          ref={register({ required: true, maxLength: 100 })}
        />
        {errors.password && <p className={"error"}>Haslo jest wymagane.</p>}
        <br />
        {avatars.map((avatarString, key) => (
          <>
            <img
              key={key}
              onClick={() => {
                setAvatar(avatarString);
              }}
              src={avatarString}
              width={80}
              height={80}
              className={`avataro ${avatarString === avatar ? "border" : ""}`}
              alt={"obrazek"}
            />
            -
          </>
        ))}
        <br />
        <br />
        <input type="submit" value={"jestem tu nowy!"} />
      </form>
    </div>
  );
};

export default RegisterPanel;
