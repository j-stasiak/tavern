import React from 'react';
import { LiveError, LivePreview } from 'react-live';
import { texts } from '../../../../texts';
import { Box } from '@mui/material';

const LiveCodeResult: React.FC = () => {
  const { result } = texts.course;
  return (
    <>
      <h2>{result}</h2>
      <Box sx={{ color: 'red' }}>
        <LiveError />
      </Box>
      <LivePreview />
    </>
  );
};

export default LiveCodeResult;
