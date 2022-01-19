import React from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { RoutesDictionary } from '../../../constants/RoutesDictionary';

const SideMenu: React.FC = () => {
  const path = useAppSelector((state) => state.sideMenu.path);
  const Route = RoutesDictionary.get(path);
  return <Route />;
};

export default SideMenu;
