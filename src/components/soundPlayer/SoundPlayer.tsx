import useSound from "use-sound";

const SoundPlayer = () => {
  const [play, { stop, isPlaying }] = useSound("sounds/mainTheme.mp3", {
    volume: 0.1,
  });
  return (
    <button onClick={() => (isPlaying ? stop() : play())}>
      {isPlaying ? "♪" : "Graj muzyko..."}
    </button>
  );
};

export default SoundPlayer;
