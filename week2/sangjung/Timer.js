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

*/

import React, {forwardRef, useState} from 'react';
import PropTypes from 'prop-types';

import {Button, ButtonGroup} from 'react-bootstrap';

import TimerDisplay from './TimerDisplay'
import TimerErrorDisplay from './TimerErrorDisplay';
import './Timer.css';


const Timer = forwardRef((props,ref) => {
    const [timerIsRunning, _setTimerIsRunning] = useState(false);
    const [buttonAction, setButtonAction ] = useState();

    const setTimerIsRunning = (bool) => {
        setButtonAction('');
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
                    <TimerDisplay ref={ref} buttonAction={buttonAction} setTimerIsRunning = {setTimerIsRunning}/>
                </TimerErrorDisplay>
                <div className="timer-bottom">
                    <ButtonGroup className="mb-2 buttons">
                        <Button
                            onClick={()=>setButtonAction('START')}
                        >START</Button>
                        <Button
                            onClick={()=>setButtonAction('PAUSE')}
                        >PAUSE</Button>
                        <Button
                            onClick={()=>setButtonAction('STOP')}
                        >STOP</Button>
                        <Button
                            onClick={()=>setButtonAction('ERROR')}
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
});


Timer.propTypes = {
        timerIsRunning: PropTypes.bool,
}
Timer.defaultProps = {
        timerIsRunning: false
}
export default Timer;