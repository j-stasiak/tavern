import { RouteEnum } from './enums/RouteEnum';

export const texts = {
  landingPage: {
    header: 'Future is here',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium illum tenetur consequatur veritatis?',
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
    logIn: 'log in!'
  },
  validation: {
    required: 'This field is required',
    incorrectCredentials: 'incorrect credentials!'
  },
  backToMenu: 'back to menu'
};
