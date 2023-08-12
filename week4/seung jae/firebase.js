import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  //내꺼
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;