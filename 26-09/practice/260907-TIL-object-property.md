## [2026-09-07] 객체 (Object)와 속성 (Property)

### 1. 오늘 배운 핵심 개념 (What I Learned)
1. JavaScript에서 기본타입을 제외한 모든 타입은 Object에 해당한다. Object는 0개 이상의 Property로 구성된 집합이며, Property는 키(Key)와 값(Value)으로 구성된다. 
2. Property 표기법 : 마침표 표기법, 대괄호 표기법
3. Property 추가, 수정 : const, let 상관없이 property 내부 값을 추가, 수정, 삭제는 가능하지만, const 로 선언한 object는 수정 불가능하다. let은 가능하다.
4. in 연산자 : 해당 object가 특정 property를 가지고 있는지 boolean 값으로 알려준다.
5. 객체 순회 (for ... in) : object의 property key를 하나씩 꺼내는 반복문

### 2. 코드 예시 (Code)
```text
1. Object {} 사용법
const animal = {
// Key(이름) : Value(값) -> Property
name: '김똑딱',
age: 7,
// method(메서드) Property를 참조하고 조작할 수 있는 동작
getInfo: function() {   // 아직 배우지 않음.
    return `${this.name}은 ${this.age}세 입니다.`
    }
};
console.log(animal);

2. Property
마침표 사용법
const cat = {
    name: '단무지',
    walk: function(foot) {
        console.log(`${this.name}는 ${foot}걷는다.`);
    }
}
// console.log(object.key)
console.log(cat.name);
cat.walk('단무지');

대괄호 사용법
console.log(cat['name'])    // property key를 문자열로 적는다
cat['walk']('도로 위')

3. Property 추가, 수정
const beverage = {
    name: coke;
}

beverage.name = 'sprite'; // 이미 존재하는 프로퍼티 값을 할당하면 프로퍼티 값 갱신
beverage['name'] = 'drpepper';
console.log(beverage); // drperpper

beverage.color = 'black'; // 존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성된다.
console.log(beverage);

delete.color;             // delete 연산자를 사용하여 프로퍼티를 삭제한다.
console.log(beverage);

4. in 연산자
console.log('name' in beverage);    // true
console.log('price' in beverage);   // false

5. 객체 순회 (for ... key)
for (const key in beverage) {
    console.log(`키 : ${key}`);     // name
    console.log(`값 : ${beverage[key]}`);   // sprite
}
```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- console.log(object.key)가 key와 value를 언제 적재적소에 넣어야 할지 헷갈려서 외우기 어렵다. 
- Property 대괄호 사용법은 Key값을 대괄호 안에서 문자열로 적어야 한다.

### 4. 내일 공부할 내용 (Next)
- funtion 함수