import React from "react";
import useSound from "use-sound";
import "./soundPlayer.scss";

const SoundPlayer: React.FC = () => {
  const [play, { stop, isPlaying }] = useSound("sounds/mainTheme.mp3", {
    volume: 0.1,
  });
  return (
    <button onClick={() => (isPlaying ? stop() : play())}>
      <div className={"sound-button"}>{isPlaying ? "♪" : "Graj muzyko..."}</div>
    </button>
  );
};

export default SoundPlayer;
