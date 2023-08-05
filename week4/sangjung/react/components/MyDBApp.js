import {useCallback, useRef, useState, useEffect} from 'react';
import axios from "axios";

import TodoTemplate from "./TodoTemplate";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";

import "./App.scss";

const myDB = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,
    headers: {'Content-type': 'application/json', 
    'Accept': 'application/json' },
})

const getDB = async () => {
    const response = await myDB.get('/react/todo');
    if (response.data.status !== "completed") {
        throw response.data.data;
    }
    return response.data.data;
}

const setDB = async(id, data) => { 
    const response = await myDB.post('/react/todo',{
        id,
        ...data
    });
    if (response.data.status !== "completed") {
        throw response.data.data;
    }
    return response.data.data;
}

const patchDB = async(id, data) => { 
    const response = await myDB.patch('/react/todo',{
        id,
        ...data
    });
    if (response.data.status !== "completed") {
        throw response.data.data;
    }
    return response.data.data;
}

const deleteDB = async(id) => {
    const response = await myDB.delete('/react/todo',{
        id:id
    });
    if (response.data.status !== "completed") {
        throw response.data.data;
    }
    return response.data.data;
}

const App = () => {
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
                        patchDB(String(id), {checked: !todo.checked, text: todo.text});
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
                    const obj = doc;
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

export default App;