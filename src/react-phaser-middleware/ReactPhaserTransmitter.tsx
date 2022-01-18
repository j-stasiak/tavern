import { useState } from 'react';

export type ReactPhaserProps = {
  chat: { openChat: () => void; closeChat: () => void };
  course: { selectCourse: (courseId: string) => void; exitCourse: () => void };
};

export const useReactPhaserCommons = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const selectCourse = (courseId: string) => {
    // console.log('Get course from db and display in react');
    setIsCourseOpen(true);
    setSelectedCourseName(courseId);
  };
  const exitCourse = () => {
    // console.log('Exitting course');
    setIsCourseOpen(false);
  };

  return { isChatOpen, setIsChatOpen, isCourseOpen, selectCourse, exitCourse, selectedCourseName };
};
