import React from 'react';
import { texts } from '../../../texts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterInputs } from '../LoginModal';
import { usePostRegisterMutation } from '../../../redux/authApi/authApi';
import styles from '../LoginModal.module.scss';
import Input from '../../Form/Input/Input';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Button } from '@mui/material';
import PacmanLoaderWrapper from '../../PacmanLoaderWrapper/PacmanLoaderWrapper';
import ErrorIcon from '@mui/icons-material/Error';
import EmailIcon from '@mui/icons-material/Email';
import { useLogin } from '../../../hooks/useLogin';

interface Props {
  setIsLoginPage: (state: boolean) => void;
}

const RegisterForm: React.FC<Props> = ({ setIsLoginPage }) => {
  const {
    register: { header, username, password, email, register, login: loginLabel },
    validation: { incorrectCredentials }
  } = texts;
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<RegisterInputs>();
  const { login } = useLogin();
  const [triggerRegister, { isLoading: isRegisterLoading, isError: isRegisterError }] = usePostRegisterMutation();

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    triggerRegister(data)
      .unwrap()
      .then(() => {
        setIsLoginPage(true);
        login({ username: data.username, password: data.password });
      });
  };

  return (
    <>
      <h2 className={styles.header}>{header}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name={'username'} control={control} label={username} errors={errors}>
          <AccountCircle sx={{ mr: 1, my: 0.5 }} />
        </Input>
        <Input name={'email'} control={control} label={email} errors={errors}>
          <EmailIcon sx={{ mr: 1, my: 0.5 }} />
        </Input>
        <Input name={'password'} control={control} label={password} errors={errors} type={'password'}>
          <LockIcon sx={{ mr: 1, my: 0.5 }} />
        </Input>
        {!isRegisterLoading ? (
          <>
            <Button className={styles.btn} type={'submit'} variant="outlined">
              {register}
            </Button>
            <Button
              onClick={() => setIsLoginPage(true)}
              sx={{ marginBottom: '8px' }}
              variant="text"
              className={styles.btn}
            >
              {loginLabel}
            </Button>
          </>
        ) : (
          <PacmanLoaderWrapper />
        )}
      </form>
      {isRegisterError && (
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
          <span>{'Something went wrong :('}</span>
        </Box>
      )}
    </>
  );
};

export default RegisterForm;
