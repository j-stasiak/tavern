import React from 'react';
import Modal from 'react-modal';
import { useGlobalStates } from '../providers/globalStatesProvider/GlobalStatesProvider';
import styles from './LoginModal.module.scss';
import flex from '../../styles/flex.module.scss';
import classNames from 'classnames';
import { texts } from '../../texts';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import Input from '../Form/Input/Input';

type Inputs = {
  username: string;
  password: string;
};

const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen } = useGlobalStates();
  const { header, username, password } = texts.login;
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoginModalOpen(false);
    navigate('/game');
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
        <Button className={styles.btn} type={'submit'} variant="outlined">
          log in!
        </Button>
      </form>
    </Modal>
  );
};

export default LoginModal;
