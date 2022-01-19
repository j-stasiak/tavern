import React, { HTMLAttributes } from 'react';
import withNavigation from '../../hocs/WithNavigation/withNavigation';

const HowToStart: React.FC<HTMLAttributes<any>> = ({ className }) => {
  return <div className={className}>how to start</div>;
};

export default withNavigation(HowToStart);
