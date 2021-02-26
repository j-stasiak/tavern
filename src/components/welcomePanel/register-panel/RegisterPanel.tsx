import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./registerPanel.css";
import axios from "axios";
import { mapUser } from "../../../utils/backendUtils";
import { SERVER_URL } from "../../../constants/endpoints";

const avatars = [
  "avatar_1.png",
  "avatar_2.png",
  "avatar_3.png",
  "avatar_4.png",
];

const RegisterPanel = ({ submitCallback }: any) => {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const [avatar, setAvatar] = useState(avatars[0]);
  const onSubmit = (data: any) => {
    axios
      .post(`${SERVER_URL}/authentication/register`, {
        ...data,
        avatar,
      })
      .then((response) => submitCallback(mapUser(response.data)));
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
      {avatars.map((avatar, key) => (
        <>
          <img
            onClick={() => {
              setAvatar(avatar);
            }}
            src={avatar}
            className={"avataro"}
          />
          -
        </>
      ))}
      <br />
      {/*<div className={"avatars"}>*/}
      {/*  <ImageGallery items={images} />*/}
      {/*</div>*/}
      <input type="submit" />
    </form>
  );
};

export default RegisterPanel;
