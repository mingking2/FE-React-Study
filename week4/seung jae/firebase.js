import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
  update,
} from "firebase/database";

const firebaseConfig = {
  //연동 키
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const updateData = (setTodos, callback) => {
  let nextIds = 0 ;
  onValue(ref(db), (snapshot) => {
   snapshot.val() !== null
      ? (() => {
          const obj = Object.entries(snapshot.val());
          const tmp = [];
          obj.map((todo) => tmp.push(todo[1]));
          obj.forEach((todo) => { if (todo[1].id > nextIds) nextIds = todo[1].id; });
          setTodos(tmp);
          callback(nextIds+1);
        })()
      : (() => {
        const tmp = [];
        setTodos(tmp);
        callback(nextIds+1);
      })()
      
  });
};

const addData = (todo) => {
  set(ref(db, `/${todo.text}`), todo);
};

const editData = (todo) => {
  update(ref(db, `/${todo.text}`), todo);
};

const removeData = (todo) => {
  remove(ref(db, `/${todo.text}`));
};

const firebase ={
  updateData : updateData,
  addData: addData,
  editData : editData,
  removeData: removeData
};

export default firebase;