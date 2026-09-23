## [2026-09-07] JavaScript 연산자 (operator)

### 1. 오늘 배운 핵심 개념 (What I Learned)
- 연산자 (Operator) 컴퓨터에게 특정한 계산이나 비교, 값의 대입 같은 '작업(연산)을 하라'고 지시하는 모든 기호를 뜻한다. 
1. 할당연산자 (Assignment Operator): 오른쪽 피연산자의 값을 왼쪽 피연산자의 값에 그대로 대입한다.
2. 증감연산자 :(++, --) 연산자를 통해 1, -1씩 증가 감소하는 연산자.
3. 비교연산자 : 좌우 두 개의 피연산자 값을 서로 비교하여 Boolean 값으로 반환하는 연산자.
4. 논리연산자 : 여러 조건을 결합하여 하나의 논리적 결과를 도출한다.
- AND : (&&) 좌우 피연산자 모두가 참이면 true 하나라도 틀리면 false
- OR : (||) 좌우 피연산자 둘 중 하나가 참이면 true 
- NOT : falsy 값에 !를 붙이면 true, truthy 값에 !를 붙이면 false
5. 삼항연산자 : 조건식에 따라 두 값 중 하나를 선택하는 연산자

### 2. 코드 예시 (Code)
```text
1. 할당연산자
let a = 5;
a += 3;
console.log(a); // 5라는 리터럴 값이 a에 할당되고 a + 3은 곧 5 + 3이라는 뜻이니 8이 출력된다.

2. 증감연산자
let b = 2;
console.log(b++); // 2 다음 값이 +1 증가한다는 뜻
console.log(b);   // 3
console.log(--b); // 2 바뀐 값을 바로 사용한다.
console.log(++b); // 3

3. 비교연산자
const x = 1;
const y = 2;

x == y;     // false ,값이 틀리면 false
x != y;     // true ,값이 같으면 true
x === y;    // false , 값과 타입이 모두 같아야지 true
x !== y;    // false , 값과 타입 하나라도 틀리면 false

4. 논리연산자
const c = true;
const d = false;

AND 연산자
console.log(c && d);    // false

OR 연산자
console.log(c || d);    // true

NOT 연산자
console.log(c);         // false
console.log(!d);        // true

5. 삼항연산자
const height = 180;
const result = (height >= 175) ? "키가 크다" : "키가 평균이다";
console.log(result);    // "키가 크다"
```



### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- 아직 이런 데이터 타입과 연산자가 웹 사이트에서 어떻게 사용될지를 모르니 헷갈린다.
- 변수라는 저장소에 오른쪽의 값이 왼쪽으로 할당되는 것에 대해 아직 직관적으로 와닿지는 않아 많이 의식해야한다.

### 4. 내일 공부할 내용 (Next)
- Object, Property 심화과정
