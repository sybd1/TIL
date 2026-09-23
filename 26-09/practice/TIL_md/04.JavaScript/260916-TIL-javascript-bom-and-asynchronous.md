## [2026-09-16] BOM (Browser Object Model), Asynchronous 비동기 프로그래밍

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### BOM 브라우저 객체 모델
- 브라우저 객체를 다루는 방법이다. 브라우저의 창(window), 주소창(Location), 방문기록(History), 브라우저 정보(Navigator) 등이 있다.
- 원래는 window.document.getElemetById, window.alert 처럼 window를 앞에 붙여야 하지만, window객체는 전역 객체이므로 메서드 호출 시 이를 생략할 수 있다.

#### Asynchronous
- 자바 스크립트 엔진은 싱글 스레드이며 기본적으로 동기 처리 방식을 사용한다.
- 동기 처리방식은 여러 가지 작동이 일어나면 순서대로 하나씩 해결하게 된다. 그러다 앞선 작업이 끝날때까지 다음 작업이 대기해야 하는 상황이 오는데 그것은 Blocking이라고 한다.
- 자바스크립트는 브라우저와 함께 비동기 처리 방식을 사용할 수 있다. Call Stack, Web API, Task Queue, Event Loop에서 순서대로 비동기 처리 작업을 진행한다.
    - Call Stack : JavaScript 엔진이 현재 실행 중인 작업 공간
    - Web API : 브라우저가 제공하는 타이머, 이벤트, 네트워크 처리 공간
    - Task Queue : 비동기 작업이 끝난 뒤 실행 대기 중인 콜백들이 줄 서는 공간
    - Event Loop : Call Stack이 비었는지 수시로 확인하고, Queue의 콜백이 다시 Stack으로 올려주는 관리자

### 2. 코드 예시 (Code)
```text
- BOM code
- alert : 알림창을 실행한다.
const al = alert('NSWER 4기 축하드립니다!')

-confirm : 확인/취소 버튼을 누르면 true/false boolean값을 반환한다.
$confirmBtn.addEventListener('click', () => {
const answer = confirm('결제를 진행하시겠습니까?');
if (answer) {
    $message.textContent = '결제를 진행합니다.';
} else {
    $message.textContent = '결제가 취소되었습니다.';
}
});
-prompt : 텍스트 창에서 사용자의 텍스트를 입력 받는다.
$promptBtn.addEventListener('click', () => {
    const name = prompt('당신은 몇 기 NSWER입니까?');
    if (name) {
        $message.textContent = '환영합니다 ${}님!!';
    } else {
        $message.textContent = '돌아가라.';
    }
});

- location
location.href = "주소" // 해당 주소로 이동. 브라우저 방문 기록에 남는다.
location.replace("주소"); // 현재 페이지를 새페이지로 대체하여 방문 기록에 남지 않는다.
location.reload(); // 현재 페이지를 새로고침한다.

- history 객체로 브라우저에서 앞 뒤로 가는 버튼 기능을 흉내 낼 수 있다.
history.back() // 뒤로 가기
history.forward() // 앞으로 가기
history.go(-2) // 2페이지 뒤로 가기

- navigator. // 브라우저 종류, 운영체제, 화면 크기 등의 정보를 얻을 수 있다.

- Timer 함수 setTimeout(), setInterval(), clearTimeout()
- setTimeout
const timerId = setTimeout((name) => {
    console.log(`${name}, 일어나 3초나 지났어`);
}, 3000, "지우야");

- setInterval
let count = 1
const intervalId = setInterval(() => {
    console.log(`일어나! 해원아! ${count}초 지나가고 있어!`);

    if (count++ === 10) {
        clearInterval(intervalId);
        console.log('일어났구나 오해원...');
    }
},1000);

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)



### 4. 내일 공부할 내용 (Next)
- React State
