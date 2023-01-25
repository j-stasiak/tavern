import React from 'react';
import Modal from 'react-modal';
import { useGlobalStates } from '../providers/globalStatesProvider/GlobalStatesProvider';
import styles from './TutorialFormModal.module.scss';
import classNames from 'classnames';
import TutorialForm from './TutorialForm/TutorialForm';

const TutorialFormModal: React.FC = () => {
  const { isTutorialFormModalOpen } = useGlobalStates();

  return (
    <Modal
      isOpen={isTutorialFormModalOpen}
      className={classNames(styles.container)}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <>
        <TutorialForm />
      </>
    </Modal>
  );
};

export default TutorialFormModal;
