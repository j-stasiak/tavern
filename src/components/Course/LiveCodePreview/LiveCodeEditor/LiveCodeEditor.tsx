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
      <LiveEditor onChange={setCode} />
    </div>
  );
};

export default LiveCodeEditor;
