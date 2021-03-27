import React from "react";
import useSound from "use-sound";
import "./soundPlayer.scss";

const SoundPlayer: React.FC = () => {
  const [play, { stop, isPlaying }] = useSound("sounds/mainTheme.mp3", {
    volume: 0.1,
  });
  return (
    <div
      className={"music-button"}
      onClick={() => (isPlaying ? stop() : play())}
    >
      {isPlaying ? (
        <span className="material-icons">music_note</span>
      ) : (
        <span className="material-icons">music_off</span>
      )}
    </div>
  );
};

export default SoundPlayer;
