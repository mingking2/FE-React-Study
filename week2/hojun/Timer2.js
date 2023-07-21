import React, { useState, useRef, useEffect } from 'react';

import { AiOutlinePlayCircle, AiOutlineReload } from 'react-icons/ai';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';

import styled from 'styled-components';

const Timer2 = () => {
    const [seconds, setSeconds] = useState(60);
    const [inputSecond, setInputSecond] = useState(60);
    const [timerActive, setTimerActive] = useState(false);
    const [error, setError] = useState(false);

    const intervalRef = useRef();

    const handleStart = () => {
        setTimerActive(true);
        setError(false);
        toast.success('Timer started!');
    };

    const handleReset = () => {
        setTimerActive(false);
        setSeconds(inputSecond);
        setError(false);
        toast.info('Timer reset!');
    };

    useEffect(() => {
        if (timerActive) {
            intervalRef.current = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 0) {
                        clearInterval(intervalRef.current);
                        setTimerActive(false);
                        toast.warn('Timer finished!');
                        return inputSecond;
                    }
                    else return prevSeconds - 1;
                });
            }, 1000);
        } else clearInterval(intervalRef.current);

        return () => clearInterval(intervalRef.current);
    }, [timerActive, inputSecond]);

    const handleTimeChange = (event) => {
        const newTime = parseInt(event.target.value, 10);

        if (Number.isInteger(newTime) && newTime >= 0) {
            setSeconds(newTime);
            setInputSecond(newTime);
            setError(false);
        } else {
            if (Number.isNaN(newTime)) {
                setInputSecond('');
                setSeconds(0);
            }
            setError(true);
        }
    };

    return (
        <Container>
            <h1>Week_2</h1>
            <h2>Timer: {seconds} seconds</h2>
            <StyledProgress
                type="circle"
                width={70}
                percent={(seconds / inputSecond * 100).toFixed()}
            />
            <ErrorMessage>{error && 'Please enter a valid positive integer for time.'}</ErrorMessage>
            {!timerActive ? (
                <InputContainer>
                    <input type="number" value={inputSecond} onChange={handleTimeChange} />
                    <StartButton onClick={handleStart}>
                        <AiOutlinePlayCircle /> Start
                    </StartButton>
                </InputContainer>
            ) : (
                <ResetButton onClick={handleReset}>
                    <AiOutlineReload /> Reset
                </ResetButton>
            )}
            <ToastContainer position="bottom-right" />
        </Container>
    );
};

export default Timer2;

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const StyledProgress = styled(Progress)`
  margin: 30px auto;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const StartButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;

const ResetButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;
