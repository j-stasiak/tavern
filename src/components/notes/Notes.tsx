import React, { useState } from "react";
import { NoteModel } from "../../constants/PlayerModel";
import NewNote from "./newNote/NewNote";
import Note from "./note/Note";
import axios from "axios";
import { SERVER_URL } from "../../constants/endpoints";
import useSound from "use-sound";

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
  const [play] = useSound("sounds/wpis sound.mp3", { volume: 0.2 });

  const saveNote = (note: any) => {
    axios
      .put(`${SERVER_URL}/user/${nick}`, {
        notes: [...notes, note],
      })
      .then(() => {
        getUser();
        play();
      });
  };
  const updateNote = (note: any) => {
    axios
      .put(`${SERVER_URL}/user/${nick}`, {
        notes: notes.map((notunia) => {
          return notunia.title === note.title ? note : notunia;
        }),
      })
      .then(() => {
        getUser();
        play();
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
