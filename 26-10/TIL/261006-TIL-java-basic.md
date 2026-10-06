## [2026-10-06] Java Basic

### 1. 오늘 배운 핵심 개념 (What I Learned)

#### Java

    벡엔드에서 데이터를 처리할 수 있는 언어. 안정성과 구조를 굉장히 중요하게 생각하는 언어. 
    Java Byte Code라는 Java만의 특수한 중간 언어로, Compriler 이후 또 다른 번역 과정을 거친다.
    Byte Code로 번역된 언어를 JVM이 설치되어 있는 다른 운영체제의 컴퓨터에 보내면 다양한 운영체제에서 실행할 수 있게 도와준다.

    .java -> .class(Byte code) -> JVM

- JDK(Java Development Kit): Java를 개발하기 위해 필요한 모든 도구. COmpiler와 개발도구가 포함되어 있다.
- JRE(Java Runtime Environment): Java로 작성된 프로그램을 실행시킬 수 있는 환경.
- JVM(Java Virtual Mechine): 어떤 운영체제(Window, Mac, Linux) 에서도 Java만을 위해 존재하는 가상의 컴퓨터.
- 자료형을 설정하고 변수를 선언하는 정적 타입 언어. JS는 동적 언어이다.


#### Java 기초 and type casting
- final: 상수 선언 시 자료형 앞에 final 키워드를 붙인다.
- overflow: 자료형이 저잘할 수 있는 최대 범위를 넘어가면 최소 범위로 값이 돌아온다. 
- underflow: 반대로 최소 범위 아래로 값이 넘어가면 최대 범위로 값이 돌아온다.
- type casting
    - 서로 다른 숫자 타입을 연산하면 자바가 두 값을 함께 계산할 수 있는 타입으로 맞춘다. 일반적으로 표현 범위가 더 넓은 타입으로 자동 변환한 뒤 연산한다.
    - 정수는 실수로 자동 형변환된다.

#### method
        어떤 특정 작업을 하기 위한 명령문의 집합

- 매개변수의 타입, 개수, 순서를 정확히 맞춰서 인자를 전달해야 한다.
- void: 반환 값이 없음을 뜻한다. void 자리에 반환 타입을 작성했다면, 그 타입에 맞는 값을 반드시 반환해야 한다.
- pakage: 폴더 하나하나를 부르는 명칭. 같은 pakage 내에서는 클래스 이동이 자유롭다.
- class 명은 pakage까지 포함되어 있다.
- 다른 pakage에 있는 class를 사용하려면 import 구문이 있거나, com.ohgiraffers... 같은 클래스명 풀네임을 입력해야 한다.
- static: method나 variable이 object 별로 존재하지 않고 class에 속하게 만드는 keyword.

### 2. 코드 예시 (Code)
```text
- 큰 자료형에서 작은 자료형으로 변경 시
long lnum = 100;
int inum = (int)lnum;

- 실수를 정수로 변경시 강제 형변환 필요
float fnum = 4.9f;
long lnum1 = (long)fnum;    // 4

- method
public class Nmixx {
    public static void main(String[] args) {

        - non-static 메소드의 경우
        Nmixx nswer = new Nmixx();  // nswer는 Nmixx 클래스의 인스턴스다.
        String result = nswer.member("지우", 22)
        System.out.println(result1);

        - static 메소드의 경우
        String result2 = Nmixx.member("설윤", 23);
        System.out.println(result2);
    }

    public static String member(String name, int age) {
        String introduce = "안녕하세요. " + name + "입니다. " + age + "살 입니다.";
        return introduce;
    }
}
```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- 자바에는 JS처럼 '===' 연산자가 없다.
- ''는 문자 형태, ""는 문자열 형태.


### 4. 내일 공부할 내용 (Next)

