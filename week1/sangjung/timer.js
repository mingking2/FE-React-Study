/*
    페이지가 간단하여 컴포넌트를 나누지 않음.

    숫자 클릭하면 변경 가능. 우측부터 변경 됨.
    start는 카운팅 시작
    pause는 일시중지 -> 다시 start 누르면 시작
    STOP은 중지 카운팅도 0으로 초기화

*/


import "./timer.css";
//import PropTypes from 'prop-types';
import { useState } from "react";

const MAX_TIME = 599999;

const Counter = props => {
    const [inputTime, setInputTime] = useState(6000);
    const [time, setTime] = useState(6000);
    const [timer, setTimer] = useState();
    /*
    const min = (Math.floor(time / 6000)).toString();
    const sec = (Math.floor(time / 100)).toString();
    const microSec = (time % 100).toString();
    const pTime = `${min.padStart(2,'0')}:${sec.padStart(2, '0')}:${microSec.padStart(2, '0')}`;
    */
    const pTime = `${ //위의 코드를 따름
            (Math.floor(time / 6000)).toString()
                .padStart(2,'0')
        }:${
            (Math.floor(time / 100) % 60).toString()
                .padStart(2, '0')
        }:${
            (time % 100).toString()
                .padStart(2, '0')
        }`;

    //인풋 태그 입력시 숫자만 입력 받게
    const inputText = (e) => {
        const value = e.key;
        if (value === "Backspace"){
            //let temp = String(time); 
            //temp = temp.slice(0,temp.length-1);
            //setTime(Number(temp));
            //밑의 코드는 위의 과정을 따름
            setTime(Number(String(time).slice(0,String(time).length-1)));
        }else if (value.match(/^\d$/g)){
            const temp = Number(time+value);
            temp > MAX_TIME ? setTime(MAX_TIME):setTime(temp);
        }
    }

    //stop버튼 클릭 시 입력 시간으로 되돌리기.
    const closeInput = () => {
        console.log(1);
        setInputTime(time);
    }

    //타이머 시작
    const startTimer = () =>{
        if(!timer && time > 0){
            setTime((time) => time - 1);
            const newTimer = setInterval(() =>{
                setTime((time) => {
                    if(time <= 0){
                        setInputTime(0);
                        clearInterval(newTimer);
                        return 0;
                    }
                    return time -1;
                });
            }, 10);
            setTimer(newTimer);
        }
    }

    //타이머 일시 중지
    const pauseTimer = () => {
        setTimer(clearInterval(timer));
    }

    //타이머 중지 시간 초기화
    const stopTimer = () => {
        pauseTimer();
        setTime(inputTime);
    }
    
    return (
        <div className="wrap">
            <header>

            </header>
            <div className="container">
                <div className="timer">
                    <input 
                        type="text" 
                        className="input-time" 
                        onClick = {pauseTimer}
                        onKeyDown={inputText}
                        onChange={()=>{}} //에러로그를 없애기 위한 코드 의미 없음.
                        onBlur={closeInput}
                        value={pTime}
                    />
                    <div className="timer-bottom">
                        <ul className="buttons">
                            <li>
                                <button
                                onClick={startTimer}
                                >START</button>
                            </li>
                            <li>
                                <button
                                onClick={pauseTimer}
                                >PAUSE</button>
                            </li>
                            <li>
                                <button
                                onClick={stopTimer}
                                >STOP</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <footer>

            </footer>
        </div>
    )
}

/*
Counter.defaultProps = {
    time: 6000,
    inputTime: 0
};
Counter.propTypes = {
    time: PropTypes.number.isRequired,
    inputTime: PropTypes.number.isRequired
}
//컴포넌트를 재활용 하게 된다면 활용 할 것. 현재 코드에서는 필요 없음.
*/
export default Counter;

