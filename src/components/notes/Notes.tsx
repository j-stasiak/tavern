import React, { useContext, useState } from "react";
import { NoteModel } from "../../constants/PlayerModel";
import Note from "./note/Note";
import axios from "axios";
import { SERVER_URL } from "../../constants/endpoints";
import useSound from "use-sound";
import "./Notes.scss";
import NewNote from "./newNote/NewNote";
import { UserContext } from "../../contexts/UserContext";

interface Props {
  notes: NoteModel[];
  disableModal: Function;
  getUser: Function;
  nick: string;
}

const Notes = ({ notes, nick, disableModal, getUser }: Props) => {
  // @ts-ignore
  const { user } = useContext(UserContext);
  const [selectedNote, setSelectedNote] = useState<any>(
    notes.length > 0 ? notes[0] : undefined
  );

  const [newNoteMode, setNewNoteMode] = useState(false);
  const [play] = useSound("sounds/wpis sound.mp3", { volume: 0.2 });

  const saveNote = (note: any) => {
    const preparedData =
      // @ts-ignore
      user?.roles[0] === "admin"
        ? {
            notes: [...notes, note],
            roles: ["admin"],
          }
        : {
            notes: [...notes, note],
          };
    axios
      .put(
        `${SERVER_URL}/user/${nick}`,
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
        getUser();
        play();
      });
    setNewNoteMode(false);
  };
  const updateNote = (note: any) => {
    const preparedData =
      // @ts-ignore
      user?.roles[0] === "admin"
        ? {
            notes: notes.map((notunia) => {
              return notunia.title === note.title ? note : notunia;
            }),
            roles: ["admin"],
          }
        : {
            notes: notes.map((notunia) => {
              return notunia.title === note.title ? note : notunia;
            }),
          };
    axios
      .put(
        `${SERVER_URL}/user/${nick}`,
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
        getUser();
        play();
      });
  };

  const deleteNote = (indexToDelete: number) => {
    const notesAfterDelete = [
      ...notes.filter((note, index) => index !== indexToDelete),
    ];
    const preparedData =
      // @ts-ignore
      user?.roles[0] === "admin"
        ? {
            notes: [...notesAfterDelete],
            roles: ["admin"],
          }
        : {
            notes: [...notesAfterDelete],
          };
    axios
      .put(
        `${SERVER_URL}/user/${nick}`,
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
        getUser();
        play();
        refreshView(notesAfterDelete);
      });
  };

  const refreshView = (notesAfterDelete: any) => {
    setSelectedNote(notesAfterDelete.length > 0 ? notes[0] : undefined);
  };

  const [searchValue, setSearchValue] = useState("");

  const filteredData = () => {
    if (searchValue.length > 1) {
      console.log(notes);
      return notes.filter(
        (note: any) =>
          note.title.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          note.description
            .toLowerCase()
            .includes(searchValue.toLocaleLowerCase())
      );
    } else {
      return notes;
    }
  };

  return (
    <>
      <button className={"gold-button"} onClick={() => disableModal()}>
        Wyjdź
      </button>
      <button
        style={{ marginLeft: "20px" }}
        onClick={() => setNewNoteMode(!newNoteMode)}
        className={"gold-button"}
      >
        {newNoteMode ? "Notatki" : "Nowa notatka"}
      </button>
      <input
        className={"margin-20"}
        type="text"
        placeholder="Wyszukaj notatkę..."
        name="searchBar"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <div className={"flex-container"}>
        <div className={"left flex-col-container flex-align-center"}>
          {filteredData().map((note, index) => (
            <div
              className={"sidebar-notes sidebar-notes-border"}
              onClick={() => {
                setSelectedNote(note);
              }}
            >
              <span
                onClick={() => deleteNote(index)}
                className="material-icons delete-icon"
              >
                backspace
              </span>
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
