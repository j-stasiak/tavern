import { useForm } from "react-hook-form";
import React from "react";

const NewNote = ({ saveNote }: any) => {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const onSubmit = (data: any) => {
    saveNote(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Tytul notatki"
        name="title"
        ref={register({ required: true, maxLength: 20 })}
      />
      {errors.title && "Podaj tytuł"}
      <br />
      <input
        type="description"
        placeholder="Opis"
        name="description"
        ref={register({ required: true, maxLength: 100 })}
      />
      {errors.description && "Opis wymagany."}
      <br /> <input type="submit" />
    </form>
  );
};

export default NewNote;
