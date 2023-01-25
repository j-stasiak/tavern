import React, { useEffect } from 'react';
import styles from './Stats.module.scss';
import { Box } from '@mui/material';
import { TokenInfo } from '../../../hooks/useToken';
import useToken from '../../../hooks/useToken';
import jwtDecode from 'jwt-decode';
import BadgeIcon from '@mui/icons-material/Badge';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DoneAllIcon from '@mui/icons-material/DoneAll';
// @ts-ignore
import { CircleProgress } from 'react-gradient-progress';
import PacmanLoaderWrapper from '../../PacmanLoaderWrapper/PacmanLoaderWrapper';
import styled from 'styled-components';
import { useGetAllCoursesQuery } from '../../../redux/courseApi/courseApi';
import { useGetUserQuery, useLazyGetUserQuery } from '../../../redux/playerApi/userApi';

const StatRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
`;

const Rank = styled.h1`
  text-transform: capitalize;
  letter-spacing: 3px;
`;

const Stats: React.FC = () => {
  const { token } = useToken();
  const { sub, username, info, completedTutorials } = jwtDecode<TokenInfo>(token);
  const { data: userInfo, isLoading: userInfoLoading } = useGetUserQuery(sub);
  const { data, isLoading } = useGetAllCoursesQuery(token);

  return (
    <Box className={styles.container} sx={{ width: '400px', height: '814px', marginRight: '16px' }}>
      {isLoading || userInfoLoading ? (
        <PacmanLoaderWrapper />
      ) : (
        <>
          <StatRow>
            <BadgeIcon />
            <h1>{username}</h1>
          </StatRow>
          <StatRow>
            <StarHalfIcon />
            <Rank>{userInfo?.info.rank}</Rank>
          </StatRow>
          <StatRow>
            <EmojiEventsIcon />
            <h1>{userInfo?.info.reputation}</h1>
          </StatRow>
          <StatRow>
            <DoneAllIcon />
            {data && (
              <CircleProgress
                percentage={(userInfo?.completedTutorials?.length / data?.length) * 100}
                strokeWidth={8}
              />
            )}
          </StatRow>
        </>
      )}
    </Box>
  );
};

export default Stats;
