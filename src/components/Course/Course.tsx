import React, { useState } from 'react';
import LiveCodePreview from './LiveCodePreview/LiveCodePreview';
import styles from './Course.module.scss';
import classNames from 'classnames';
import { texts } from '../../texts';
import { Button } from '@mui/material';
import { useReactPhaserCommons } from '../providers/ReactPhaserCommonsProvider';
import ReactHowler from 'react-howler';
import FireworksWrapper from './LiveCodePreview/FireworksWrapper';
import { useGetCourseQuery, useLazyFinishCourseQuery } from '../../redux/courseApi/courseApi';
import PacmanLoaderWrapper from '../PacmanLoaderWrapper/PacmanLoaderWrapper';
import useToken, { TokenInfo } from '../../hooks/useToken';
import { useLazyGetUserQuery } from '../../redux/playerApi/userApi';
import jwtDecode from 'jwt-decode';

const Course: React.FC = () => {
  const { selectedCourseName } = useReactPhaserCommons();
  const [isCompleted, setCompleted] = useState(false);
  const { comeBack, description: descriptionLabel } = texts.course;
  const { exitCourse } = useReactPhaserCommons();
  const { data, isLoading } = useGetCourseQuery(selectedCourseName);
  const { token } = useToken();

  const [position, setPosition] = useState(0);

  const stepData = data?.steps[position - 1];
  //@ts-ignore
  const stepsLength = data?.steps.length || 0;

  const [completeTutorialTrigger] = useLazyFinishCourseQuery();

  const sub = token && jwtDecode<TokenInfo>(token)?.sub;
  const [trigger] = useLazyGetUserQuery();

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
            <h1>{`${position === 0 ? data?.title : stepData?.title}`}</h1>
            <h2>{`${descriptionLabel}: ${position === 0 ? data?.description : stepData?.description}`}</h2>
            {stepData && (
              <LiveCodePreview
                answer={stepData.expectedResult}
                onCompleted={() => {
                  !isCompleted && setCompleted(true);
                  if (position === stepsLength) {
                    completeTutorialTrigger(selectedCourseName).then(() => trigger(sub));
                  }
                }}
                isCompleted={isCompleted}
              />
            )}
          </div>
          {position < stepsLength && (isCompleted || position === 0) && (
            <Button
              onClick={() => {
                setPosition(position + 1);
                setCompleted(false);
              }}
              variant={'contained'}
              sx={{ fontSize: '20px', textTransform: 'uppercase', marginBottom: '20px' }}
            >
              {'next step'}
            </Button>
          )}

          <Button
            onClick={() => {
              exitCourse();
            }}
            variant={'contained'}
            sx={{ fontSize: '20px', textTransform: 'uppercase', marginBottom: '20px' }}
          >
            {comeBack}
          </Button>
        </>
      )}
    </>
  );
};

export default Course;
