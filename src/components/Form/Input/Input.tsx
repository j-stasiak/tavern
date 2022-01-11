import React from 'react';
import { Box, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import styles from './Input.module.scss';
import { texts } from '../../../texts';

interface Props {
  name: string;
  control: any;
  label: string;
  errors: any;
}

const Input: React.FC<Props> = ({ name, control, label, errors, children }) => {
  return (
    <Box className={styles.box} sx={{ display: 'flex', flexDirection: 'column' }}>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            {children}
            <TextField onChange={onChange} value={value} label={label} variant={'standard'} />
          </Box>
        )}
      />
      {errors[name]?.type === 'required' && <span className={styles.validator}>{texts.validation.required}</span>}
    </Box>
  );
};

export default Input;
