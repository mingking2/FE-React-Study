const weatherCategory = {
    T1H: '기온',
    RN1: '강수량',
    UUU: '동서바람성분',
    VVV: '남북바람성분',
    REH: '습도',
    PTY: '강수형태',
    VEC: '풍향',
    WSD: '풍속',
}
export const getWeatherData = (arr) => {
    const weatherData = {}

    for (let a of arr) {
        const category = a.category
        let value = a.obsrValue

        switch (category) {
            case 'T1H':
                value += ' °C'
                break;
            case 'RN1':
                value += ' mm'
                break;
            case 'UUU':
                value += ' m/s'
                break;
            case 'VVV':
                value += ' m/s'
                break;
            case 'REH':
                value += ' %'
                break;
            case 'PTY':
                switch (value) {
                    case '0':
                        value = '없음'
                        break;
                    case '1':
                        value = '비'
                        break;
                    case '2':
                        value = '비/눈'
                        break;
                    case '3':
                        value = '눈'
                        break;
                    case '5':
                        value = '빗방울'
                        break;
                    case '6':
                        value = '빗방울눈날림'
                        break;
                    case 7:
                        value = '눈날림'
                        break;
                    default:
                        break;
                }
                break;
            case 'VEC':
                value = ((value) => {
                    const normalizedInterval = (value + 360) % 360;
                    if (normalizedInterval >= 0 && normalizedInterval <= 45) return 'N-NE';
                    else if (normalizedInterval > 45 && normalizedInterval <= 90) return 'NE-E';
                    else if (normalizedInterval > 90 && normalizedInterval <= 135) return 'E-SE';
                    else if (normalizedInterval > 135 && normalizedInterval <= 180) return 'SE-S';
                    else if (normalizedInterval > 180 && normalizedInterval <= 225) return 'S-SW';
                    else if (normalizedInterval > 225 && normalizedInterval <= 270) return 'SW-W';
                    else if (normalizedInterval > 270 && normalizedInterval <= 315) return 'W-NW';
                    else return 'NW-N';
                })();
                break;
            case 'WSD':
                value += ' m/s'
                break;
            default:
                break;
        }
        //없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
        weatherData[weatherCategory[category]] = value
    }

    // console.log(weatherData)
    return weatherData
}

export default getWeatherData