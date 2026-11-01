## [2026-09-07] 조건문 (Conditional Statement)

### 1. 오늘 배운 핵심 개념 (What I Learned)
- 조건문 : 조건식이 true인지 false인지 판별하여, 그 결과에 따라 실행 흐름을 여러 갈래로 나누어 제어하는 문법
1. if else : 조건식이 true면 실행구문과, 조건식이 false인 경우 실행하는 구문이 있다. true, false 둘 중 하나만 실행한다.
2. switch : 하나의 변수에 관해 여러 경우를 처리한다.
3. for : 반복문. 명확한 반복 횟수를 지정하여 코드를 실행한다.
4. continue, break : 반복문에서 continue에서 조건식이 true라면 그 값을 제외하고, 다음 증강식으로 넘어간다.
5. while, do : 조건이 참인 동안 코드를 반복 실행한다. do는 false이더라도 일단 한 번은 실행하게 만드는 키워드이다.

### 2. 코드 예시 (Code)
```text
1. if else

let mountain = 1500;

if (mountain > 1000) {
    console.log('높은 산 입니다');  // 조건이 true일 때 '높은 산입니다' 출력
} else {
    console.log('낮은 산 입니다');  // 조건이 false일 때 '낮은 산 입니다' 출력
}

let test = 75;

if (test > 90) {
    console.log('잘했어요');
} else if (test > 80){
    console.log('꽤 하네요')
} else if (test > 70) {
    console.log('나쁘지 않네요')
} else {
    console.log('열심히 해볼까요?')
}

2. switch
let doll = '곰';

switch (doll) {
    case '고양이':
        console.log('이것은 고양이입니다.');
        break;
    case '강아지':
        console.log('이것은 강아지입니다.');
        break;
    case '곰':
        console.log('이것은 곰입니다.');
        break;
    default:    // 위 조건들이 해당하지 않을 때 실행
        console.log('알 수 없는 인형입니다.');
}

3, 4. for, continue, break
for (mul = 1; mul < 20; mul++) {
    if (mul % 2 === 1) {
        continue;           // 조건식에서 나온 홀수를 걸러낸다.
    } 
    console.log(mul);       // 2의 배수 20까지
}

for (mul = 1; mul < 20; mul++) {
    if (mul % 2 === 1) {
        break;           // 반복문 종료.
    } 
    console.log(mul);       // 1
}

5. while
let count = 5;

while (count > 2) {
    console.log(count);     // 5, 4, 3
    count--;
}

let num = 10;

do {                        // do 최소 한 번 실행한 후 조건을 검사한다.
    console.log(num);       // 10
    --num;
} while (num < 8);

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- 조건문 if, else if, else if... 로 반복되는데 if, if else, if else인 줄 알았다. 출력되지 않아서 당황했다.
- 변수 안에 담긴 값과 단순 부등호로 비교를 하는데도 헷갈린다. 변수라는 단어를 많이 사용했던 직종에 있었던 탓이 큰 것 같다. 프로그래머가 사용하는 Variable에 집중하자.
- for와 continue 중괄호 위치가 헷갈린다. 위에서 아래로 계산을 진행하는데 continue에서 걸러지면 다시 위로 증감식으로 간다고 확실히 인식하자.

### 4. 내일 공부할 내용 (Next)
