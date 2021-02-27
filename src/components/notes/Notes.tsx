import React, { useState } from "react";
import { NoteModel } from "../../constants/PlayerModel";
import Note from "./note/Note";
import axios from "axios";
import { SERVER_URL } from "../../constants/endpoints";
import useSound from "use-sound";
import "./Notes.scss";
import NewNote from "./newNote/NewNote";

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
    setNewNoteMode(false);
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
      <button
        style={{ marginLeft: "20px" }}
        onClick={() => setNewNoteMode(!newNoteMode)}
      >
        {newNoteMode ? "Notatki" : "Nowa notatka"}
      </button>
      <div className={"flex-container"}>
        <div className={"left flex-col-container flex-align-center"}>
          {notes.map((note) => (
            <div
              className={"sidebar-notes sidebar-notes-border"}
              onClick={() => {
                setSelectedNote(note);
              }}
            >
              {note.title}
            </div>
          ))}
        </div>
        {newNoteMode ? (
          <div className={"selected-note"}>
            <NewNote saveNote={saveNote} />
          </div>
        ) : (
          <>
            {selectedNote && (
              <div className={"selected-note"}>
                <Note note={selectedNote} saveNote={updateNote} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Notes;
