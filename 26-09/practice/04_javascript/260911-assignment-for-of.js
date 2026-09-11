// 1. `cart`에 `'키보드'`, `'마우스'`를 넣습니다. ( 배열)
// 2. Spread로 `'모니터'`가 추가된 `updatedCart`를 만듭니다.
// 3. `order` 객체에 `id: 1`, `status: '결제 대기'`를 넣습니다.
// 4. Spread로 기존 값은 유지하고 `status`만 `'결제 완료'`로 바꾼 `completedOrder`를 만듭니다.
// 5. Rest 파라미터를 사용해 전달받은 가격의 합계를 반환하는 `getTotal`을 작성합니다.
// 6. `updatedCart`, 두 주문 객체(order, completedOrder), `getTotal(50000, 30000, 200000)`의 결과를 출력합니다.
    
//     예상 출력
    
//     [ '키보드', '마우스', '모니터' ]
//     { id: 1, status: '결제 대기' }
//     { id: 1, status: '결제 완료' }
//     280000


const cart = ['키보드', '마우스'];

const updateCart = [...cart, '모니터'];
console.log(updateCart);    // [ '키보드', '마우스', '모니터' ]

const order = {
    id: 1,
    status: '결제 대기'
}
console.log(order);

const completedOrder = {
    ...order,
    status: '결제 완료'
};
console.log(completedOrder);    // { id: 1, status: '결제 완료' }

function getTotal(...updateCart) {
    let total = 0;

    console.log(updateCart);
    for (const cart of updateCart) {
    total += cart;
    }
    return total;
}

console.log(getTotal(50000, 30000, 200000));    // 280000