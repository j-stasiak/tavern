import React, {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../../constants/endpoints";
import "./users.scss";
import Styles from "./Style";
import Table from "./table/Table";
import {columnsNames} from "../../../constants/tableConstants";
import {generateHeadersWithAccessToken} from "../../../utils/tokenUtils";
import moment from "moment";
import ReactModal from "react-modal";
import EditUser from "../editUser/EditUser";

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

  console.log(users);

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
          <span
            onClick={() => setEditMode(true)}
            className="material-icons icons"
          >
            mode_edit
          </span>
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

  return (
    <div
      className={
        "users-container flex-container flex-align-center flex-justify-center"
      }
    >
      <Styles>
        <Table columns={columns} data={data} />
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
        <div className={"flex-container"}>
          <EditUser />
        </div>
      </ReactModal>
    </div>
  );
};

export default Users;
