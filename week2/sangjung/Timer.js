/*
    Timer 컴포넌트.
    어떤 곳이든 적용 가능하게 만들었음.

    기능:
        분 : 초: 마이크로초
        초기 시간 1분
        start: 타이머 시작
        pause: 타이머 중지
        stop: 타이머 정지, 시간은 마지막 입려 값 또는 초기값으로 리셋
            * 만약 타이머가 0으로 종료되면 stop을 눌러도 초기값으로 리셋 안됨.
*/

import {Component} from 'react';
import PropTypes from 'prop-types';

import {Button, ButtonGroup, Row, Col} from 'react-bootstrap';

import './Timer.css';


class Timer extends Component {

    state = {
        inputTime: {min:1, sec:0,microSec:0},
        time: {min:1, sec:0,microSec:0},
        timer: null
    };

    //인풋 태그 입력시 숫자만 입력 받게
    handleInputText = (e) => {
        const key = e.key;
        const name = e.target.name;

        if (key === "Backspace") {
            const time = Math.floor(this.state.time[name] / 10);
            const obj = {...this.state.time}
            obj[name] = time;
            this.setState({time: obj });
            this.setState({inputTime: obj});
        }else if(key.match(/^\d$/g)){
            let temp = Number(this.state.time[name] + key);
            if(name === 'sec' && temp > 60){
                temp = 59;
            }else if(temp > 99){
                temp = 99;
            }
            const obj = {...this.state.time}
            obj[name] = temp;
            this.setState({time: obj });
            this.setState({inputTime: obj});
        }
    }

    //타이머 시작
    handleStartButton = () =>{
        if(!this.state.timer && (this.state.time.min !== 0 || this.state.time.sec !== 0 || this.state.time.microSec || 0)){
            const newTimer = setInterval(() =>{
                this.setState((preyState) => {
                    if(preyState.time.microSec <= 0){
                        if(preyState.time.sec <= 0){
                            if(preyState.time.min <= 0){
                                this.setState({inputTime: {
                                    min:0,
                                    sec:0,
                                    microSec: 0
                                }
                                });
                                this.handlePauseButton();
                                return {time:{
                                    min:0,
                                    sec:0,
                                    microSec: 0
                                }};
                            }else{
                                return {time:{
                                    min:preyState.time.min - 1,
                                    sec:59,
                                    microSec: 99
                                }};
                            }
                        }else{
                            return {time:{
                                ...preyState.time,
                                sec: preyState.time.sec -1,
                                microSec: 99
                            }};
                        }
                    }else{
                        return {time:{
                            ...preyState.time,
                            microSec: preyState.time.microSec -1
                        }};
                    }
                });
            }, 10);
            this.props.timerAction(true);
            this.setState({timer:newTimer});
        }
    }
    
    //타이머 일시 중지
    handlePauseButton = () => {
        this.props.timerAction(false);
        this.setState({timer:clearInterval(this.state.timer)});
    }

    //타이머 중지 시간 입력값으로 초기화
    handleStopButton = () => {
        this.handlePauseButton();
        this.setState({time:{...this.state.inputTime}});
    }


    render(){
        const min = this.state.time.min.toString().padStart(2, '0');
        const sec = this.state.time.sec.toString().padStart(2, '0');
        const microSec = this.state.time.microSec.toString().padStart(2, '0');
        const working = this.state.timer? "circle rotate-circle":"circle";


        return (
            <div className="timer-container">
                <div className="timer">
                    <Row  className="justify-content-md-center input-text-groups">
                        <Col md="auto">
                            <input 
                                name="min" 
                                value={min} 
                                onClick={this.handlePauseButton}
                                onChange={()=>{}} 
                                onKeyDown={this.handleInputText}
                                className="input-text"
                            />
                        </Col>
                        <Col md="auto">
                            <span>:</span>
                        </Col>
                        <Col md="auto">
                            <input 
                                name="sec" 
                                value={sec} 
                                onClick={this.handlePauseButton}
                                onChange={()=>{}} 
                                onKeyDown={this.handleInputText}
                                className="input-text"
                            />
                        </Col>
                        <Col md="auto">
                            <span>:</span>
                        </Col>
                        <Col md="auto">
                            <input 
                                name="microSec" 
                                value={microSec} 
                                onClick={this.handlePauseButton}
                                onChange={()=>{}} 
                                onKeyDown={this.handleInputText}
                                className="input-text"
                            />
                        </Col>
                    </Row>
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
                        </ButtonGroup>
                    </div>
                </div>
                <div className="circle-container">
                    <div className={working}>

                    </div>
                </div>
            </div>
        );
    }
}

Timer.propTypes = {
    time: PropTypes.shape({min:PropTypes.number.isRequired, sec:PropTypes.number.isRequired, microSec:PropTypes.number.isRequired}).isRequired,
    inputTime: PropTypes.shape({min:PropTypes.number.isRequired, sec:PropTypes.number.isRequired, microSec:PropTypes.number.isRequired}).isRequired,
    timer: PropTypes.object
}
Timer.defaultProps = {
    inputTime: {min:1, sec:0,microSec:0},
    time: {min:1, sec:0,microSec:0},
    timer: null
}

export default Timer;