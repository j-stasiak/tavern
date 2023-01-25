import { Course } from '../models/Course';

const TOKEN_KEY = 'token';

const removeToken = () => sessionStorage.removeItem(TOKEN_KEY);
const setToken = (token: string) => sessionStorage.setItem(TOKEN_KEY, token);
const getToken = (): string => sessionStorage.getItem(TOKEN_KEY)!;

export interface CompletedTutorial {
  id: string;
  user: User;
  tutorial: Course;
  isFinished: boolean;
  finishedSteps: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  username: string;
  isActive: boolean;
  role: string;
  completedTutorials: CompletedTutorial[];
}

export interface UserInfo {
  id: string;
  level: number;
  experience: number;
  experienceToNextLevel: number;
  rank: string;
  reputation: number;
}

export interface TokenInfo {
  sub: string;
  username: string;
  email: string;
  info: UserInfo;
  completedTutorials: string[];
  role: string;
  iat: number;
}

const useToken = () => {
  const token = getToken();
  return {
    token,
    getToken,
    setToken,
    removeToken
  };
};

export default useToken;
