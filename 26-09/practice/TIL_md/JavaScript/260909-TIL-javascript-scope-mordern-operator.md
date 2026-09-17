## [2026-09-07] Scope 스코프, Modern Operator, null 병합 연산자

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### 스코프
- 변수를 사용할 수 있는 영역을 뜻 한다. 크게 전역 스코프(global Scope)와 지역/함수 스코프(Local/Function Scope)가 있다. 전역 스코프는 코드 블럭 바깥에 선언된 변수이고, 지역 스코프는 코드 블럭 안 쪽에 선언된 변수이다. 
- 전역 스코프는 바깥에서 안 쪽의 변수를 불러올 수 없다. 단 return이 반환한 값은 호출으로 받을 수 있다.
#### 렉시컬 스코프(정적 스코프) : 선언된 위치를 기준으로 상위 스코프가 결정되는 규칙
- 지역 스코프는 다른 지역 영역 안의 변수는 호출 할 수 없지만, 역시나 return 반환이 있다면 호출 할 수 있다. 그리고 기본적으로 안 쪽에 있는 변수와 바깥의 변수 모두 문제없이 사용할 수 있다. 
- 동일한 이름의 변수를 영역 안과 바깥에서 각각 출력하면, 안 쪽에서 호출하면 안쪽의 값을 출력하고, 바깥에서 호출하면 바깥의 변수를 출력한다.
- 변수 var은 const, let과 다르게 중괄호를 넘나들며 다른 코드를 침범할 수 있어 지금은 시장된 키워드이다. var은 에러 없이 재선언도 가능해 같은 이름으로 변수 값을 변경하며 버그를 일으킨다. let은 재선언은 불가능하지만, 재할당은 가능하다. const는 재선언과 재할당 모두 불가능한 상수이다.

#### 옵셔널 체이닝 연산자 (?.)
- 좌항의 피연산자가 null 또는 undefined인 경우 에러를 떠뜨리지 않고 안전하게 undefined를 반환하도록 돕는 안전장치이다.

#### null 병합 연산자 (??)
- 좌항의 피연산자가 null 또는 undefined인 경우 우항의 피연산자를 반환하고 그렇지 않으면 좌항의 피연산자를 반환한다. 실제 웹사이트에서 에러가 생기는 것을 방어적으로 막아줄 연산자이다.

### 2. 코드 예시 (Code)
```text
- 스코프, 렉시컬 스코프
const name = '해원';

const member = function() {
    const hello = '배이';
    console.log(hello);     // 배이
    console.log(name);      // 해원
};
member();
console.log(hello);         // hello is not defined, 이곳에서부터 에러가 나서 뒤는 출력이 되지 않는다.
console.log(name);          // 해원

- 옵셔널 체이닝 연산자
const user = {
    name : '릴리'
};
console.log(user.age.height);   // Error

console.log(user?.age?.height); // undefined

- null 병합 연산자
const test = null ?? '설윤';
console.log(test);  // 설윤

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)



### 4. 내일 공부할 내용 (Next)

