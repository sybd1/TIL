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
function Member(name, options) {
  this.name = name;
  this.options = options;
}
Member.prototype.introduce = function () {
  const total = this.options?.nickname ?? this.name;
  const result = this.options?.level ?? '일반';
  return `${total}님은 ${result}회원입니다.`
}
const member1 = new Member('홍길동', { nickname: '길동이', level: 'VIP' });
const member2 = new Member('유관순');
console.log(member1.introduce());
console.log(member2.introduce());
console.log(`같은 메서드: ${member1.introduce === member2.introduce}`);