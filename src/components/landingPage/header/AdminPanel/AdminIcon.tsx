import React from 'react';
import AdbIcon from '@mui/icons-material/Adb';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledAdminIcon = styled(AdbIcon)`
  font-size: 50px !important;
  color: goldenrod;
  position: absolute;
  top: 20px;
  left: 40px;
  cursor: pointer;
`;

const AdminIcon: React.FC = () => (
  <Link to="admin">
    <StyledAdminIcon />
  </Link>
);

export default AdminIcon;
