import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
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

const Buttons = ({
  setIsRunning,
  hours,
  minutes,
  seconds,
  setDisplay,
}) => {
  const onClickStart = () => {
    setIsRunning(true);
    setDisplay(true);
    try {
      if (minutes > 59 || seconds > 59 || hours > 99) {
        console.log(hours);
        throw new Error("올바른 범위의 수를 입력하세요");
      }
      if (hours < 0 || minutes < 0 || seconds < 0) {
        throw new Error("양수를 입력하세요");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const onClickPause = () => {
    setIsRunning(false);
  };

  const onClickReset = () => {
    setIsRunning(false);
    setDisplay(false);
  };

  return (
    <Container>
      <div>
        <Button onClick={onClickStart}>시작</Button>
        <Button onClick={onClickPause}>일시정지</Button>
        <Button onClick={onClickReset}>초기화</Button>
      </div>
    </Container>
  );
};

export default Buttons;
