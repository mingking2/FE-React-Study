import { useState, useEffect } from "react";

const TimerUi = props => { //UI
    return (
        <div>
            {props.name}의 타이머
        </div>
    );
};

TimerUi.defaultProps = { //TimerUi의 사용자 이름 default 값
    name: 'ㅇㅇㅇ'
};


const TimerSet = () => {  //타이머 동작 함수

    const [time, setTime] = useState(60); //시간 값
    const [isRunning, setIsRunning] = useState(false); //타이머 동작
    const [isUrgent, setIsUrgent] = useState(false);

    useEffect(() => {  //isRunning 의 bool 값 변화 시 작동
        let timer;
        if (isRunning) {
            timer = setInterval(() => { //시작을 누를 시 작동

                setTime((time) => {  //  1초씩 감소 / 0초가 되면 종료
                    if (time === 0) {
                        clearInterval(timer);
                        return 0;
                    }
                    return setTime(time - 1);
                });

                if (time <= 10) {  //시간이 얼마 안남을 경우 긴박한 느낌을 주는 style 추가
                    setIsUrgent(true);
                }
                
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        }

    }, [time, isRunning]);

    

    const onClickStart = () => {  //시작 버튼
        setIsRunning(true);
    }

    const onClickReset = () => {  //리셋 버튼
        setIsRunning(false);
        setIsUrgent(false);
        setTime(60);
    }

    const timerStyle = {  //긴박한 느낌을 주는 스타일
        fontSize: isUrgent ? '4rem' : '2rem',
        fontWeight: isUrgent ? 'bold' : 'normal',
        transform: isUrgent ? 'scale(1.5)' : 'scale(1)',
        transition: isUrgent ? 'all 10s ease-in-out' : 'none',
    };

    return (
        <div>
            <button onClick={onClickStart}>시이작</button>
            <button onClick={onClickReset}>리이셋</button>

            <div style={timerStyle}>
                <p>{time}초</p>
            </div>

        </div>
    );

};



export default TimerUi;
export { TimerSet };