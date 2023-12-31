useReducer
=============

### What is Reducer?
Reducer는 현재 상태와 업데이트를 위해 필요한 정보를 담은 액션 값을 전달 받아 새로운 상태를 반환하는 함수입니다. **Reducer 함수에서 새로운 상태를 만들 때는 반드시 불변성을 지켜 주어야 합니다.**

### Why use?
컴포넌트 내에서 관리하는 상태가 많아지게 되면 그에 따른 함수 관리도 힘들어집니다. 따라서 다수의 상태를 한 번에 관리하고자 할 때 사용합니다. 

상태관리 함수를 컴포넌트 외부로 빼 낼 수도 있습니다. 상태관리 함수의 action 인자는 어떤 값이든 받을 수 있습니다. 이를 통해 상황에 맞는 다양한 구현이 가능합니다.


### code
```javascript
import { useReducer } from 'react';

const incremented_age = 'incremented_age';
const incremented_money = 'incremented_money';

function reducer(state, action) {
  switch (action.type) {
    case incremented_age:
      return {
        ...state,   // 불변성
        age: state.age + 1
      }
    case incremented_money:
      return {
        ...state,   // 불변성
        money: state.money + 1
      }
    default:
      throw Error('Unknown action.');
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, {
    age: 42,
    money: 50
  });

  return (
    <>
      <button onClick={() => {
        dispatch({ type: incremented_age })
      }}>
        Increment age
      </button>
      <button onClick={() => {
        dispatch({ type: incremented_money })
      }}>
        Increment Money
      </button>
      <p>Hello! You are {state.age}.</p>
      <p>Hello! You are {state.money}.</p>
    </>
  );
}
```

<br>
<br>
<br>

useLastest
=============

### What is useLastest?
최신 상태를 반환하는 React 상태 Hook

### Why use?
이는 주로 콜백이 생성된 시점의 값 대신 비동기 콜백 내부의 일부 프로퍼티나 상태의 최신 값에 액세스하는 데 유용합니다.

### code
실행 코드
```javascript
import React, { useState } from 'react';
import { useLatest } from 'react-use';

const App = () => {
  const [count, setCount] = useState(0);
  const latestCount = useLatest(count);

  function handleAlertClick() {
    setTimeout(() => {
      alert(`Latest count value: ${latestCount.current}`);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  );
};

export default App;
```
<br>

useLastest.ts
```typescript
import { useRef } from 'react';

const useLatest = <T>(value: T): { readonly current: T } => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};

export default useLatest;
```

<br>
<br>
<br>

### reference
[React](https://react.dev/) <br>
[react-use](https://github.com/streamich/react-use) <br>
[useReducer](https://react.dev/reference/react/useReducer) <br>
[useLatest](https://github.com/streamich/react-use/blob/master/docs/useLatest.md) <br>
