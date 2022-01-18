import React, { FunctionComponent } from 'react';
import LiveCodePreview from './LiveCodePreview/LiveCodePreview';

interface OwnProps {
  name: string;
}

type Props = OwnProps;

const Course: FunctionComponent<Props> = ({ name }) => {
  return (
    <>
      <h1>Kurs: {name}</h1>
      <LiveCodePreview />
    </>
  );
};

export default Course;
