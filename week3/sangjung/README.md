## week3
### useTransaction 

상태 변화의 우선순위를 지정하기 위해 useTransition 훅이 새로 도입되었다. [isPending, startTransition] 을 반환하는데, isPending 은 작업이 지연되고 있음을 알리는 boolean 이며, startTransition 은 낮은 우선순위로 실행할 함수를 인자로 받는다. 다음과 같이 사용할 수 있다.

`function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  
  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    })
  }
  

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}`

### useLocalStorage

useLocalStorage 훅은 브라우저의 로컬 스토리지(Local Storage)를 사용하여 데이터를 저장하고 가져오는 기능을 제공합니다. 이 훅은 로컬 스토리지에 데이터를 영구적으로 저장할 수 있어서, 새로고침이나 페이지 이동 후에도 데이터가 유지됩니다. 사용자의 입력값이나 상태를 저장하거나, 특정 설정을 유지하는 데 유용하게 사용할 수 있습니다.


#### 참고
1. [React Docs](https://react.dev/reference/react#ref-hooks)
2. [React-use Library](https://github.com/streamich/react-use)