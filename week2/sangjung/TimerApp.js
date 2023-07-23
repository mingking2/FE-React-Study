/*
    하아 처음에 부트스트랩 적용 이상하게 된거 모르고 만들다가 망했어요~

    이게.. 타이머?
    이게... 뭘까... 내가.. 만들려던건 이게 아닌데..

    구조:
        TimerApps : 전체 컨테이너
            |- TimerAction : 상단 하단 애니메이션 컴포넌트
            |- Timer : 타이머 컨테이너 및 버튼 뷰 컴포넌트
                |-TimerDisplay : 타이머 숫자 뷰 및 계산 컴포넌트

    
    함수형 컴포넌트로 수정하면서 ref 쓸 곳이 생각나지 않아용 ㅠ
*/

import 'bootstrap/dist/css/bootstrap.css';
import './TimerApp.css';

import React, {useState, useEffect} from 'react';

import {Container, Row, Col} from 'react-bootstrap';

import Timer from './Timer';
import TimerAction from './TimerAction';

const TimerApp = (props) => {
    const [timerIsRunning, setTimerIsRunning] = useState(false);
    const [fontSize, setFontSize] = useState('');

    //timer-box size에 따라 timer의 font size 변경
    const handleResize = () => {
        const timerBox = document.querySelector(".timer-box");
        setFontSize((13 - Math.floor((648 - timerBox.offsetWidth)/54)) + "px");
    }

    //컴포넌트가 mount 될때 비동기 처리를 하기 위한 method
    useEffect(() => {
        window.addEventListener('resize',handleResize);
        handleResize();
    },[]);


    return (
        <Container>
            <Row>
                <Col>
                    <TimerAction timerRunning={timerIsRunning}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="box" style={{fontSize}}>
                        <div className="timer-box" >
                        <Timer setTimerIsRunning={setTimerIsRunning}/>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TimerAction timerRunning={timerIsRunning}/>
                </Col>
            </Row>
        </Container>
    );

}

export default TimerApp;