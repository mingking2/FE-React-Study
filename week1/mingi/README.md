# DOM vs. VirtualDOM
## DOM(Document Object Model)
    - 객체로 문서 구조를 표현하는 방법으로 XML이나 HTML로 작성한다.
    - 웹 브라우저는 DOM을 활용하여 객체에 자바스크립트와 CSS를 적용한다.
    - DOM은 트리 형태라서 특정 노드를 찾거나 수정하거나 삭제하거나 원하는 곳에 삽입할 수 있다.
<bR><BR>
- DOM은 느린가?
    - 요즘 DOM API를 수많은 플랫폼과 웹 브라우저에서 사용하는데, **DOM의 문제점은 바로 동적 UI에 최적화되어 있지 않다는 것이다.**
    - HTML은 자체적으로는 정적이지만 자바스크립트를 사용하여 동적으로 만들 수 있다.
    - 하지만 요즘 흔히 접하는 큰 규모의 웹 애플리케이션(페이스북)을 생각해보자.
        - 스크롤바를 내릴수록 수많은 데이터가 로딩된다.
        - 규모가 큰 웹 애플리케이션에서 DOM에 직접 접근하여 변화를 주다 보면 성능 이슈가 조금씩 발생하기 시작한다. = 느려진다.
        - DOM자체는 빠르다. **단, 웹 브라우저 단에서 DOM에 변화가 일어나면 웹 브라우저가 CSS를 다시 연산하고, 레이아웃을 구성하고, 페이지를 리페인트한다.**
        - 이 과정에서 시간이 허비된다.
            <bR><BR>
- 해결법
    - DOM을 조작할 때마다 엔진이 웹 페이지를 새로 그리기 때문에 업데이트가 너무 잦으면 성능이 저하될 수 있다.
    - DOM을 최소한으로 조작하여 작업을 처리하는 방식으로 개선할 수 있다.
    - **리액트는 Virtual DOM 방식을 사용하여 DOM 업데이트를 추상화함으로써 DOM 처리 횟수를 최소화하고 효율적으로 진행한다.**
    <bR><BR>
    <bR><BR>

## Virtual DOM
- Virtual DOM을 사용하면 실제 DOM에 접근하여 조작하는 대신, 이를 추상화한 자바스크립트 객체를 구성하여 사용한다.
<bR><BR>
- 리액트에서 데이터가 변하여 웹 브라우저에 실제 DOM을 업데이트할 때는 다음 세 가지 절차를 밟는다.
    1. 데이터를 업데이트하면 전체 UI를 Virtual DOM에 리렌더링한다.
    2. 이전 Virtual DOM에 있던 내용과 현재 내용을 비교한다.
    3. 바뀐 부분만 실제 DOM에 적용한다.

<bR><BR>
- 오해
    - Virtual DOM을 사용한다고 해서 사용하지 않을 때와 비교하여 무조건 빠른 것은 아니다.
    - **지속적으로 데이터가 변환하는 대규모 애플리케이션 구축하기** 
    - 래액트와 Virtual DOM이 언제나 제공할 수 있는 것은 바로 업데이트 처리 간결성이다. UI를 업데이트하는 과정에서 생기는 복잡함을 모두 해소하고, 더욱 쉽게 업데이트에 접근할 수 있다.
        