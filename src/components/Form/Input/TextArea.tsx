import React from 'react';
import { Box, TextareaAutosize } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import styles from './Input.module.scss';
import { texts } from '../../../texts';
import styled from 'styled-components';

interface Props {
  name: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<any, Object>;
  label: string;
  errors: any;
  type?: string;
  placeholder: string;
}

const StyledBox = styled(Box)`
  margin: 30px 0;
`;

const Validator = styled.span`
  margin-top: 8px;
  color: red;
`;

const TextArea: React.FC<Props> = ({ name, placeholder, control, label, errors, type, children }) => (
  <StyledBox className={styles.box} sx={{ display: 'flex', flexDirection: 'column' }}>
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          {children}
          <TextareaAutosize
            style={{ marginLeft: '8px', width: 'calc(100% - 55px)', paddingLeft: '10px', paddingTop: '6px' }}
            onChange={onChange}
            value={value}
            aria-label="tutorial desc"
            minRows={3}
            placeholder={placeholder}
          />
        </Box>
      )}
    />
    {errors[name]?.type === 'required' && (
      <Validator className={styles.validator}>{texts.validation.required}</Validator>
    )}
  </StyledBox>
);

export default TextArea;
