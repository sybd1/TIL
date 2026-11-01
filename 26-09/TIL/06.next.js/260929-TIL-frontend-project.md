## [2026-09-29] Frontend Project

### 1. 오늘 배운 핵심 개념 (What I Learned)
- useRouter(): 페이지 이동
- toString: 문자열로 바꾸는 메서드
- useMutation: TanStack Query에서 서버에 데이터를 보내거나 서버의 상태를 변경하는 작업을 관리하는 Hook. 사용자가 어떤 행동을 했을 때 실행하는 작업.
- isArray: 배열인지 확인하는 함수

#### JS, Web에 들어있는 도구
- new URL: URL을 다루기 위한 도구를 하나 만들어라.
- new URLSearchParams(...): URL의 ? 뒤에 붙는 데이터를 다루는 도구를 하나 만들어라.



### 2. 코드 예시 (Code)
```text
- useMutation 문법
const search = useMutation({ mutationFn: searchHospitals });
search.mutate(name);

mutationFn: TanStack Query가 알아듣는 옵션 이름. Mutation을 실행할 때 사용할 함수를 이 문법 뒤에 넣는다.
mutate: TanStack Query가 반환해주는 함수의 이름.

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- Query Parameter? searchParams?


### 4. 내일 공부할 내용 (Next)

