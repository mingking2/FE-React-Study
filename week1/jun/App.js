import { useRef, useState } from "react";

const INIT_TIME = 3600; // 1시간 (= 3600s)
const HOUR_UNIT = 3600; // 1시간 간격 (= 3600s)
const MIN_UNIT = 60;    // 1분 간격 (= 60s)

const App = () => {
  const [curTime, setCurTime] = useState(INIT_TIME);
  const timer = useRef(null);

  const startTimerHandler = () => {
    if (timer.current) return;

    timer.current = setInterval(() => {
      setCurTime((prevTime) => {
        if (prevTime < 1) {
          stopTimerHandler();
          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);
  };
  const stopTimerHandler = () => {
    clearInterval(timer.current);
    timer.current = null;
  };
  const resetTimerHandler = () => {
    stopTimerHandler();
    setCurTime(INIT_TIME);
  };

  const renderedTimer =
    `${String(Math.floor(curTime / HOUR_UNIT)).padStart(2, 0)}:
     ${String(Math.floor(curTime / MIN_UNIT) % MIN_UNIT).padStart(2, 0)}:
     ${String(curTime % MIN_UNIT).padStart(2, 0)}`;

  return (
    <div>
      <h2>Timer</h2>
      <p>{renderedTimer}</p>
      <div>
        <button onClick={startTimerHandler}>Start</button>
        <button onClick={stopTimerHandler}>Stop</button>
        <button onClick={resetTimerHandler}>Reset</button>
      </div>
    </div>
  );
};

export default App;
