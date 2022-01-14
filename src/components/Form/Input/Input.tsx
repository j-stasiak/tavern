import React from 'react';
import { Box, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import styles from './Input.module.scss';
import { texts } from '../../../texts';

interface Props {
  name: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<any, Object>;
  label: string;
  errors: any;
  type?: string;
}

const Input: React.FC<Props> = ({ name, control, label, errors, type, children }) => (
  <Box className={styles.box} sx={{ display: 'flex', flexDirection: 'column' }}>
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          {children}
          <TextField
            sx={{ marginLeft: '8px' }}
            onChange={onChange}
            value={value}
            label={label}
            variant={'standard'}
            type={type}
          />
        </Box>
      )}
    />
    {errors[name]?.type === 'required' && <span className={styles.validator}>{texts.validation.required}</span>}
  </Box>
);

export default Input;
