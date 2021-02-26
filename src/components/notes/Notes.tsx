import React, { useEffect, useState } from "react";
import { NoteModel } from "../../constants/PlayerInfo";
import NewNote from "./newNote/NewNote";
import Note from "./note/Note";

interface Props {
  notes: NoteModel[];
  disableModal: Function;
}

const Notes = ({ notes, disableModal }: Props) => {
  // @ts-ignore
  const [selectedNote, setSelectedNote] = useState<any>(
    notes.length > 0 ? notes[0] : undefined
  );
  //
  const [newNoteMode, setNewNoteMode] = useState(false);

  const saveNote = (note: any) => {
    console.log([...notes, note]);
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
              <Note note={selectedNote} saveNote={saveNote} />
            </div>
          </>
        )
      )}
      {}
    </>
  );
};

export default Notes;
