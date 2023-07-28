const baseTimeList = [
    "0040", "0140", "0240", "0340", "0440", "0540", "0640", "0740", "0840", "0940",
    "1040", "1140", "1240", "1340", "1440", "1540", "1640", "1740", "1840", "1940",
    "2040", "2140", "2240", "2340"
];
const getBaseDate = (today) => {
    const year = today.getFullYear();
    const month = (today.getMonth() < 10) ? ("0" + (today.getMonth() + 1)) : (today.getMonth() + 1);
    const date = (today.getDate() < 10) ? ("0" + today.getDate()) : today.getDate();
    return year + "" + month + "" + date;
}
const getBaseTime = (today) => {
    const hours = (today.getHours() < 10) ? ("0" + today.getHours()) : today.getHours();
    const minutes = (today.getMinutes() < 10) ? ("0" + today.getMinutes()) : today.getMinutes();
    return hours + "" + minutes;
}
export const setBase = (baseDate, baseTime, today) => {
    baseDate.current = getBaseDate(today);
    baseTime.current = getBaseTime(today);

    let prevTime = "2340";
    for (let time of baseTimeList) {
        if (Number(baseTime.current) < Number(time)) {
            if (prevTime === "2340") {
                const yesterday = new Date(today.setDate(today.getDate() - 1));
                baseDate.current = getBaseDate(yesterday);
            }
            baseTime.current = prevTime
            break;
        }
        else prevTime = time
    }
}

export default setBase