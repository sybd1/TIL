## [2026-09-07] Class 함수, Iterable과 for...of, Spread Syntax, Destructuring 구조 분해 할당

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### Class 함수
- 생성자 함수 prototype 형식 문법은 다르지만 모두 기능은 동일하다. 차이는 생성자 함수는 new 없이 호출시 오류를 일으킬 수 있지만, 클래식 함수는 Type Error로 원천 차단한다.
- 본문 내부가 암묵적으로 strict mode로 실행된다.

#### Iterable과 for...of
- Iterable
    - 값을 순서대로 하나씩 꺼낼 수 있는 객체. 배열과 문자열이 대표적이다.
- for...of
    - Iterable의 값을 하나씩 꺼내서 반복 작업을 할 때 사용하는 반복문

#### Spread Syntax
- Spread Syntax
    - 함수의 '인수'자리나, 배열/객체 리터럴 안에서 사용하여, 배열의 요소들을 개별 값의 목록으로 펼쳐준다.
    - 배열/객체 합치기, 배열을 낱개로 풀어서 함수에 넣을 때
- Rest Parameter
    - 함수의 '매개변수' 자리에 사용하여, 정해지지 않은 개수의 인수들을 하나의 '배열'로 모아서 받는다.
    - 인수가 몇 개 들어올지 모를 때 사용. 첫번째 값과 나머지 값들을 분리할 때 사용.

#### Destructuring 구조 분해 할당
- 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 손쉽게 담을 수 있게 하는 표현식
- 객체 구조 분해는 순서가 아니라 property key 이름으로 값을 찾는다.

### 2. 코드 예시 (Code)
```text
- class 함수
class Nmixx {
    // new Nmixx(..)가 실행될 때 자동으로 호출되는 초기화 메서드
    constructor(name, funny) {
        this.name = name;
        this.funny = funny;
    }
    // 객체마다 함수를 새로 만들지 않고
    // Nmixx.prototype에 한 번 만들어 공유한다.
    getInfo() {
        return `${this.name} 이는/는 ${this.funny} 웃기다.`
    }
}
const member1 = new Nmixx('릴리', '정말');
const member2 = new Nmixx('해원', '무진장');
console.log(member1.getInfo());   // 릴리 이는/는 정말 웃기다.
console.log(member2.getInfo());   // 해원 이는/는 무진장 웃기다.

- for...of 기본 문법
for (const element of interable) {
    // 실행할 코드
}

const nmixx = ['릴리', '해원', '설윤'];

for ( const nswer of nmixx) {
    console.log(nmixx);
}   // 릴리, 해원, 설윤

- spread syntax
const members = ['bae', 'jiwoo', 'kyujin'];

console.log(...members, 'haewon', 'lilly', 'sullyoon');    // bae jiwoo kyujin haewon lilly sullyoon

- rest parameter
const user = { id: 1, password: 'secret', name: '철수', age: 20};

const {password, ...safeUser} = user;
console.log(safeUser);  // { id: 1, name: '철수', age: 20 }

- Destructuring
const jiwoo = {
    name: 'jiwoo-kim',
    age: 20050413,
    personality: 'cute'
}

const { name, personality } = jiwoo;
console.log(`Hi I'm ${name}. I think I'm very ${personality} `);
// Hi I'm jiwoo-kim. I think I'm very cute

- Destructuring, Rest parameter
const product = [
    {name: 'car', price: 200},
    {name: 'airplane', price: 700000},
    {name: 'train', price: 9000000}
];
const [first, ...restProducts] = product;

console.log(first);        // {name: 'car', price: 200}
console.log(restProducts); // [ {name: 'airplane', ...}, {name: 'train', ...} ]



```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)



### 4. 내일 공부할 내용 (Next)
- 1,2주차 복습 HTML, CSS, JavaScript 주말동안 지금까지 배운거 처음부터 끝까지 과제 다시 풀어보기
