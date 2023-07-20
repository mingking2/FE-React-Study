import {Component} from 'react';
import PropTypes from 'prop-types';

import {Row, Col} from 'react-bootstrap';

import './TimerDisplay.css';

class TimerDisplay extends Component {

    state = {
        inputTime: {min:1, sec:0,microSec:0},
        time: {min:1, sec:0,microSec:0},
        timer: null,
        error: false
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
    startTimer = () =>{
        if(!this.state.timer && (this.state.time.min !== 0 || this.state.time.sec !== 0 || this.state.time.microSec || 0)){
            const newTimer = setInterval(() =>{
                this.setState((preyState) => {
                    if(preyState.time.microSec <= 0){
                        if(preyState.time.sec <= 0){
                            if(preyState.time.min <= 0){
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
                },
                ()=>{
                    this.setState((preyState) => {
                        if (preyState.time.sec === 0 && preyState.time.min === 0 && preyState.time.microSec === 0){
                            this.props.setTimerIsRunning(false);
                            return {timer: clearInterval(newTimer)};
                        }
                    })
                }
                );
            }, 10);
            this.props.setTimerIsRunning(true);
            this.setState({timer:newTimer});
        }
    }
    //타이머 일시 중지
    pauseTimer = () => {
        this.props.setTimerIsRunning(false);
        this.setState({timer:clearInterval(this.state.timer)});
    }

    //타이머 중지 시간 입력값으로 초기화
    stopTimer = () => {
        this.pauseTimer();
        this.setState({time:{...this.state.inputTime}});
    }

    causeError = () => {
        this.setState({error:true});
    }


    render(){
        const min = this.state.time.min.toString().padStart(2, '0');
        const sec = this.state.time.sec.toString().padStart(2, '0');
        const microSec = this.state.time.microSec.toString().padStart(2, '0');
        const errorTag = this.state.error ? this.props.asdf.value : <></>;

        return (
            <Row  className="justify-content-md-center input-text-groups">
                {errorTag}
                <Col md="auto">
                    <input 
                        name="min" 
                        value={min} 
                        onClick={this.pauseTimer}
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
                        onClick={this.pauseTimer}
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
                        onClick={this.pauseTimer}
                        onChange={()=>{}} 
                        onKeyDown={this.handleInputText}
                        className="input-text"
                    />
                </Col>
            </Row>
        );
    }
}

TimerDisplay.propTypes = {
    time: PropTypes.shape({min:PropTypes.number.isRequired, sec:PropTypes.number.isRequired, microSec:PropTypes.number.isRequired}).isRequired,
    inputTime: PropTypes.shape({min:PropTypes.number.isRequired, sec:PropTypes.number.isRequired, microSec:PropTypes.number.isRequired}).isRequired,
    timer: PropTypes.object,
    error: PropTypes.bool
}
TimerDisplay.defaultProps = {
    inputTime: {min:1, sec:0,microSec:0},
    time: {min:1, sec:0,microSec:0},
    timer: null,
    error: false
}

export default TimerDisplay;