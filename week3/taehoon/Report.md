# Cp8

1. useEffect + react-use 라이브러리에 있는 두 개 이상의 훅

## useEffect

useEffect : **컴포넌트가 렌더링될 때마다** 특정 작업을 수행하도록 설정하는 Hook

- componentDidMount와 componentDidUpdate를 합친 형태

마운트될 때만 실행

- 함수의 두번째 파라미터로 비어있는 배열을 넣어준다.

```jsx
useEffect(() => {
	console.log('마운트');
}, []);
```

특정값이 업데이트될 때만 실행

- 함수의 두번째 파라미터에 검사하고 싶은 값을 넣어준다.

```jsx
useEffect(() => {
	console.log(name);
}, [name]);
```

- 배열안에 useState를 통해 관리하고 있는 상태를 넣거나, props로 전달받은 값을 넣어주어도 된다.

렌더링될 때마다 cleanup 함수가 나타난다. cleanup함수가 호출될 때는 업데이트되기 직전의 값을 보여준다.

```jsx
import React, { useEffect } from 'react';

function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log('user 값이 설정됨');
    console.log(user);
    return () => {
      console.log('user 가 바뀌기 전..');
      console.log(user);
    };
  }, [user]);
  return (
    <div>
      <b
        style={{
          cursor: 'pointer',
          color: user.active ? 'green' : 'black'
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map(user => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default UserList;
```

![Untitled](https://github.com/Tentennball/FE-React-Study/blob/main/week3/taehoon/useEffect.png?raw=true)

<코드, 사진 ref>

[16. useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기 · GitBook](https://react.vlpt.us/basic/16-useEffect.html)

## React-use

### useLockBodyScroll

모달 창이 떴을 때 마우스 스크롤을 움직이면 모달 창 뒤에 있는 UI 가 움직이지 않도록 막아주는 훅이다.

```jsx
import {useLockBodyScroll, useToggle} from 'react-use';

const Demo = () => {
  const [locked, toggleLocked] = useToggle(false)

  useLockBodyScroll(locked);

  return (
    <div>
      <button onClick={() => toggleLocked()}>
        {locked ? 'Unlock' : 'Lock'}
      </button>
    </div>
  );
```

useLockBodyScroll 훅이 호출되면서 문서의 body 태그 스타일 중 overflow 를 hidden 으로 해서 스크롤을 막아줍니다. useLayoutEffect 는 리액트 내장 훅으로 useEffect 와 다르게 렌더링 되기 전에 동작하는 훅입니다.

### useToggle

토글(toggle) 기능을 구현할 때 사용한다. 이 훅은 불리언 값의 상태를 토글(toggle)하는 데에 특화되어 있으며, 상태를 편리하게 변경하고 관리하는 데 도움이 된다.

## → 걍 useState쓰면 되는거 아님?

**1. useState를 사용한 토글 예시**

```jsx
import React, { useState } from 'react';

const ToggleComponent = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prevIsToggled) => !prevIsToggled);
  };

  return (
    <div>
      <button onClick={handleToggle}>
        {isToggled ? 'ON' : 'OFF'}
      </button>
      {isToggled && <p>Toggle is ON!</p>}
    </div>
  );
};

```

**2. useToggle을 사용한 토글 예시**

```jsx
import React from 'react';
import { useToggle } from 'react-use';

const ToggleComponent = () => {
  const [isToggled, toggle] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>
        {isToggled ? 'ON' : 'OFF'}
      </button>
      {isToggled && <p>Toggle is ON!</p>}
    </div>
  );
};

```

확실히 가독성이 좋고, useState보다 간결함을 알 수 있다. 따로 작동을 구현한 함수를 굳이 구현하지 않아도 된다.
