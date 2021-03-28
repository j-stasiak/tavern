import React from "react";
import {useForm} from "react-hook-form";

const EditUser: React.FC = () => {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook

  const onSubmit = (data: any) => {
    console.log(data);
    // axios.post(`${SERVER_URL}/authentication/login`, data).then((response) => {
    //
    // });
  };

  return (
    <div className={"wood-login"}>
      <h1>Edycja użytkownika</h1>
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
        {errors.password && <p className={"error"}>Hasło jest wymagane.</p>}
        <br /> <input type="submit" value={"wracam!"} />
      </form>
    </div>
  );
};

export default EditUser;