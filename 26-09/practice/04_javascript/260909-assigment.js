/*
======================================================================
문제 1. 회원의 배송지 확인하기
======================================================================

회원 객체에 배송지 정보가 있을 수도 있고 없을 수도 있습니다.
옵셔널 체이닝 연산자를 사용하여 도시를 안전하게 조회하세요.

입력
const user1 = {
    name: '홍길동',
    address: {
        city: '서울'
    }
};

const user2 = {
    name: '유관순'
};

조건
- 입력 객체는 그대로 사용합니다.
- 옵셔널 체이닝 연산자(?.)를 사용합니다.
- if문이나 논리 AND 연산자(&&)를 사용하지 않습니다.
- user1과 user2의 도시를 각각 출력합니다.

예상 출력
서울
undefined
*/

// 문제 1 풀이
const user1 = {
    name: '홍길동',
    address: {
        city: '서울'
    }
};

const user2 = {
    name: '유관순'
};

console.log(user1.address?.city);
console.log(user2.address?.city);


/*
======================================================================
문제 2. 설정값에 기본값 적용하기
======================================================================

사용자가 설정한 알림 횟수와 상태 메시지에 기본값을 적용하세요.

입력
const notificationCount = 0;
const statusMessage = '';
const profileImage = null;

조건
- null 병합 연산자(??)를 사용합니다.
- 알림 횟수의 기본값은 10입니다.
- 상태 메시지의 기본값은 '상태 메시지 없음'입니다.
- 프로필 이미지의 기본값은 'default.png'입니다.
- 0과 빈 문자열은 사용자가 직접 설정한 값이므로 그대로 출력되어야 합니다.
- 논리 OR 연산자(||)와 조건문을 사용하지 않습니다.

예상 출력
알림 횟수: 0
상태 메시지:
프로필 이미지: default.png
*/

// 문제 2 풀이
const notificationCount = 0;
const statusMessage = '';
const profileImage = null;

console.log(`알림 횟수: ${notificationCount ?? 10}`);
console.log(`상태 메시지: ${statusMessage ?? '상태 메시지 없음'}`);
console.log(`프로필 이미지: ${profileImage ?? 'default.png'}`);


/*
======================================================================
문제 3. 상품 객체를 만드는 생성자 함수
======================================================================

같은 구조의 상품 객체를 만들 수 있는 생성자 함수를 작성하세요.

조건
- Product(name, price, stock) 생성자 함수를 작성합니다.
- 전달받은 값을 name, price, stock 프로퍼티에 저장합니다.
- 생성자 함수 안에 getInfo 메서드를 작성합니다.
- getInfo는 '상품명: 가격원, 재고 stock개' 형태의 문자열을 반환합니다.
- new를 사용하여 아래 상품 객체 두 개를 만듭니다.
  - '키보드', 50000, 3
  - '마우스', 30000, 5
- 두 객체의 getInfo 반환값을 출력합니다.
- 첫 번째 상품의 stock을 2로 변경한 뒤 두 상품 정보를 다시 출력합니다.

예상 출력
키보드: 50000원, 재고 3개
마우스: 30000원, 재고 5개
키보드: 50000원, 재고 2개
마우스: 30000원, 재고 5개
*/

// 문제 3 풀이
function Product(name, price, stock) {
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.getInfo = function () {
        return (`상품명: ${this.name}, ${this.price}원, 재고 ${this.stock}개`);
    }
};

const product1 = new Product('키보드', 50000, 3);
const product2 = new Product('마우스', 30000, 5);
console.log(product1.getInfo());
console.log(product2.getInfo());
product1.stock = 2;
console.log(product1.getInfo());
console.log(product2.getInfo());


/*
======================================================================
문제 4. 프로토타입으로 메서드 공유하기
======================================================================

학생 객체마다 같은 메서드를 새로 만들지 않도록 프로토타입에 메서드를 작성하세요.

조건
- Student(name, score) 생성자 함수를 작성합니다.
- 생성자 안에서는 name과 score 프로퍼티만 저장합니다.
- Student.prototype에 getGrade 메서드를 추가합니다.
- getGrade는 score가 80 이상이면 '통과', 그렇지 않으면 '재학습'을 반환합니다.
- new를 사용하여 아래 학생 객체 두 개를 만듭니다.
  - '홍길동', 85
  - '유관순', 70
- 각 학생의 이름과 getGrade 반환값을 출력합니다.
- 두 학생의 getGrade가 같은 함수인지 ===로 비교해 출력합니다.
- student1이 getGrade를 자신의 프로퍼티로 가지고 있는지 Object.hasOwn으로 확인합니다.

예상 출력
홍길동: 통과
유관순: 재학습
같은 메서드: true
자신의 메서드: false
*/

// 문제 4 풀이
function Student(name, score) {
    this.name = name;
    this.score = score;
}

Student.prototype.getGrade = function () {
    if (this.score >= 80) {
        return `${this.name}: 통과`;
    } else {
        return `${this.name}: 재학습`;
    }
}


const student1 = new Student('홍길동', 85);
const student2 = new Student('유관순', 70);
console.log(student1.getGrade());
console.log(student2.getGrade());
// console.log(`같은 메서드: ${Object.getPrototypeOf(student1.getGrade() === student2.getGrade())}`);
console.log(`같은 메서드: ${student1.getGrade === student2.getGrade}`);
console.log(`자신의 메서드: ${Object.hasOwn(student1, 'getGrade')}`);


/*
======================================================================
문제 5. 회원 객체와 프로토타입을 활용한 종합 문제
======================================================================

회원 객체를 생성하고, 선택 정보가 없는 경우 기본값을 사용해 소개 문장을 만드세요.

조건
- Member(name, options) 생성자 함수를 작성합니다.
- 생성자 안에서 name과 options를 프로퍼티에 저장합니다.
- Member.prototype에 introduce 메서드를 추가합니다.
- introduce에서는 다음 값을 사용합니다.
  - this.name은 회원 이름입니다.
  - 옵셔널 체이닝 연산자를 사용하여 별명을 안전하게 조회합니다.
  - 별명이 null 또는 undefined이면 null 병합 연산자를 사용하여 this.name을 대신 사용합니다.
  - 옵셔널 체이닝 연산자를 사용하여 등급을 안전하게 조회합니다.
  - 등급이 null 또는 undefined이면 null 병합 연산자를 사용하여 '일반'을 대신 사용합니다.
- introduce는 '표시 이름님은 등급 회원입니다.' 형태의 문자열을 반환합니다.
- new를 사용하여 아래 회원 두 명을 만듭니다.
  - Member('홍길동', { nickname: '길동이', level: 'VIP' })
  - Member('유관순')
- 두 회원의 introduce 반환값을 출력합니다.
- 두 회원의 introduce가 같은 함수인지 ===로 비교해 출력합니다.

예상 출력
길동이님은 VIP 회원입니다.
유관순님은 일반 회원입니다.
같은 메서드: true
*/

// 문제 5 풀이
function Member(user, options) {
    this.user = user;
    this.options = options;
}
Member.prototype.introduce = function () {
    const displayUser = this.options?.nickname ?? this.user;
    const grade = this.options?.level ?? '일반';

    return `${displayUser}님은 ${grade}회원입니다.`
}
    

// this.nickname = '길동이';
// this.level = 'VIP';
const member1 = new Member('홍길동', {nickname: '길동이', level: 'VIP'});
const member2 = new Member('유관순');

console.log(member1.introduce());
console.log(member2.introduce());
console.log(`같은 메서드: ${member1.introduce === member2.introduce}`);