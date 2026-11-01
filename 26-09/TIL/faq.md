### 헷갈리는 개념 정리
#### JavaScript

- removeEventListener : DOM의 Event Target에 등록되어 있던 Event Listener를 제거하는 Web API method. 
이 method는 addEventListener를 호출할 때 인자로 전달한 함수가 매번 새로운 메모리 공간을 생성하기 때문에 Event를 지울 수 없게 된다. 반드시 함수에 이름을 붙여 변수나 선언문으로 메모리 주소를 고정해 주어야한다.
----
- return; (Early return) : return 아래에 작성된 코드를 일체 무시하고 반환한다. Call Stack에서 해당 함수의 Stack Frame (함수가 차지하는 독립 메모리 공간)을 즉시 파기하고 상위 코드로 제어권을 돌려주는 역할을 할 수 있다.
----
#### React
Virtual DOM
- Virtual DOM은 가상의 공간이지 허상의 공간이 아니다. 컴퓨터 공학에 메모리를 사용하지 않는 "마법 같은 임시 가상 공간"은 존재하지 않는다. Virtual DOM은 Plain JavaScript Object 트리이다.
    - 브라우저의 실제 DOM 노드는 수백 개의 속성과 스타일, 이벤트가 얽혀 무겁지만, React의 Virtual DOM은 가벼운 JS Object이므로 메모리를 거의 쓰지 않고 빠르게 작업할 수 있다.
    - React가 비교하는 대상은 실제 브라우저 DOM을 일일이 읽어와서 대조하지 않는다. React가 비교하는 대상은 **이전 렌더링 때 메모리에 보관해 둔 구형 가상 DOM 객체와 데이터가 바뀌어 새로 생성한 신형 가상 DOM객체이다. 메모리(RAM) 상에서 순수 자바스크립트 객체 둘을 비교(Diffing Algorithm, 차이점 비교 연산)을 하므로 밀리초 단위로 차이점을 찾아낸다.**
- 실제 DOM 노드는 단순한 데이터가 아니라, 화면상의 픽셀 좌표, 테두리 두께, 스크롤 위치, 수백 개의 CSS 스타일이 얽혀 있는 거대한 C++ 객체이다.
- Virtual DOM은 화면 좌표나 픽셀 정보가 전혀 없는 단순 JavaScript 객체({ type: 'button', props: { text: '수정' } })에 불과하다.

Reconciliation 재조정 : React가 JS와 다르게 빠른 속도를 낼 수 있는 비교 갱신 과정


        * Reconciliation 순서
        [4. 범위 한정] → [1. 계층 순회] → [2. 노드 타입 검사] → [3. 자식 Key 대조]

1. Same-Level Diffing
    - Tree의 다른 Level(층)의 노드가 아닌 자신과 같은 Level의 형제 노드들끼리만 1:1 비교를 하고 끝낸다.
2. Element Type Bailout
    - 두 노드의 HTML tag, Component 타입이 다르면 하위 자식 내용물을 아예 읽지 않는다. 내용을 비교하는 시간을 사용하지 않고, 이전 하위 트리를 통째로 Unmount(메모리에서 파기)한 뒤 새 트리를 백지부터 바로 꽂아 넣는다.
3. Key Prop
    - 목록/배열을 렌더링할 때 개발자가 부여한 key속성을 대조한다. 자식들의 텍스트 내용을 다 읽는 대신, 고유 key의 위치 변화만 확인하여 순서가 바뀐 항목만 집어내 이동시킨다.
4. Component 단위 범위 격리
    State가 바뀐 그 컴포넌트부터 시작해서 그 아래 자식들만 비교한다.