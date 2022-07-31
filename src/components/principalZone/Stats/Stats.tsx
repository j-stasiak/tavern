import React from 'react';
import styles from './Stats.module.scss';
import { Box } from '@mui/material';
import { useToken } from '../../../hooks/useToken';
import jwtDecode from 'jwt-decode';
import BadgeIcon from '@mui/icons-material/Badge';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DoneAllIcon from '@mui/icons-material/DoneAll';
// @ts-ignore
import { CircleProgress } from 'react-gradient-progress';
import { useGetPlayerInfoQuery } from '../../../redux/playerApi/playerApi';
import PacmanLoaderWrapper from '../../PacmanLoaderWrapper/PacmanLoaderWrapper';

const Stats: React.FC = () => {
  const { token } = useToken();
  // @ts-ignore
  const nick = jwtDecode(token).username;
  const { data, isLoading } = useGetPlayerInfoQuery(nick);

  return (
    <>
      {isLoading ? (
        <PacmanLoaderWrapper />
      ) : (
        <Box className={styles.container} sx={{ width: '400px', height: '814px', marginRight: '16px' }}>
          <div className={styles.nick}>
            <BadgeIcon />
            <h1>{nick}</h1>
          </div>
          <div className={styles.avatar} />
          <div className={styles.nick}>
            <StarHalfIcon />
            <h1>{data?.rank}</h1>
          </div>
          <div className={styles.nick}>
            <EmojiEventsIcon />
            <h1>{data?.reputation}</h1>
          </div>
          <div className={styles.nick}>
            <DoneAllIcon />
            <CircleProgress percentage={75} strokeWidth={8} />
          </div>
        </Box>
      )}
    </>
  );
};

export default Stats;
