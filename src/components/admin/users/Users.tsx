import React, {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../../constants/endpoints";
import "./users.scss";
import Styles from "./Style";
import Table from "./table/Table";
import {columnsNames} from "../../../constants/tableConstants";

const Users: React.FC = () => {
  useEffect(() => {
    getListOfUsers();
  }, []);

  const [users, setUsers] = useState<any>([]);

  const getListOfUsers = () =>
    axios.get(`${SERVER_URL}/user`).then((result) => {
      setUsers(result.data);
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
        _id,
      } = user;
      return {
        createdAt,
        email,
        nick,
        numberOfNotes: notes.length,
        rank,
        roles,
        updatedAt,
        verified: String(verified),
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
    </div>
  );
};

export default Users;
