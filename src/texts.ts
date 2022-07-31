import { RouteEnum } from './enums/RouteEnum';

export const texts = {
  landingPage: {
    header: 'Future is here',
    description:
      'Learn coding as a part of fun, interactive, MMORPG-like game where you level up as you complete more tutorials!',
    button: 'Read more'
  },
  navBar: {
    logo: 'tavern',
    links: [
      { label: 'how to start', delay: 0.05, path: RouteEnum.HowToStart },
      { label: 'about us', delay: 0.1, path: RouteEnum.AboutUs },
      { label: 'project', delay: 0.15, path: RouteEnum.Project },
      { label: 'contact', delay: 0.2, path: RouteEnum.Contact }
    ],
    login: { label: 'log in', delay: 0.25 },
    logout: 'log out'
  },
  login: {
    header: 'Login',
    username: 'username',
    password: 'password',
    logIn: 'log in!',
    register: "Don't have an account?"
  },
  register: {
    header: 'New account',
    username: 'username',
    password: 'password',
    email: 'email',
    register: 'create account!',
    login: 'Already have an account?'
  },
  validation: {
    required: 'This field is required',
    incorrectCredentials: 'incorrect credentials!'
  },
  backToMenu: 'back to menu',
  course: {
    course: 'Course',
    description: 'Yours mission',
    typeHere: 'Type code here:',
    result: 'Your result:',
    comeBack: 'come back to game'
  },
  chat: {
    speak: 'No mówże!'
  }
};
