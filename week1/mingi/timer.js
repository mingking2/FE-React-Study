import { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    }

    if (seconds === 0) {
      clearInterval(interval);
    }

    return () => {
        clearInterval(interval);
    }
  }, [isActive, seconds]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(60);
  };

  return (
    <div>
      <div>{seconds} seconds</div>
      {!isActive ? (
        <button onClick={handleStart}>Start</button>
      ) : (
        <button onClick={handleReset}>Reset</button>
      )}
    </div>
  );
};

export default Timer;
