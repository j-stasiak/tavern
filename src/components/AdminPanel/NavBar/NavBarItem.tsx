import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
  text: string;
  Icon: React.FC;
}

const NavBarItem: React.FC<Props> = ({ text, Icon }) => {
  const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
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

  return (
    <StyledLink to={text}>
      <Wrapper>
        <Icon />
        <Text>{text}</Text>
      </Wrapper>
    </StyledLink>
  );
};

export default NavBarItem;
