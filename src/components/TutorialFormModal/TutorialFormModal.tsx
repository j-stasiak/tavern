import React from 'react';
import Modal from 'react-modal';
import { useGlobalStates } from '../providers/globalStatesProvider/GlobalStatesProvider';
import styles from './TutorialFormModal.module.scss';
import classNames from 'classnames';
import TutorialForm from './TutorialForm/TutorialForm';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

const StyledIcon = styled(CloseIcon)`
  align-self: end;
  position: absolute;
  top: 200px;
  color: red;
  cursor: pointer;
  font-size: 60px !important;
`;

const TutorialFormModal: React.FC = () => {
  const { isTutorialFormModalOpen, setTutorialFormModalOpen } = useGlobalStates();

  return (
    <Modal
      isOpen={isTutorialFormModalOpen}
      className={classNames(styles.container)}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <>
        {/*<StyledIcon onClick={() => setTutorialFormModalOpen(false)} />*/}
        <TutorialForm />
      </>
    </Modal>
  );
};

export default TutorialFormModal;
