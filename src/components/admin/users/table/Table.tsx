import React, {useState} from "react";
import {TableUser} from "../../../../models/UserModel";
import "./table.scss";
import {
  sortAlphabeticalAsc,
  sortAlphabeticalDesc,
  sortArrayLengthAsc,
  sortArrayLengthDesc,
  sortDateAsc,
  sortDateDesc,
  sortNumbersDesc,
} from "../../../../utils/sortUtils";

interface IProps {
  columns: string[];
  usersTable: TableUser[];
}

const Table: React.FC<IProps> = ({ columns, usersTable }) => {
  const [sortedData, setSortedData] = useState<TableUser[]>([...usersTable]);
  console.log(usersTable);
  const sortDescFunctions = (columnName: string) => {
    console.log(columnName);
    switch (columnName) {
      case "created at":
        setSortedData(sortDateDesc([...usersTable], "createdAt"));
        break;
      case "updated at":
        setSortedData(sortDateDesc([...usersTable], "updatedAt"));
        break;
      case "id":
        setSortedData(sortAlphabeticalDesc([...usersTable], "_id"));
        break;
      case "nick":
      case "verified":
      case "email":
      case "rank":
      case "roles":
        setSortedData(sortAlphabeticalDesc([...usersTable], columnName));
        break;
      case "number of notes":
        setSortedData(sortNumbersDesc([...usersTable], "numberOfNotes"));
        break;
      case "finished courses":
        setSortedData(
          sortArrayLengthDesc([...usersTable], "finishedCoursesIds")
        );
    }
  };

  const sortAscFunctions = (columnName: string) => {
    console.log(columnName);
    switch (columnName) {
      case "created at":
        setSortedData(sortDateAsc([...usersTable], "createdAt"));
        break;
      case "updated at":
        setSortedData(sortDateAsc([...usersTable], "updatedAt"));
        break;
      case "id":
        setSortedData(sortAlphabeticalAsc([...usersTable], "_id"));
        break;
      case "nick":
      case "verified":
      case "email":
      case "rank":
      case "roles":
        setSortedData(sortAlphabeticalAsc([...usersTable], columnName));
        break;
      case "number of notes":
        setSortedData(sortDateAsc([...usersTable], "numberOfNotes"));
        break;
      case "finished courses":
        setSortedData(
          sortArrayLengthAsc([...usersTable], "finishedCoursesIds")
        );
    }
  };

  const renderTable = (data: TableUser[]): JSX.Element => (
    <table>
      <thead>
        <tr>
          {columns.map((column) => {
            if (column === "edit" || column === "delete") {
              return <th>{column}</th>;
            }
            return (
              <th>
                {column}
                <div>
                  <span
                    onClick={() => sortDescFunctions(column)}
                    className="pointer material-icons"
                  >
                    expand_more
                  </span>
                  <span
                    onClick={() => sortAscFunctions(column)}
                    className="pointer material-icons"
                  >
                    expand_less
                  </span>
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((user) => {
          const values = Object.values(user);
          return (
            <tr>
              {values.map((value: string) => (
                <td>{value}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <>
      {sortedData.length > 0
        ? renderTable(sortedData)
        : renderTable(usersTable)}
    </>
  );
};

export default Table;
