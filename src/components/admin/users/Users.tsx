import React, {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../../constants/endpoints";
import "./users.scss";
import Styles from "./Style";
import Table from "./table/Table";
import {columnsNames} from "../../../constants/tableConstants";
import {generateHeadersWithAccessToken} from "../../../utils/tokenUtils";
import moment from "moment";
import EditUser from "../editUser/EditUser";
import ReactModal from "react-modal";

const Users: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    getListOfUsers();
  }, []);

  const [users, setUsers] = useState<any>([]);

  const getListOfUsers = () =>
    axios
      .get(`${SERVER_URL}/user`, generateHeadersWithAccessToken())
      .then((result) => {
        setUsers(result.data);
      });

  const columns = [
    ...columnsNames.map((columnName: string) => ({
      Header: columnName,
      accessor: columnName,
    })),
  ];

  const onDelete = (id: string) => {
    axios
      .delete(`${SERVER_URL}/user/${id}`, generateHeadersWithAccessToken())
      .then(() => {
        getListOfUsers();
      });
  };

  const [selectedUser, setSelectedUser] = useState();

  const data = [
    ...users.map((user: any) => {
      const {
        createdAt,
        email,
        nick,
        notes,
        rank,
        roles,
        updatedAt,
        verified,
        finishedCoursesIds,
        _id,
      } = user;
      return {
        "created at": moment(createdAt).format("DD/MM/YYYY HH:MM:SS"),
        email,
        nick,
        "number of notes": notes.length,
        rank,
        roles,
        "finished courses": finishedCoursesIds.join(", "),
        "updated at": moment(updatedAt).format("DD/MM/YYYY HH:MM:SS"),
        verified: String(verified),
        edit: (
          <>
            <span
              onClick={() => {
                setSelectedUser(user);
                setEditMode(true);
              }}
              className="material-icons icons"
            >
              mode_edit
            </span>
          </>
        ),
        delete: (
          <span onClick={() => onDelete(_id)} className="material-icons icons">
            delete_forever
          </span>
        ),
        id: _id,
      };
    }),
  ];

  const [searchValue, setSearchValue] = useState("");

  const filteredData = () => {
    if (searchValue.length > 1) {
      return data.filter(
        (user: any) =>
          user.nick.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          user.email.toLowerCase().includes(searchValue.toLocaleLowerCase())
      );
    } else {
      return data;
    }
  };

  return (
    <>
      <div
        className={
          "users-container flex-column-container flex-align-center flex-justify-center"
        }
      >
        <input
          type="text"
          placeholder="Wyszukaj usera..."
          name="searchBar"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <Styles>
          <Table columns={columns} data={filteredData()} />
        </Styles>
        <ReactModal
          isOpen={editMode}
          contentLabel="Inline Styles Modal Example"
          style={{
            content: {
              color: "ThreeDDarkShadow",
              backgroundColor: "#282828",
            },
          }}
        >
          <button className={"gold-button"} onClick={() => setEditMode(false)}>
            WRÓĆ DO PANELU ADMINISTRATORA
          </button>
          <div
            className={
              "flex-container flex-align-center flex-justify-center h-100"
            }
          >
            <EditUser
              closeEditMode={() => setEditMode(false)}
              user={selectedUser}
              refreshUsers={() => getListOfUsers()}
            />
          </div>
        </ReactModal>
      </div>
    </>
  );
};

export default Users;
