import { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause, FaUndo } from 'react-icons/fa';
import "./Timer.css";

const Timer = () => {
  //타이머 동작 함수
  const [time, setTime] = useState(0); //시간 값
  const [isRunning, setIsRunning] = useState(false); //타이머 동작
  const [isUrgent, setIsUrgent] = useState(false); //특정 시간부터 긴박한 효과 추가
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);
  const secondsRef = useRef(null);
  const lastSetTimeRef = useRef(0);

  useEffect(() => {
    //isRunning 의 bool 값 변화 시 작동
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        //시작을 누를 시 작동
        setTime((time) => {
          //  1초씩 감소 / 0초가 되면 종료
          if (time === 0) {
            clearInterval(timer);
            setIsRunning(false);
            setIsUrgent(false);
            return 0;
          }
          return time - 1;
        });

        if (time === 10) {
          setIsUrgent(true);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [time, isRunning]);

  const onClickSetTime = () => {
    // 세팅 버튼
    if (isRunning) {
      return;
    }
    const hours = parseInt(hoursRef.current.value) || 0;
    const minutes = parseInt(minutesRef.current.value) || 0;
    const seconds = parseInt(secondsRef.current.value) || 0;

    if (hours < 0 || minutes < 0 || seconds < 0) { // 에러 핸들링 코드
      alert("입력값은 음수가 될 수 없습니다.");
      return;
    }
    if (!hours && !minutes && !seconds) { // 에러 핸들링 코드2
      alert("시간을 입력해주세요.");
      return;
    }
    if (minutes > 59 || seconds > 59) { // 에러 핸들링 코드3
      alert("분과 초는 60이하의 숫자를 입력해 주세요");
      return;
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    lastSetTimeRef.current = totalSeconds; // 마지막으로 세팅한 시간 기억
    setTime(totalSeconds);
  };

  const onClickStart = () => {
    // 시작 버튼
    if (isRunning) {
      return;
    }

    setIsRunning(true);
  };

  const onClickPause = () => {
    // 정지 버튼
    setIsRunning(false);
  };

  const onClickReset = () => {
    // 리셋 버튼
    setIsUrgent(false);
    setIsRunning(false);
    setTime(lastSetTimeRef.current);
  };

  const formatTime = (time) => {
    // 시간 출력(시,분,초 분리)
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}
    :${seconds.toString().padStart(2, "0")}`;
  };


  return (
    <div>
      <div className={isUrgent ? "timer-urgent" : "timer"}>
        <p>{formatTime(time)}</p>
      </div>

      <div>
        <input type="number" ref={hoursRef} placeholder="시간" className="input" />
        <input type="number" ref={minutesRef} placeholder="분" className="input" />
        <input type="number" ref={secondsRef} placeholder="초" className="input" />

        <button onClick={onClickSetTime} className="button">세팅</button>
      </div>
      <button onClick={onClickStart} className="button"><FaPlay /> 시작</button>
      <button onClick={onClickPause} className="button"><FaPause/> 정지</button>
      <button onClick={onClickReset} className="button"><FaUndo/> 리셋</button>


    </div>
  );
};

export default Timer;