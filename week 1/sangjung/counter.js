/*
    페이지가 간단하여 컴포넌트를 나누지 않음.

    숫자 클릭하면 변경 가능. 우측부터 변경 됨.
    start는 카운팅 시작
    pause는 일시중지 -> 다시 start 누르면 시작
    STOP은 중지 카운팅도 0으로 초기화

*/


import "./counter.css";
//import PropTypes from 'prop-types';
import { useState } from "react";

const MAX_TIME = 599999;

const Counter = props => {
    const [time, setTime] = useState(6000);
    const [timer, setTimer] = useState();
    const min = (Math.floor(time / 6000) || 0) + '';
    const sec = (Math.floor(time / 100) % 60 || 0) + '';
    const microSec = (time % 100 || 0) + '';
    const pTime = min.padStart(2, '0') + ':' + sec.padStart(2, '0') + ':' +microSec.padStart(2, '0');
    return (
        <div className="wrap">
            <header>

            </header>
            <div className="container">
                <div className="timer">
                    <input 
                        type="text" 
                        className="input-time" 
                        onClick = { () => clearInterval(timer)}
                        onKeyDown={ (e) => keyDownInput(e,time,setTime)}
                        onChange={()=>{}} //에러로그를 없애기 위한 코드 의미 없음.
                        value={pTime}
                    />
                    <div className="timer-bottom">
                        <ul className="buttons">
                            <li>
                                <button
                                onClick={()=>setTimer(startTimer(setTime))}
                                >START</button>
                            </li>
                            <li>
                                <button
                                onClick={()=>clearInterval(timer)}
                                >PAUSE</button>
                            </li>
                            <li>
                                <button
                                onClick={()=>{
                                    clearInterval(timer);
                                    setTime(0);
                                }}>STOP</button>
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
    time: 6000
};
Counter.propTypes = {
    time: PropTypes.number.isRequired
}
//컴포넌트를 재활용 하게 된다면 적용한다면 활용 할 것 현재 코드에서는 필요 없음.
*/
export default Counter;

const keyDownInput = (e, time, setTime) =>{
    const value = e.key;
    if (value === "Backspace"){
        //let temp = String(time); 
        //temp = temp.slice(0,temp.length-1);
        //setTime(Number(temp));
        //밑의 코드는 위의 과정을 따름
        setTime(Number(String(time).slice(0,String(time).length-1)));
    }else if (value.replace(/\D/g,'')){
        const temp = Number(time+value);
        temp > MAX_TIME ? setTime(MAX_TIME):setTime(temp);
    }
}

const startTimer = (setTime) =>{
    const timer = setInterval(() =>{
        setTime((time) => {
            if(time <= 0){
                clearInterval(timer);
                return 0;
            }
            return time -1;
        });
    }, 10);
    return timer;
}