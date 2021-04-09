import React from "react";
import { useSortBy, useTable } from "react-table";

interface IProps {
  columns: any;
  data: any;
}

const

    Table: React.FC<IProps> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th
                  {...column.getHeaderProps(
                    // @ts-ignore
                    column.getSortByToggleProps()
                  )}
                >
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {
                      // @ts-ignore
                      column.isSorted
                        ? // @ts-ignore
                          column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""
                    }
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
    </>
  );
};

export default Table;