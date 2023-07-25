/*
    Timer 컴포넌트.
    어떤 곳이든 적용 가능하게 만들었음.

    props에 setTimerIsRunning에 함수를 넣어줄 수 있다.
    인수로 타이머 상태를 bool 값으로 리턴한다.

    기능:
        분 : 초: 마이크로초
        초기 시간 1분
        start: 타이머 시작
        pause: 타이머 중지
        stop: 타이머 정지, 시간은 마지막 입려 값 또는 초기값으로 리셋
            * 만약 타이머가 0으로 종료되면 stop을 눌러도 초기값으로 리셋 안됨.
        입력: 숫자를 클릭하고 숫자키를 누르면 입력이 된다. 각각 99,59,99를 초과하면 값이 해당 값으로 고정된다. ex) 159 => 99
            백스페이스를 누르면 값이 우측부터 지워진다.

*/

import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Button, ButtonGroup} from 'react-bootstrap';

import TimerDisplay from './TimerDisplay'
import TimerErrorDisplay from './TimerErrorDisplay';
import './Timer.css';


const Timer = (props) => {
    const [isRunning, setIsRunning] = useState(false);
    const [clicked, setClicked] = useState(0); 

    //timer 상태를 state에 저장하는 함수
    const setTimerIsRunning = (bool) => {
        setIsRunning(bool);
        props.setIsRunning(bool);
        
    }

    //button 클릭 이벤트 핸들러
    const handleButton = (e) => {
        setClicked(e.target.name);
    }

    const circleClassName = isRunning ? "circle rotate-circle":"circle";

    return (
        <div className="timer-container">
            <div className="timer">
                <TimerErrorDisplay>
                    <TimerDisplay setTimerIsRunning = {setTimerIsRunning} clicked={clicked}/>
                </TimerErrorDisplay>
                <div className="timer-bottom">
                    <ButtonGroup className="mb-2 buttons">
                        <Button
                            name="START"
                            onClick={handleButton}
                        >START</Button>
                        <Button
                            name='PAUSE'
                            onClick={handleButton}
                        >PAUSE</Button>
                        <Button
                            name='STOP'
                            onClick={handleButton}
                        >STOP</Button>
                        <Button
                            name='ERROR'
                            onClick={handleButton}
                        >ERROR</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="circle-container">
                <div className={circleClassName}/>
            </div>
        </div>
    );
};


Timer.propTypes = {
    setIsRunning: PropTypes.func.isRequired,
}
export default Timer;