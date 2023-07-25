import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const CountdownWrapper = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
`;

const CountdownDisplay = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
  button {
    margin-right: 10px;
    padding: 8px 16px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    background-color: #3498db;
    color: #fff;
    border: none;
  }
`;

const InputTime = styled.input`
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  text-align: center;
`;

const CountdownTimer = () => {
  const [time, setTime] = useState(0); // 타이머 시간(초)
  const [isRunning, setIsRunning] = useState(false); // 타이머 동작 여부

  const intervalRef = useRef(null);

  // 타이머 시작 함수
  const startTimer = () => {
    if (!isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      setIsRunning(true);
    }
  };

  // 타이머 정지 함수
  const stopTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  // 타이머 초기화 함수
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
  };

  return (
    <CountdownWrapper>
      <CountdownDisplay>남은 시간: {time}초</CountdownDisplay>
      <ButtonWrapper>
        <button onClick={startTimer} disabled={isRunning}>
          시작
        </button>
        <button onClick={stopTimer} disabled={!isRunning}>
          정지
        </button>
        <button onClick={resetTimer} disabled={isRunning}>
          초기화
        </button>
      </ButtonWrapper>
      <br />
      <InputTime
        type="number"
        value={time}
        onChange={(e) => setTime(parseInt(e.target.value))}
        disabled={isRunning}
      />
    </CountdownWrapper>
  );
};

export default CountdownTimer;
