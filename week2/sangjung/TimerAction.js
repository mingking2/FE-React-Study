import {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

import './TimerAction.css';

class TimerAction extends Component {

    render(){
        // timer 상태에 따라 class 변경
        const col = [0,1,2,3,4].map((key)=> <Col key={key} className={this.props.timerRunning ? 'start-timer' : ''}></Col>)
        const row = [0,1,2,3].map((key) => <Row key={key}> {col}</Row>)
        
        return (
            <Container id='timer-Action'>
                {row}
            </Container>
        );
    }
}

export default TimerAction;