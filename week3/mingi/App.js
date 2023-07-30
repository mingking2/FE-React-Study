
import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import useLocalStorage from './useLocalStorage';
import './App.css';

const App = () => {
  const [memo, setMemo] = useState('');
  const [memos, setMemos] = useLocalStorage('memos', []);

  const handleAddMemo = () => {
    if (memo.trim() !== '') {
      setMemos([...memos, { id: Date.now(), text: memo }]); // ES6의 확산 연산자를 사용하여 배열을 복사하고, 새로운 요소를 추가하는 방법
      setMemo('');
    }
  };

  const handleDeleteMemo = (memoId) => {
    setMemos(memos.filter((m) => m.id !== memoId));
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
            {m.text.replace(/ /g," \u00A0")}
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
