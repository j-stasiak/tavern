import React, { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import { LiveEditor } from 'react-live';

interface OwnProps {
  dupa?: string;
  setCode: Dispatch<SetStateAction<string>>;
}

type Props = OwnProps;

const LiveCodeEditor: FunctionComponent<Props> = ({ setCode }) => {
  return <LiveEditor onChange={setCode} />;
};

export default LiveCodeEditor;
