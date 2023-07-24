import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Buttons from "./Button";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TimerInput = styled.h1`
  margin: 10px;
  font-size: 24px;
  input {
    font-size: 24px;
    padding: 2px;
    margin: 0 5px;
    width: 4rem;
    height: 40px;
    border: none;
    outline: none;
    font-size: 2rem;
    padding: 0;
    margin: 0;
    border-bottom: 2px solid black;
    background-color: transparent;
    outline: none;
    text-align: right;
  }
`;

const TimerDisplay = styled.h1`
  font-size: 32px;
`;

const Timer = () => {
  const [hours, hourTime] = useState(0);
  const [minutes, minTime] = useState(0);
  const [seconds, secTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [display, setDisplay] = useState(false);
  const timer = useRef(null);
  useEffect(() => {
    if (isRunning) {
      timer.current = setInterval(() => {
        if (seconds > 0) {
          secTime(seconds - 1);
        } else {
          if (minutes > 0) {
            minTime(minutes - 1);
            secTime(59);
          } else {
            if (hours > 0) {
              secTime(59);
              minTime(59);
              hourTime(hours - 1);
            }
          }
        }
      }, 1000);
    }

    return () => clearInterval(timer.current);
  }, [minutes, seconds, hours, isRunning]);

  const setH = (e) => {
    hourTime(e.target.value);
  };
  const setM = (e) => {
    minTime(e.target.value);
  };
  const setS = (e) => {
    secTime(e.target.value);
  };

  return (
    <Container>
      {display ? (
        <TimerDisplay>
          {hours < 10 ? `0${hours}` : hours} :{" "}
          {minutes < 10 ? `0${minutes}` : minutes} :{" "}
          {seconds < 10 ? `0${seconds}` : seconds}
        </TimerDisplay>
      ) : (
        <TimerInput>
          <input type="number" min="0" onChange={setH} value={hours} />:
          <input type="number" min="0" onChange={setM} value={minutes} />:
          <input type="number" min="0" onChange={setS} value={seconds} />
        </TimerInput>
      )}
      <div>
        <Buttons
          setIsRunning={setIsRunning}
          hourTime={hourTime}
          minTime={minTime}
          secTime={secTime}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          setDisplay={setDisplay}
        />
      </div>
    </Container>
  );
};

export default Timer;