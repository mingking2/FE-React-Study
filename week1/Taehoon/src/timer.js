import React, { useState, useEffect, useRef } from "react";

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

`;

const Button = styled.button`
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
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
    border: none;
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
  const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);
  const displayRef = useRef(null);
  const setRef = useRef(null);
  const setStyle = {
    display: display ? "none" : "block",
  };
  const disStyle = {
    display: display ? "block" : "none",
  };
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
    if (!hourRef.current.value || !minuteRef.current.value || !secondRef.current.value) {
      alert('시간, 분, 초를 모두 입력해주세요.');
      return;
    }
    hourTime(hourRef.current.value);
    minTime(minuteRef.current.value);
    secTime(secondRef.current.value);
    setIsRunning(true);
    setDisplay(true);
  };

  const onClickPause = () => {
    hourRef.current.value = hours;
    minuteRef.current.value = minutes;
    secondRef.current.value = seconds;
    setIsRunning(false);
  }
  const onClickReset = () => {
    hourRef.current.value = 0;
    minuteRef.current.value = 0;
    secondRef.current.value = 0;
    setIsRunning(false);
    setDisplay(false);
  };
  return (
<Container>
      <TimerInput ref={setRef} style={setStyle}>
        <input type="number" min="0" ref={hourRef} />:
        <input type="number" min="0" ref={minuteRef} />:
        <input type="number" min="0" ref={secondRef} />
      </TimerInput>
      <TimerDisplay ref={displayRef} style={disStyle}>
        {hours < 10 ? `0${hours}` : hours} :{" "}
        {minutes < 10 ? `0${minutes}` : minutes} :{" "}
        {seconds < 10 ? `0${seconds}` : seconds}
      </TimerDisplay>
      <Button onClick={onClickStart}>시작</Button>
      <Button onClick={onClickPause}>일시정지</Button>
      <Button onClick={onClickReset}>초기화</Button>

    </Container>
  );
};
export default Timer;
