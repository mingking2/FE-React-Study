
import { useCallback, useEffect, useRef, useState } from "react";
import "./TodoApp.scss";
import TodoTemplate from "./TodoTemplate";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";


const TodoApp = ({get, set, _delete, patch}) => {
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
                await set( nextId.current, {text,checked:false});
                setTodos((todos)=>todos.concat(todo));
                nextId.current += 1;
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        },[set]
    )

    const onRemove = useCallback(
        async(id) => {
            try{
                await _delete(id);
                setTodos(todos => {
                    if(todos.length === 1){
                        nextId.current = 1;
                    }
                    return todos.filter(todo=> todo.id !== id);
                });
            }catch (e){
                console.error("Error removing document: ", e);
            }
        },
        [_delete],
    );

    const onToggle = useCallback(
        id=>{
            try {
                setTodos( todos => todos.map(todo =>{
                    if (todo.id === id){
                        patch(id, {checked: !todo.checked, text: todo.text});
                        return {...todo, checked: !todo.checked};
                    }else{
                        return todo;
                    }
                }));
            } catch (e){
                console.error("Error updating document: ", e);
            }
        },
        [patch],
    );

    useEffect(()=>{
        (async()=>{
            try{
                const snapshot = await get();
                const todo = [];
                snapshot.forEach((doc) => {
                    todo.push(doc);
                    nextId.current = nextId.current > doc.id ? nextId.current : doc.id + 1;
                });
                setTodos(todo);
                //이쪽 부분을 수정하여 loading 화면 만들 수 있어용
            }catch(e){
                console.error("Error getting document: ", e);
            }
        })();
    },[get]);

    return (
    <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
    )
}

export default TodoApp;