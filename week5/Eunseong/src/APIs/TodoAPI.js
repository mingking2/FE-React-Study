import axios from "axios";

const todoInstance = axios.create({
  baseURL: process.env.REACT_APP_FIREBASE_RTDB_URL
});

export const getTodoList = async(setTodos) => {
  await todoInstance.get("/.json")
    .then((res) => {
      if(res.data == null){
        setTodos([])
      } else{
        setTodos(Object.values(res.data))
      }
    })
    .catch(e => console.log(e)) 
}

export const putTodoData = async(todo) => {
  await todoInstance.put(`/${todo.id}.json`, todo)
      .then()
      .catch(e => console.log(e))
}

export const delTodoData = async(id) => {
  await todoInstance.delete(`/${id}.json`, id)
    .then()
    .catch(e => console.log(e))
}

export const patchTodo = async(todo) => {
  await todoInstance.patch(`/${todo.id}.json`, todo)
}