import React, { CSSProperties, FunctionComponent, useEffect, useState } from 'react';
import LiveCodePreview from './LiveCodePreview/LiveCodePreview';
import styles from './Course.module.scss';
import classNames from 'classnames';
import { texts } from '../../texts';
import { Fireworks } from 'fireworks-js/dist/react';
import { Button } from '@mui/material';
import { useReactPhaserCommons } from '../providers/ReactPhaserCommonsProvider';

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
  const { comeBack, course, description: descriptionLabel } = texts.course;
  const { exitCourse } = useReactPhaserCommons();

  const options = {
    speed: 3
  };

  const style: CSSProperties = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: 'transparent'
  };

  useEffect(() => {
    if (isCompleted) {
      onExit();
    }
  }, [isCompleted]);
  return (
    <>
      {isCompleted && <Fireworks options={options} style={style} />}
      <div
        className={classNames(
          styles.container,
          { [styles.finishedBox]: isCompleted },
          { [styles.finishBorder]: isCompleted }
        )}
      >
        <h1>{`${course}: ${name}`}</h1>
        <h2>{`${descriptionLabel}: ${description}`}</h2>
        <LiveCodePreview
          answer={answer}
          onCompleted={() => {
            !isCompleted && setCompleted(true);
          }}
          isCompleted={isCompleted}
        />
      </div>
      <Button
        onClick={() => {
          exitCourse();
        }}
        variant={'contained'}
        sx={{ fontSize: '20px', textTransform: 'uppercase' }}
      >
        {comeBack}
      </Button>
    </>
  );
};

export default Course;
