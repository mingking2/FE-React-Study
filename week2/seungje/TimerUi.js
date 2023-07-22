const TimerUi = props => { //UI
    const titleStyle = {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "10px",
      };

    return (
        <div style={titleStyle}>
            {props.name}의 타이머
        </div>
    );
};

TimerUi.defaultProps = { //TimerUi의 사용자 이름 default 값
    name: 'ㅇㅇㅇ'
};


export default TimerUi;