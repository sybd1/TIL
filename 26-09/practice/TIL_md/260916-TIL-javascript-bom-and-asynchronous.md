## [2026-09-07] BOM (Browser Object Model), Asynchronous 비동기 프로그래밍

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### BOM 브라우저 객체 모델
- 브라우저 객체를 다루는 방법이다. 브라우저의 창(window), 주소창(Location), 방문기록(History), 브라우저 정보(Navigator) 등이 있다.
- 원래는 window.document.getElemetById, window.alert 처럼 window를 앞에 붙여야 하지만, window객체는 전역 객체이므로 메서드 호출 시 이를 생략할 수 있다.

#### Asynchronous

### 2. 코드 예시 (Code)
```text
- BOM code
- alert : 알림창을 실행한다.
const al = alert('등록되었습니다!')

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

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)



### 4. 내일 공부할 내용 (Next)

