import { useEffect } from "react";
import { useState } from "react";

const useDate = (nowDate) => {
    const [nDate, setNDate] = useState(nowDate);
    useEffect(()=>{
        const realTimeDate = setInterval(()=>{
            setNDate(Date());
        },100);
        return () => clearInterval(realTimeDate);
    },[])

    return nDate;
}

export default useDate;