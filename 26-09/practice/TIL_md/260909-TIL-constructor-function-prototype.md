## [2026-09-07] Constructor Function 생성자 함수, Prototype 프로토타입 (상속)

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### Constructor Function 생성자 함수
- 동일한 형태의 객체를 여러 개 대량으로 찍어낼 때 유용하다.
- new를 사용해 새로운 객체를 만들어, 'this.'의 프로퍼티 값을 넣고 편하게 사용할 수 있다.

#### Prototype 프로토타입
- 자바스크립트의 모든 객체는 보이지 않는 [[Prototype]]를 통해 자신을 만들어준 생성자의 프로토타입 객체와 연결되어 있습니다.
- 객체가 변수를 찾는데 자신의 영역 안에 없으면, 부모인 프로토타입으로 올라가서 메서드를 찾아 실행한다. 이를 '프로토타입 체인'이라고 한다. 그렇게 다른 객체의 프로퍼티를 가지고 올 수 있다.
- 생성자 함수에서 프로토타입 기본형태를 만들 수 있다. 수많은 객체가 공통된 매서드를 공유할 때, 프로토타입을 만들어 관리하면 편하고 메모리 효율을 극대화 할 수 있다.

### 2. 코드 예시 (Code)
```text
- 생성자 함수 기본 형태
function Name(user, age) {
    this.name = user;
    this.age = age;
    this.getInfo = function() {
        return `${this.user}는 `{this.age}살이다.`;
    }             
};
const name1 = new Name('지우', '22');
console.log(name1.getInfo);     // 지우는 22살이다.

- 프로토타입 기본 형태
function SayGood(nice) {
    this.nice = nice;
}

Name.prototype.sayHello = funtion() {
    return `너무 좋아, ${this.nice}`
};

const sayGood1 = new SayGood(`정말 좋아`);
const sayGood2 = new SayGood(`최고야`);

console.log(sayGood1.sayHello()); // 너무 좋아, 정말 좋아
console.log(sayGood2.sayHello()); // 너무 좋아, 최고야
```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- 자바스크립트는 프로토타입 기반 언어이다. 모든 객체와 데이터값은 프로토타입에 저장되어 있다가 불려진다. 그런데 찾아보니 상위 프로토타입도 종류가 있는 것 같고, 그 종류에 따라 알맞은 값들이 저장되어 있는 듯 하다.
- 메서드가 단순하게 함수에 붙인 이름인 줄 알았는데, 객체안에 소속되어 있는 함수라는 것을 알았다. 특정 객체의 행동이나 기능을 담당하기 위해 그 대상 안에 묶여 있는 함수.
### 4. 내일 공부할 내용 (Next)

