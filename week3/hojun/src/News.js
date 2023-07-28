import React, { useEffect, useRef, useReducer, useState } from 'react';
import axios from 'axios';

import getWeatherData from './moduleWeather'
import setBase from './moduleTime'
import getXlsx from './moduleXlsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const 행정구역 = await getXlsx();

const reducer = (state, action) => {
    return {
        ...state,
        nx: action.x,
        ny: action.y
    };
}

const News = () => {
    const baseDate = useRef(null);
    const baseTime = useRef(null);

    const [today, setToday] = useState(new Date());
    setBase(baseDate, baseTime, today);

    const [weatherData, setData] = useState(null);

    const [시_도, set시_도] = useState('시_도');
    const [시_군_구, set시_군_구] = useState('시_군_구');
    const [읍_면_동, set읍_면_동] = useState('읍_면_동');
    const [위치, set위치] = useState(null);

    const [state, dispatch] = useReducer(reducer, {
        serviceKey: process.env.REACT_APP_ENCODING_KEY,
        pageNo: '1',
        numOfRows: '100',
        dataType: 'JSON',
        base_date: baseDate.current,
        base_time: baseTime.current,
        nx: '60',
        ny: '127'
    });

    useEffect(() => {
        const setState = async (state) => {
            const queryString = process.env.REACT_APP_END_POINT + "?" + Object.entries(state).map(e => e.join('=')).join('&');
            // console.log(state.base_date);
            // console.log(state.base_time);

            const res = await axios.get(queryString);
            // console.log(res.data.response.body.items.item);

            try { setData(getWeatherData(res.data.response.body.items.item)); }
            catch (e) {
                console.log(e)
                setState(state)
            }
        };

        setBase(baseDate, baseTime, today);
        setState(state);
        // console.log(state);

        let id = setTimeout(() => setToday(new Date()), 1000)

        return () => clearTimeout(id)
    }, [state, today]);

    return (
        <Container>
            <h1>초단기 실황 조회</h1>
            <Form>
                <Row>
                    <Col>
                        <Form.Select value={시_도} onChange={(e) => {
                            console.log('시/도')
                            set시_도(e.target.value)
                            set시_군_구('시_군_구')
                            set읍_면_동('읍_면_동')
                        }}>
                            {Array.from(행정구역.keys()).map((value, index) => (<option key={index} value={value}>{value}</option>))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select value={시_군_구} onChange={(e) => {
                            console.log('시/군/구')
                            set시_군_구(e.target.value)
                            set읍_면_동('읍_면_동')
                        }}>
                            {
                                (시_도 === '시_도') ?
                                    (<option key={0} value={'시/군/구'}>시/군/구</option>) :
                                    Array.from(행정구역.get(시_도).keys()).map((value, index) => (<option key={index} value={value}>{value}</option>))
                            }
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select value={읍_면_동} onChange={(e) => {
                            console.log('읍/면/동')
                            set읍_면_동(e.target.value)
                        }}>
                            {
                                (시_군_구 === '시_군_구') ?
                                    (<option key={0} value={'읍/면/동'}>읍/면/동</option>) :
                                    Array.from(행정구역.get(시_도).get(시_군_구).keys()).map((value, index) => (<option key={index} value={value}>{value}</option>))
                            }
                        </Form.Select>
                    </Col>
                    <Col>
                        <Button variant="primary" type="button" onClick={() => {
                            if (시_도 !== '시_도' && 시_군_구 !== '시_군_구' && 읍_면_동 !== '읍_면_동') {
                                const selection = 행정구역.get(시_도).get(시_군_구).get(읍_면_동);
                                const nx = selection[0];
                                const ny = selection[1];
                                dispatch({ x: nx, y: ny });
                                set위치(시_도 + " " + 시_군_구 + " " + 읍_면_동)
                            }
                            else alert('Wrong Selection')
                        }}>
                            <span>실행</span>
                        </Button>
                    </Col>
                </Row>
            </Form>
            <div>
                {today.toString()}
            </div>
            {(위치 !== null) ? (<div>{위치}</div>) : null}
            <pre>
                {JSON.stringify(weatherData, null, 3).replace(/,/g, '\n').replace(/["{}]/g, '')}
            </pre>
        </Container >
    )
}

export default News;