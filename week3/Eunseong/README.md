# Weak3 Report

## useCallback
> `useCallback` is a React Hook that lets you cache a function definition between re-renders.  

`useCallback`은 re-render 사이에 함수정의를 캐시할 수 있게 해주는 React Hook이다.

-> 기본적으로 컴포넌트가 내부에 정의한 함수는 리랜더링 될 때마다 새로 만들어 진다. 그러나 `useCallback`사용 시 해당 함수를 재사용 할 수 있게 해준다 -> 성능 최적화에 사용

- 함수 원형 :  
  `useCallback(func, dependencies)`
  - func : 재 사용할 함수
  - 의존 배열 : 의존 배열에 존재하는 변수의 값이 변경될 경우 함수 재 생성

- 예시 :  
  다음과 같은 함수가 컴포넌트에 정의되어 있다고 하였을 때 해당 컴포넌트가 리랜더링 될 때마다 해당함수가 새로 생성된다.
  ```jsx
  const add = () => x + y;
  ```
  그러나 `useCallback`를 다음과 같이 사용한다면 해당 함수 내부에서 사용되는 변수 `x`와 `y`의 값이 바뀌어야 새로 함수가 생성이 된다. 즉 `x`와 `y`의 값이 바뀌지 않는다면 다음 랜더링에도 해당 함수를 재사용할 수 있다.
  ```jsx
  const add = useCallback(() => x + y, [x, y]);
  ```

- JS의 함수 동등성  
  JS의 경우 함수 또한 객체로 취급되기 때문에 함수를 비교시 메모리 주소에 의한 참조비교가 일어남.  
  ```js
  > const add1 = () => x + y;
  undefined
  > const add2 = () => x + y;
  undefined
  > add1 === add2
  false
  ```

- 실제 사용 :  
1. useEffect의 의존 배열에 함수를 넘겨주는 경우 : 오류 방지  
  미 사용시 :
  랜더링 -> 함수 참조값 변경 -> useEffect() -> 랜더링 -> 함수 참조값 변경 -> useEffect() -> 랜더링 -> ...

2. 자식 컴포넌트에세 props로 함수를 넘겨주는 경우 : 성능 최적화(React.memo와 함께 사용)

    > `React.memo()` : 해당 함수로 감싼 컴포넌트의 경우 props값이 변경이 되어야만 리랜더링

    다음과 같은 함수형 컴포넌트가 있다고 하자. 해당 컴포넌트의 경우 props로 방의 이름과 방의 전등의 켜짐 여부, 전등 상태를 토글할 수 있는 함수를 받는다.
    ```jsx
    function Light({ room, on, toggle }) {
      console.log({ room, on });
      return (
        <button onClick={toggle}>
          {room} {on ? "💡" : "⬛"}
        </button>
      );
      }
    Light = React.memo(Light);
    ```
    위의 `Lignt`컴포넌트를 자식 컴포넌트로 가지는 `SmartHome`의 컴포넌트가 다음과 같을 때, 만약 주방(kitchen)을 조작하는 경우에도 모든 컴포넌트가 리랜더링되게 된다. 왜냐하면 주방에 관한 상태가 변경되면서 리랜더링이 일어나게 되는데, 이때 토글과 관련된 모든 함수들이 재생성 되어 기존 함수와의 참조값이 달라지게 되고, 이를 props로 받기 때문에 `React.memo()`를 사용하였음에도 주방을 제외한 `Light`컴포넌트에서도 props가 변경되었다가 판단하여 리랜더링을 하게 된다.
    ```jsx
        function SmartHome() {
      const [masterOn, setMasterOn] = useState(false);
      const [kitchenOn, setKitchenOn] = useStat(false);
      const [bathOn, setBathOn] = useState(false);

      const toggleMaster = () => setMasterOn(!masterOn);
      const toggleKitchen = () => setKitchenOn(!kitchenOn);
      const toggleBath = () => setBathOn(!bathOn);

      return (
        <>
          <Light room="침실" on={masterOn} toggle={toggleMaster} />
          <Light room="주방" on={kitchenOn} toggle={toggleKitchen} />
          <Light room="욕실" on={bathOn} toggle={toggleBath} />
        </>
      );
    }
    ```
    그러나 토글 관련 함수를 `useCallback`을 사용하여 다음과 같이 선언하였을 때 주방(kitchen)을 조작하는 경우 주방과 관련된 토글 함수만 재 정의 되므로 주방의 `Light`컴포넌트에만 props에 변화가 생기게 된다. 따라서 나머지 `Light`컴포넌트의 경우 리랜더링이 되지 않고, 주방의 `Light`컴포넌트만 리랜더링이 된다. 이러한 방식으로 `useCallback`을 통해 성능을 최적화 할 수 있다.
    ```jsx
      const toggleMaster = useCallback(() => setMasterOn(!masterOn), [masterOn]);
      const toggleKitchen = useCallback(() => setKitchenOn(!kitchenOn),
      [kitchenOn]);
      const toggleBath = useCallback(() => setBathOn(!bathOn), [bathOn]);
    ```

Ref :   
[React Hooks: useCallback 사용법](https://www.daleseo.com/react-hooks-use-callback/)  
[]()



## react-use

### useIdle
페이지 사용자가 유휴 상태인지 추적하는 후크
```jsx
  import {useIdle} from 'react-use';

  const Demo = () => {
    const isIdle = useIdle(3e3);

    return (
      <div>
        <div>User is idle: {isIdle ? 'Yes 😴' : 'Nope'}</div>
      </div>
    );
  };
```
해당 코드의 경우 3초동안 사용자의 움직임이 감지되지 않은 경우 `Nope`을 출력함

- 함수 원형
```jsx
  useIdle(ms, initialState);
```
`ms` : 유휴상태를 확인하는 기준 시간(해당 시간동안 반응이 없는 경우 유휴상태), ms단위로 dafault값은 1분
`initialState` : 유휴상태에 대해 처음 상태를 유휴상태로 간주할 것인지에 대한 여부, dafault값은 false


## useClickAway
사용자가 특정 요소가 아닌 다른 요소를 클릭하였을 경우 callback실행
```jsx
  import {useClickAway} from 'react-use';

  const Demo = () => {
    const ref = useRef(null);
    useClickAway(ref, () => {
      console.log('OUTSIDE CLICKED');
    });

    return (
      <div ref={ref} style={{
        width: 200,
        height: 200,
        background: 'red',
      }} />
    );
  };
```

## useKey
사용자가 특정 key를 누른 경우 핸들러 실행
```jsx
  import {useKey} from 'react-use';

  const Demo = () => {
    const [count, set] = useState(0);
    const increment = () => set(count => ++count);
    useKey('ArrowUp', increment);

    return (
      <div>
        Press arrow up: {count}
      </div>
    );
  };
``` 
Or
```jsx
import UseKey from 'react-use/lib/component/UseKey';
<UseKey filter='a' fn={() => alert('"a" key pressed!')} />
```