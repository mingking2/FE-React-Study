import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDE7q6tx9-uNE39-A8wBLzCGJbXj7dn_DQ',
  authDomain: 'test1-36c17.firebaseapp.com',
  databaseURL: 'https://test1-36c17-default-rtdb.firebaseio.com',
  projectId: 'test1-36c17',
  storageBucket: 'test1-36c17.appspot.com',
  messagingSenderId: '603725669740',
  appId: '1:603725669740:web:66c0db094326fb7bec3f49',
  measurementId: 'G-XXZ4J8R04F',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
