import React, { useState } from 'react';
import LiveCodePreview from './LiveCodePreview/LiveCodePreview';
import styles from './Course.module.scss';
import classNames from 'classnames';
import { texts } from '../../texts';
import { Button } from '@mui/material';
import { useReactPhaserCommons } from '../providers/ReactPhaserCommonsProvider';
import ReactHowler from 'react-howler';
import FireworksWrapper from './LiveCodePreview/FireworksWrapper';
import { useGetCourseQuery } from '../../redux/courseApi/courseApi';
import PacmanLoaderWrapper from '../PacmanLoaderWrapper/PacmanLoaderWrapper';

const Course: React.FC = () => {
  const { selectedCourseName } = useReactPhaserCommons();
  const [isCompleted, setCompleted] = useState(false);
  const { comeBack, course, description: descriptionLabel } = texts.course;
  const { exitCourse } = useReactPhaserCommons();
  const { data, isLoading } = useGetCourseQuery(selectedCourseName);

  return (
    <>
      <ReactHowler src="assets/audio/course.mp3" playing={isCompleted} loop={false} volume={0.1} />
      {isLoading ? (
        <PacmanLoaderWrapper />
      ) : (
        <>
          {isCompleted && <FireworksWrapper />}
          <div
            className={classNames(
              styles.container,
              { [styles.finishedBox]: isCompleted },
              { [styles.finishBorder]: isCompleted }
            )}
          >
            <h1>{`${course}: ${data?.title}`}</h1>
            <h2>{`${descriptionLabel}: ${data?.description}`}</h2>
            <LiveCodePreview
              //TODO zmienic jak bedzie w zwrotce z api
              answer={'<div>finito</div>'}
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
      )}
    </>
  );
};

export default Course;
