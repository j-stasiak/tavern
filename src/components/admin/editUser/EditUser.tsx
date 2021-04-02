import React, {useState} from "react";
import {useForm} from "react-hook-form";
import "./editUser.scss";
import axios from "axios";
import {SERVER_URL} from "../../../constants/endpoints";

interface IProps {
  closeEditMode: () => void;
  user: any;
  refreshUsers: () => void;
}

const EditUser: React.FC<IProps> = ({ closeEditMode, user, refreshUsers }) => {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const onSubmit = (data: any) => {
    const courses =
      data.finishedCoursesIds.length > 0
        ? data.finishedCoursesIds.split(", ").map((id: string) => Number(id))
        : [];
    const finalData = { ...data, finishedCoursesIds: courses };
    const preparedData =
      user?.roles[0] === "admin"
        ? {
            ...finalData,
            roles: ["admin"],
          }
        : {
            ...finalData,
          };
    axios
      .put(
        `${SERVER_URL}/user/${user.nick}`,
        {
          ...preparedData,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then(() => {
        closeEditMode();
        refreshUsers();
      });
  };

  const [nick, setNick] = useState(user.nick);
  const [email, setEmail] = useState(user.email);
  const [finishedCoursesIds, setFinishedCoursesIds] = useState(
    user.finishedCoursesIds.join(", ")
  );

  return (
    <div className={"flex-col-container"}>
      <h1 className={"margin-20"}>Edycja użytkownika</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-col-container">
          <input
            type="text"
            placeholder="Nick"
            name="nick"
            value={nick}
            onChange={(event) => setNick(event.target.value)}
            ref={register({ required: true, maxLength: 80 })}
          />
          {errors.nick && <p className={"error"}>Bez nicku nie przejdziesz.</p>}
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            ref={register({ required: true, maxLength: 100 })}
            onChange={(event) => setEmail(event.target.value)}
          />
          {errors.email && (
            <p className={"error"}>email nie może być pusty :(.</p>
          )}
          <input
            type="text"
            placeholder="finished courses ids"
            name="finishedCoursesIds"
            ref={register({ maxLength: 100 })}
            value={finishedCoursesIds}
            onChange={(event) => setFinishedCoursesIds(event.target.value)}
          />
          <input type="submit" value={"zmieniam usera!"} />
        </div>
      </form>
    </div>
  );
};

export default EditUser;
