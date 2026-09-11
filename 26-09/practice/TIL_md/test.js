// const name = '해원';

// const member = function() {
//     const hello = '배이';
//     console.log(hello);     // 배이
//     console.log(name);      // 해원
// };
// member();
// console.log(hello);         // hello is not defined
// console.log(name);          // 해원

// const user = {
//     name : '릴리'
// };
// // console.log(user.age.height);   // Error

// console.log(user?.age?.height); // undefined


// const test = null ?? '설윤';
// console.log(test);

// const students = [
//     { name: '박진', score: 90 },
//     { name: '오해원', score: 80 },
//     { name: '설윤아', score: 95 }
// ];

// students.forEach(member => {
// console.log(member.name)
// });

// const jyp = students.map(member => member.name);
// console.log(jyp);


// class Nmixx {
//     // new Nmixx(..)가 실행될 때 자동으로 호출되는 초기화 메서드
//     constructor(name, funny) {
//         this.name = name;
//         this.funny = funny;
//     }
//     // 객체마다 함수를 새로 만들지 않고
//     // Nmixx.prototype에 한 번 만들어 공유한다.
//     getInfo() {
//         return `${this.name} 이는/는 ${this.funny} 웃기다.`
//     }
// }
// const member1 = new Nmixx('릴리', '정말');
// const member2 = new Nmixx('해원', '무진장');
// console.log(member1.getInfo());   // 릴리 이는/는 정말 웃기다.
// console.log(member2.getInfo());   // 해원 이는/는 무진장 웃기다.

// const members = ['bae', 'jiwoo', 'kyujin'];

// console.log(...members, 'haewon', 'lilly', 'sullyoon');    // 


// const product = [
//     {name: 'car', price: 200},
//     {name: 'airplane', price: 700000},
//     {name: 'train', price: 9000000}
// ];

// const onlyPrice = product.map(item => item.price);

// console.log(onlyPrice);


// console.log(...onlyPrice);




// const addPrice = (...prices) => {
    // return prices.reduce((sum, current) => sum + current, 0);
// };
// const onlyPrice = product.map(prices => prices.price);

// const total = addPrice(...onlyPrice);

// console.log(total);


// const prices = [100, 500, 100];

// function add(label, ...values) {
//     let total = 0;

//     for (const value of values) {
//         total += value;
//     }
//     console.log(label, total)
// }
// add(...prices);




// const user = { id: 1, password: 'secret', name: '철수', age: 20};

// const {password, ...safeUser} = user;
// console.log(safeUser);

// const product = [
//     {name: 'car', price: 200},
//     {name: 'airplane', price: 700000},
//     {name: 'train', price: 9000000}
// ];
// const [first, ...restProducts] = product;

// console.log(first);        // {name: 'car', price: 200}
// console.log(restProducts); // [ {name: 'airplane', ...}, {name: 'train', ...} ]

const jiwoo = {
    name: 'jiwoo-kim',
    age: 20050413,
    personality: 'cute'
}

const { name, personality } = jiwoo;
console.log(`Hi I'm ${name}. I think I'm very ${personality} `);