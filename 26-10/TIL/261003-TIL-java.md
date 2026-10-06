## [2026-09-07] Java 예습

### 1. 오늘 배운 핵심 개념 (What I Learned)
- 자료형
    - 기본 자료형: 실제 데이터 값을 저장 (int, long, float, double, boolean, char, ...)
    - 참조 자료형: 데이터가 저장된 메모리 주소 값을 저장 (클래스, 인터페이스, 배열, 열거형, ... (Srting))
- 기본 자료형
    - int: 정수, 4byte
    - long: 정수, 8byte
    - float: 실수, 4byte
    - double: 실수, 8byte
    - boolean: 참/거짓, 1byte
    - char: 문자, 2byte

- 형 변환: 정수, 실수, 문자열 간의 변환
    - 묵시적 형 변환( = 자동 형 변환): int -> long -> float -> double, 이 순서대로 우항의 자료형을 생략 가능하다.
    - 명시적 형 변환: double -> float -> long -> int, 묵시적 형 변환가 반대의 순서대로 할 시에 우항의 자료형을 생략할 수 없다.

- 연산자
    - 산술 연산자, 대입 연산자, 비교 연산자, 논리연산자, 삼항 연산자 는 JS와 동일하다.

- 문자열 기능
    - length(): 길이가 몇 개인지 숫자형으로 반환
    - toUpperCase(): 대문자로 결과 반환
    - toLowerCase(): 소문자로 결과 반환
    - contains(): 포함 여부를 boolean값으로 반환
    - indexOf(): 위치 정보를 숫자형으로 반환
    - lastIndexOf(): 마지막 위치 정보를 숫자형으로 반환
    - startWith(): 해당 문자열로 시작하는가? boolean값으로 반환
    - endsWith(): 해당 문자열로 끝나는가? boolean값으로 반환
    - replace(): 해당 문자열로 변환
    - substring(): 해당 문자열까지 자른 뒤 나머지 뒤의 문자열 값 반환
    - trim(): 앞 뒤 공백 제거
    - concat(): 해당 문자열 마지막에 결합

- System.out.println(): JS에서 console.log() 같이 콘솔에 출력할 수 있는 함수다.
    - System.out.println("A\nB");       // A 한칸 띄우고 B가 출력
    - System.out.println("A\tB");       // A    B, A 탭하고 B 출력
    - System.out.println("C:\\Java");   // C:\Java
    - System.out.println("A\"B\"C");    // A"B"C
    - System.out.println("A\'B\'C");    // A'B'C


### 2. 코드 예시 (Code)
```text
- 변수 선언
String name = "엔믹스";
int birthday = 413;
double bDay = 1.26;
char grade = 'A';
boolean love = true;

int birthday;
birthday = 413;

- final: 상수
final int birthday = 413;
birthday = 126; // 값 변경 불가

- 형 변환 문법(묵시적 형 변환)
int age = 25;
float age_f = (float) age;  // 우항의 float 묵시적 형 변환으로 생략 가능
double age_d = (double) 21; // 우항의 float double 형 변환으로 생략 가능

- 형 변환 문법(명시적 형 변환)
double age = 1.26;
int age_i = (int)age;   // 우항의 int 생략 불가능

- 문자열 기능 문법
String nmixx = "We Love Nmixx";

nmixx.length();         // 13;
nmixx.toUpperCase();    // WE LOVE NMIXX
nmixx.toLowerCase();    // we love nmixx
nmixx.contains(nmixx);  // true
nmixx.indexOf(nmixx);   // 8
nmixx.lastIndexOf(x);   // 12
nmixx.startWith(Love);  // flase
nmixx.endsWith(Nmixx);  // true
nmixx.replace("Love", "Like");  // We Like Nmixx
nmixx.substring(3);     // Love Nmixx
nmixx.trim();           // We Love Nmixx
nmixx.concat(" and Nswer");     // We Love Nmixx and Nswer
```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)



### 4. 내일 공부할 내용 (Next)

