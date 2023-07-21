import { useState, useEffect } from "react";

const Timer = () => {
  const [minutes, minTime] = useState(1);
  const [seconds, secTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (seconds > 0) {
          secTime(seconds - 1);
        } else {
          if (minutes > 0) {
            minTime(minutes - 1);
            secTime(59);
          }
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [minutes, seconds, isRunning]);

  const onClickStart = () => {
    setIsRunning(true);
  };

  const onClickPause = () => setIsRunning(false);
  const onClickEnter = () => {
    minTime(1);
    secTime(0);
    setIsRunning(false);
  };
  return (
    <div>
      <button onClick={onClickStart}>시작</button>
      <button onClick={onClickPause}>일시정지</button>
      <button onClick={onClickEnter}>리셋</button>
      <h1>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
    </div>
  );
};
export default Timer;
