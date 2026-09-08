//함수 선언문 기본식

// function nswer(name, age) {
//     if (name == '윤아') {
//         console.log(`안녕하세요 저는 ${name}입니다. 나이는 22살 입니다. 잘 부탁드립니다.`);
//     } else if (name == '릴리') {
//         console.log(`안녕하세요 저는 ${name}입니다. 나이는 25살 입니다. 잘 부탁드립니다.`);
//     } else {
//         console.log(`안녕하세요 저는 아무것도 아닙니다. 잘 부탁드립니다.`);
//         return;
//     }
// }
// nswer('윤아');


// const book = {
//     title: '자바스크립트 입문',
//     price: 15000
// }

// function calculatrTotal(book, quantity) {
//     return(book.price * quantity);
// }
// console.log(calculatrTotal(book, 2));

// book.price = 18000;
// console.log(calculatrTotal(book, 2));
// console.log(calculatrTotal(book, 0));

// const regularPrice = function(total) { ... }; 형태의 함수 표현식으로 총액을 그대로 반환하는 함수를 만듭니다.
// 같은 방식으로 총액에서 3000원을 빼서 반환하는 discountPrice를 만듭니다. 총액이 3000원 미만이면 조기 반환(Early Return)으로 0을 반환합니다.
// checkout(book, quantity, pricePolicy)를 선언합니다. 내부에서 calculateTotal로 총액을 구하고, 
// pricePolicy 콜백(regularPrice 또는 discountPrice)에 총액을 전달한 결과를 반환합니다.
// 가격이 18000원인 현재 book으로 두 권의 일반 결제와 할인 결제를 호출해 결과를 바깥에서 출력합니다. 수량 0의 할인 결제도 확인합니다. 
// 콜백은 regularPrice, discountPrice처럼 함수 자체를 전달합니다.

// const regularPrice = function(total) {
//     return total;
// }

// const discountPrice = function(total) {
//     if (total < 3000) {
//         return 0;
//     }
//     return total - 3000;
// }

// function checkout(book, quantity, pricePolicy) {
//     const total = calculatrTotal(book ,quantity);
//     return pricePolicy(total);
// }

// console.log(checkout(book, 2, regularPrice));
// 1. 재료 3개를 들고 checkout 함수 호출. checkout 매개변수에 각각 투입.
// 2. checkout 안쪽 첫 줄 실행. calculatrTotal호출. book.price와 quantity 곱 36000 결과를 반환받음
// 3. return pricePolicy(total) 줄 도착. pricePolicy에 꽂아둔 것이 regularPrice 함수이므로 regularPrice은 36000임을 인식
// 4. regularPrice 콜백 함수 호출로 점프. 이후 내부 코드 실행 total에 36000 들어가 return total 실행. 36000.
// 5. checkout 36000으로 변신
// 6. 36000 출력

// console.log(checkout(book, 2, discountPrice));
// console.log(checkout(book, 0, discountPrice));

const coffee = {
    name: '아메리카노',
    price: 4000
}

function calculateTotal(coffee, quantity) {
    return coffee.price * quantity;
}


const discountPolicy = function(total) {
    if (total < 1000) {
        return 0;
    }
    return total - 1000;
}

function checkout(coffee, quantity, discountPolicy) {
    const total = calculateTotal(coffee, quantity);
    return discountPolicy(total);
}

console.log(checkout(coffee, 2, discountPolicy));
console.log(checkout(coffee, 0, discountPolicy));