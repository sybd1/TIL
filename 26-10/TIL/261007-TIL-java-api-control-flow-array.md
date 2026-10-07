## [2026-10-07] Java API, Control flow, Array

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### API
- 자바에서 지공해주는 기능이며 찾아와 사용할 대상이다. 자바는 자주 필요한 기능을 클래스와 메서드로 미리 제공한다. 이런 기능을 사용하기 위한 규칙과 도구의 집합을 API라고 부른다.
    - java.lang.Math: 수학에서 자주 사용하는 상수들과 함수들을 미리 구현해 놓은 클래스. 모든 메소드는 static 메소드이다.
        - Math.abs(): 절대값
        - Math.max(): 최대값
        - Math.min(): 최소값
        - Math.random(): 0.0 이상 1.0 미만의 실수 반환
        
#### Scanner
- java.util 안에 존재하는 클래스이자 api이다. import를 해줘야 사용가능하다.
- Scanner 객체 생성 후, 제공하는 메서드를 사용해 사용자의 입력 정보를 분석하는 기능을 사용할 수 있다.
    - nextLine(): 엔터 키 이전까지 한 줄 전체를 문자열로 읽음.
    - next(): 공백 문자나 개행 문자 전 까지 문자열로 읽음.
    - nextInt(): 공백 이전까지의 정수 값을 읽음.
    - nextDouble(): 공백 이전까지의 실수 값을 읽음.
    - java.lang.String의 charAt(index)를 사용해 문자열이 아닌 문자 자료형을 입력 받을 수 있다.
        - \n은 버퍼로 남아 있기에 오류가 날 수 있다. 개행문자 처리를 해야 제대로 된 문자 값을 받을 수 있다. nextLine(); 으로 처리하면 된다.

#### Control flow - If, Switch, For, while
- if, else, else if: x가 true/false 인지, y가 true/false인지, z가 true/false인지 찾아 원하는 값을 받는 조건문이다.
- switch: x와 y 값을 받아 z라는 연산 기호로 계산을 할 수 있다. 원하는 값을 받아 원하는 기능을 할 수 있는 조건문 이다.
    - 향상된 -> 문법으로 더 간결하게 작성 가능하다. 메서드를 종료하는 return 대신 yield 0; 문법을 사용해야 한다.
- For: 주로 반복횟수가 정해져 있을 때 사용하는 반복문이다.
- while: 주로 반복횟수가 정해져 있지 않을 때 사용하는 반복문이다. 조건식이 false가 되면 반복이 종료된다.

- break: 
- continue: 
- return: 

### 2. 코드 예시 (Code)
```text
- 난수 만들기
// 10 ~ 15까지 난수 발생
int random = (int) (Math.random() * 6) + 10;

- java.util.Random 클래스를 활용한 난수 만들기
// 0 ~ 9 까지 난수 발생
import java.util.Random;
Random random1 = new Random();
int random2 = random1.nextInt(10);

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- class는 데이터와 그 데이터를 다루는 메서드(특정 작업을 하는 명령 묶음)를 하나로 묶어 둔 설계도 이다. new로 그 설계도를 실행하면 메모리에 실제 객체가 생기고, 그 객체를 Instance라고 부른다.


### 4. 내일 공부할 내용 (Next)

