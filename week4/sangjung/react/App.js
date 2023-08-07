import FirebaseApp from "./components/FirebaseApp";
import MyDBApp from "./components/MyDBApp";

import "./App.scss";
import { useState } from "react";
import cn from 'classnames';

//상수
const MYDB = 0;
const FIREBASE = 1;
const App = () => {

    const [dbMode, setDBMode] = useState(MYDB);

    //버튼 클릭할 때 db 변경
    const handleButton = ({target}) => {
        switch (target.name) {
            case "MYDB":
                if(dbMode !== MYDB) setDBMode(MYDB);
                break;
            case "FIREBASE":
                if(dbMode !== FIREBASE) setDBMode(FIREBASE);
                break;
            default:
                break;
        }
    }

    //보여줄 컴포넌트 반환
    const showApp = () => {
        if (dbMode === MYDB){
            return <MyDBApp/>;
        }else if (dbMode === FIREBASE){
            return <FirebaseApp/>;
        }
    };

    return (
        <>
            <div className="buttonBox">
                <button type="button" className={cn("btn", dbMode === MYDB ? "checked": "")} name="MYDB" onClick={handleButton}>MYDB</button>
                <button type="button" className={cn("btn", dbMode === FIREBASE ? "checked": "")}  name="FIREBASE" onClick={handleButton}>FIREBASE</button>
            </div>
            {
                showApp()
            }
        </>
    )
}

export default App;