## [2026-09-22] Fetch, Data Component

### 1. 오늘 배운 핵심 개념 (What I Learned)


### 2. 코드 예시 (Code)
```text
Data Component 3대 State 선언 공
const [data, setData] = useState(null);      // 1. 성공 데이터 보관함
const [loading, setLoading] = useState(true);  // 2. 대기 여부 (처음엔 무조건 true!)
const [error, setError] = useState(null);      // 3. 에러 객체 보관함

Promise 문법
const getPosition = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

비동기 데이터 통신의 철칙: try - catch - finally

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- 동기,비동기 : 앞의 코드가 끝날때까지 기다렸다가 자신의 차례가 와야 실행하는 것을 sync(동기), 시간의 걸리는 일은 브라우저에서 돌려놓고 다음 코드를 즉시 실행하는 것을 async(비동기)
- Promise/ .then: 비동기 작업을 담은 객체. 당장은 결과가 없지만, 비동기 작업이 끝났을 때 "성공 결과값" 또는 "실패 결과값"을 돌려주겠다고 약속하는 객체. 결과 값은 .then 체이닝으로 넘겨받아 실행하는 문법. .then은 항상 새로운 프로미스를 반환하여 연속 처리를 가능하게 한다.
- async/await : .then()체이닝을 없애고 사람이 위에서 아래로 편하게 읽을 수 있도록 포장해 둔 Syntactic Sugar(문법적 설탕, 껍데기 편의 문법)
    - async: 비동기 함수 선언. 이 함수 안에서는 일시정지(await) 기능을 쓸 것이며, 이 함수가 내뱉는 결과는 무조건 자동으로 Promise로 감싸진다는 표시.
    - await: Promise 작업이 resolve 될 때까지 다음 줄로 넘어가지 말고 기다려라는 키워드. 
try/catch: "이 블록 안의 코드를 일단 한번 안전하게 실행(Try, 시도)해 보아라"라고 지정하는 예외 처리 구역입니다. 이 구역 안에서 에러가 터져도 프로그램이 멈추지 않고 안전하게 짝꿍인 catch로 제어권을 넘겨줍니다.

### 4. 내일 공부할 내용 (Next)

