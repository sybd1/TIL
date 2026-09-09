/*
======================================================================
문제 1. 변수와 자료형 — 상품 정보 출력
======================================================================

상품 하나의 정보를 변수에 저장하고 출력하세요.

조건
- 상품명 productName: '노트'
- 가격 price: 3000
- 판매 가능 여부 isAvailable: true
- 위 값을 각각 변수에 저장합니다.
- typeof로 각 값의 자료형도 출력합니다.
- 객체나 함수는 만들지 않습니다.

예상 출력
상품명: 노트
가격: 3000
판매 가능: true
상품명 타입: string
가격 타입: number
판매 가능 타입: boolean
*/

// 문제 1 풀이
const productName = '노트';
const price = 3000;
const isAvailable = true;

console.log(`상품명: ${productName}`);
console.log(`가격: ${price}`);
console.log(`판매 가능: ${isAvailable}`);
console.log(typeof productName);
console.log(typeof price);
console.log(typeof isAvailable);

/*
======================================================================
문제 2. 타입 변환 — 문자열로 받은 금액 계산
======================================================================

가격과 배송비가 문자열로 전달되었습니다. 숫자로 변환한 뒤 합계를 구하세요.

입력
const inputPrice = '12000';
const inputDeliveryFee = '3000';

조건
- 입력 두 줄은 그대로 사용합니다.
- Number로 각각 변환한 결과를 별도 변수에 저장합니다.
- 변환한 값으로 합계를 계산합니다.
- 합계와 합계의 자료형을 출력합니다.
- 숫자 15000을 직접 출력하지 않습니다.

예상 출력
총 결제 금액: 15000
합계 타입: number

*/

// 문제 2 풀이
const inputPrice = '12000';
const inputDeliveryFee = '3000';

const num = (parseInt(inputPrice));
const num2 = (parseInt(inputDeliveryFee));
console.log(num + num2);
console.log(typeof (num + num2));

/*
======================================================================
문제 3. 연산자 — 무료 배송 대상 확인
======================================================================

회원이면서 주문 금액이 20000원 이상인 경우에만 무료 배송 대상입니다.

입력
const isMember = true;
const orderAmount = 18000;

조건
- 비교 연산자와 논리 AND 연산자(&&)로 결과를 계산합니다.
- 결과를 canGetFreeDelivery 변수에 저장해 출력합니다.
- if문이나 삼항 연산자는 사용하지 않습니다.
- 입력을 아래 세 경우로 하나씩 바꿔 확인합니다.

확인할 입력 → 예상 출력
true, 18000 → false
true, 20000 → true
false, 30000 → false

주의
같은 이름의 const를 아래에 반복 선언하지 말고,
처음 작성한 입력값을 바꾼 뒤 파일을 다시 실행하세요.
*/

// 문제 3 풀이
const isMember = false;
const orderAmount = 30000;

const canGetFreeDelivery = isMember && orderAmount >= 20000;

console.log(canGetFreeDelivery);

/*
======================================================================
문제 4. 조건문 — 점수에 따른 결과 안내
======================================================================

점수에 따라 안내 문구 하나만 출력하세요.

입력
let score = 85;

조건
- score는 숫자로 주어진다고 가정합니다.
- 0 미만 또는 100 초과: '점수를 확인하세요.'
- 유효한 점수 중 90 이상: '우수'
- 유효한 점수 중 70 이상 90 미만: '통과'
- 나머지 유효한 점수: '재학습'
- if / else if / else를 사용합니다.
- 출력은 입력 하나당 한 줄이어야 합니다.

확인할 입력 → 예상 출력
85 → 통과
90 → 우수
70 → 통과
69 → 재학습
0 → 재학습
101 → 점수를 확인하세요.
-1 → 점수를 확인하세요.

입력값만 바꾸어 각각 실행하세요.
*/

// 문제 4 풀이
let score = 101;

if (score < 0 || score > 100) {
    console.log('점수를 확인하세요.');
} else if (90 <= score) {
    console.log('우수');
} else if (score >= 70) {
    console.log('통과');
} else {
    console.log('재학습');
}

