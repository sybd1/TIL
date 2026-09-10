// 
// const products = [
//     { name: '노트', price: 3000, stock: 5 },
//     { name: '펜', price: 1000, stock: 0 },
//     { name: '파일', price: 2000, stock: 3 }
// ];
// 

// “상품 목록에서 재고가 있는 상품만 가격순으로 보여주려고 합니다. 
// 방금 배운 메서드 중 원하는 결과에 맞는 것을 골라 보세요.”

// ### **1단계 — 판매 가능한 목록 만들기**

// 1. 재고가 0보다 큰 상품만 새 배열로 고릅니다.
// 2. 그 배열을 가격 오름차순으로 정렬합니다.
// 3. 정렬된 상품의 이름만 담긴 새 배열을 만듭니다.

// **중간 확인:** 이름 배열이 `['파일', '노트']`이면 1단계가 완성된 것입니다. 
// 여기까지 확인한 뒤 2단계로 넘어갑니다.

// ### **2단계 — 합계·검색·판단·출력 연결하기**

// 1. 판매 가능한 상품을 한 개씩 살 때 총액을 구합니다. 재고 수량을 곱하지 않습니다.
// 2. 원본 목록에서 이름이 펜인 상품 하나를 찾습니다.
// 3. 품절 상품이 하나라도 있는지, 모든 가격이 양수인지 확인합니다.
// 4. 판매 가능한 각 상품의 이름과 가격을 출력

const products = [
    { name: '노트', price: 3000, stock: 5 },
    { name: '펜', price: 1000, stock: 0 },
    { name: '파일', price: 2000, stock: 3 }
];
// 1단계
const availableProducts = products.filter(product => product.stock > 0);
console.log(availableProducts);

availableProducts.sort((a, b) => a.price - b.price);
console.log(availableProducts);

const productNames = availableProducts.map(product => product.name);
console.log(productNames);

// 2단계
const totalPrice = availableProducts.reduce((sum, current) => sum + current.price, 0);
console.log(totalPrice);

const foundPen = products.find(product => product.name === '펜');
console.log(foundPen);

const hasSoldOut = products.some(product => product.stock === 0);
console.log(hasSoldOut);

products.forEach((products) => {
    console.log(`${products.name}, ${products.price}`)
});