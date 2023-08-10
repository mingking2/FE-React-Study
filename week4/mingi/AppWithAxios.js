import { useState, useRef, useCallback, useEffect } from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import { async } from "q";
import axios from 'axios'; // Axios 추가

const App = () => {
  const [todos, setTodos] = useState([]);

  // Firebase에서 데이터 불러오기
  const loadTodos = async () => {
    try {
      const response = await axios.get('https://sangjeong-9bfd9-default-rtdb.firebaseio.com/todos.json');
      const todosData = response.data;

      // 처음부터 배열로 받아라
      if (todosData) {
        const todosArray = Object.values(todosData);
        setTodos(todosArray);
      }
    } catch (error) {
      console.error('Firebase 데이터 가져오기 에러:', error);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const onInsert = useCallback(
    async text => {
      const newId = new Date();
      const todo = {
        id: newId,
        text,
        checked: false,
      };
      try {
        await axios.put(`https://sangjeong-9bfd9-default-rtdb.firebaseio.com/todos/${todo.id}.json`, todo);
        loadTodos();
        console.log(todo.id);
      } catch (error) {
        console.error('데이터 추가 에러:', error);
      }
    },
    [],
  );

  const onRemove = useCallback(
    async id => {
      try {
        await axios.delete(`https://sangjeong-9bfd9-default-rtdb.firebaseio.com/todos/${id}.json`);
        loadTodos();
      } catch (error) {
        console.error('데이터 삭제 에러:', error);
      }
    },
    [],
  );

  const onToggle = useCallback(
    async id => {
      try {
        const response = await axios.get(`https://sangjeong-9bfd9-default-rtdb.firebaseio.com/todos/${id}.json`);
        const todoData = response.data;
        
        await axios.patch(`https://sangjeong-9bfd9-default-rtdb.firebaseio.com/todos/${id}.json`, {
          checked: !todoData.checked,
        });
        loadTodos();
      } catch (error) {
        console.error('데이터 업데이트 에러:', error);
      }
    },
    []
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
