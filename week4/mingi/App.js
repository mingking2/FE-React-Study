import { useState, useRef, useCallback, useEffect } from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import db from "./firebase";
import { async } from "q";
import { addDoc, collection, getDocs, deleteDoc, updateDoc, doc, setDoc } from "firebase/firestore/lite";

const App = () => {
  const [ todos, setTodos ] = useState([]);
  const nextIdRef = useRef(0);

  // Firebase에서 데이터 불러오기
  const loadTodos = async() => {
    const querySnapshot = await getDocs(collection(db, 'todos'));
    const todosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if(todosData.length > 0) {
      // 데이터가 있을 경우 마지막 데이터의 id 값을 가져와서 nextIdRef로 설정
      const lastTodo = todosData[todosData.length - 1];
      nextIdRef.current = lastTodo.id + 1;
    } else {
      // 데이터가 없을 경우 nextId 초기화 
      nextIdRef.current = 0;
    }

    setTodos(todosData);
 };

 useEffect(() => {
  loadTodos();
 }, []);

  const onInsert = useCallback(
    async text => {
      const nextId = nextIdRef.current;
      nextIdRef.current += 1; // nextId 1씩 더하기
      const todo = {
        id: nextId,
        text,
        checked: false,
      };
      await setDoc(doc(db, 'todos', nextId.toString()), todo);
      setTodos(prevTodos => [...prevTodos, todo]);
      //const newDocRef = await addDoc(collection(db, 'todos'), todo);
      //setTodos(prevTodos => [...prevTodos, { id: newDocRef.id, ...todo}]);
      
    },
    [],
  );

  const onRemove = useCallback(
    async id => {
      await deleteDoc(doc(db, 'todos', id.toString()));
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    },
    [],
  );

  const onToggle = useCallback(
    async id => {
      const todoRef = doc(db, 'todos', id.toString());
      const querySnapshot = await getDocs(todoRef);
      const todoData = querySnapshot.data();
      await updateDoc(todoRef, {
        checked: !todoData.checked,
      });
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        )
      );
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