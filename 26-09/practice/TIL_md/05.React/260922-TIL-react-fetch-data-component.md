## [2026-09-22] Promise, async/await, API Fetch, Data Component

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### Promise/ .then
- Promise: 비동기 작업을 담은 객체. pending(대기), Fufilled(성공), rejected(실패) 상태 중 하나를 가진다.
- .then(): Promise가 성공적으로 작업을 끝냈을 때, "그럼 그 결과물을 받아서 다음 작업 실행" 이라는 메서드. 
- 실패하면 .catch()로 에러를 잡아챈다.

        aysnc (비동기): 시간이 걸리는 작업(서버 통신, 타이머 등)을 컴퓨터 백그라운드에 맡겨두고, 작업 완료를 기다리지 않고 바로 다음 코드로 넘어간다.
        sync (동기): 앞선 코드가 완전히 끝날 때까지 다음 코드가 멈춰서서 기다린다.

#### async/await
- Promise를 완전히 대체하는 새로운 기술이 아니라, Promise를 일반적인 코드처럼 위에서 아래로 깔끔하게 읽히도록 겉모습을 다듬은 최신 문법.
- async: 함수 선언문 앞에 적으며, "이 함수 안에서는 비동기 처리를 await로 풀어서 쓰겠다"고 선언하는 키워드.
- await: Promise를 반환하는 코드 앞에만 붙일 수 있다. "이 비동기 작업이 완전히 끝날 때까지 다음 줄로 넘어가지 말고 여기서 잠깐 기다려라"는 뜻.
- .then/.catch 대신 try/catch를 사용한다. (try(): 에러가 나지 않으면 catch 무시하고 실행. 에러가 나면 즉시 실행 중단하고 catch 블록으로 점프.)

#### API Fetch, axios
- API: 프로그램과 프로그램이 대화할 수 있도록 열어둔 공식 데이터 주소.
- fetch: 브라우저에 기본 내장된 인터넷 통신 함수. URL을 가져올 수 있는 기능.
- HTTP 에러: 제대로 된 주소값을 받아오지 못 함. 404는 요청을 했는데 리소스가 없을 때.
- axios: JS에서 HTTP 요청을 보내기 위한 외부 라이브러리. fetch와 달리 별도로 설치를 해야 한다. HTTP에러를 자동으로 reject 해준다. catch에서 처리해주기만 하면 된다. json 파싱이 자동으로 되어 response.data에 담겨있다.

### 2. 코드 예시 (Code)
```text

- Promise 문법
const getPosition = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};


- React에서 함수 호출하는 문법
<SearchBox onSearch={hadleSearch} />


- API Fetch
// 1. API 창구로 날아가서 응답을 받아옴 (Fetch)
const res = await fetch('https://api.github.com/emojis');

// 2. 받아온 데이터를 자바스크립트 객체로 변환
const data = await res.json();

// 3. 이제 화면에 데이터를 뿌리면 끝!
console.log(data);


- Data Component 3대 State 선언 공
const [data, setData] = useState(null);      // 1. 성공 데이터 보관함
const [loading, setLoading] = useState(true);  // 2. 대기 여부 (처음엔 무조건 true!)
const [error, setError] = useState(null);      // 3. 에러 객체 보관함

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- 동기,비동기 : 앞의 코드가 끝날때까지 기다렸다가 자신의 차례가 와야 실행하는 것을 sync(동기), 시간의 걸리는 일은 브라우저에서 돌려놓고 다음 코드를 즉시 실행하는 것을 async(비동기)
- Promise/ .then: 비동기 작업을 담은 객체. 당장은 결과가 없지만, 비동기 작업이 끝났을 때 "성공 결과값" 또는 "실패 결과값"을 돌려주겠다고 약속하는 객체. 결과 값은 .then 체이닝으로 넘겨받아 실행하는 문법. .then은 항상 새로운 프로미스를 반환하여 연속 처리를 가능하게 한다.
- async/await : .then()체이닝을 없애고 사람이 위에서 아래로 편하게 읽을 수 있도록 포장해 둔 Syntactic Sugar(문법적 설탕, 껍데기 편의 문법)
    - async: 비동기 함수 선언. 이 함수 안에서는 일시정지(await) 기능을 쓸 것이며, 이 함수가 내뱉는 결과는 무조건 자동으로 Promise로 감싸진다는 표시.
    - await: Promise 작업이 resolve 될 때까지 다음 줄로 넘어가지 말고 기다려라는 키워드. 
try/catch: "이 블록 안의 코드를 일단 한번 안전하게 실행(Try, 시도)해 보아라"라고 지정하는 예외 처리 구역입니다. 이 구역 안에서 에러가 터져도 프로그램이 멈추지 않고 안전하게 짝꿍인 catch로 제어권을 넘겨줍니다.
- 항상 실패했을 때를 대비한 코드 작성을 해야한다. 어떻게? try catch 같은 함수와 boolean 연산자로 확인하고 console.log로 결과값을 보면서.


### 4. 내일 공부할 내용 (Next)

