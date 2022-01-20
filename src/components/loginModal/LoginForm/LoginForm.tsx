import React from 'react';
import styles from '../LoginModal.module.scss';
import Input from '../../Form/Input/Input';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Button } from '@mui/material';
import PacmanLoaderWrapper from '../../PacmanLoaderWrapper/PacmanLoaderWrapper';
import ErrorIcon from '@mui/icons-material/Error';
import { texts } from '../../../texts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginInputs } from '../LoginModal';
import { useLogin } from '../../../hooks/useLogin';

interface Props {
  setIsLoginPage: (state: boolean) => void;
}

const LoginForm: React.FC<Props> = ({ setIsLoginPage }) => {
  const {
    login: { header, username, password, logIn, register },
    validation: { incorrectCredentials }
  } = texts;
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<LoginInputs>();
  const { login, isLoading, isError } = useLogin();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    login(data);
  };

  return (
    <>
      <h2 className={styles.header}>{header}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name={'username'} control={control} label={username} errors={errors}>
          <AccountCircle sx={{ mr: 1, my: 0.5 }} />
        </Input>
        <Input name={'password'} control={control} label={password} errors={errors} type={'password'}>
          <LockIcon sx={{ mr: 1, my: 0.5 }} />
        </Input>
        {!isLoading ? (
          <>
            <Button className={styles.btn} type={'submit'} variant="outlined">
              {logIn}
            </Button>
            <Button
              onClick={() => setIsLoginPage(false)}
              sx={{ marginBottom: '8px' }}
              variant="text"
              className={styles.btn}
            >
              {register}
            </Button>
          </>
        ) : (
          <PacmanLoaderWrapper />
        )}
      </form>
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
          <span>{incorrectCredentials}</span>
        </Box>
      )}
    </>
  );
};

export default LoginForm;
