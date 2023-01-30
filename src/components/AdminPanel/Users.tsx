import React, { useEffect, useState } from 'react';
import useToken, { User } from '../../hooks/useToken';
import styled from 'styled-components';
import PacmanLoaderWrapper from '../PacmanLoaderWrapper/PacmanLoaderWrapper';
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../redux/playerApi/userApi';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, TextField } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const TableContainer = styled.table`
  width: 100%;
  min-height: 100vh;
  padding: 0 100px 30px;
`;

const StyledPacMan = styled(PacmanLoaderWrapper)`
  display: grid;
  justify-content: center;
  align-items: center;
`;

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

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  width: calc(100% - 300px);
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
  const { data: tableData, isFetching, refetch: refetchUsers } = useGetAllUsersQuery(token);
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const [sortKey, setSortKey] = useState<SortKeys>('role');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [sortedData, setSortedData] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const headers = [
    { key: 'id', label: 'id' },
    { key: 'email', label: 'email' },
    { key: 'username', label: 'username' },
    { key: 'role', label: 'role' }
  ];

  useEffect(() => {
    if (!isFetching && tableData) {
      setSearchValue('');
      setSortedData(sortData(tableData, sortKey, sortOrder === 'desc'));
    }
  }, [isFetching, tableData]);

  useEffect(() => {
    if (!isFetching && tableData) {
      setSortedData(sortData(tableData, sortKey, sortOrder === 'desc'));
    }
  }, [sortOrder, sortKey]);

  useEffect(() => {
    const defaultData = tableData ? sortData(tableData, sortKey, sortOrder === 'desc') : [];
    if (!isFetching && tableData && searchValue.length > 2) {
      setSortedData([...defaultData.filter((row) => row.username.toLowerCase().includes(searchValue.toLowerCase()))]);
    } else {
      setSortedData([...defaultData]);
    }
  }, [searchValue]);

  return (
    <>
      {isFetching || isDeleting ? (
        <StyledPacMan />
      ) : (
        <StyledContainer>
          <Input value={searchValue} setValue={setSearchValue} />
          {/*<Container>*/}
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
          {/*</Container>*/}
        </StyledContainer>
      )}
    </>
  );
};

export default Users;

interface BoxProps {
  value: string;
  setValue: (value: string) => void;
}

const StyledIcon = styled(ManageSearchIcon)`
  font-size: 40px !important;
`;

const Input: React.FC<BoxProps> = ({ value, setValue }) => {
  return (
    <div style={{ alignSelf: 'end', marginRight: '70px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <StyledIcon />
        <TextField
          sx={{ marginLeft: '8px' }}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          label={'start searching...'}
          variant={'standard'}
          autoComplete={'off'}
        />
      </Box>
    </div>
  );
};
