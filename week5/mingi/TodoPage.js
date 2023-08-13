import TodoTemplate from "./TodoComponents/TodoTemplate";
import TodoInsert from "./TodoComponents/TodoInsert";
import TodoList from "./TodoComponents/TodoList";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const databaseURL = "https://sangjeong-9bfd9-default-rtdb.firebaseio.com"; // 데이터베이스 링크 변수

const TodoPage = () => {
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    try {
      const response = await axios.get(
        `${databaseURL}/todos.json`
      );
      const todosData = response.data;

      if (todosData) {
        const todosArray = Object.values(todosData);
        console.log(todosArray);
        setTodos(todosArray);
      }
    } catch (error) {
      console.error("Firebase 데이터 가져오기 에러:", error);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const onInsert = useCallback(async (text) => {
    const newId = Date.now();
    const todo = {
      id: newId,
      text,
      checked: false,
    };
    try {
      await axios.put(
        `${databaseURL}/todos/${todo.id}.json`,
        todo
      );
      loadTodos();
      // console.log(todo.id);
    } catch (error) {
      console.error("데이터 추가 에러:", error);
    }
  }, []);

  const onRemove = useCallback(async (id) => {
    try {
      await axios.delete(
        `${databaseURL}/todos/${id}.json`
      );
      loadTodos();
    } catch (error) {
      console.error("데이터 삭제 에러:", error);
    }
  }, []);

  const onToggle = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `${databaseURL}/todos/${id}.json`
      );
      const todoData = response.data;

      await axios.patch(
        `${databaseURL}/todos/${id}.json`,
        {
          checked: !todoData.checked,
        }
      );
      loadTodos();
    } catch (error) {
      console.error("데이터 업데이트 에러:", error);
    }
  }, []);

  return (
    <div>
      <Link to="/">홈으로 이동</Link>
      <h1>Todo List Page</h1>
      {
        <TodoTemplate>
          <TodoInsert onInsert={onInsert} />
          <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </TodoTemplate>
      }
    </div>
  );
};

export default TodoPage;
