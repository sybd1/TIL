// /
// 장바구니 총액 계산하기
// 장바구니에 담긴 상품들의 총 결제 금액을 reduce로 계산하세요.
// */

const cart = [
    { name: '노트북', price: 1200000, quantity: 1 },
    { name: '마우스', price: 30000, quantity: 2 },
    { name: '키보드', price: 80000, quantity: 1 },
    { name: '모니터', price: 300000, quantity: 2 }
];

const result = cart.reduce((a, b) => a + b.price * b.quantity, 0);

console.log(result);

// /
// 카테고리별 상품 개수 구하기
// */

const products = [
    { name: '노트북', category: '전자제품' },
    { name: '마우스', category: '전자제품' },
    { name: '셔츠', category: '의류' },
    { name: '바지', category: '의류' },
    { name: '키보드', category: '전자제품' },
    { name: '모자', category: '의류' },
    { name: '책', category: '도서' }
];

const result2 = cart.reduce((a, b) => {
    a[b.category] = a[b.category] ? a[b.category] + 1: 1;
    return a;
}, [])


console.log(result2);