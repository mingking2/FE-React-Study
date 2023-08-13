import { useState, useRef, useCallback, useEffect } from "react";

import firebase2 from './firebase2';

import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => firebase2.get(setTodos), []);

  const nextId = useRef(0);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text: text,
        checked: false,
      };
      firebase2.put(todo, setTodos)
      nextId.current += 1;
    },
    [],
  );

  const onRemove = useCallback(
    text => {
      setTodos(
        todos.filter((todo) => {
          if (todo.text === text) {
            firebase2.delete(todo);
            return false;
          }
          else return true;
        })
      );
    },
    [todos],
  );

  const onToggle = useCallback(
    text => {
      setTodos(
        todos.map((todo) => {
          if (todo.text === text) {
            const tmp = { ...todo, checked: !todo.checked };
            firebase2.patch(tmp);
            return tmp;
          }
          else return todo;
        })
      )
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

export default App;
