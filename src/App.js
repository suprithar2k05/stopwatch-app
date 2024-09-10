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

  function formatTime(time) {
    // Hours calculation
    const hours = Math.floor(time / 360000);

    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);

    // Milliseconds calculation
    const milliseconds = time % 100;
    return { hours, minutes, seconds, milliseconds };
  }

  const { hours, minutes, seconds, milliseconds } = formatTime(timer);
  return (
    <div>
      <h1>Stopwatch</h1>
      {/* <p>
        Time:
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p> */}

      <p>
        Time: {minutes}:{seconds.toString().padStart(2, "0")}
      </p>
      <button onClick={isRunning ? handleStop : handleStart}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
