import TodoTemplet from "./Component/TodoTemplet";
import TodoInsert from "./Component/TodoInsert";
import TodoList from "./Component/TodoList";
import { useCallback, useState, useEffect, } from "react";
import axios from "axios";

function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodoList()
  }, [])


  const onInsert = useCallback(async text => {
    const todo = {
      id: new Date().getTime(),
      text: text,
      checked: false
    }
    await axios.put(`https://todoapp-3a3c7-default-rtdb.firebaseio.com/TodoList/${todo.id}.json`, todo)
      .then()
      .catch(e => console.log(e))
    getTodoList()
  }, [])

  const onRemove = useCallback(async (id) => {
    await axios.delete(`https://todoapp-3a3c7-default-rtdb.firebaseio.com/TodoList/${id}.json`)
    getTodoList()
  }, [])

  const onToggle = useCallback(async (id) => {
    let isCheked
    await axios.get(`https://todoapp-3a3c7-default-rtdb.firebaseio.com/TodoList/${id}.json`)
    .then(res => {
      isCheked = res.data.checked
    })
    .catch(e => {
      console.log(e)
    })
    await axios.patch(`https://todoapp-3a3c7-default-rtdb.firebaseio.com/TodoList/${id}.json`, {
      checked: !isCheked
    })
      .then()
      .catch(e => console.log(e))
    getTodoList()
  }, [])

  const getTodoList = async () => {
    await axios.get(`https://todoapp-3a3c7-default-rtdb.firebaseio.com/TodoList/.json`)
      .then(res => {
        setTodos(Object.values(res.data))
      })
      .catch(e => {
        console.log(e)
      })
  }


  return (
    <TodoTemplet>
      <TodoInsert onInsert = {onInsert}></TodoInsert>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}></TodoList>
    </TodoTemplet>
  );
}

export default App;
