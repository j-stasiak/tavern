import { RouteEnum } from '../enums/RouteEnum';
import HowToStart from '../components/SideMenu/HowToStart/HowToStart';
import NavButtons from '../components/navbar/SideMenu/NavButtons/NavButtons';
import Project from '../components/SideMenu/Project/Project';
import AboutUs from '../components/SideMenu/AboutUs/AboutUs';
import Contact from '../components/SideMenu/Contact/Contact';

export const useRoutes = () => {
  const RoutesDictionary = new Map<RouteEnum, any>();
  RoutesDictionary.set(RouteEnum.HowToStart, HowToStart);
  RoutesDictionary.set(RouteEnum.Home, NavButtons);
  RoutesDictionary.set(RouteEnum.Project, Project);
  RoutesDictionary.set(RouteEnum.AboutUs, AboutUs);
  RoutesDictionary.set(RouteEnum.Contact, Contact);
  return { RoutesDictionary };
};
