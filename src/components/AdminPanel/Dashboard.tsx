import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  width: calc(100% - 300px);
  height: 100vh;
  padding: 100px;
  align-items: start;
  justify-items: start;
`;

const Dashboard: React.FC = () => {
  return (
    <Container>
      <h1 style={{ marginLeft: '100px', letterSpacing: '3px' }}>Witaj w panelu administratora Tavern!</h1>
    </Container>
  );
};

export default Dashboard;
