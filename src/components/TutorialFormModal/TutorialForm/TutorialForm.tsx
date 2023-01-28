import React from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import PacmanLoaderWrapper from '../../PacmanLoaderWrapper/PacmanLoaderWrapper';
import { texts } from '../../../texts';
import { Course } from '../../../models/Course';
import {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useUpdateCourseMutation
} from '../../../redux/courseApi/courseApi';
import styled from 'styled-components';
import { useGlobalStates } from '../../providers/globalStatesProvider/GlobalStatesProvider';
import useToken from '../../../hooks/useToken';
import StepForm from './StepForm';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CloseIcon from '@mui/icons-material/Close';

const StyledButton = styled(Button)`
  width: 80%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 80px;
  margin-bottom: 200px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`;

const Icon = styled(PlaylistAddIcon)`
  font-size: 300px !important;
`;

const StyledIcon = styled(CloseIcon)`
  color: red;
  cursor: pointer;
  font-size: 60px !important;
`;

const TutorialForm: React.FC = () => {
  const {
    tutorialForm: { header, createButton },
    validation: { createTutorialFailed }
  } = texts;

  const { data, refetch: refetchTutorials } = useGetAllCoursesQuery('getCourses');
  const { setTutorialFormModalOpen, selectedCourseId } = useGlobalStates();
  const selectedTutorial = data?.find((tutorial) => tutorial.id === selectedCourseId);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<Course>({
    defaultValues: selectedTutorial
      ? { ...selectedTutorial }
      : { isActive: true, steps: [{ title: '', description: '', isActive: true }] }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps'
  });
  const [createTutorial, { isLoading, isError }] = useCreateCourseMutation();
  const [updateTutorial, { isLoading: isUpdateLoading, isError: isUpdateError }] = useUpdateCourseMutation();

  const onSubmit: SubmitHandler<Course> = (data) => {
    //@ts-ignore
    data.steps = data.steps.map((step, index) => ({
      ...step,
      stepNumber: index + 1,
      id: selectedTutorial?.steps[index]?.id
    }));
    selectedTutorial
      ? updateTutorial({ ...data, id: selectedTutorial.id })
          .unwrap()
          .then(() => {
            refetchTutorials();
            setTutorialFormModalOpen(false);
          })
      : createTutorial(data)
          .unwrap()
          .then(() => {
            refetchTutorials();
            setTutorialFormModalOpen(false);
          });
  };

  return (
    <Wrapper>
      <StyledIcon onClick={() => setTutorialFormModalOpen(false)} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <StepsContainer>
            <StepForm
              header={header}
              control={control}
              errors={errors}
              watch={watch}
              titleName={'title'}
              descriptionName={'description'}
              isActiveName={'isActive'}
            >
              <Button onClick={() => undefined} variant="text">
                {'clear form'}
              </Button>
            </StepForm>
            {fields.map((field, index) => (
              <StepForm
                header={`Step ${index + 1}`}
                key={index}
                control={control}
                isStepForm={true}
                errors={errors}
                watch={watch}
                answerName={`steps.${index}.expectedResult`}
                titleName={`steps.${index}.title`}
                descriptionName={`steps.${index}.description`}
                isActiveName={`steps.${index}.isActive`}
              >
                {fields.length > 1 && (
                  <Button onClick={() => remove(index)} variant="text">
                    {'delete step'}
                  </Button>
                )}
              </StepForm>
            ))}
            {fields.length < 2 && <Icon onClick={() => append({ title: '', description: '', isActive: true })} />}
          </StepsContainer>
          {!isLoading || isUpdateLoading ? (
            <StyledButton type={'submit'} variant="outlined">
              {`${selectedTutorial ? 'update tutorial!' : createButton}`}
            </StyledButton>
          ) : (
            <PacmanLoaderWrapper />
          )}
        </Container>
      </form>

      {isError ||
        (isUpdateError && (
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-around',
              color: 'red',
              alignItems: 'center',
              fontSize: '1.2rem',
              marginTop: '8px'
            }}
          >
            <ErrorIcon sx={{ mr: 1, my: 0.5 }} />
            <span>{createTutorialFailed}</span>
          </Box>
        ))}
    </Wrapper>
  );
};

export default TutorialForm;
