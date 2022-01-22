import { Box } from '@mui/material';
import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { LiveEditor } from 'react-live';
import { texts } from '../../../../texts';

interface OwnProps {
  dupa?: string;
  setCode: Dispatch<SetStateAction<string>>;
}

type Props = OwnProps;

const LiveCodeEditor: FunctionComponent<Props> = ({ setCode }) => {
  const { typeHere } = texts.course;
  return (
    <div>
      <h2>{typeHere}</h2>
      <Box
        sx={{
          fontSize: '28px',
          background: 'linear-gradient(90deg, rgba(15,16,18,0.88) 0%, rgba(40,49,59,0.55) 70%)'
        }}
      >
        <LiveEditor onChange={setCode} />
      </Box>
    </div>
  );
};

export default LiveCodeEditor;
