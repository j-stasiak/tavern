import {
  ABOUT_US_ROUTE,
  CONTACT_ROUTE,
  HOME_ROUTE,
  HOW_TO_START_ROUTE,
  NEWS_ROUTE,
  PROJECT_ROUTE
} from './constants/routes';

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
      { label: 'home page', delay: 0.05 },
      { label: 'about us', delay: 0.1 },
      { label: 'project', delay: 0.15 },
      { label: 'contact', delay: 0.2 }
    ],
    login: { label: 'log in', delay: 0.25 }
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
  gameNavbar: [
    { label: 'home', link: HOME_ROUTE },
    { label: 'project', link: PROJECT_ROUTE },
    { label: 'how to start', link: HOW_TO_START_ROUTE },
    { label: 'about us', link: ABOUT_US_ROUTE },
    { label: 'news', link: NEWS_ROUTE },
    { label: 'contact', link: CONTACT_ROUTE }
  ]
};
