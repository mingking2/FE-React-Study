
import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import useLocalStorage from './useLocalStorage';
import './App.css';

const App = () => {
  const [memo, setMemo] = useState('');
  const [memos, setMemos] = useLocalStorage('memos', []);

  const handleAddMemo = () => {
    if (memo.trim() !== '') {
      setMemos((prevMemos) => [...prevMemos, { id: Date.now(), text: memo }]);
      setMemo('');
    }
  };

  const handleDeleteMemo = (memoId) => {
    setMemos((prevMemos) => prevMemos.filter((m) => m.id !== memoId));
  };

  return (
    <div className="App">
      <h1>Memo App</h1>
      <div>
        <input
          type="text"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="Enter your memo..."
        />
        <button onClick={handleAddMemo}>
          <FaPlus />
        </button>
      </div>
      <ul>
        {memos.map((m) => (
          <li key={m.id}>
            {m.text}
            <button onClick={() => handleDeleteMemo(m.id)}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
