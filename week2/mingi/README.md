## 6장 컴포넌트 반복 보고서
### 6.1 자바스크립트 배열의 map() 함수
- 자바스크립트 배열 객체의 내장 함수인 map 함수를 사용하여 반복되는 컴포넌트를 렌더링할 수 있다.
- map 함수는 파라미터로 전달된 함수를 사용해서 배열 내 각 요소를 원하는 규칙에 따라 변환한 후 그 겨로가로 새로운 배열을 생성한다.
<br /><br />
1. 문법
    - arr.map(callback, [thisArg])
    <br /><br />
        - **callback**: 새로운 배열의 요소를 생성하는 함수로 파라미터는 다음 세가지이다.
            - currentValue: 현재 처리하고 있는 요소
            - index: 현재 처리하고 있는 요소의 index 값
            - array: 현재 처리하고 있는 원본 배열
        <br /><br />
        - **thisArg**(선택 항목): callback 함수 내부에서 사용할 this 레퍼런스
    <br /><br />
2. 예제
    ```js
    const numbers = [1,2,3,4,5];
    const result = numbers.map(num => num * num);
    console.log(result);
    ```

<br /><br />

### 6.2 데이터 배열을 컴포넌트 배열로 변환하기
1. 컴포넌트 수정하기
```js
const IterationSample = () => {
   const names = ['눈사람', '얼음', '눈', '바람'];
   const nameList = names.map(name => <li>{name}</li>);
   return <ul>{nameList}</ul>;
};

export default IterationSample;
```
<br /><br />
2. App 컴포넌트에서 예제 컴포넌트 렌더링
- "key" prop이 없다는 경고 메세지를 표시했다. key가 뭐지?
<br /><br />
<br /><br />

### 6.3 key
- 리액트에서 key는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내려고 사용한다.
- key X: Virtual DOM을 비교하는 과정에서 리스트를 순차적으로 비교하면서 변화를 감지한다.
- key O: 이 값을 사용하여 어떤 변화가 일어났는지 더욱 빠르게 알아낼 수 있다.
<br /><br />
- key 설정
    - key 값을 설정할 때는 map 함수의 인자로 전달되는 함수 내부에서 컴포넌트 props를 설정하듯이 설정하면 된다. 
    - key 값은 언제나 유일해야 한다. 따라서 데이터가 가진 고윳값을 key 값으로 설정해야 한다.
    ```js
    const articleList = articles.map(article => (
        <Article
            title={article.title}
            writer={article.writer}    
            key={article.id}
        />
    ));
    ```
    - 앞서 만들었던 예제 컴포넌트에는 이런 고유 번호가 없다.
    - 이때는 map 함수에 전달되는 콜백 함수의 인수인 index 값을 사용하면 된다.
        ```js
        const IterationSample = () => {
            const names = ['눈사람', '얼음', '눈', '바람'];
            const nameList = names.map((name, index) => <li key={index}>{name}</li>);
            return <ul>{nameList}</ul>;
        };

        export default IterationSample;
        ```
    - 고유한 값이 없을 때만 index 값을 key로 사용해야한다.
    - index를 key로 사용하면 배열이 변경될 때 효율적으로 리렌더링하지 못한다.

<br /><br />
<br /><br />
### 6.4 응용
- 지금까지 배운 개념을 응용하여 고정된 배열을 렌더링하는 것이 아닌, 동적인 배열을 렌더링하는 것을 구현하자.
- index 값을 key로 사용하면 리렌더링이 비효율적이라고 했는데, 이러한 상황에 어떻게 고윳값을 만들 수 있는지 알아보자.
<br /><br />
1. 초기 상태 설정하기
    ```js
    const IterationSample = () => {
        const [names, setNames] = useState([
            { id: 1, text: '눈사람' },
            { id: 2, text: '얼음' },
            { id: 3, text: '눈' },
            { id: 4, text: '바람' }
        ]);
        const [inputText, setInputText] = useState('');
        const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용하는 id

        const nameList = names.map(name => <li key={name.id}>{name.text}</li>);
        return <ul>{nameList}</ul>;
    };
    ```
    - map 함수를 사용할 때 key 값을 index 대신 name.id 값으로 지정했다.
2. 데이터 추가 기능 구현하기
    ```js
    const onChange = e => setInputText(e.target.value);
    const onClick = () => {
        const nextNames = names.concat({
            id: nextId, // nextId 값을 id로 설정하고
            text: inputText
        });
        setNextId(nextId + 1); // nextId 값에 1을 더해 준다.
        setNames(nextNames); // names 값을 업데이트한다.
        setInputText(''); // inputText를 비운다.
    };

    const nameList = names.map(name => <li key={name.id}>{name.text}</li>);
    return(
        <>
            <input value={inputText} onChange={onChange} />
            <button onClick={onClick}>추가</button>
            <ul>{nameList}</ul>
        </>
    );
    ```
    - 배열에 새 항목을 추가할 때 배열의 push 함수를 사용하지 않고 concat을 사용했다.  
        - push 함수는 기존 배열 자체를 변경해 주고, concat은 새로운 배열을 만들어준다는 차이점이 있다.
<br /><br />
    - 불변성 유지를 해주어야 한중에 리액트 컴포넌트의 성능을 최적화할 수 있다.
        - 불변성 유지: 상태를 업데이트할 때는 기존 상태를 그대로 두면서 새로운 값을 상태로 설정하는 것
<br /><br />
    - onClick 함수에서 새로운 항목을 추가할 때 객체의 id 값은 nextId를 사용하도록 하고, 클릭될 때마다 값이 1씩 올라가도록 구현했다. 추가로 button이 클릭될 때 기존의 input 내용을 비우는 것도 구현했다.
    <br /><br />
3. 데이터 제거 기능 구현하기
- 이번에는 각 항목을 더블클릭했을 때 해당 항목이 화면에서 사라지는 기능을 구현하겠다.
- 불변성을 유지하면서 업데이트해 주어야 한다. 불변성을 유지하면서 배열의 특정 항목을 지울 때는 배열의 내장 함수 filter를 사용한다.
    - filter 함수를 사용하면 배열에서 특정 조건을 만족하는 원소들만 쉽게 분류할 수 있다.
    ```js
    const number = [1,2,3,4,5,6];
    const biggerThanThree = numbers.filter(number => number > 3);
    // 결과: [4, 5, 6]

    const withoutThree = numbers.filter(number => number !== 3);
    // 결과: [1,2,4,5,6]
    ```
<br /><br />
- filter 함수를 사용하여 IterationSample 컴포넌트의 항목 제거 기능을 구현하자
    ```js
    const onRemove = id => {
        const nextNames = names.filter(name => name.id !== id);
        setNames(nextNames);
    };

    const nameList = names.map(name => <li key={name.id} onDoubleClick={() => onRemove(name.id)}>{name.text}</li>);
    ```
<br /><br />
<br /><br />

### 6.5 정리
- 반복되는 데이터를 렌더링하는 방법을 배우고, 이를 응용하여 유동적인 배열을 다루어 보았다.
- 컴포넌트 배열을 렌더링할 때는 key 값 설정에 항상 주의해야 한다.
또 key 값은 언제나 유일해야 하며, 중복된다면 렌더링 과정에서 오류가 발생한다.
<br /><br />
- 상태 안에서 배열을 변형할 때는 배열에 직접 접근하여 수정하는 것이 아니라 concat, filter 등의 배열 내장 함수를 사용하여 새로운 배열 내장 함수를 사용하여 새로운 배열을 만든 후 이를 새로운 상태로 설정해 주어야 한다.
<br /><br />
<br /><br />