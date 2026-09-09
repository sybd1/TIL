## [2026-09-07] JavaScript Function 함수

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### 함수 : 특정 동작에 이름 붙여 재사용 할 수 있게 만든 코드 묶음
- 기본 함수 문법 : function functionName (매개변수 parameter) {}
    - 매개변수 parameter는 외부에서 들어오는 값을 받아들이는 변수이다. 실제로 들어가는 값은 '인수 argument'라고 부른다.
1. return 변환
2. 함수 표현식 : 일반 함수와 다르게 변수를 선언하고 할당을 해야 에러가 나지 않는다. 규모가 커질수록 엄격한 탑다운 규칙의 함수 표현식이 선호된다.
3. 콜백 함수

### 2. 코드 예시 (Code)
```text
오늘 수업 중에 풀었지만, 6번까지 이해한 문제.
이 문제에 오늘 배운 모든 function 관련 사항이 다 들어있다.

1. `title: '자바스크립트 입문'`, `price: 15000`을 가진 book 객체를 만듭니다.
2. `calculateTotal(book, quantity)` 함수를 선언합니다.
3. 함수에서 book의 가격과 수량을 곱해 반환합니다. 함수 안에서는 출력하지 않습니다.
4. 두 권의 총액을 변수에 저장하고 출력합니다.
5. book의 가격을 18000으로 변경하고 두 권의 총액을 다시 호출해 출력합니다.
6. 수량 0도 호출해 확인합니다.
7. `const regularPrice = function(total) { ... };` 형태의 함수 표현식으로 총액을 그대로 반환하는 함수를 만듭니다.
8. 같은 방식으로 총액에서 3000원을 빼서 반환하는 `discountPrice`를 만듭니다. 총액이 3000원 미만이면 조기 반환(Early Return)으로 0을 반환합니다.
9. `checkout(book, quantity, pricePolicy)`를 선언합니다. 내부에서 `calculateTotal`로 총액을 구하고, `pricePolicy` 콜백(regularPrice 또는 discountPrice)에 총액을 전달한 결과를 반환합니다.
10. 가격이 18000원인 현재 book으로 두 권의 일반 결제와 할인 결제를 호출해 결과를 바깥에서 출력합니다. 수량 0의 할인 결제도 확인합니다. 콜백은 `regularPrice`, `discountPrice`처럼 함수 자체를 전달합니다.

const book = {
    title: '자바스크립트 입문',         
    price: 15000
};

function calculateTotal(book, quantity) {
    return book.price * quantity;           
}
// 호출될시에 '책의 가격'과 수량을 곱해 return 키워드를 사용해 코드 블럭 밖으로 반환하도록 한다.

const result = calculateTotal(book, 2);     
console.log(result);

// 함수를 호출해서 인수를 보내고 계산된 return(반환) 값을 받아 result 변수에 할당하고 출력한다.

book.price = 18000;
console.log(calculateTotal(book, 2));
// 마침표 표기법으로 book 객체의 price 프로퍼티 값을 15000에서 18000으로 재할당 했습니다.
// 재할당 된 book 객체의 인수를 전달하고, 함수를 호출하고 반환된 결과값을 출력한다.

console.log(calculateTotal(book, 0));
// 매개변수 quantity 자리에 인수 0을 전달하여 호출하고 결과값을 출력

const regularPrice = function(total) {
    return total;
};
// 조건식이 없는 표현식 함수

const discountPrice = function(total) {
    if (total < 3000) {
    return 0;
    }
    return total - 3000;
}

function checkout(book, quantity, pricePolicy) {
    const total = calculateTotal(book, quantity) {
        return pricePolicy(total);
    }
}

console.log(calculateTotal(book, 2, regularPrice))
// 1. 재료 3개를 들고 checkout 함수 호출. checkout 매개변수에 각각 투입.
// 2. checkout 안쪽 첫 줄 실행. calculatrTotal호출. book.price와 quantity 곱 36000 결과를 반환받음
// 3. return pricePolicy(total) 줄 도착. pricePolicy에 꽂아둔 것이 regularPrice 함수이므로 regularPrice은 36000임을 인식
// 4. regularPrice 콜백 함수 호출로 점프. 이후 내부 코드 실행 total에 36000 들어가 return total 실행. 36000.
// 5. checkout 36000으로 변신
// 6. 36000 출력

console.log(calculateTotal(book, 2, discountPrice))
console.log(calculateTotal(book, 0, discountPrice))
// 
```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- 함수 표현식은 함수의 위치가 갑자기 우항으로 넘어가고 기본 순서가 아니라 헷갈린다. 외우자.
```text 
[변수 선언 키워드] [함수 이름표(변수명)] = function (매개변수) {
    // 실행할 로직
    return 반환값;
}; 
```
- 콜백 함수를 아무리 봐도 이해가 되지 않다가, 계산대와 투입구로 비유하는 것을 보고 개념을 조금 이해했다. 인수의 값을 각각 조건에 맞는 매개변수로 찾아가 집어넣고 반환 받은 값을 출력하는 개념. 하나의 함수에서 끝나지 않고, 다른 함수로 필요한 시점에 호출되는 함수.


### 4. 내일 공부할 내용 (Next)
- JavaScript
    - Scope
    - Object Constructors