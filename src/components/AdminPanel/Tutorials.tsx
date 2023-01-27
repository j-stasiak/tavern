import React from 'react';
import styled from 'styled-components';
import { useGetAllCoursesQuery } from '../../redux/courseApi/courseApi';
import PacmanLoaderWrapper from '../PacmanLoaderWrapper/PacmanLoaderWrapper';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useGlobalStates } from '../providers/globalStatesProvider/GlobalStatesProvider';

const Container = styled.div`
  display: grid;
  width: calc(100% - 300px);
  height: 100vh;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 20px;
  align-items: center;
  justify-items: center;
`;

const Box = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props: { isActive?: boolean }) => (props.isActive ? '#000000B2' : '#7E787877')};
  cursor: pointer;
  gap: 20px;
  padding: 20px;
`;

const Icon = styled(PlaylistAddIcon)`
  font-size: 300px !important;
`;

const StyledPacMan = styled(PacmanLoaderWrapper)`
  display: grid;
  justify-content: center;
  align-items: center;
`;

const Tutorials: React.FC = () => {
  const { data, isFetching } = useGetAllCoursesQuery('getCourses');
  const { setTutorialFormModalOpen, setSelectedCourseId } = useGlobalStates();

  return (
    <>
      {isFetching ? (
        <StyledPacMan />
      ) : (
        <Container>
          <>
            {data?.map(({ id, title, description, steps, isActive }) => (
              <Box
                data-testid={'tutorial-box-container'}
                key={id}
                isActive={!!isActive}
                onClick={() => {
                  setTutorialFormModalOpen(true);
                  setSelectedCourseId(id);
                }}
              >
                <h2>{title}</h2>
                <h4>{description}</h4>
                <p>{steps.length}</p>
              </Box>
            ))}
          </>
          <Box
            isActive={true}
            onClick={() => {
              setTutorialFormModalOpen(true);
              setSelectedCourseId('');
            }}
          >
            <Icon />
          </Box>
        </Container>
      )}
    </>
  );
};

export default Tutorials;
