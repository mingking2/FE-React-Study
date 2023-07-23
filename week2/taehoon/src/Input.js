import React from "react";
import styled from "styled-components";
 
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

const Input = ({ setStyle, hourRef, minuteRef, secondRef, onClickStart }) => {
  return (
    <div>
      <TimerInput style={setStyle}>
        <input type="number" min="0" ref={hourRef} />:
        <input type="number" min="0" ref={minuteRef} />:
        <input type="number" min="0" ref={secondRef} />
      </TimerInput>
    </div>
  );
};

export default Input;