/*
======================================================================
[연습문제 1] 화살표 함수와 map으로 영화 예매 금액 계산하기
======================================================================

영화 예매 객체 배열을 이용해 각 영화별 총 결제 금액을 계산하세요.

입력
const bookings = [
    { title: '인셉션', price: 14000, seats: 2 },
    { title: '인터스텔라', price: 15000, seats: 3 },
    { title: '오펜하이머', price: 16000, seats: 1 }
];

조건
- map과 화살표 함수를 사용합니다.
- 콜백의 매개변수 자리에서 title, price, seats를 객체 구조분해로 꺼냅니다.
- 각 예매를 '영화제목: 총결제금액원' 형태의 문자열로 바꿉니다.
- 화살표 함수의 중괄호 { }와 return을 생략합니다.
- map이 반환한 새 배열을 bookingLabels에 저장해 출력합니다.

예상 출력
[ '인셉션: 28000원', '인터스텔라: 45000원', '오펜하이머: 16000원' ]
*/

console.log('********************문제 1 풀이********************');
const bookings = [
    { title: '인셉션', price: 14000, seats: 2 },
    { title: '인터스텔라', price: 15000, seats: 3 },
    { title: '오펜하이머', price: 16000, seats: 1 }
];

const bookingLabels = bookings.map(({ title, price, seats }) => `${title}: ${price * seats}원`);
console.log(bookingLabels);



/*
======================================================================
[연습문제 2] for...of로 단어 글자 수 세기와 학습 목록 순번 매기기
======================================================================

단어의 알파벳과 이번 주 학습 목표 목록을 순서대로 출력하세요.

입력
const techWord = 'API';
const studyList = ['Node.js', 'Express', 'MongoDB'];

조건
- 일반 for문과 배열 고차함수(map, forEach 등)를 사용하지 않습니다.
- 첫 번째 for...of에서는 techWord의 글자를 하나씩 출력합니다.
- 두 번째 for...of에서는 studyList의 과목명을 하나씩 출력합니다.
- 과목명 앞에는 1부터 시작하는 순번을 붙입니다.
- 순번은 반복문 외부에 별도의 step 변수를 선언하여 반복할 때마다 1씩 증가시킵니다.

예상 출력
문자: A
문자: P
문자: I
1교시: Node.js
2교시: Express
3교시: MongoDB
*/

console.log('********************문제 2 풀이********************');
const techWord = 'API';
const studyList = ['Node.js', 'Express', 'MongoDB'];

for (const word of techWord) {
    console.log(`문자: ${word}`);
}

let step = 0;

for (const list of studyList) {
    console.log(`${++step}교시: ${list}`);
}



/*
======================================================================
[연습문제 3] Rest와 Spread로 프로젝트 발표자 명단 처리하기
======================================================================

오전 발표팀과 오후 발표팀을 합치고 발표자와 청중을 분리하세요.

입력
const morningSpeakers = ['지수', '제니'];
const afternoonSpeakers = ['로제', '리사'];

조건
- Spread를 사용하여 두 팀과 마지막 참가자 '아이유'를 합친 새 배열 allSpeakers를 만듭니다.
- 원본 morningSpeakers와 afternoonSpeakers는 변경하지 않습니다.
- assignRoles(mainSpeaker, ...audiences) 함수를 작성합니다.
- mainSpeaker에는 첫 번째 인수 하나를 받습니다.
- Rest 파라미터 audiences에는 나머지 인수들을 배열로 받습니다.
- 함수 내부에서는 아래 예상 출력 순서대로 전체 명단, 대표 발표자, 방청객, 원본 팀들을 출력합니다.
- assignRoles를 호출할 때 allSpeakers를 Spread로 펼쳐 전달합니다.

예상 출력
전체 명단: [ '지수', '제니', '로제', '리사', '아이유' ]
대표 발표자: 지수
방청객: [ '제니', '로제', '리사', '아이유' ]
오전 발표팀: [ '지수', '제니' ]
오후 발표팀: [ '로제', '리사' ]
*/

console.log('********************문제 3 풀이********************');
const morningSpeakers = ['지수', '제니'];
const afternoonSpeakers = ['로제', '리사'];

const allSpeakers = [...morningSpeakers, ...afternoonSpeakers, '아이유'];

function assignRoles(mainSpeaker, ...audiences) {
    console.log('전체 명단: ', allSpeakers);
    console.log('대표 발표자:', mainSpeaker);
    console.log('방청객 :', audiences);
    console.log('오전 발표팀: ', morningSpeakers);
    console.log('오후 발표팀: ', afternoonSpeakers);
}
assignRoles(...allSpeakers);

/*
======================================================================
[연습문제 4] 직원 프로필 구조분해하기
======================================================================

직원 객체와 자격증 배열에서 필요한 데이터를 구조분해로 꺼내세요.

입력
const employee = {
    empId: 101,
    name: '이순신',
    department: '개발팀',
    certificates: ['정보처리기사', 'SQLD', 'AWS-SAA']
};

조건
- 객체 구조분해로 name을 empName이라는 새 변수명으로 받습니다.
- department는 그대로 꺼냅니다.
- 객체에 없는 level 프로퍼티는 기본값 '사원'을 할당합니다.
- employee.certificates를 배열 구조분해합니다.
- 첫 번째 자격증은 primaryCert에 저장합니다.
- 나머지 자격증들은 otherCerts 배열에 저장합니다.
- showProfile({ name, department }) 함수를 작성합니다.
- 함수의 매개변수 자리에서 전달받은 객체를 구조분해하여 소개 문구를 출력합니다.
- showProfile을 호출할 때는 employee 객체 하나를 인수로 전달합니다.

예상 출력
직원명: 이순신
부서: 개발팀
직급: 사원
대표 자격증: 정보처리기사
보유 자격증: [ 'SQLD', 'AWS-SAA' ]
이순신님은 개발팀 소속입니다.
*/

