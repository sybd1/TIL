## [2026-09-30] Next.js 폴더 사용 방법

### 1. 오늘 배운 핵심 개념 (What I Learned)
- API 가공/변환 기능: 외부 API가 주는 데이터를 받는다. 그리고 받아 온 데이터를 가다듬어 필요한 정보만 사용한다.
- 실제 서비스에서는 MySQL, PostgreSQL, MongoDB 같은 곳에 사용자 데이터를 저장한다.
- package.json 파일 scripts에서 server를 추가해 줄 수 있다.
- 현재 하고 있는 Frontend 과제 방식은 실제 데이터베이스를 흉내내는 개발용 환경이다. Mock Data를 저장하는 JSON 파일을 만들어, 그 데이터를 API처럼 제공해주는 Mock API서버를 만든 것이다. 

### 2. 코드 예시 (Code)
```text
- Next.js 데이터 처리 과정

                사용자
                  │
                  ↓
             page.js
          (화면 / 입력)
                  │
          GET / POST 요청
                  ↓
              API
           route.js
                  │
       ┌──────────┴──────────┐
       ↓                     ↓
   내 데이터               외부 API
   db.json              공공데이터 등
       │                     │
       └──────────┬──────────┘
                  ↓
             데이터 가공
                  ↓
             page.js
                  ↓
                화면

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
#### React props
```` text
// 자식이 이렇게 요청하면,
function Buttons({ onUp, onDown }) {}
// 부모는 이렇게 전달해줘야한다.
<Buttons onDown={handleDown} onUp={handleUp}/>

````


### 4. 내일 공부할 내용 (Next)
- ♡⸜(˶˃ ᵕ ˂˶)⸝♡
- ( ˶ˆ ᗜ ˆ˵ )
-  \{^_^}/ hi!
- ♡( ◡‿◡ )