import React from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import PacmanLoaderWrapper from '../../PacmanLoaderWrapper/PacmanLoaderWrapper';
import { texts } from '../../../texts';
import { Course } from '../../../models/Course';
import { useCreateCourseMutation, useGetAllCoursesQuery } from '../../../redux/courseApi/courseApi';
import styled from 'styled-components';
import { useGlobalStates } from '../../providers/globalStatesProvider/GlobalStatesProvider';
import { useToken } from '../../../hooks/useToken';
import StepForm from './StepForm';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const StyledButton = styled(Button)`
  width: 50%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
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

const TutorialForm: React.FC = () => {
  const {
    tutorialForm: { header, createButton },
    validation: { createTutorialFailed }
  } = texts;
  const { token } = useToken();
  const { data } = useGetAllCoursesQuery(token);
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
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'steps' // unique name for your Field Array
  });
  const [createTutorial, { isLoading, isError }] = useCreateCourseMutation();

  const onSubmit: SubmitHandler<Course> = (data) => {
    createTutorial(
      selectedTutorial ? { data: { ...data, id: selectedTutorial.id }, token } : { data: { ...data }, token }
    )
      .unwrap()
      .then(() => {
        setTutorialFormModalOpen(false);
      });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
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
              errors={errors}
              watch={watch}
              titleName={`steps.${index}.title`}
              descriptionName={`steps.${index}.description`}
              isActiveName={`steps.${index}.isActive`}
            >
              <Button onClick={() => remove(index)} variant="text">
                {'delete step'}
              </Button>
            </StepForm>
          ))}
          {fields.length < 2 && <Icon onClick={() => append({ title: '', description: '', isActive: true })} />}
        </Container>
      </form>
      {!isLoading ? (
        <StyledButton type={'submit'} variant="outlined">
          {createButton}
        </StyledButton>
      ) : (
        <PacmanLoaderWrapper />
      )}
      {isError && (
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
      )}
    </Wrapper>
  );
};

export default TutorialForm;
