import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../constants/endpoints";
import "./users.scss";
import Styles from "./Style";
import Table from "./table/Table";
import { columnsNames } from "../../../constants/tableConstants";
import { generateHeadersWithAccessToken } from "../../../utils/tokenUtils";
import moment from "moment";

const Users: React.FC = () => {
  useEffect(() => {
    getListOfUsers();
  }, []);

  const [users, setUsers] = useState<any>([]);

  const getListOfUsers = () =>
    axios
      .get(`${SERVER_URL}/user`, generateHeadersWithAccessToken())
      .then((result) => {
        setUsers(result.data.map((user: any) => user._doc));
      });

  const columns = [
    ...columnsNames.map((columnName: string) => ({
      Header: columnName,
      accessor: columnName,
    })),
  ];

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
        // _id,
      } = user;
      return {
        "created at": moment(createdAt).format("DD/MM/YYYY HH:MM:SS"),
        email,
        nick,
        "number of notes": notes.length,
        rank,
        roles,
        "updated at": moment(updatedAt).format("DD/MM/YYYY HH:MM:SS"),
        verified: String(verified),
        edit: (
          <span
            onClick={() => console.log("edit clicked")}
            className="material-icons icons"
          >
            mode_edit
          </span>
        ),
        delete: (
          <span
            onClick={() => console.log("delete user: ", nick)}
            className="material-icons icons"
          >
            delete_forever
          </span>
        ),
        // id: _id,
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
    </div>
  );
};

export default Users;