console.log('********************문제 4 풀이********************');
const employee = {
    empId: 101,
    name: '이순신',
    department: '개발팀',
    certificates: ['정보처리기사', 'SQLD', 'AWS-SAA']
};

const { name: empName, department, level = '사원' } = employee;
const [primaryCert, ...otherCerts] = employee.certificates;
function showProfile({ name, department }) {
    console.log(`직원명: ${empName}`);
    console.log(`부서: ${department}`);
    console.log(`직급: ${level}`);
    console.log(`대표 자격증: ${primaryCert}`);
    console.log('보유 자격증: ', otherCerts);
    console.log(`${name}님은 ${department} 소속입니다.`)
};
showProfile(employee);

/*
======================================================================
[연습문제 5] 서점 도서 목록 관리 및 불변성 유지하기
======================================================================

기존 도서 배열과 객체를 직접 변경하지 않고,
신간 추가, 도서 가격 할인 갱신, 재고 있는 도서 조회, 총 재고 도서의 가격 합을 구하세요.

입력
const books = [
    { id: 1, title: '자바스크립트 완벽 가이드', price: 40000, inStock: 5 },
    { id: 2, title: '클린 코드', price: 30000, inStock: 0 },
    { id: 3, title: '리팩터링', price: 35000, inStock: 2 }
];

const newBook = {
    id: 4,
    title: '타입스크립트 프로그래밍',
    price: 32000,
    inStock: 3
};

조건

1. 도서 추가
- 배열 Spread를 사용하여 books의 모든 도서와 newBook이 들어 있는 addedBooks를 만듭니다.
- push 메서드는 사용하지 않습니다.

2. 가격 갱신 (할인 이벤트)
- addedBooks에서 id가 1인 도서의 price를 36000으로 인하한 updatedBooks를 만듭니다.
- map과 화살표 함수, 삼항 연산자를 사용합니다.
- id가 1인 도서는 객체 Spread로 기존 프로퍼티를 복사하고 price만 덮어씁니다.
- 나머지 도서는 원래 객체를 그대로 반환합니다.

3. 구매 가능한 도서 목록
- filter와 화살표 함수를 사용하여 inStock(재고)이 0보다 큰 도서만 inStockBooks에 저장합니다.
- inStockBooks를 map과 매개변수 구조분해를 사용하여 도서 제목(title)만 모은 availableTitles 배열을 만듭니다.

4. 전체 도서 가격 총합 계산 함수
- calculateTotal(...prices) 함수를 화살표 함수로 작성합니다.
- Rest 파라미터로 받은 가격 배열을 reduce하여 총합을 반환합니다.
- updatedBooks에서 map으로 가격 배열 bookPrices를 추출한 뒤, calculateTotal을 호출할 때 Spread로 펼쳐 전달하여 totalBookPrice에 저장합니다.

5. 원본과 결과 검증
- 아래 예상 출력 순서대로 결과를 콘솔에 출력합니다.
- 원본 books와 books[0]의 데이터는 절대 변경되지 않아야 합니다.

예상 출력
원본 도서 수: 3
추가 후 도서 수: 4
원본 1번 도서 가격: 40000
할인된 1번 도서 가격: 36000
구매 가능 도서: [ '자바스크립트 완벽 가이드', '리팩터링', '타입스크립트 프로그래밍' ]
전체 도서 가격 합계: 133000
*/

console.log('********************문제 5 풀이********************');
const books = [
    { id: 1, title: '자바스크립트 완벽 가이드', price: 40000, inStock: 5 },
    { id: 2, title: '클린 코드', price: 30000, inStock: 0 },
    { id: 3, title: '리팩터링', price: 35000, inStock: 2 }
];

const newBook = {
    id: 4,
    title: '타입스크립트 프로그래밍',
    price: 32000,
    inStock: 3
};

const addeBooks = [...books, newBook];

const updatedBooks = addeBooks.map((prices) => prices.id === 1 ? {...prices, price: 36000} : prices );

const inStockBooks = addeBooks.filter(book => book.inStock > 0);
const availableTitles = inStockBooks.map(title => title.title);

const calculateTotal = (...prices) => prices.reduce((add, result) => add + result, 0);

const bookPrices = updatedBooks.map(prices => prices.price);

const bookPricesTotal = calculateTotal(...bookPrices);

console.log('원본 도서 수: ', books.length)
console.log('추가 후 도서 수: ', addeBooks.length);
console.log(`원본 1번 도서 가격: ${books[0].price}`);
console.log(`할인된 1번 도서 가격: ${updatedBooks[0].price}`);
console.log(`구매 가능 도서: `, availableTitles);
console.log(`전체 도서 가격 합계: ${bookPricesTotal}`);
