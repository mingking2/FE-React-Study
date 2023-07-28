import {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

import {Row, Col} from 'react-bootstrap';

import './TimerDisplay.css';

const TimerDisplay = (props) => {
    const inputTime = useRef({min:1, sec:0,microSec:0});
    const [timer,setTimer] = useState(null);
    const [time,setTime] = useState({min:1, sec:0,microSec:0});
    const [isError, setIsError] = useState(false);

    const min = time.min.toString().padStart(2, '0');
    const sec = time.sec.toString().padStart(2, '0');
    const microSec = time.microSec.toString().padStart(2, '0');
    const errorTag = isError ? props.asdf.value : <></>;
    
    //인풋 태그 입력시 숫자만 입력 받게
    const handleInputText = (e) => {
        const key = e.key;
        const name = e.target.name;

        if (key === "Backspace") {
            const _time = Math.floor(time[name] / 10);
            const obj = {...time}
            obj[name] = _time;
            setTime(obj);
            inputTime.current = obj;
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
            inputTime.current = obj;
        }
    }

    //타이머 시작
    const startTimer = () =>{
        if(!timer && (time.min > 0 || time.sec > 0 || time.microSec > 0)){
            const newTimer = setInterval(() =>{
                setTime((prevTime)=>{
                    if(prevTime.microSec <= 0){
                        if(prevTime.sec <= 0){
                            if(prevTime.min <= 0){
                                // 0ms 0s 0m 일때
                                setTimer(clearInterval(newTimer));
                                const obj = {
                                    min:0,
                                    sec:0,
                                    microSec: 0
                                }
                                inputTime.current = obj;
                                return obj;
                            }else{
                                // 0ms 0s (N)m 일때
                                return {
                                    min:prevTime.min - 1,
                                    sec:59,
                                    microSec: 99
                                };
                            }
                        }else{
                            // 0ms (N)s (N)m 일때
                            return {
                                ...prevTime,
                                sec: prevTime.sec -1,
                                microSec: 99
                            };
                        }
                    }else{
                        // (N)ms (N)s (N)m 일때
                        return {
                            ...prevTime,
                            microSec: prevTime.microSec -1
                        };
                    }
                })
            }, 10);
            setTimer(newTimer);
        }
    }
    //타이머 일시 중지
    const pauseTimer = () => {
        setTimer(clearInterval(timer));
    }

    //타이머 중지 시간 입력값으로 초기화
    const stopTimer = () => {
        pauseTimer();
        setTime(inputTime.current);
    }

    //에러 발생
    const causeError = () => {
        stopTimer();
        setIsError(true);
    }

    //props.clicked 값이 바뀔때 마다 버튼 함수 실행
    useEffect(()=>{
        switch(props.clicked){
            case "START":
                startTimer();
                break;
            case "PAUSE":
                pauseTimer();
                break;
            case "STOP":
                stopTimer();
                break;
            case "ERROR":
                causeError();
                break;
            default:
                break;
        }   
    },[props.clicked])

    //timer바뀔때 마다 실행
    useEffect(()=>{
        timer ? props.setTimerIsRunning(true) : props.setTimerIsRunning(false);
    },[timer])

    try{
        return (
            <Row className="justify-content-md-center input-text-groups">
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
 
};


TimerDisplay.propTypes = {
    setTimerIsRunning: PropTypes.func.isRequired,
}

export default TimerDisplay;