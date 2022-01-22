import React from 'react';
import Modal from 'react-modal';
import styles from './CourseModal.module.scss';
import flex from '../../styles/flex.module.scss';
import classNames from 'classnames';
import Course from './Course';
import { useReactPhaserCommons } from '../providers/ReactPhaserCommonsProvider';

const CourseModal: React.FC = () => {
  const { selectedCourseName, isCourseOpen } = useReactPhaserCommons();

  const courseMock = {
    answer: '<div>finito</div>',
    description: "Return <div>finito</div> to finish this course. That's a hard task..."
  };

  return (
    <Modal
      isOpen={isCourseOpen}
      className={classNames(styles.container, flex.flexColContainer, flex.justifyCenter)}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <Course course={courseMock} onExit={() => console.log('finito')} name={selectedCourseName} />
    </Modal>
  );
};

export default CourseModal;
