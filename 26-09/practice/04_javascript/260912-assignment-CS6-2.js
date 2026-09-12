/*
======================================================================
문제 1. 화살표 함수로 주문 금액 계산하기
======================================================================

주문 객체 배열을 이용해 각 주문의 결제 금액을 계산하세요.

입력
const orders = [
    { product: '키보드', price: 50000, quantity: 2 },
    { product: '마우스', price: 30000, quantity: 1 },
    { product: '모니터', price: 200000, quantity: 2 }
];

조건
- map과 화살표 함수를 사용합니다.
- 콜백의 매개변수 자리에서 product, price, quantity를 객체 구조분해로 꺼냅니다.
- 각 주문을 '상품명: 결제금액원' 형태의 문자열로 바꿉니다.
- 화살표 함수의 중괄호와 return을 생략합니다.
- map이 반환한 새 배열을 orderLabels에 저장해 출력합니다.

예상 출력
[ '키보드: 100000원', '마우스: 30000원', '모니터: 400000원' ]
*/

console.log('********************문제 1 풀이********************');
const orders = [
    { product: '키보드', price: 50000, quantity: 2 },
    { product: '마우스', price: 30000, quantity: 1 },
    { product: '모니터', price: 200000, quantity: 2 }
];

const orderLabels = orders.map(({ product, price, quantity }) => `${product}: ${price * quantity}원`);
console.log(orderLabels);

/*
======================================================================
문제 2. for...of로 문자열과 배열 순회하기
======================================================================

검색어의 글자와 검색 기록을 순서대로 출력하세요.

입력
const keyword = 'DOM';
const searchHistory = ['JavaScript', 'React', 'HTML'];

조건
- 일반 for문과 배열 고차함수를 사용하지 않습니다.
- 첫 번째 for...of에서는 keyword의 글자를 하나씩 출력합니다.
- 두 번째 for...of에서는 searchHistory의 값을 하나씩 출력합니다.
- 검색 기록 앞에는 1부터 시작하는 순번을 붙입니다.
- 순번은 별도의 count 변수를 선언하여 반복할 때마다 증가시킵니다.
- for...of의 반복 변수에는 인덱스가 아니라 현재 값이 들어온다는 점을 이용합니다.

예상 출력
글자: D
글자: O
글자: M
1. JavaScript
2. React
3. HTML
*/

console.log('********************문제 2 풀이********************');
const keyword = 'DOM';
const searchHistory = ['JavaScript', 'React', 'HTML'];

for (const oneName of keyword) {
    console.log(`글자: ${oneName}`);
}

let count = 0;

for (const oneArray of searchHistory) {
    console.log(`${++count}. ${oneArray}`)
};


/*
======================================================================
문제 3. Rest와 Spread로 팀 명단 처리하기
======================================================================

두 팀의 명단을 합쳐 새 배열을 만들고 함수의 인수로 전달하세요.

입력
const frontTeam = ['유관순', '홍길동'];
const backTeam = ['장보고', '신사임당'];

조건
- Spread를 사용하여 두 팀과 '이순신'을 합친 새 배열 allMembers를 만듭니다.
- 원본 frontTeam과 backTeam은 변경하지 않습니다.
- printTeam(leader, ...members) 함수를 작성합니다.
- leader에는 첫 번째 인수 하나를 받습니다.
- Rest 파라미터 members에는 나머지 인수를 배열로 받습니다.
- 함수는 팀장과 팀원 배열을 각각 출력합니다.
- printTeam을 호출할 때 allMembers를 Spread로 펼쳐 전달합니다.
- 같은 점 세 개가 함수 정의에서는 값을 모으고, 함수 호출에서는 값을 펼친다는 점을 구분합니다.

예상 출력
전체 명단: [ '유관순', '홍길동', '장보고', '신사임당', '이순신' ]
팀장: 유관순
팀원: [ '홍길동', '장보고', '신사임당', '이순신' ]
원본 앞 팀: [ '유관순', '홍길동' ]
원본 뒤 팀: [ '장보고', '신사임당' ]
*/

console.log('********************문제 3 풀이********************');
const frontTeam = ['유관순', '홍길동'];
const backTeam = ['장보고', '신사임당'];

const allMembers = [...frontTeam, ...backTeam, '이순신'];
function printTeam(leader, ...members) {
    console.log('전체 명단: ', allMembers);
    console.log('팀장: ', leader);
    console.log('팀원: ', members);
    console.log('원본 앞 팀: ', frontTeam);
    console.log('원본 뒤 팀: ', backTeam);
}
printTeam(...allMembers);


