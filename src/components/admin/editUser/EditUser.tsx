import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import "./editUser.scss";
import {UserModel} from "../../../models/UserModel";
import axios from "axios";
import {SERVER_URL} from "../../../constants/endpoints";

interface IProps {
  closeEditMode: () => void;
  user: UserModel | undefined;
  refreshUsers: () => void;
}

interface FormData {
  nick: string;
  course1: boolean;
  course2: boolean;
  course3: boolean;
  course4: boolean;
  finishedCoursesIds: string;
}

const EditUser: React.FC<IProps> = ({ closeEditMode, user, refreshUsers }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: FormData) => {
    const coursesArray: number[] = [];
    if (course1) {
      coursesArray.push(1);
    }
    if (course2) {
      coursesArray.push(2);
    }
    if (course3) {
      coursesArray.push(3);
    }
    if (course4) {
      coursesArray.push(4);
    }

    axios
      .put(
        `${SERVER_URL}/user/${user?.nick}`,
        {
          ...data,
          finishedCoursesIds: coursesArray,
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

  const [nick, setNick] = useState(user?.nick);
  const [email, setEmail] = useState(user?.email);

  const [course1, setCourse1] = useState(
    user?.finishedCoursesIds.some((id) => id === 1)
  );
  const [course2, setCourse2] = useState(
    user?.finishedCoursesIds.some((id) => id === 2)
  );
  const [course3, setCourse3] = useState(
    user?.finishedCoursesIds.some((id) => id === 3)
  );
  const [course4, setCourse4] = useState(
    user?.finishedCoursesIds.some((id) => id === 4)
  );

  useEffect(() => {
    console.log(course4);
  }, [course4]);
  return (
    <div className={"flex-col-container font-size"}>
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
            className={"font-size"}
          />
          {errors.nick && <p className={"error"}>Bez nicku nie przejdziesz.</p>}
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            ref={register({ required: true, maxLength: 100 })}
            onChange={(event) => setEmail(event.target.value)}
            className={"font-size"}
          />
          {errors.email && (
            <p className={"error"}>email nie może być pusty :(.</p>
          )}
          <p>ukończone kursy: </p>
          <div>
            <input
              type="checkbox"
              id="scales"
              name="scales"
              className={"checkbox"}
              checked={course1}
              onChange={() => setCourse1(!course1)}
            />
            <label htmlFor="scales">Course 1</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="scales"
              name="scales"
              className={"checkbox"}
              checked={course2}
              onChange={() => setCourse2(!course2)}
            />
            <label htmlFor="scales">Course 2</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="scales"
              name="scales"
              className={"checkbox"}
              checked={course3}
              onChange={() => setCourse3(!course3)}
            />
            <label htmlFor="scales">Course 3</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="scales"
              name="scales"
              className={"checkbox"}
              checked={course4}
              onChange={() => setCourse4(!course4)}
            />
            <label htmlFor="scales">Course 4</label>
          </div>
          <button type="submit" value={""} className={"font-size gold-button"}>
            zmieniam usera!
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
