import React, { useState } from 'react';
import Modal from 'react-modal';
import { useGlobalStates } from '../providers/globalStatesProvider/GlobalStatesProvider';
import styles from './LoginModal.module.scss';
import flex from '../../styles/flex.module.scss';
import classNames from 'classnames';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';

export interface LoginInputs {
  username: string;
  password: string;
}

export interface RegisterInputs extends LoginInputs {
  email: string;
}

const LoginModal: React.FC = () => {
  const { isLoginModalOpen } = useGlobalStates();
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);

  return (
    <Modal
      isOpen={isLoginModalOpen}
      className={classNames(styles.container, flex.flexColContainer, flex.justifyCenter)}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      {isLoginPage ? <LoginForm setIsLoginPage={setIsLoginPage} /> : <RegisterForm setIsLoginPage={setIsLoginPage} />}
    </Modal>
  );
};

export default LoginModal;
