import React, { HTMLAttributes } from 'react';
import withNavigation from '../../hocs/WithNavigation/withNavigation';

const Project: React.FC<HTMLAttributes<any>> = ({ className }) => {
  return (
    <div className={className}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consequat sed eros posuere dictum. In hac habitasse
      platea dictumst. Ut non lacus venenatis, faucibus turpis at, consectetur tellus. Donec porta lacus vestibulum
      molestie euismod. Aenean bibendum mattis justo sit amet convallis. Pellentesque habitant morbi tristique senectus
      et netus et malesuada fames ac turpis egestas. Ut blandit ex in fermentum pharetra. Fusce lacus quam, finibus ac
      dolor vitae, rutrum malesuada nunc. Cras consectetur, urna aliquam ornare pulvinar, purus arcu iaculis justo, id
      posuere purus est vulputate sapien. Sed hendrerit venenatis tellus eu facilisis. Etiam tellus turpis, pulvinar ac
      varius non, varius quis nibh. Vivamus vitae euismod lectus. Vestibulum ac lacus mi. Proin orci lectus, varius in
      libero vel, rutrum venenatis nisi. Curabitur ultrices condimentum lacus vulputate congue.
    </div>
  );
};

export default withNavigation(Project);
