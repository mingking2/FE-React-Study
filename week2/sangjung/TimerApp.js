/*
    하아 처음에 부트스트랩 적용 이상하게 되서 망했어요~~

    구조:
        TimerApps : 전체 컨테이너
            |- TimerAction : 상단 하단 애니메이션 컴포넌트
            |- Timer : 타이머 컴포넌트
*/

import 'bootstrap/dist/css/bootstrap.css';
import './TimerApp.css';

import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

import Timer from './Timer';
import TimerAction from './TimerAction';


class TimerApp extends Component {

    state = {
        timerRunning: false,
        fontSize: '13px'
    }

    topTimerAction = React.createRef();
    timer = React.createRef();

    //timer-box size에 따라 timer의 font size 변경
    handleResize = () => {
        const timerBox = document.querySelector(".timer-box");
        this.setState({fontSize:(13 - Math.floor((648 - timerBox.offsetWidth)/54)) + "px"});
    }

    //timer 상태 변경 유무를 다른 component에게 알리기 위해 state를 변경하는 method
    timerAction = (state) => {
        this.setState({timerRunning: state});
    }

    //컴포넌트가 mount 될때 비동기 처리를 하기 위한 method
    componentDidMount() {
        window.addEventListener('resize',this.handleResize);
    }


    render(){
        return (
            <Container>
                <Row>
                    <Col>
                        <TimerAction timerRunning={this.state.timerRunning}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="box">
                            <div className="timer-box" style={{fontSize:this.state.fontSize}}>
                            <Timer timerAction={this.timerAction}/>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TimerAction timerRunning={this.state.timerRunning}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default TimerApp;