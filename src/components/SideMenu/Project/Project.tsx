import React, { HTMLAttributes } from 'react';
import withNavigation from '../../hocs/WithNavigation/withNavigation';

const Project: React.FC<HTMLAttributes<any>> = ({ className }) => {
  return (
    <div className={className}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat sed eros posuere dictum. In hac habitasse
    </div>
  );
};

export default withNavigation(Project);
