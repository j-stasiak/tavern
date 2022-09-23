import React from 'react';
import { Box } from '@mui/material';
import { beige } from '../../constants/colors';
import { PacmanLoader } from 'react-spinners';

const PacmanLoaderWrapper: React.FC = () => (
  <Box data-testid={'loader'} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
    <PacmanLoader color={beige} size={15} />
  </Box>
);

export default PacmanLoaderWrapper;
