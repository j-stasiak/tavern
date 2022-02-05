import React, { CSSProperties } from 'react';
import { Fireworks } from 'fireworks-js/dist/react';

const FireworksWrapper: React.FC = () => {
  const options = {
    speed: 6
  };

  const style: CSSProperties = {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'fixed',
    background: 'transparent'
  };

  return <Fireworks options={options} style={style} />;
};

export default FireworksWrapper;
