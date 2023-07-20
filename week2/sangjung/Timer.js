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

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Button, ButtonGroup} from 'react-bootstrap';

import TimerDisplay from './TimerDisplay'
import TimerErrorDisplay from './TimerErrorDisplay';
import './Timer.css';


class Timer extends Component {
    state = {
        timerIsRunning: false
    }

    timerDisplay = new React.createRef();

    handleStartButton = () => {
        this.timerDisplay.startTimer();
    }

    handlePauseButton = () => {
        this.timerDisplay.pauseTimer();
        
    }

    handleStopButton = () => {
        this.timerDisplay.stopTimer();
    }

    handleErrorButton = () =>{
        this.timerDisplay.causeError();
    }

    setTimerIsRunning = (bool) => {
        this.setState({timerIsRunning: bool});
        if (this.props.setTimerIsRunning){
            this.props.setTimerIsRunning(bool);
        }
    }
    render(){
        const circleClassName = this.state.timerIsRunning ? "circle rotate-circle":"circle";

        return (
            <div className="timer-container">
                <div className="timer">
                    <TimerErrorDisplay>
                        <TimerDisplay ref={(ref)=> this.timerDisplay = ref} setTimerIsRunning = {this.setTimerIsRunning}/>
                    </TimerErrorDisplay>
                    <div className="timer-bottom">
                        <ButtonGroup className="mb-2 buttons">
                            <Button
                                onClick={this.handleStartButton}
                            >START</Button>
                            <Button
                                onClick={this.handlePauseButton}
                            >PAUSE</Button>
                            <Button
                                onClick={this.handleStopButton}
                            >STOP</Button>
                            <Button
                                onClick={this.handleErrorButton}
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
    }
}


TimerDisplay.propTypes = {
        timerIsRunning: PropTypes.bool,
}
TimerDisplay.defaultProps = {
        timerIsRunning: false
}
export default Timer;