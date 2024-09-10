import { useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  let timeInterval = useRef(null);

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);

    timeInterval.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 10);
  };

  const handleStop = () => {
    if (!isRunning) return;
    setIsRunning(false);
    clearInterval(timeInterval.current);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(timeInterval.current);
    setTimer(0);
  };

  function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const milliseconds = (ms % 1000).toString().padStart(3, "0");

    return { hours, minutes, seconds, milliseconds };
  }

  const { hours, minutes, seconds, milliseconds } = formatTime(timer);
  return (
    <div>
      <h1>Stopwatch</h1>
      <p>
        Time: {hours}:{minutes}:{seconds}:{milliseconds}
      </p>
      <button onClick={isRunning ? handleStop : handleStart}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
