import React from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
import { useRoutes } from '../../../hooks/useRoutes';

const SideMenu: React.FC = () => {
  const path = useAppSelector((state) => state.sideMenu.path);
  const { RoutesDictionary } = useRoutes();
  const Route = RoutesDictionary.get(path);
  return <Route />;
};

export default SideMenu;
