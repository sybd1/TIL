## [2026-09-07] React State

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### State
- 시간의 흐름에 따라 변화하는 동적 데이터를 기억하고, 그 변화에 맞춰 화면을 자동으로 다시 그리도록 자극하는 '반응형 내부 메모리'
- State는 그 컴포넌트가 직접 소유한 데이터이므로 자신이 직접 바꿀 권한이 있다. Props는 부모가 소유한 데이터를 잠시 빌려 읽기만 하는 것이므로 고칠 권한이 없다.
- 배열 구조분해할당 시에 인덱스 0은 상태 값, 인덱스 1은 상태 변경 함수로 정해져있다.

### 2. 코드 예시 (Code)
```text
- State 함수 기본 문법
const { useState } = React;

useState 호출 : [ 상태 값, 상태 변경 함수 ] = useState(초기값);
const [member, setMember] = useState();

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)



### 4. 내일 공부할 내용 (Next)

