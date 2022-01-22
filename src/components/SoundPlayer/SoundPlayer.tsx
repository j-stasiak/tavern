import React, { FunctionComponent, useState } from 'react';
import ReactHowler from 'react-howler';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';

const SoundPlayer: FunctionComponent = () => {
  const [isPlaying, setPlaying] = useState(false);
  return (
    <>
      <div onClick={() => setPlaying(!isPlaying)}>{isPlaying ? <MusicNoteIcon /> : <MusicOffIcon />}</div>
      <ReactHowler src="assets/audio/world.mp3" playing={isPlaying} loop={true} volume={0.3} />
    </>
  );
};

export default SoundPlayer;
