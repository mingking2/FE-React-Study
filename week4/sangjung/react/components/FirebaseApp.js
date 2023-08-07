import {useCallback, useRef, useState, useEffect} from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc , getDocs, collection, deleteDoc } from "firebase/firestore";

import TodoTemplate from "./TodoTemplate";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";

import "./App.scss";
  
// Initialize Firebase
const app = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE));
const db = getFirestore(app);
const todosDB = collection(db, "todos");

const setDB = async(id, data) => { 
    await setDoc(doc(db,"todos", String(id) ), data);
}

const getDB = async() => {
    const snapshot = await getDocs(todosDB);
    return snapshot;
}

const deleteDB = async(id) => {
    await deleteDoc(doc(db, "todos", String(id)));
}

const FirebaseApp = () => {
    const [todos, setTodos] = useState([]);
    const nextId = useRef(1);

    const onInsert = useCallback(
        async(text) => {
            const todo={
                id: nextId.current,
                text,
                checked: false,
            };
            try {
                await setDB( String(nextId.current), {text,checked:false});
                setTodos(todos.concat(todo));
                nextId.current += 1;
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },
        [todos],
    )

    const onRemove = useCallback(
        async(id) => {
            try{
                await deleteDB(String(id));
                setTodos(todos.filter(todo=> todo.id !== id));
                if(todos.length === 0){
                    nextId.current = 1;
                }
            }catch (e){
                console.error("Error removing document: ", e);
            }
        },
        [todos],
    );

    const onToggle = useCallback(
        id=>{
            try {
                todos.forEach((todo)=> {
                    if (todo.id === id){
                        setDB(String(id), {checked: !todo.checked, text: todo.text});
                    }
                });
                setTodos(
                    todos.map(todo=>
                        todo.id === id ? {...todo, checked: !todo.checked} : todo,
                    ),
                );
            } catch (e){
                console.error("Error updating document: ", e);
            }
        },
        [todos],
    );

    useEffect(()=>{
        (async()=>{
            try{
                const snapshot = await getDB();
                const todo = [];
                snapshot.forEach((doc) => {
                    const obj = doc.data(); 
                    obj.id = Number(doc.id);
                    todo.push(obj);
                    nextId.current = nextId.current > obj.id ? nextId.current : obj.id + 1;
                });
                setTodos(todo);
            }catch(e){
                console.error("Error getting document: ", e);
            }
        })();
    },[]);

    return (
    <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
    )
}

export default FirebaseApp;