/*
======================================================================
문제 5. 반복문 — 조건에 맞는 수의 개수와 합계
======================================================================

1부터 20까지의 정수 중 3의 배수인 수를 찾고 개수와 합계를 구하세요.

조건
- for문으로 1부터 20까지 확인합니다.
- 나머지 연산자(%)와 조건문으로 3의 배수를 판별합니다.
- 해당 숫자를 찾을 때마다 출력합니다.
- 개수와 합계는 변수로 누적합니다.
- 반복문 종료 후 개수와 합계를 출력합니다.
- 배열이나 함수를 사용하지 않습니다.

예상 출력
3
6
9
12
15
18
개수: 6
합계: 63
*/

// 문제 5 풀이
let count = 0;
let sum = 0;

for (let i = 1; i <= 20; i++) {
    if (i % 3 === 0) {
        console.log(i);
        count++;
        sum = sum + i;
    }
}

console.log(`개수: ${count}`);
console.log(`합계: ${sum}`)

// 문제 5 풀이



/*
======================================================================
문제 6. 객체 — 상품 정보 수정하기
======================================================================

다음 상품 객체를 만들고 정보를 조회·수정·추가·삭제하세요.

초기 정보
- name: '노트'
- price: 3000
- stock: 10
- category: '문구'

조건
1. product라는 const 변수에 객체 리터럴로 저장합니다.
2. key라는 변수에 'price'를 저장하고, 대괄호 표기법으로 가격을 읽습니다.
3. 재고를 현재 값에서 2개 줄입니다.
4. isAvailable 프로퍼티를 추가하고 재고가 0보다 큰지 비교한 값을 저장합니다.
5. category 프로퍼티를 delete로 삭제합니다.
6. 아래 순서대로 결과를 출력합니다.
- 객체를 통째로 다른 객체로 재할당하지 않습니다.

예상 출력
가격: 3000
남은 재고: 8
판매 가능: true
삭제 후 카테고리: undefined

*/

// 문제 6 풀이
const product = {
    name: '노트',
    price: 3000,
    stock: 10,
    category: '문구'
}

const key = 'price';
console.log(`가격: ${product[key]}`);
product.stock = product.stock - 2;
console.log(`남은 재고: ${product.stock}`);
product.isAvailable = product.stock > 0;
console.log(`판매 가능: ${product.isAvailable}`)
delete (product.category);
console.log(`삭제 후 카테고리: ${product.category}`)


/*
======================================================================
문제 7. 함수 — 주문 금액 반환하기
======================================================================

단가와 수량을 받아 주문 금액을 반환하는 함수를 작성하세요.

조건
- 함수 선언문으로 getOrderTotal(price, quantity)을 정의합니다.
- price는 양의 정수, quantity는 정수로 들어온다고 가정합니다.
- quantity가 0 이하이면 0을 즉시 반환합니다.
- 나머지 경우에는 단가 × 수량을 반환합니다.
- 함수 안에서 console.log를 사용하지 않습니다.
- 호출한 쪽에서 반환값을 출력합니다.
- 외부 변수에 계산 결과를 저장하는 방식은 사용하지 않습니다.

호출 → 예상 반환값
getOrderTotal(3000, 2) → 6000
getOrderTotal(5000, 1) → 5000
getOrderTotal(3000, 0) → 0
getOrderTotal(3000, -2) → 0

추가 확인
getOrderTotal(3000, 2)의 반환값에 배송비 2500을 더해 출력하세요.
예상 출력: 배송비 포함: 8500
*/

// 문제 7 풀이
function getOrderTotal(price, quantity) {
    if (quantity <= 0) {
        return 0;
    }
    return (price * quantity)
} 

// const total = (price, quantity)
console.log(getOrderTotal(3000, 2));
console.log(getOrderTotal(5000, 1));
console.log(getOrderTotal(3000, 0));
console.log(getOrderTotal(3000, -2));
console.log(`배송비 포함: ${getOrderTotal(3000, 2) + 2500}`);
