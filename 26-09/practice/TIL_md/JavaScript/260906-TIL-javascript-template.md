## [2026-09-05] HTML & CSS 연습

### 1. 오늘 배운 핵심 개념 (What I Learned)
- JavaScript의 기능 중 하나는 사용자가 보내온 데이터를 가공해서 백엔드 서버로 보내고 다시 받아 사용자의 화면에 띄우는 일을 할 수 있다.
- JavaScript의 variable을 저정하는 데이터 타입은 7가지가 있다. number, string, boolean, undefined, null, symbol, object
- const는 값이 변하지 않을 때 사용하는 선언하는 키워드이고, let은 값이 변할 때 사용하는 키워드이다.

### 2. 코드 예시 (Code)

#### 
```text
누가 가장 많은 쿠키를 가져왔는가?
const cookie = [10, 65, 15, 79, 12, 9]; // 변하지 않는 값. 가지고 온 쿠키 개수.
let maxCookie = cookie[0];              // 변하는 값. 임시 공간에서 쿠키 개수를 임의로 하나 적어둔다 .
    for (const count of cookie) {       // 변하지 않는 값. 임시 공간에 적어둔 쿠키 개수와 나머지 쿠키 개수를 하나씩 가지고 온다.
        if (count > maxCookie) {        // 모든 쿠키를 비교해 가장 개수 가 많은 쿠키를 선별한다.
            maxCookie = count;          // 가장 많은 쿠키를 찾았다
        }   
    }
    console.log(maxCookie);             // 답을 출력한다
```


### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- 가장 많은 것을 구하고, 몇 개인지 찾는 등의 사칙연산을 한 뒤 결과를 도출하는 연습을 했는데, 여전히 어떤 변수를 만들어서 어떻게 비교하고 값을 도출하는지 모든 과정이 헷갈린다.
- CSS연습 중에 trasition과 trasform 값을 다 적어도, 버튼이 반응이 없었는데, 알고보니 CSS 태그에 hover를 붙이지 않았던 실수를 했다.


### 4. 내일 공부할 내용 (Next)
- JavaScript variable 변수
- JavaScript operator