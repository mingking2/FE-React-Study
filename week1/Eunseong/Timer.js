import React, { useState } from 'react';
import "./timer.css";

const Timer = () => {
  const [min, setMin] = useState(1);
  const [sec, setSec] = useState(0);
  const [ten_milsec, setTenMilsec] = useState(0);
  const [timer, setTimer] = useState(null);

  const startTimer = () => {
    let m = min;
    let s = sec;
    let tms = ten_milsec;
    setTimer(setInterval(() => {
      if (tms <= 0) {
        if (s <= 0) {
          if (m <= 0) {
            clearInterval(timer);
            return;
          }
          m -= 1;
          s = 60;
        }
        s -= 1;
        tms = 100
      }
      tms -= 1;
      setTenMilsec(tms)
      setSec(s);
      setMin(m);
    }, 10));
  }
  var time = `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}:${ten_milsec.toString().padStart(2, "0")}`
  
  return (
    <div className='back'>
      <div className='timer-app'>

        {/* time */}
        <div className="time">
          {time}
        </div>

        {/* btns */}
        <div className='btns'>
          <button className="start" onClick={startTimer}>start</button>

          <button className="pause" onClick={() => {
            clearInterval(timer);
          }}>pause</button>

          <button className="init" onClick={() => {
            clearInterval(timer);
            setTenMilsec(0)
            setSec(0);
            setMin(1);
          }}>init</button>
        </div>

      </div>
    </div>
  );
}

export default Timer;
