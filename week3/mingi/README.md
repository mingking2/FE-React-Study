# 보고서 #2 useContext hook + react-use 라이브러리에 있는 두 개 이상의 훅

## useContext hook

useContext는 React 라이브러리에서 제공하는 훅(Hook) 중 하나로, 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달하기 위해 사용된다. 이 훅을 사용하면 컴포넌트 간에 데이터를 손쉽게 공유할 수 있으며, 컴포넌트 계층 구조가 깊거나 중첩되어 있을 때 유용하게 활용될 수 있다.


- useContext의 기능과 동작 방식
    - useContext 훅은 React 컴포넌트에서 컨텍스트(Context)를 사용할 수 있도록 도와준다. 컨텍스트는 전역적으로 데이터를 공유하기 위한 메커니즘으로, 컴포넌트 간에 데이터를 직접 전달하지 않고도 데이터를 공유할 수 있게 해준다.

    - 기본적으로 useContext 훅은 두 개의 값으로 이루어진 배열을 반환한다. 첫 번째 값은 현재 컨텍스트의 상태 값이며, 두 번째 값은 해당 컨텍스트의 상태 값을 업데이트하는 함수이다.

<br><br>
- useContext 사용법

    1. 컨텍스트 객체 생성: 먼저, 컨텍스트 객체를 생성한다. 이 객체는 createContext() 함수를 사용하여 생성된다.

        ```jsx
        // MyContext.js
        import { createContext, useState } from 'react';

        const MyContext = createContext();
        ```
    <br><br>
    
    2. 컨텍스트 제공자 생성: 컨텍스트 제공자(Provider)는 컨텍스트를 사용할 컴포넌트들을 감싸고, 해당 컴포넌트들에게 컨텍스트 값을 전달하는 역할을 한다.   

    3. 컨텍스트 값 업데이트: 컨텍스트 제공자 안에서 상태 값과 업데이트 함수를 정의한 후, 해당 값들을 MyContext.Provider 컴포넌트의 value 속성에 전달한다.

        ```jsx
        const MyContextProvider = ({ children }) => {
            const [count, setCount] = useState(0);

            const increment = () => {
                setCount((prevCount) => prevCount + 1);
            };

            return (
                <MyContext.Provider value={{ count, increment }}>
                {children}
                </MyContext.Provider>
            );
        };

        export { MyContext, MyContextProvider };
        ```
        - MyContext는 컨텍스트 객체이고, MyContextProvider는 컨텍스트를 제공하는 컴포넌트이다. 
        - 이 컨텍스트에는 count라는 상태 값과 increment라는 상태 값을 업데이트하는 함수가 포함되어 있다.
        <br><br>
    
        ```jsx
        // App.js
        import React from 'react';
        import { MyContextProvider } from './MyContext';
        import ChildComponent from './ChildComponent';

        const App = () => {
            return (
                <MyContextProvider>
                <div>
                    <h1>Counter App</h1>
                    <ChildComponent />
                </div>
                </MyContextProvider>
            );
        };

        export default App;
        ```
        - MyContextProvider 컴포넌트를 애플리케이션 최상위 컴포넌트로 감싸서 모든 자식 컴포넌트에서 MyContext의 상태와 업데이트 함수에 접근할 수 있게 만든다.
        <br><br>
        <br><br>

    4. 컨텍스트 사용: 이제 useContext 훅을 사용하여 컨텍스트 값을 가져올 수 있다.

        ```jsx
        // ChildComponent.js
        import React, { useContext } from 'react';
        import { MyContext } from './MyContext';

        const ChildComponent = () => {
        const { count, increment } = useContext(MyContext);

        return (
            <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            </div>
        );
        };

        export default ChildComponent;
        ```
        - ChildComponent에서 useContext 훅을 사용하여 MyContext에서 count와 increment를 가져와 사용한다. 

        - count는 현재 상태 값을 보여주고, increment는 버튼을 클릭하면 상태 값을 업데이트하는 함수이다.



- useContext의 주요 장점
    1. 상태 전달 간소화: <BR>
    useContext를 사용하면 중간 컴포넌트를 거치지 않고도 상태를 하위 컴포넌트로 전달할 수 있다. 이로 인해 컴포넌트 간에 데이터를 전달하는 프로세스가 간소화되고, 코드의 복잡성이 줄어든다.

    2. 중첩된 컴포넌트에서의 효율성: <BR>
    컴포넌트 계층 구조가 복잡하고 중첩되어 있을 때, useContext를 사용하여 데이터를 공유하면 상태를 전달하는 것보다 훨씬 간편하고 효율적이다.

    3. 전역 상태 관리:<BR>
    useContext를 이용하면 상위 컴포넌트에서 전역 상태를 관리할 수 있다. 이를 통해 여러 컴포넌트에서 동일한 상태 값을 사용하거나 수정할 수 있다.

    4. 컴포넌트 분리:<BR>
    useContext를 사용하면 데이터 관리와 UI를 분리할 수 있다. 데이터를 제공하는 컨텍스트 제공자와 데이터를 소비하는 컴포넌트들을 분리하여 코드의 유지보수성을 향상시킬 수 있다.


## useForm hook

useForm은 React 라이브러리에서 제공하는 커스텀 훅(Custom Hook)으로, 폼(Form) 관련 로직을 추상화하여 간편하게 사용할 수 있도록 도와준다. 폼을 다루는데 필요한 상태 값들과 이벤트 핸들러 함수들을 쉽게 관리할 수 있게 해주어, 폼 처리를 더욱 간편하고 효율적으로 할 수 있다.

- useForm hook의 기능

    - 폼 필드 값 관리: 훅 내부에서 폼 필드의 값들을 상태로 관리한다.
    - 폼 필드 값 업데이트: 입력 필드의 값이 변경될 때 자동으로 상태를 업데이트하고, onChange 이벤트 핸들러를 통해 값을 설정할 수 있다.
    - 폼 전송 처리: 폼을 전송할 때 이벤트 핸들러 함수를 호출하여 폼 데이터를 처리한다.


- useForm hook의 사용법

    ```jsx
    import React from 'react';
    import { useForm } from 'react-hook-form';

    const App = () => {
        const { register, handleSubmit, reset } = useForm();

        const onSubmit = (data) => {
            // 폼 데이터를 처리하는 로직을 작성합니다.
            console.log(data);

            // 폼 제출 후 입력 필드 초기화
            reset();
        };

        return (
            <div>
                <h1>Contact Form</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" ref={register} />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" ref={register} />
                    </div>
                    <div>
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" ref={register} />
                    </div>
                        <button type="submit">Submit</button>
                </form>
            </div>
        );
    };

    export default App;
    ```
    - react-hook-form 라이브러리의 useForm 훅을 이용하여 폼을 처리한다. useForm hook은 register, handleSubmit, reset 등의 기능을 제공한다.

        - register: 폼 필드들을 useForm 훅에 등록한다.
        - handleSubmit: 폼 제출 시 호출할 함수를 등록하고, 해당 함수를 폼의 onSubmit 속성에 전달한다.
        - reset: 폼 제출 후 입력 필드를 초기화한다.
<br><br>
    - 입력 필드들을 ref={register}와 같이 등록하고, 폼 제출 시 handleSubmit(onSubmit)를 호출하여 폼 데이터를 처리한다.
<br>
    - 이렇게 react-hook-form을 사용하면 간편하게 폼을 처리할 수 있으며, 입력값의 유효성 검사 등 다양한 기능들도 제공되어 복잡한 폼 처리를 더욱 편리하게 구현할 수 있다.
