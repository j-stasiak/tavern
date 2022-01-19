import React, { HTMLAttributes } from 'react';
import withNavigation from '../../hocs/WithNavigation/withNavigation';

const AboutUs: React.FC<HTMLAttributes<any>> = ({ className }) => {
  return <div className={className}>elo to my</div>;
};

export default withNavigation(AboutUs);
