## [2026-09-17] React State

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### State
- 시간의 흐름에 따라 변화하는 동적 데이터를 기억하고, 그 변화에 맞춰 화면을 자동으로 다시 그리도록 자극하는 '반응형 내부 메모리'
- State는 그 컴포넌트가 직접 소유한 데이터이므로 자신이 직접 바꿀 권한이 있다. Props는 부모가 소유한 데이터를 잠시 빌려 읽기만 하는 것이므로 고칠 권한이 없다.
- Hook : 함수형 컴포넌트가 React의 기능을 사용할 수 있게 연결해주는 함수이다. 함수형 컴포넌트에서 State를 사용할 수 있게 해주는 함수이다.
- 배열 구조분해할당 시에 인덱스 0은 상태 값, 인덱스 1은 상태 변경 함수로 정해져있다.
- value와 onChange를 함께 연결하면 input 값이 React state에 의해 관리된다.
    - onChange는 input의 내용물에 변화가 생길 때마다
    - e.target.value는 이벤트를 일으킨 장본인(e.target)이 가지고 있는 최신 값(value)
- form형식을 이용하면 하나의 객체 state로 여러 input을 관리할 수 있다.

### 2. 코드 예시 (Code)
```text
- State 함수 기본 문법
// 객체 구조 분해 할당
const { useState } = React;

// 배열 구조 분해 할당
useState 호출 : [ 상태 값, 상태 변경 함수 ] = useState(초기값);
const [member, setMember] = useState();

- value와 onChange
value={username}
onChange={e => setMembername(e.target.value)}

- form
function SignupFormAdvanced() {
    const [nmixx,  setNmixx] = useState({
        member: '',
        mbti: ''
    });
}

const handelChange = (e) => {
    const { name, value } = e.target;
    setMember({
        ...member,
        [name]: value
    });
}
```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- form 문법은 복잡해서 헷갈리는데, 그 전 props부터 state까지 계속 보고 적어봐야 익숙해질 것 같다.
- state는 컴포넌트의 메모리이다.

### 4. 내일 공부할 내용 (Next)

기술이 아무리 발전해도 근본적으로 하드웨어가 0과 1의 기계어만 받아 들이는 것은 변하지 않지? 예외적으로 현재 개발하여 사용중인 양자컴퓨터도 있긴 하지만, 그것은 아직 상용화 단계로 가진 못했으니 냅두고.