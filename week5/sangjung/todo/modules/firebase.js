import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc , getDocs, collection, deleteDoc } from "firebase/firestore";
  
// Initialize Firebase
const app = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE));
const db = getFirestore(app);
const todosDB = collection(db, "todos");

const setDB = async(id, data) => { 
    await setDoc(doc(db,"todos", String(id) ), data);
}

const getDB = async() => {
    const snapshot = await getDocs(todosDB);
    const newAry = [];
    snapshot.forEach((doc) => {
        const obj = doc.data(); 
        obj.id = Number(doc.id);
        newAry.push(obj);
    });
    return newAry;
}

const deleteDB = async(id) => {
    await deleteDoc(doc(db, "todos", String(id)));
}

const firebase = {
    get : getDB,
    set : setDB,
    _delete : deleteDB,
    patch : setDB
}

export default firebase;