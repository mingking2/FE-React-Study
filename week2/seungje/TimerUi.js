import './Timer.css'

const TimerUi = props => { //UI
    return (
        <div className="titleStyle">
            {props.name}의 타이머
        </div>
    );
};

TimerUi.defaultProps = { //TimerUi의 사용자 이름 default 값
    name: 'ㅇㅇㅇ'
};


export default TimerUi;