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
  /**
   * set your cofiguration
   */
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const writeData = (todo) => {
  set(ref(database, `/${todo.text}`), todo);
};

const readData = (setTodos) => {
  onValue(ref(database), (data) => {
    console.log(data.val());
    data.val() !== null
      ? (() => {
          const tmp = [];
          Object.entries(data.val()).map((i) => tmp.push(i[1]));
          console.log(tmp);
          setTodos(tmp);
        })()
      : setTodos([]);
  });
};

const updateData = (todo) => {
  update(ref(database, `/${todo.text}`), todo);
};

const removeData = (todo) => {
  remove(ref(database, `/${todo.text}`));
};

const firebase = {
  writeData: writeData,
  readData: readData,
  removeData: removeData,
  updateData: updateData,
};

export default firebase;
