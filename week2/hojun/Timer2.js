import React, { useState, useRef } from 'react';

const Timer2 = () => {
    const [seconds, setSeconds] = useState(60);
    const [inputSecond, setInputSecond] = useState(60);
    const [timerActive, setTimerActive] = useState(false);
    const [error, setError] = useState(false);

    const intervalRef = useRef();

    const handleStart = () => {
        setTimerActive(true);
        setError(false);
        intervalRef.current = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 0) {
                    clearInterval(intervalRef.current);
                    setTimerActive(false);
                    setSeconds(inputSecond);
                    return prevSeconds;
                }
                else return prevSeconds - 1;
            });
        }, 1000);
    };

    const handleReset = () => {
        setTimerActive(false);
        setSeconds(inputSecond);
        clearInterval(intervalRef.current);
        setError(false);
    };

    const handleTimeChange = (event) => {
        const newTime = parseInt(event.target.value, 10);

        if (Number.isInteger(newTime) && newTime >= 0) {
            setSeconds(newTime);
            setInputSecond(newTime);
            setError(false);
        } else {
            if (Number.isNaN(newTime)) {
                setSeconds(0);
                setInputSecond('');
            }
            setError(true);
        }
    };

    return (
        <div>
            <h1>Week_2</h1>
            <h2>Timer: {seconds} seconds</h2>
            {error && <p>Please enter a valid positive integer for time.</p>}
            {!timerActive ?
                (
                    <div>
                        <input type="number" value={inputSecond} onChange={handleTimeChange} />
                        <button onClick={handleStart}>Start</button>
                    </div>
                )
                :
                (
                    <button onClick={handleReset}>Reset</button>
                )
            }
        </div>
    );
};

export default Timer2;
