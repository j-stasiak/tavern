import React, { useEffect, useState } from "react";
import { NoteModel } from "../../constants/PlayerModel";
import NewNote from "./newNote/NewNote";
import Note from "./note/Note";
import axios from "axios";

interface Props {
  notes: NoteModel[];
  disableModal: Function;
  getUser: Function;
  nick: string;
}

const Notes = ({ notes, nick, disableModal, getUser }: Props) => {
  // @ts-ignore
  const [selectedNote, setSelectedNote] = useState<any>(
    notes.length > 0 ? notes[0] : undefined
  );
  //
  const [newNoteMode, setNewNoteMode] = useState(false);

  const saveNote = (note: any) => {
    axios
      .put(`http://localhost:3000/user/${nick}`, {
        notes: [...notes, note],
      })
      .then(() => {
        getUser();
      });
  };
  const updateNote = (note: any) => {
    axios
      .put(`http://localhost:3000/user/${nick}`, {
        notes: notes.map((notunia) => {
          return notunia.title === note.title ? note : notunia;
        }),
      })
      .then(() => {
        getUser();
      });
  };
  return (
    <>
      <button onClick={() => disableModal()}>Wyjdź</button>
      <button onClick={() => setNewNoteMode(!newNoteMode)}>
        {newNoteMode ? "Notatki" : "Nowa notatka"}
      </button>
      {newNoteMode ? (
        <NewNote saveNote={saveNote} />
      ) : (
        selectedNote && (
          <>
            <div className={"left-sidebar"}>
              {notes.map((note) => (
                <div
                  onClick={() => {
                    console.log("ustawiam nowa notatke na ", note);
                    setSelectedNote(note);
                  }}
                >
                  {note.title}
                </div>
              ))}
            </div>
            <div className={"right-side"}>
              <Note note={selectedNote} saveNote={updateNote} />
            </div>
          </>
        )
      )}
      {}
    </>
  );
};

export default Notes;
