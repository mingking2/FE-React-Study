import { useState, useRef, useCallback, useEffect } from "react";

import firebase2 from "./firebase2";

import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

const TodoLists = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const a = async () => {
      const result = await firebase2(".json", "get", null);
      if (result.data === undefined || result.data === null) {
        console.log("data is empty");
      } else {
        const tmp = [];
        Object.entries(result.data).map((i) => tmp.push(i[1]));
        setTodos(tmp);
      }
    };
    a();
  }, []);

  const nextId = useRef(0);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text: text,
      checked: false,
    };
    setTodos((todos) => todos.concat(todo));
    firebase2(`/${todo.text}.json`, "put", todo);
    nextId.current += 1;
  }, []);

  const onRemove = useCallback(
    (text) => {
      setTodos(todos.filter((todo) => todo.text !== text));
      firebase2(`/${text}.json`, "delete");
    },
    [todos]
  );

  const onToggle = useCallback(
    (text) => {
      setTodos(
        todos.map((todo) => {
          if (todo.text === text) {
            const tmp = { ...todo, checked: !todo.checked };
            firebase2(`/${text}.json`, "patch", tmp);
            return tmp;
          } else return todo;
        })
      );
    },
    [todos]
  );

  return (
    <div>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </TodoTemplate>
    </div>
  );
};

export default TodoLists;
