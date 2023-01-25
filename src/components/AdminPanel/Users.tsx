import React, { useEffect, useState } from 'react';
import useToken, { User } from '../../hooks/useToken';
import styled from 'styled-components';
import PacmanLoaderWrapper from '../PacmanLoaderWrapper/PacmanLoaderWrapper';
import { useGetAllUsersQuery } from '../../redux/playerApi/userApi';

const StyledPacMan = styled(PacmanLoaderWrapper)`
  display: grid;
  justify-content: center;
  align-items: center;
`;

type SortKeys = keyof User;

type SortOrder = 'ascn' | 'desc';

const sortData = (tableData: User[], sortKey: SortKeys, reverse: boolean) => {
  if (!sortKey) return tableData;
  const dataToSort = [...tableData];
  const sortedData = dataToSort.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
};

const Users: React.FC = () => {
  const { token } = useToken();
  const { data: tableData, isLoading } = useGetAllUsersQuery(token);

  const [sortKey, setSortKey] = useState<SortKeys>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('ascn');
  const [sortedData, setSortedData] = useState<User[]>([]);

  const headers = [
    { key: 'id', label: 'id' },
    { key: 'email', label: 'email' },
    { key: 'firstName', label: 'first name' },
    { key: 'isActive', label: 'is active?' },
    { key: 'username', label: 'username' },
    { key: 'role', label: 'role' }
  ];

  useEffect(() => {
    if (!isLoading && tableData) {
      setSortedData(sortData(tableData, sortKey, sortOrder === 'desc'));
    }
  }, [isLoading, tableData]);

  // const sortedData: User[] = useCallback(() => {
  //   return sortData(tableData, sortKey, sortOrder === 'desc');
  // }, [tableData, sortKey, sortOrder]);

  return (
    <>
      {isLoading ? (
        <StyledPacMan />
      ) : (
        <table>
          <thead>
            <tr>
              {headers.map((row) => (
                <td onClick={() => setSortKey(row.key as SortKeys)} key={row.key}>
                  {row.label}
                </td>
              ))}
            </tr>
          </thead>
          {tableData && (
            <tbody>
              {sortedData.map(({ id, firstName, isActive, username, email, role }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{firstName}</td>
                  <td>{isActive}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{role}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}
    </>
  );
};

export default Users;
