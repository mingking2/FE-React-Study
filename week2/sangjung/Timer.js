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

import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';

import {Button, ButtonGroup} from 'react-bootstrap';

import TimerDisplay from './TimerDisplay'
import TimerErrorDisplay from './TimerErrorDisplay';
import './Timer.css';


const Timer = (props) => {
    const [timerIsRunning, _setTimerIsRunning] = useState(false);
    //자식 컴포넌트의 함수를 사용하기 위해 ref 선언
    const timerAction = useRef();

    //timer 상태를 state에 저장하는 함수
    const setTimerIsRunning = (bool) => {
        _setTimerIsRunning(bool);
        if (props.setTimerIsRunning){
            props.setTimerIsRunning(bool);
        }
    }

    const circleClassName = timerIsRunning ? "circle rotate-circle":"circle";

    return (
        <div className="timer-container">
            <div className="timer">
                <TimerErrorDisplay>
                    <TimerDisplay ref={timerAction} setTimerIsRunning = {setTimerIsRunning}/>
                </TimerErrorDisplay>
                <div className="timer-bottom">
                    <ButtonGroup className="mb-2 buttons">
                        <Button
                            onClick={()=>timerAction.current.startTimer()}
                        >START</Button>
                        <Button
                            onClick={()=>timerAction?.current?.pauseTimer()}
                        >PAUSE</Button>
                        <Button
                            onClick={()=>timerAction?.current?.stopTimer()}
                        >STOP</Button>
                        <Button
                            onClick={()=>timerAction?.current?.causeError()}
                        >ERROR</Button>
                    </ButtonGroup>
                </div>
            </div>
            <div className="circle-container">
                <div className={circleClassName}>

                </div>
            </div>
        </div>
    );
};


Timer.propTypes = {
    setTimerIsRunning: PropTypes.func.isRequired,
}
export default Timer;