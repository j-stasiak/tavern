import React from 'react';
import styled from 'styled-components';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';

const AdminHeader: React.FC = () => {
  const Wrapper = styled.div`
    align-items: center;
    justify-content: center;
    gap: 15px;
    display: flex;
  `;

  const Header = styled.h1`
    font-size: 24px;
    letter-spacing: 4px;
  `;

  return (
    <Wrapper>
      <HolidayVillageIcon />
      <Header>TAVERN</Header>
    </Wrapper>
  );
};

export default AdminHeader;
