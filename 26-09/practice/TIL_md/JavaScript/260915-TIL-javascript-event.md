## [2026-09-15] Event

### 1. 오늘 배운 핵심 개념 (What I Learned)
1. Event Handler
- addEventListener 프로퍼티로 하나의 이벤트에 다양한 이벤트 핸들러를 등록할 수 있다.
2. Event Object
- e.target: 실제로 사건(클릭 등)을 일으킨 최하위 요소. 사용자가 실제로 작동시킨 부위를 알아내야 할 때 사용한다. 이벤트가 실제로 시작된 요소. 무었을 클릭했는가?
- e.currentTarget: 이벤트 리스너가 실제로 부착된 감시 대상 요소. 내부 요소에 상관없이 리스너가 걸린 주인을 찾아야할 때. 현재 이벤트 핸들러가 등록된 요소. 어디에 속해있는가?
- 화살표 함수에서 this는 연결되지 않고 최상위 전역 객체 window를 가르킨다. 
3. Event Propagation 이벤트 전파
- 브라우저는 클릭을 감지하면 위에서 아래로 내려갔다가(캡쳐링) -> 다시 아래에서 위로 올라오면서(버블링) 실행하는데, 기본적으로 자바스크립트는 올라올 때 동작한다.
- Event Delegation: 버블링을 역이용해서 부모 요소 딱 1곳에만 리스너를 달아 하위 자식들의 이벤트를 일괄 관리한다.
4. Event control
- preventDefault(): 일부 HTML 태그는 클릭하거나 엔터를 치면 브라우저가 새로고침 같은 정해진 행동을 강제로 실행하는데 그것을 막아준다.
- stopPropagation(): 버블링 신호를 차단하는 프로퍼티이다.
5. mouse, keyboard Event
- 방금 누른 문자까지 반영된 최신 입력값을 처리해야 한다면 키보드 이벤트보다 input 이벤트가 더 적합하다.
- mouse
    - click: 눌렀다가 뗏을 때
    - mousedown: 눌렀을 때
    - mouseup: 뗏을 때
    - dbclick: 더블 클릭했을 때
- keyboard
    - keydown: 누르는 순간 (누르고 있는 동안 계속 발생)
    - keyup: 키에서 손을 떼는 순간
6. Form Event
- focus: 사용자가 입력창을 클릭하거나 Tab키로 커서를 넣었을 때.
- blur: 사용자가 입력창에서 커서가 밖으로 빠져나갔을 때.
- input: 실시간 텍스트 입력 감지

### 2. 코드 예시 (Code)
```text
- Event Handling
요소.addEventListener('이벤트종류', 실행할함수) 문법
nmixxMember.addEventListner('click', () => {});

- Event Propagation 이벤트 전파 전달 경로

[브라우저 최상단: window / document]
       │                    ▲
1. 캡처링 (내려감)      3. 버블링 (올라감 - 기본 감지 위치)
       ▼                    │
    [부모 요소: <div> / <ul>]
       │                    ▲
       ▼                    │
    [ 2. 타깃 단계: <button> 실제 클릭 지점 ]

- Form 문법
document.forms.폼네임속성값
```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- 


### 4. 내일 공부할 내용 (Next)

