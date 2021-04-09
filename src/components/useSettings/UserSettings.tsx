import React, {useContext, useState} from "react";
import "./userSettings.scss";
import {UserContext, UserContextModel} from "../../contexts/UserContext";

import {useForm} from "react-hook-form";
import axios from "axios";
import {updateUser} from "../../constants/endpoints";
import {generateHeadersWithAccessToken} from "../../utils/tokenUtils";

interface FormData {
  nick: string;
  email: string;
}

const UserSettings: React.FC = () => {
  const { user } = useContext<UserContextModel>(UserContext);
  const [nick, setNick] = useState(user?.nick);
  const [email, setEmail] = useState(user?.email);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: FormData) => {
    const adminBugWorkaround =
      user?.roles[0] === "admin"
        ? {
            ...data,
            roles: ["admin"],
          }
        : {
            ...data,
          };
    axios
      .put(
        updateUser(user!.nick),
        {
          ...adminBugWorkaround,
        },
        generateHeadersWithAccessToken()
      )
      .then(() => {
        alert("Dane profilu zmienione!");
      });
  };
  return (
    <div
      className={
        "user-setting-wrapper flex-container flex-justify-center flex-align-center"
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-col-container font-size">
          <input
            type="text"
            placeholder="Nick"
            name="nick"
            value={nick}
            onChange={(event) => setNick(event.target.value)}
            ref={register({ required: true, minLength: 3, maxLength: 80 })}
            className={"font-size"}
          />
          {errors.nick && <p className={"error"}>Bez nicku nie przejdziesz.</p>}
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            ref={register({ required: true, minLength: 5, maxLength: 100 })}
            onChange={(event) => setEmail(event.target.value)}
            className={"font-size"}
          />
          {errors.email && (
            <p className={"error"}>email nie może być pusty :(.</p>
          )}
          {/*<input*/}
          {/*  type="password"*/}
          {/*  placeholder="hasło"*/}
          {/*  name="password"*/}
          {/*  ref={register({ minLength: 3, maxLength: 100 })}*/}
          {/*  value={password}*/}
          {/*  onChange={(event) => setPassword(event.target.value)}*/}
          {/*/>*/}
          <button className={"gold-button font-size"} type="submit">
            zmieniam swój profil!
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;
