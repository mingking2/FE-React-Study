import { useState, useEffect } from "react";

// 함수형 컴포넌트
const Timer = () => {
  const [seconds, setSeconds] = useState(60); // 타이머 시작 시 60으로 설정
  const [timerActive, setTimerActive] = useState(false); // 타이머 on/off

  useEffect(() => {
    let intervalId = setInterval(() => {
      if (timerActive && seconds > 0) {
        setSeconds((seconds) => seconds - 1);
      }
    }, 1000);

    // timer off 상태이거나 0초면 return
    return () => clearInterval(intervalId);
  }, [timerActive, seconds]);

  const handleStart = () => {
    setTimerActive(true); // start -> timer on
  };

  const handleReset = () => {
    setTimerActive(false); // reset -> timer off
    setSeconds(60); // timer 초기화
  };

  return (
    <div>
      <h1>Week_1</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleReset}>Reset</button>
      <h2>{seconds}</h2>
    </div>
  );
};

export default Timer;
