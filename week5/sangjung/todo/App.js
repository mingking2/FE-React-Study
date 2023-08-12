import "./App.scss";
import { useMemo, useState } from "react";
import cn from 'classnames';
import TodoApp from "./components/TodoApp";
import firebase from './modules/firebase';
import mydb from './modules/mydb';

const MYDB = 0;
const FIREBASE = 1;
const App = () => {

    const [dbMode, setDBMode] = useState(MYDB);

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

    const getMethod = useMemo(() => {
        if (dbMode === MYDB){
            return mydb;
        }else if (dbMode === FIREBASE){
            return firebase;
        }
    },[dbMode]);

    return (
        <>
            <div className="buttonBox">
                <button type="button" className={cn("btn", dbMode === MYDB ? "checked": "")} name="MYDB" onClick={handleButton}>MYDB</button>
                <button type="button" className={cn("btn", dbMode === FIREBASE ? "checked": "")}  name="FIREBASE" onClick={handleButton}>FIREBASE</button>
            </div>
            <TodoApp {...getMethod} />
        </>
    )
}

export default App;