/*
======================================================================
문제 4. 사용자 정보 구조분해하기
======================================================================

사용자 객체와 관심 기술 배열에서 필요한 값을 구조분해로 꺼내세요.

입력
const user = {
    id: 1,
    name: '홍길동',
    role: 'student',
    skills: ['JavaScript', 'React', 'CSS']
};

조건
- 객체 구조분해로 name을 userName이라는 새 변수명으로 받습니다.
- role을 그대로 꺼냅니다.
- 객체에 없는 nickname은 기본값 '이름 없음'을 사용합니다.
- user.skills를 배열 구조분해합니다.
- 첫 번째 기술은 mainSkill에 저장합니다.
- 나머지 기술은 otherSkills 배열에 저장합니다.
- printUser({ name, role }) 함수를 작성합니다.
- 함수의 매개변수 자리에서 전달받은 객체를 구조분해하고 사용자 정보를 출력합니다.
- printUser를 호출할 때는 user 객체 하나를 전달합니다.

예상 출력
사용자명: 홍길동
역할: student
별명: 이름 없음
주요 기술: JavaScript
나머지 기술: [ 'React', 'CSS' ]
홍길동님의 역할은 student입니다.
*/

console.log('********************문제 4 풀이********************');
const user = {
    id: 1,
    name: '홍길동',
    role: 'student',
    skills: ['JavaScript', 'React', 'CSS']
};

const { name: userName, role, nickname = '이름 없음' } = user;
const [mainskill, ...otherskills] = user.skills;
function printUser({ name, role }) {
    console.log(`사용자명: ${name}`);
    console.log(`역할: ${role}`);
    console.log(`주요 기술: ${mainskill}`);
    console.log('나머지 기술: ', otherskills);
    console.log(`${name}님의 역할은 ${role}입니다.`);
}
printUser(user);


/*
======================================================================
문제 5. 상품 목록을 새 값으로 갱신하기
======================================================================

기존 상품 배열과 상품 객체를 직접 수정하지 않고
상품 추가, 가격 변경, 판매 가능 상품 조회, 총액 계산을 처리하세요.

입력
const products = [
    { id: 1, name: '키보드', price: 50000, stock: 3 },
    { id: 2, name: '마우스', price: 30000, stock: 0 },
    { id: 3, name: '모니터', price: 200000, stock: 2 }
];

const newProduct = {
    id: 4,
    name: '스피커',
    price: 80000,
    stock: 4
};

조건

1. 상품 추가
- 배열 Spread를 사용하여 products의 모든 상품과 newProduct가 들어 있는 addedProducts를 만듭니다.
- push는 사용하지 않습니다.

2. 가격 변경
- addedProducts의 id가 1인 상품 가격을 55000으로 바꾼 updatedProducts를 만듭니다.
- map과 화살표 함수를 사용합니다.
- id가 1인 상품은 객체 Spread로 기존 프로퍼티를 복사하고 price만 덮어씁니다.
- 나머지 상품은 원래 객체를 그대로 반환합니다.

3. 판매 가능한 상품
- filter와 화살표 함수를 사용하여 stock이 0보다 큰 상품만 availableProducts에 저장합니다.
- map과 매개변수 구조분해를 사용하여 판매 가능한 상품 이름만 모읍니다.

4. 총액 계산 함수
- getTotal(...prices) 함수를 화살표 함수로 작성합니다.
- Rest 파라미터로 받은 가격 배열을 reduce하여 합계를 반환합니다.
- updatedProducts에서 map으로 가격 배열을 만든 뒤, getTotal을 호출할 때 Spread로 펼쳐 전달합니다.

5. 원본과 결과 확인
- 아래 예상 출력 순서대로 결과를 출력합니다.
- products와 products[0]의 값은 직접 변경하지 않습니다.

예상 출력
원본 상품 수: 3
추가 후 상품 수: 4
원본 키보드 가격: 50000
변경된 키보드 가격: 55000
판매 가능 상품: [ '키보드', '모니터', '스피커' ]
전체 상품 가격 합계: 365000
*/

console.log('********************문제 5 풀이********************');
const products = [
    { id: 1, name: '키보드', price: 50000, stock: 3 },
    { id: 2, name: '마우스', price: 30000, stock: 0 },
    { id: 3, name: '모니터', price: 200000, stock: 2 }
];

const newProduct = {
    id: 4,
    name: '스피커',
    price: 80000,
    stock: 4
};

const addedProducts = [...products, newProduct];

const updatedProducts = addedProducts.map(oneid =>
    oneid.id === 1 ? { ...oneid, price: 55000 } : oneid);

const availableProducts = addedProducts.filter(stock => stock.stock > 0)
const availableProductslist = availableProducts.map(name => name.name);

const updatedPrice = addedProducts.map((price, stock) => price.price * stock.stock);

const getTotal = (...prices) => {
    return prices.reduce((sum, current) => sum + current, 0);
}

const getPrice = updatedProducts.map(price => price.price);

const total = getTotal(...getPrice);

// const total = updatedProducts.reduce((sum, { price }) => sum + price, 0);

console.log(`원본 상품 수: ${products.length}`);
console.log(`추가 후 상품 수: ${addedProducts.length}`);
console.log(`원본 키보드 가격: ${products[0].price}`);
console.log(`변경된 키보드 가격: ${updatedProducts[0].price}`);
console.log('판매 가능 상품: ', availableProductslist);
console.log(`전체 상품 가격 합계: ${total}`);

