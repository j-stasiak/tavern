import { useState } from 'react';
import * as Colyseus from 'colyseus.js';

export type ReactPhaserProps = {
  chat: { setMessages: any };
  course: { selectCourse: (courseId: string) => void; exitCourse: () => void };
  colyseus: {
    onlinePlayers: any[];
    room: Promise<void | Colyseus.Room<unknown>>;
  };
  principal: { nick: string };
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
    setIsCourseOpen(false);
  };

  return { isChatOpen, setIsChatOpen, isCourseOpen, selectCourse, exitCourse, selectedCourseName };
};
