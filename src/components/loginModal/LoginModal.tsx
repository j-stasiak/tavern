import React, { useState } from 'react';
import Modal from 'react-modal';
import { useGlobalStates } from '../providers/globalStatesProvider/GlobalStatesProvider';
import styles from './LoginModal.module.scss';
import flex from '../../styles/flex.module.scss';
import classNames from 'classnames';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

export interface LoginInputs {
  username: string;
  password: string;
}

export interface RegisterInputs extends LoginInputs {
  email: string;
}

const StyledIcon = styled(CloseIcon)`
  align-self: end;
  position: absolute;
  top: 200px;
  color: red;
  cursor: pointer;
  font-size: 40px !important;
`;

const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen } = useGlobalStates();
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);

  return (
    <Modal
      isOpen={isLoginModalOpen}
      className={classNames(styles.container, flex.flexColContainer, flex.justifyCenter)}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <StyledIcon onClick={() => setIsLoginModalOpen(false)} />
      {isLoginPage ? <LoginForm setIsLoginPage={setIsLoginPage} /> : <RegisterForm setIsLoginPage={setIsLoginPage} />}
    </Modal>
  );
};

export default LoginModal;
