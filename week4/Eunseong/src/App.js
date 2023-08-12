import TodoTemplet from "./Component/TodoTemplet";
import TodoInsert from "./Component/TodoInsert";
import TodoList from "./Component/TodoList";
import { useCallback, useState, useEffect, } from "react";
import { fireStore } from "./Firebase";
import { doc, collection, setDoc, getDocs, deleteDoc, updateDoc, getDoc} from "firebase/firestore";

function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    readTodoList()
  }, [])


  const onInsert = useCallback(text => {
    const todo = {
      id: new Date().getTime(),
      text: text,
      checked: false
    }
    creatTodo(todo)
    readTodoList()
  }, [])

  const onRemove = useCallback((id) => {
    deleteTodo(id)
    readTodoList()
  }, [])

  const onToggle = useCallback((id) => {
    updateTodo(id)
    readTodoList()
  }, [])


  // CRUD
  const creatTodo = async (data) => {
    try {
      await setDoc(doc(fireStore, "TodoList", data.id.toString()), {...data})
    } catch (e) {
      alert("creatTodo Error")
    }
  }
  const readTodoList = async () => {
    try{
      let temp = []
      const snapshot = await getDocs(collection(fireStore, "TodoList"));
      snapshot.forEach((doc) => {
        const todo = doc.data()
        temp.push(todo)
        setTodos(temp)
      })
    } catch(e) {
      alert("readTodoList Error")
    }
  }
  const updateTodo = async (id) => {
    const isCheked = (await getDoc(doc(fireStore, "TodoList", id.toString()))).data().checked
    await updateDoc(doc(fireStore, "TodoList", id.toString()), {checked: !isCheked})
  }

  const deleteTodo = async (id) => {
    await deleteDoc(doc(fireStore, "TodoList", id.toString()))
  }


  return (
    <TodoTemplet>
      <TodoInsert onInsert = {onInsert}></TodoInsert>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}></TodoList>
    </TodoTemplet>
  );
}

export default App;
