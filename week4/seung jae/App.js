import { useState, useRef, useCallback, useEffect } from 'react';
import TodoTemplate from './compoent/TodoTemplate';
import TodoInsert from './compoent/TodoInsert';
import TodoList from './compoent/TodoList';
import firebase from './firebase';

const App = () => {
  useEffect(() =>{ //제일 처음 db와 동기화, 스냅샷 저장, id값 불러오기
    firebase.updateData(setTodos, (value) => nextId.current = value);
  },[]);
  const [todos, setTodos] = useState([]);
  const nextId = useRef(1);

  const onInsert = useCallback((text) => {  //todo 추가
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };

    firebase.addData(todo);
  },[]);

  const onRemove = useCallback((id) => {  //todo 삭제
    setTodos(todos.filter((todo) => {
      if (todo.id === id) {
        firebase.removeData(todo);  //해당하는 id의 todo 삭제
        return false;
      } else return true;
    }))
  },[todos]);

  const onToggle = useCallback((id)=> {   //todo 변경(checked)
    setTodos( todos.map(todo =>{
      if(todo.id === id){
        const tmp = { ...todo, checked: !todo.checked};
        firebase.editData(tmp);
        return tmp;
      } else return todo;
    }))
  },[todos]);

  return (
    <div>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
      </TodoTemplate>
    </div>
  );
};

export default App;
