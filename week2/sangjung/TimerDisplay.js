import {useState, useEffect, forwardRef} from 'react';
import PropTypes from 'prop-types';

import {Row, Col} from 'react-bootstrap';

import './TimerDisplay.css';

const TimerDisplay = forwardRef((props,ref) => {
    const [inputTime, setInputTime] = useState({min:1, sec:0,microSec:0});
    const [time,setTime] = useState({min:1, sec:0,microSec:0});
    const [timer,setTimer] = useState();
    const [error, setError] = useState(false);

    const min = time.min.toString().padStart(2, '0');
    const sec = time.sec.toString().padStart(2, '0');
    const microSec = time.microSec.toString().padStart(2, '0');
    const errorTag = error ? props.asdf.value : <></>;

    useEffect(() => {
        switch (props.buttonAction) {
            case 'START':
                startTimer();
                break;
            case 'STOP':
                stopTimer();
                break;
            case 'PAUSE':
                pauseTimer();
                break;
            case 'ERROR': 
                causeError();
                break;
            default:
                break;
        }
    });

    //인풋 태그 입력시 숫자만 입력 받게
    const handleInputText = (e) => {
        const key = e.key;
        const name = e.target.name;

        if (key === "Backspace") {
            const _time = Math.floor(time[name] / 10);
            const obj = {...time}
            obj[name] = _time;
            setTime(obj);
            setInputTime(obj);
        }else if(key.match(/^\d$/g)){
            let temp = Number(time[name] + key);
            if(name === 'sec' && temp > 60){
                temp = 59;
            }else if(temp > 99){
                temp = 99;
            }
            const obj = {...time}
            obj[name] = temp;
            setTime(obj);
            setInputTime(obj);
        }
    }

    //타이머 시작
    const startTimer = () =>{
        if(!timer && (time.min !== 0 || time.sec !== 0 || time.microSec || 0)){
            const newTimer = setInterval(() =>{
                setTime((preyTime) => {
                    if(preyTime.microSec <= 0){
                        if(preyTime.sec <= 0){
                            if(preyTime.min <= 0){
                                props.setTimerIsRunning(false);
                                setInputTime({
                                    min:0,
                                    sec:0,
                                    microSec: 0
                                });
                                setTimer(clearInterval(newTimer));
                                return {
                                    min:0,
                                    sec:0,
                                    microSec: 0
                                };
                            }else{
                                return {
                                    min:preyTime.min - 1,
                                    sec:59,
                                    microSec: 99
                                };
                            }
                        }else{
                            return {
                                ...preyTime,
                                sec: preyTime.sec -1,
                                microSec: 99
                            };
                        }
                    }else{
                        return {
                            ...preyTime,
                            microSec: preyTime.microSec -1
                        };
                    }
                },);
            }, 10);
            props.setTimerIsRunning(true);
            setTimer(newTimer);
        }
    }
    //타이머 일시 중지
    const pauseTimer = () => {
        props.setTimerIsRunning(false);
        setTimer(clearInterval(timer));
    }

    //타이머 중지 시간 입력값으로 초기화
    const stopTimer = () => {
        pauseTimer();
        setTime(inputTime);
    }

    const causeError = () => {
        setError(true);
    }

    try{
        return (
            <Row ref={ref} className="justify-content-md-center input-text-groups">
                {errorTag}
                <Col md="auto">
                    <input 
                        name="min" 
                        value={min} 
                        onClick={pauseTimer}
                        onChange={()=>{}} 
                        onKeyDown={handleInputText}
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
                        onClick={pauseTimer}
                        onChange={()=>{}} 
                        onKeyDown={handleInputText}
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
                        onClick={pauseTimer}
                        onChange={()=>{}} 
                        onKeyDown={handleInputText}
                        className="input-text"
                    />
                </Col>
            </Row>
        );
    }catch(e) {
        console.log(e);
        return (
            <div className='error-box'>
                <span> !Timer Error! </span>
            </div>
        );
    };
 
});


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