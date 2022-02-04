import React, { createContext, useState } from 'react';
import * as Colyseus from 'colyseus.js/dist/colyseus';
import courseMap from '../../utils/courseMapper';

export type ReactPhaserProps = {
  chat: { setMessages: any };
  course: { selectCourse: (courseId: string) => void; exitCourse: () => void };
  colyseus: {
    onlinePlayers: any[];
    room: Promise<void | Colyseus.Room<unknown>>;
  };
  principal: { nick: string };
};

export interface IReactPhaserCommonsContext {
  isChatOpen: boolean;
  setIsChatOpen: (state: boolean) => void;
  isCourseOpen: boolean;
  setIsCourseOpen: (state: boolean) => void;
  selectedCourseName: string;
  setSelectedCourseName: (state: string) => void;
  selectCourse: (courseId: string) => void;
  exitCourse: () => void;
}

const ReactPhaserCommonsContext = createContext<IReactPhaserCommonsContext>({
  isChatOpen: false,
  setIsChatOpen: () => undefined,
  isCourseOpen: false,
  setIsCourseOpen: () => undefined,
  selectedCourseName: '',
  setSelectedCourseName: () => undefined,
  selectCourse: () => undefined,
  exitCourse: () => undefined
});

const ReactPhaserCommonsProvider: React.FC = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [isCourseOpen, setIsCourseOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const selectCourse = (courseId: string) => {
    // console.log('Get course from db and display in react');
    const dbCourseId = courseMap.get(courseId);
    if (dbCourseId) {
      setIsCourseOpen(true);
      setSelectedCourseId(dbCourseId);
    }
  };
  const exitCourse = () => {
    setIsCourseOpen(false);
  };

  return (
    <ReactPhaserCommonsContext.Provider
      value={{
        isChatOpen,
        setIsChatOpen,
        isCourseOpen,
        selectCourse,
        exitCourse,
        selectedCourseName: selectedCourseId,
        setIsCourseOpen,
        setSelectedCourseName: setSelectedCourseId
      }}
    >
      {children}
    </ReactPhaserCommonsContext.Provider>
  );
};

export const useReactPhaserCommons = () => React.useContext<IReactPhaserCommonsContext>(ReactPhaserCommonsContext);

export default ReactPhaserCommonsProvider;
