import React, { useEffect, useState } from "react";
import { NoteModel } from "../../../constants/PlayerModel";

interface Props {
  note: NoteModel;
  saveNote: Function;
}

const Note = ({ note, saveNote }: Props) => {
  const [editedNote, setEditedNote] = useState<NoteModel>(note);
  useEffect(() => {
    setEditedNote(note);
  }, [note]);
  return (
    <div className={"right-side"}>
      <textarea
        onChange={(event) =>
          setEditedNote({
            ...editedNote,
            description: event.target.value,
          })
        }
        value={editedNote.description}
      />
      <button onClick={() => saveNote(editedNote)}>Zapisz notatkę</button>
    </div>
  );
};

export default Note;
