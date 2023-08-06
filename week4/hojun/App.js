import { useState, useRef, useCallback, useEffect } from "react";

import firebase from "./firebase";

import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => firebase.readData(setTodos), []);
  console.log(todos);

  const nextId = useRef(0);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    firebase.writeData(todo);
    firebase.readData(setTodos);
    nextId.current += 1;
  }, []);

  const onRemove = useCallback(
    (text) => {
      setTodos(
        todos.filter((todo) => {
          if (todo.text === text) {
            firebase.removeData(todo);
            return false;
          } else return true;
        })
      );
    },
    [todos]
  );

  const onToggle = useCallback(
    (text) => {
      setTodos(
        todos.map((todo) => {
          if (todo.text === text) {
            const tmp = { ...todo, checked: !todo.checked };
            firebase.updateData(tmp);
            return tmp;
          } else return todo;
        })
      );
    },
    [todos]
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
