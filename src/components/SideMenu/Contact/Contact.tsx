import React, { HTMLAttributes } from 'react';
import withNavigation from '../../hocs/WithNavigation/withNavigation';

const Contact: React.FC<HTMLAttributes<any>> = ({ className }) => {
  return <div className={className}>contact</div>;
};

export default withNavigation(Contact);
