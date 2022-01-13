import React, { useState } from 'react';
import Modal from 'react-modal';
import { useGlobalStates } from '../providers/globalStatesProvider/GlobalStatesProvider';
import styles from './LoginModal.module.scss';
import flex from '../../styles/flex.module.scss';
import classNames from 'classnames';
import { texts } from '../../texts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import Input from '../Form/Input/Input';
import { usePostLoginMutation } from '../../redux/authApi/loginApi';
import { io } from 'socket.io-client';
import ErrorIcon from '@mui/icons-material/Error';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { WS_ENDPOINT } from '../../endpoints';
import { useToken } from '../../hooks/useToken';

export type Inputs = {
  username: string;
  password: string;
};

type Socket = ReturnType<typeof io>;

const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen } = useGlobalStates();
  const { setToken } = useToken();
  const [, setSocket] = useState<Socket>();
  const {
    login: { header, username, password, logIn },
    validation: { incorrectCredentials }
  } = texts;
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const [triggerLogin, { isLoading, isError }] = usePostLoginMutation();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    triggerLogin({ ...data, email: 'email2@email.pl' })
      .unwrap()
      .then(({ access_token }) => {
        setIsLoginModalOpen(false);
        const newSocket = io(WS_ENDPOINT);
        setToken(access_token);
        setSocket(newSocket);
        navigate('/game');
      });
  };

  return (
    <Modal
      isOpen={isLoginModalOpen}
      className={classNames(styles.container, flex.flexColContainer, flex.justifyCenter)}
      overlayClassName={styles.overlay}
    >
      <h2 className={styles.header}>{header}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name={'username'} control={control} label={username} errors={errors}>
          <AccountCircle sx={{ mr: 1, my: 0.5 }} />
        </Input>
        <Input name={'password'} control={control} label={password} errors={errors} type={'password'}>
          <LockIcon sx={{ mr: 1, my: 0.5 }} />
        </Input>
        {!isLoading ? (
          <Button className={styles.btn} type={'submit'} variant="outlined">
            {logIn}
          </Button>
        ) : (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <PacmanLoader color={'#E1C391'} size={15} />
          </Box>
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
    </Modal>
  );
};

export default LoginModal;