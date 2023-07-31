import React, { useEffect, useRef, useReducer, useState } from 'react';
import axios from 'axios';

import getWeatherData from './moduleWeather'
import setBase from './moduleTime'
import getXlsx from './moduleXlsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const 행정구역 = await getXlsx();

const initial시_도 = '시_도'
const initial시_군_구 = '시_군_구'
const initial읍_면_동 = '읍_면_동'

const reducer위치 = (state, action) => {
    return {
        시_도: action.시_도,
        시_군_구: action.시_군_구,
        읍_면_동: action.읍_면_동
    }
}

const reducerState = (state, action) => {
    return {
        ...state,
        nx: action.x,
        ny: action.y
    };
}

const News = () => {
    const flag = useRef(null);

    const [weatherData, setWeatherData] = useState(null);

    const baseDate = useRef(null);
    const baseTime = useRef(null);
    const [today, setToday] = useState(new Date());
    setBase(baseDate, baseTime, today);

    const [위치, dispatch위치] = useReducer(reducer위치, {
        시_도: initial시_도,
        시_군_구: initial시_군_구,
        읍_면_동: initial읍_면_동
    })

    const [state, dispatchState] = useReducer(reducerState, {
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

            try {
                await axios.get(queryString)
                    .then(res => setWeatherData(getWeatherData(res.data.response.body.items.item)))
                    .then(flag.current = true);
            }
            catch (e) {
                console.log(e)
                await setState(state)
            }
        };

        setState(state);
    }, [state]);

    useEffect(() => {
        const id = setTimeout(() => setToday(new Date()), 1000)
        return () => clearTimeout(id)
    }, [today])

    const handle시_도 = (e) => {
        console.log('시/도')
        flag.current = false;
        dispatch위치({
            시_도: e.target.value,
            시_군_구: initial시_군_구,
            읍_면_동: initial읍_면_동
        })
    }
    const handle시_군_구 = (e) => {
        console.log('시/군/구')
        flag.current = false;
        dispatch위치({
            시_도: 위치.시_도,
            시_군_구: e.target.value,
            읍_면_동: initial읍_면_동
        })
    }
    const handle읍_면_동 = (e) => {
        console.log('읍/면/동')
        flag.current = false;
        dispatch위치({
            시_도: 위치.시_도,
            시_군_구: 위치.시_군_구,
            읍_면_동: e.target.value
        })
    }
    const handle위치 = () => {
        if (위치.시_도 !== initial시_도 && 위치.시_군_구 !== initial시_군_구 && 위치.읍_면_동 !== initial읍_면_동) {
            const selection = 행정구역.get(위치.시_도).get(위치.시_군_구).get(위치.읍_면_동);
            const nx = selection[0];
            const ny = selection[1];
            dispatchState({ x: nx, y: ny });
        }
        else alert('Wrong Selection')
    }

    return (
        <Container>
            <h1>초단기 실황 조회</h1>
            <Form>
                <Row>
                    <Col>
                        <Form.Select value={위치.시_도} onChange={handle시_도}>
                            {Array.from(행정구역.keys()).map((value, index) => (<option key={index} value={value}>{value}</option>))}
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select value={위치.시_군_구} onChange={handle시_군_구}>
                            {
                                (위치.시_도 === initial시_도) ?
                                    (<option key={0} value={'시/군/구'}>시/군/구</option>) :
                                    Array.from(행정구역.get(위치.시_도).keys()).map((value, index) => (<option key={index} value={value}>{value}</option>))
                            }
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Select value={위치.읍_면_동} onChange={handle읍_면_동}>
                            {
                                (위치.시_군_구 === initial시_군_구) ?
                                    (<option key={0} value={'읍/면/동'}>읍/면/동</option>) :
                                    Array.from(행정구역.get(위치.시_도).get(위치.시_군_구).keys()).map((value, index) => (<option key={index} value={value}>{value}</option>))
                            }
                        </Form.Select>
                    </Col>
                    <Col>
                        <Button variant="primary" type="button" onClick={handle위치}>
                            <span>실행</span>
                        </Button>
                    </Col>
                </Row>
            </Form>
            <div>
                {today.toString()}
            </div>
            {
                (flag.current && 위치.시_도 !== initial시_도 && 위치.시_군_구 !== initial시_군_구 && 위치.읍_면_동 !== initial읍_면_동) ?
                    (위치.시_도 + " " + 위치.시_군_구 + " " + 위치.읍_면_동) :
                    null
            }
            <pre>
                {
                    (flag.current) ?
                        (JSON.stringify(weatherData, null, 3).replace(/,/g, '\n').replace(/["{}]/g, '')) :
                        null
                }
            </pre>
        </Container >
    )
}

export default News;