import React, { FunctionComponent, useEffect, useState } from 'react';
import LiveCodePreview from './LiveCodePreview/LiveCodePreview';
import './course.scss';
import classNames from 'classnames';

interface Course {
  answer: string;
  description: string;
}
interface OwnProps {
  name: string;
  course: Course;
  onExit: () => void;
}

type Props = OwnProps;

const Course: FunctionComponent<Props> = ({ name, onExit, course: { answer, description } }) => {
  const [isCompleted, setCompleted] = useState(false);

  useEffect(() => {
    if (isCompleted) {
      onExit();
    }
  }, [isCompleted]);
  return (
    <>
      <div className={classNames({ [`finished-box finish-border`]: isCompleted })}>
        KURS UKOŃCZONY!!!
        <h1>Kurs: {name}</h1>
        <h2>Opis: {description}</h2>
        <LiveCodePreview
          answer={answer}
          onCompleted={() => {
            !isCompleted && setCompleted(true);
          }}
        />
      </div>
    </>
  );
};

export default Course;
