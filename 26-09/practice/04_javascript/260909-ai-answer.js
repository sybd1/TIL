// 문제 1 풀이
const movieTitle = '인셉션';
const ticketPrice = 14000;
const isAdult = true;

console.log(`영화 제목: ${movieTitle}`);
console.log(`관람료: ${ticketPrice}`);
console.log(`성인 관람가: ${isAdult}`);
console.log(typeof movieTitle);
console.log(typeof ticketPrice);
console.log(typeof isAdult);


// 문제 2 풀이
const inputBookPrice = '18000';
const inputShippingFee = '2500';

const parsedBookPrice = parseInt(inputBookPrice);
const parsedShippingFee = parseInt(inputShippingFee);
const totalPay = parsedBookPrice + parsedShippingFee;

console.log(`총 결제 금액: ${totalPay}`);
console.log(`합계 타입: ${typeof totalPay}`);


// 문제 3 풀이
const isVip = false;
const purchaseAmount = 80000;

const canGetDiscount = isVip && purchaseAmount >= 50000;

console.log(canGetDiscount);


// 문제 4 풀이
let temp = 12;

if (temp >= 30) {
    console.log('폭염');
} else if (temp >= 15) {
    console.log('적당함');
} else if (temp >= 0) {
    console.log('쌀쌀함');
} else {
    console.log('한파');
}


// 문제 5 풀이
let count4 = 0;
let sum4 = 0;

for (let i = 1; i <= 30; i++) {
    if (i % 4 === 0) {
        console.log(i);
        count4++;
        sum4 = sum4 + i;
    }
}


console.log(`개수: ${count4}`);
console.log(`합계: ${sum4}`);

// 문제 6 풀이
const user = {
    name: '김철수',
    age: 25,
    point: 100,
    grade: 'Silver'
};

const userKey = 'point';
console.log(`포인트: ${user[userKey]}`);
user.point = user.point + 50;
console.log(`수정된 포인트: ${user.point}`);
user.isAdult = user.age >= 20;
console.log(`성인 여부: ${user.isAdult}`);
delete user.grade;
console.log(`삭제 후 등급: ${user.grade}`);


// 문제 7 풀이
function getRentalFee(days, pricePerDay) {
    if (days <= 0) {
        return 0;
    }
    return days * pricePerDay;
} 

console.log(getRentalFee(3, 5000));
console.log(getRentalFee(1, 10000));
console.log(getRentalFee(0, 5000));
console.log(getRentalFee(-2, 5000));
console.log(`연체료 포함: ${getRentalFee(3, 5000) + 2000}`);