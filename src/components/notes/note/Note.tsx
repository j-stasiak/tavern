import React, { useEffect, useState } from "react";
import { NoteModel } from "../../../constants/PlayerModel";
import "./Note.scss";
import ContentEditable from "react-contenteditable";

interface Props {
  note: NoteModel;
  saveNote: Function;
}

const Note = ({ note, saveNote }: Props) => {
  const [editedNote, setEditedNote] = useState<NoteModel>(note);
  useEffect(() => {
    setEditedNote(note);
  }, [note]);

  const htmlForDiv = `${editedNote.description}`;

  return (
    <div className={"flex-col-container note-left flex-align-center"}>
      <div className={"note-big"} onBlur={() => saveNote(editedNote)}>
        <div className={"content"}>
          <ContentEditable
            html={htmlForDiv}
            onChange={(event) =>
              setEditedNote({
                ...editedNote,
                description: event.target.value,
              })
            }
            className={"disable-border"}
          />
        </div>
      </div>
    </div>
  );
};

export default Note;
