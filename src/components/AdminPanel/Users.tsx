import React, { useEffect, useState } from 'react';
import useToken, { User } from '../../hooks/useToken';
import styled from 'styled-components';
import PacmanLoaderWrapper from '../PacmanLoaderWrapper/PacmanLoaderWrapper';
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../redux/playerApi/userApi';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  width: calc(100% - 300px);
`;

const TableContainer = styled.table`
  width: 100%;
  min-height: 100vh;
  padding: 100px;
`;

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

const DeleteIcon = styled(DeleteForeverIcon)`
  cursor: pointer;
`;

const FixedTd = styled.td`
  width: 20%;
  text-align: center;
`;

const FixedTdDelete = styled.td`
  width: 10%;
  text-align: center;
`;

const FixedTdHeader = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 20px;
`;

const Users: React.FC = () => {
  const { token } = useToken();
  const { data: tableData, isFetching, refetch: refetchUsers } = useGetAllUsersQuery(token);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const [sortKey, setSortKey] = useState<SortKeys>('role');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [sortedData, setSortedData] = useState<User[]>([]);

  const headers = [
    { key: 'id', label: 'id' },
    { key: 'email', label: 'email' },
    { key: 'username', label: 'username' },
    { key: 'role', label: 'role' }
  ];

  useEffect(() => {
    if (!isFetching && tableData) {
      setSortedData(sortData(tableData, sortKey, sortOrder === 'desc'));
    }
  }, [isFetching, tableData]);

  useEffect(() => {
    if (!isFetching && tableData) {
      setSortedData(sortData(tableData, sortKey, sortOrder === 'desc'));
    }
  }, [sortOrder, sortKey]);

  return (
    <>
      {isFetching || isDeleting ? (
        <StyledPacMan />
      ) : (
        <Container>
          <TableContainer>
            <thead>
              <tr>
                {headers.map((row) => (
                  <FixedTd key={row.label}>
                    <FixedTdHeader>
                      {row.label}
                      <ArrowDropUpIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setSortOrder('desc');
                          setSortKey(row.key as SortKeys);
                        }}
                      />
                      <ArrowDropDownIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setSortOrder('ascn');
                          setSortKey(row.key as SortKeys);
                        }}
                      />
                    </FixedTdHeader>
                  </FixedTd>
                ))}
                <FixedTdHeader> </FixedTdHeader>
              </tr>
            </thead>
            {tableData && (
              <tbody>
                {sortedData.map(({ id, username, email, role }) => (
                  <tr key={id}>
                    <FixedTd>{id}</FixedTd>
                    <FixedTd>{email}</FixedTd>
                    <FixedTd>{username}</FixedTd>
                    <FixedTd>{role}</FixedTd>
                    <FixedTdDelete>
                      <DeleteIcon onClick={() => deleteUser({ id }).then(() => refetchUsers())} />
                    </FixedTdDelete>
                  </tr>
                ))}
              </tbody>
            )}
          </TableContainer>
        </Container>
      )}
    </>
  );
};

export default Users;
