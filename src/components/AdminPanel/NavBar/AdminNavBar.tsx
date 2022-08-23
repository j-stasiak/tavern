import React from 'react';
import styled from 'styled-components';
import AdminHeader from './AdminHeader';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import NavBarItem from './NavBarItem';
import DraftsIcon from '@mui/icons-material/Drafts';
import LogoutIcon from '@mui/icons-material/Logout';
import { Outlet, useNavigate } from 'react-router-dom';
import { TokenInfo, useToken } from '../../../hooks/useToken';
import jwtDecode from 'jwt-decode';

interface Item {
  text: string;
  Icon: React.FC;
}

const navItemsDictionary: Item[] = [
  { text: 'dashboard', Icon: HomeIcon },
  { text: 'users', Icon: GroupIcon },
  { text: 'tutorials', Icon: FitnessCenterIcon },
  { text: 'messages', Icon: DraftsIcon },
  { text: 'sign out', Icon: LogoutIcon }
];

const StyledNavBar = styled.div`
  width: 300px;
  height: 100vh;
  background-color: #287bff;
  display: grid;
  grid-template-rows: repeat(6, 1fr) 4fr;
`;

const AdminNavBar: React.FC = () => {
  const { token } = useToken();
  const role = token && jwtDecode<TokenInfo>(token).role;
  const navigate = useNavigate();
  //TODO: nie dziala mi ten redirect
  if (role !== 'admin') {
    navigate('/', { replace: true });
  }

  return (
    <>
      {role === 'admin' ? (
        <div style={{ display: 'flex' }}>
          <StyledNavBar>
            <AdminHeader />
            {navItemsDictionary.map((item) => (
              <NavBarItem {...item} key={item.text} />
            ))}
          </StyledNavBar>
          <Outlet />
        </div>
      ) : null}
    </>
  );
};

export default AdminNavBar;
