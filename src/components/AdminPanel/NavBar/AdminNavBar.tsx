import React from 'react';
import styled from 'styled-components';
import AdminHeader from './AdminHeader';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import NavBarItem from './NavBarItem';
import DraftsIcon from '@mui/icons-material/Drafts';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, Outlet } from 'react-router-dom';
import useToken, { TokenInfo } from '../../../hooks/useToken';
import jwtDecode from 'jwt-decode';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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
  grid-template-rows: repeat(7, 1fr) 4fr;
`;

const Wrapper = styled.div`
  align-items: center;
  margin-left: 50px;
  gap: 15px;
  display: flex;
`;

const Text = styled.p`
  font-size: 24px;
  letter-spacing: 4px;
  text-transform: capitalize;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const AdminNavBar: React.FC = () => {
  const { token } = useToken();
  const role = token && jwtDecode<TokenInfo>(token).role;

  if (role !== 'admin') {
    window.location.href = '/';
  }

  return (
    <>
      {role === 'admin' ? (
        <div style={{ display: 'flex' }}>
          <StyledNavBar>
            <AdminHeader />
            <StyledLink to={'/'}>
              <Wrapper style={{ cursor: 'pointer' }}>
                <ArrowBackIosIcon />
                <Text>Return</Text>
              </Wrapper>
            </StyledLink>
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
