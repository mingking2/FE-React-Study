import { useCallback, useState } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';

const useLocalStorage = (key, initialValue) => {

  const [storedValue, setStoredValue] = useState(() => {
    const item = reactLocalStorage.getObject(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = useCallback((value) => {
      setStoredValue(value);
      reactLocalStorage.setObject(key, JSON.stringify(value));
  }, []);
  
  return [storedValue, setValue];
};

export default useLocalStorage;
