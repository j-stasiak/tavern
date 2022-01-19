import React, { FunctionComponent } from 'react';
import ReactHowler from 'react-howler';

const SoundPlayer: FunctionComponent = () => {
  return (
    <>
      <ReactHowler src="assets/audio/world.mp3" playing={true} loop={true} volume={0.3} />
    </>
  );
};

export default SoundPlayer;
