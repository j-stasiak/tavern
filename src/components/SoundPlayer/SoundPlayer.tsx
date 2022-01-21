import React, { FunctionComponent, useState } from 'react';
import ReactHowler from 'react-howler';

const SoundPlayer: FunctionComponent = () => {
  const [isPlaying, setPlaying] = useState(true);
  const text = isPlaying ? 'Nacisnij mnie to się uciszę' : 'Naciśnij mnie to ci zaśpiewam';
  return (
    <>
      <button onClick={() => setPlaying(!isPlaying)}>{text}</button>
      <ReactHowler src="assets/audio/aot.mp3" playing={isPlaying} loop={true} volume={0.1} />
    </>
  );
};

export default SoundPlayer;
