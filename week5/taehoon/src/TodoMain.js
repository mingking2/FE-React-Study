import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import React, { useState, useCallback, useEffect } from 'react';
import { getData, putData, patchData, delData } from './firebaseconfig';

const TodoMain = () => {
  const [todos, setTodos] = useState([]);
  // console.log(todos);
  useEffect(() => {
    const fetchData = async () => {
      await getData(setTodos);
    };
    fetchData();
  }, []);
  const newId = Date.now();

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: newId,
        text: text,
        checked: false,
      };
      putData(todo, setTodos);
      
    },
    [newId],
  );
  const onRemove = useCallback(
    (id) => {
      setTodos(
        todos.filter((todo) => {
          if (todo.id === id) {
            delData(todo);
            return false;
          } else return true;
        }),
      );
    },
    [todos]
  );
  const onToggle = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) => {
          if (todo.id === id) {
            const update = { ...todo, checked: !todo.checked };
            patchData(update);
            return update;
          } else {
            return todo;
          }
        }),
      );
    },
    [todos],
  );
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};
export default TodoMain;
