import React from 'react';
import Input from '../../Form/Input/Input';
import BadgeIcon from '@mui/icons-material/Badge';
import TextArea from '../../Form/Input/TextArea';
import DescriptionIcon from '@mui/icons-material/Description';
import { Controller } from 'react-hook-form';
import { FormControlLabel, Switch } from '@mui/material';
import { texts } from '../../../texts';
import styled from 'styled-components';

interface Props {
  control: any;
  errors: any;
  watch: any;
  titleName: string;
  descriptionName: string;
  isActiveName: string;
  header: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 18px;
`;

const StepForm: React.FC<Props> = ({
  children,
  header,
  control,
  errors,
  watch,
  titleName,
  descriptionName,
  isActiveName
}) => {
  const {
    tutorialForm: { title, description, activateTutorial, activateStep }
  } = texts;
  return (
    <Container>
      <Header>{header}</Header>
      <Input name={titleName} control={control} label={title} errors={errors}>
        <BadgeIcon sx={{ mr: 1, my: 0.5 }} />
      </Input>
      <TextArea name={descriptionName} control={control} label={description} errors={errors}>
        <DescriptionIcon sx={{ mr: 1, my: 0.5 }} />
      </TextArea>
      <Controller
        name={isActiveName}
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControlLabel
            onChange={onChange}
            value={value}
            checked={watch(isActiveName)}
            control={<Switch />}
            label={header.includes('Step') ? activateStep : activateTutorial}
          />
        )}
      />
      {children}
    </Container>
  );
};

export default StepForm;
