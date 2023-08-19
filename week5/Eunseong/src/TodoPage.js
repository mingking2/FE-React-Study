import TodoTemplet from "./TodoComp/TodoTemplet";
import TodoInsert from "./TodoComp/TodoInsert";
import TodoList from "./TodoComp/TodoList";
import { useCallback, useState, useEffect, } from "react";
import { getTodoList, putTodoData, delTodoData, patchTodo } from "./APIs/TodoAPI";
import { produce } from "immer";

const TodoPage = () => {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodoList(setTodos)
  }, [])


  const onInsert = useCallback(async (text) => {
    const todo = {
      id: new Date().getTime(),
      text: text,
      checked: false
    }
    putTodoData(todo)
    setTodos(todos => todos.concat(todo))
  }, [])

  const onRemove = useCallback(async (id) => {
    delTodoData(id)
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }, [])

  const onToggle = useCallback(async (id) => {
    // use immer
    setTodos(produce((draft) => {
      draft.forEach((todo) => {
        if(todo.id === id){
          todo.checked = !todo.checked
          patchTodo(todo)
        }
      })
    }))
  }, [])



  return (
    <TodoTemplet>
      <TodoInsert onInsert = {onInsert}></TodoInsert>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}></TodoList>
    </TodoTemplet>
  );
}

export default TodoPage;
