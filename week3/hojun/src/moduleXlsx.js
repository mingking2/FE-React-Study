import readXlsxFile from 'read-excel-file'

export const getXlsx = async () => {
    return await fetch('./weather.xlsx')
        .then(response => response.blob())
        .then(blob => readXlsxFile(blob))
        .then((rows) => {
            // `rows` is an array of rows == weather.xlsx
            // each row being an array of cells.

            // 시_도 = 2;
            // 시_군_구 = 3;
            // 읍_면_동 = 4;
            // nx = 5;
            // ny = 4;

            const 시_도 = new Map();
            for (let row of rows) {
                시_도.set(row[2], (() => {
                    if (시_도.get(row[2]) === undefined)
                        return new Map().set('시/군/구', new Map().set('읍/면/동', null));
                    else {
                        const 시_군_구 = 시_도.get(row[2]);
                        return 시_군_구.set(row[3], (() => {
                            if (시_군_구.get(row[3]) === undefined)
                                return new Map().set('읍/면/동', null);
                            else {
                                const 읍_면_동 = 시_군_구.get(row[3])
                                return 읍_면_동.set(row[4], [row[5], row[6]])
                            }
                        })())
                    }
                })())
            }

            return 시_도;
        })
}

export default getXlsx