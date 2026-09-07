let a = 5;
a += 4;
console.log(a);


// 1. if else

let mountain = 1500;

if (mountain > 1000) {
    console.log('높은 산 입니다');  // 조건이 true일 때 '높은 산입니다' 출력
} else {
    console.log('낮은 산 입니다');  // 조건이 false일 때 '낮은 산 입니다' 출력
}


let test = 75;

if (test > 90) {
    console.log('잘했어요');
} else if (test > 80) {
    console.log('꽤 하네요')
} else if (test > 70) {
    console.log('나쁘지 않네요')
} else {
    console.log('열심히 해볼까요?')
}

let doll = '곰';

switch (doll) {
    case '고양이':
        console.log('이것은 고양이입니다.');
        break;
    case '강아지':
        console.log('이것은 강아지입니다.');
        break;
    case '곰':
        console.log('이것은 곰입니다.');
        break;
}

for (mul = 1; mul < 20; mul++) {
    if (mul % 2 === 1) {
        continue;
    }
    console.log(mul);       // 2의 배수 20까지
}


let count = 5;

while (count > 3) {
    console.log(count);
    count--;
}

let number = 20;

do {
    console.log(number);
    number++;
} while (number <= 3);

let num = 10;

do {
    console.log(num);
    --num;
} while (num < 8);


// const animal = {
//     // Key(이름) : Value(값) -> Property
//     name: '김똑딱',
//     age: 7,
//     // method(메서드) Property를 참조하고 조작할 수 있는 동작
//     getInfo: function() {
//         return `${this.name}은 ${this.age}세 입니다.`
//     }
// };
// console.log(animal.getInfo());


// // const bear = {
// //     color: 'brown' ,
// //     katKoi: function(cool) {
// //         console.log(`${this.color}곰은${cool}멋있다.`);
// //     }
// // }

// const cat = {
//     name: '단무지',
//     walk: function(foot) {
//         console.log(`${this.name}는 ${foot}걷는다.`);
//     }
// }
// // console.log(object.key)
// console.log(cat.name);
// cat.walk('단무지');

// // console.log(bear.color);
// // bear.katKoi('개')

// console.log(cat['name'])
// cat['walk']('도로 위')

// const obj = {
//     'dash-key': 'dash-value',
//     0 : 1
// };

// console.log(obj['dash-key']);

// const dog = {
//     name: '뽀삐',
//     eat: function(food) {
//         console.log(`${this.name}은 ${food}를 맛있게 먹어요.`);
//     }
// }

// // console.log(객체.key)
// console.log(dog.name);
// dog.eat('두부');

// // 대괄호 표기법
// console.log(dog['name'])    // 프로퍼티 키를 문자열로 적는다
// dog['eat']('고구마');

// const prop = 'name';
// console.log(dog.prop);  // 'prop'이라는 프로퍼티 키를 찾으려고 함(undefined)
// console.log(dog[prop]);

const beverage = {
    name: 'coke'
}

beverage.name = 'sprite';
// beverage['name'] = 'drpepper';
console.log(beverage);

beverage.color = 'black';
console.log(beverage);

// delete beverage.color;
// console.log(beverage);

console.log('name' in beverage);    // true
console.log('price' in beverage);   // false

for (const key in beverage) {
    console.log(`키 : ${key}`);
    console.log(`값 : ${beverage[key]}`);
}