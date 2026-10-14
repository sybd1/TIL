## [2026-10-14] Java API, Generic

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### API
- 프로그램을 만들 때 사용할 수 있도록 미리 제공되는 클래스와 메서드의 사용 규칙.

##### Object
- 자바의 최상위 객체로서, 모든 클래스는 자동으로 Object 클래스를 상속한다. extends로 상속하지 않아도 모든 클래스는 Object의 자식이다. 따라서 Object에 있는 메서드를 오버라이딩하여 사용할 수 있다.
- Object.toString(): 이 메서드는 원래 클래스명과 16진수 형태의 해시값을 보여주는 형태이지만, 사람이 보기에 의미없는 정보이므로 객체의 필드값을 보여주도록 오버라이딩하여 사용한다.
    - alt + insert 단축키로 바로 toString()메서드를 오버라이딩할 수 있다.
- Object.equals(): 서로 다른 객체는 같은 값이라도 Heap에 있는 주소값을 각각 다르게 참조하기 때문에 각각의 객체를 동일성 비교(==)하면 false가 나온다. 같은 원리로 동등성 비교(equals())도 false가 나온다.
- 하지만 서로 다른 객체라도 필드의 내용이 같으면 '같다(동등하다)'고 판단해야 할 때가 있다. 그런 상황에 equals() 메서드를 오버라이딩해서 true로 만들어줄 수 있다.
- hashCode(): equals가 true를 반환하면, hash값도 true여야 equals가 필드를 동등하게 만드는 기능이 제대로 동작한다. hashCode() 메서드는 hash 값을 true로 반환할 수 있게 도와주며 equals() 메서드와 이중으로 검사하고 반환한다.

----

##### String 문자열 API
- trim(): 문자열 앞/뒤 공백제거
- toUpperCase() / toLowerCase: 대/소문자 변환
- indexOf(): 특정 문자/문자열의 처음 위치(인덱스) 반환. 찾지 못하면 -1 반환.
- substring(시작 인덱스, 끝 인덱스): 문자열의 특정 구간을 잘라내어 새로운 문자열로 반환. 시작지점부터 끝의 전까지 불러온다.
- replace(): 문자열 내의 특정 문자/문자열을 다른 문자/문자열로 치환한 새로운 문자/문자열 반환.
- delete (start, end): 시작 인덱스부터 종료 인덱스 전까지의 문자열 제거.
- insert(index, value): 지정한 인덱스에 값 삽입.
- reverse(): 문자열의 순서를 뒤집는다.
- isEmpty(): 문자열의 길이가 0이면 true, 아니면 false 반환
- split(): 특정 구분자를 기준으로 문자열을 잘라 '문자열 배열'로 반환한다. 자바의 split()은 구분자를 정규식으로 해석한다.
    - split() 구분자: \n (줄바꿈), \t (탭), \" (쌍따옴표), \' (홀따옴표), \\ (역슬래시)
    - 정규식: 문자열의 패턴을 표현하는 규칙. 일반 문자열은 글자 그대로 해석하지만, 정규식에서는 일부 문자가 특별한 의미를 가진다.
    - 이스케이프 문자: 문자열 내에서 줄바꿈, 탭, 따옴표 등 특별한 기능을 하는 문자, 역슬래시(\)로 시작한다.
    - ex) split(".")은 점을 의미하지 않고, split("\\.")이 실제 점을 의미한다.
----

- 문자열 생성 방식
    - 리터럴 객체 방식으로 JVM의 String Constant Pool이라는 곳에 보관한다. 만약 리터럴 객체로 만든 같은 내용의 값이 있다면 JVM이 String Constant Pool에서 같은 값을 먼저 찾아보고 있다면 그 값을 재사용한다. 없으면 새롭게 생성한다.
- new String() 방식: 새로운 String 객체를 Heap 영역에서 새롭게 만들고 각각의 객체와 주소값을 가진다.
    - String 자료형 클래스가 Object에 상속되어 있기 때문에, 부모 클래스인 Object의 equals() 메서드를 오버라이딩하여 문자열의 내용을 비교하도록 구현되어 있다. 따라서 문자열 내용이 같은지 비교할 때는 (==)보다 equals()를 사용하는 것이 안전하다.


- 비교 대상의 문자열 변수에 null이 있을 때 안전한 문자열 비교
    - 문자열은 null 값을 반환할 수 없다. equals() 메서드가 호출하는 객체가 null이면 안 된다. 호출하는 객체가 참조하는 값이 null 상태이기 때문에 가리키는 객체가 없어서 실행할 수 없다.



##### StringBuilder
- 문자열은 immutable(불변) 객체이다.
    - 원본 문자열에 '+' 연산 등으로 새로운 문자열을 더해도 원본 문자열 객체가 수정되는 것이 아니라, 완전히 새로운 객체를 생성한다. 그리고 원본 문자열 객체는 새 문자열을 가리키게 된다. 반복적인 문자열 연결에는 비효율적일 수 있다.
- StringBuilder: 생성한 뒤에도 내부 값을 변경할 수 있는 가변 객체이다. 불변의 새로운 문자열 객체를 계속 생성하는 방식이 아닌, 가변적으로 객체를 사용하는 방식이다. append()로 내부 내용을 누적해서 반복적인 문자열 조립에 적합하다. 보통 사용자에게 전달받는 숫자는 문자열로 받게 된다.
    - 불변 객체는 문자열에 문자열을 만 번 반복해서 더하면 만 개의 객체가 생성되는 반면, StringBuilder는 문자열 객체 하나에 문자열 만 번을 추가할 수 있다.
    - append(): 자기 자신(StringBuilder)을 반환하므로 메서드 체이닝이 가능하다.

##### Time API
- java.time 패키지의 주요 클래스이다. java.time 객체는 불변이다. 원본 객체를 변경하지 않고 계산된 새로운 객체를 반환한다. 따라서 반환값을 변수에 저장해야 계산 결과를 사용할 수 있다.
    - LocalDate: 날짜
    - LocalTime: 시간
    - LocalDateTime: 날짜 + 시간
        - 국가별 시간대가 필요한 서비스는 ZoneDateTime과 ZoneID를 활용한다.
    - .now(): 현재 날짜와 시각
    - getYear(): 년도
    - getMonth(): 문자열로 달
    - getMonthValue(): 숫자열로 달
    - getDayOfWeek(): 문자열로 요일
    - plus...(), minus...(): 시간계산을 할 수 있다.
    - isBefore(), isAfter(), isEqual(): 날짜를 비교하며 boolean 값을 반환
- formatting (포매팅)
    - DateTimeFormatter를 사용하면 날짜/시간 객체를 원하는 형식의 문자열로 변환하거나, 특정 형식의 문자열을 날짜/시간 객체로 변환할 수 있다.

##### Wrapper 클래스
- Wrapper: 기본 자료형의 값을 객체 형태로 감싸는 클래스. 
- Parsing: 문자열과 기본자료형 사이의 변환 기능을 제공하고, 기본자료형을 객체가 필요한 곳에서 사용할 수 있게 한다.
- 문법은 int와 char를 제외하고 모두 앞글자가 대문자로 바뀐다.
    - int는 Integer, char는 Character.
- Boxing: 기본자료형의 값을 Wrapper 객체로 감싸는 것.
    - Auto-Boxing: Wrapper 객체를 바로 선언하고 값을 집어 넣어도 자동으로 박싱된다.
- Unboxing: 객체에서 기본자료형으로 값을 꺼내는 것.
    - Auto-Unboxing: Wrapper 객체를 기본자료형으로 선언해도 자동으로 언박싱 된다.

- Wrapper 객체는 null값을 가질 수 있지만, 기본 자료형은 null 값을 가질 수 없으므로, null 값을 담은 Wrapper 객체를 언박싱 하려고 하면, "NullPointerException"이 발생한다.
- Wrapper는 객체이므로 값 비교에 equals()를 사용한다. 동등연산자는 내부 최적화에 따라 결과가 달라질 수 있으므로 비교 방법으로 적합하지 않다.

- 숫자 -> 문자열 변환: String.valueOf(값)

#### Generic
- 클래스나 메서드에서 사용할 자료형을 미리 고정하지 않고 사용하는 시점에 결정하는 문법.
- 타입별 중복 코드를 줄이고 잘못된 타입의 데이터가 들어오는 것을 방지한다.
- 생성자를 만들때 자료형 뒤에 <참조자료형>을 붙여주고, new 클래스 뒤에도 <>를 붙여줘야한다. 생성자를 만드는 동시에 타입은 반드시 지정해야한다.
- 제네릭 타입 인자에는 int같은 기본 자료형이 아니라 참조 자료형을 사용한다. 따라서 int가 아닌 Integer로 지정한다.

- Generic Class: T는 아직 정해지지 않은 타입을 나타내는 타입 매개변수이다. T는 Type을 뜻하는 관례적인 이름이며 반드시 T만 사용해야하는 것은 아니다.
    - 클래스명 바로 뒤에 <T> 다이아몬드 연산자를 사용한다.

- 자바의 최상위 계층 Object로 자료형을 만들어 사용할 수 있지만, 자료형을 바꿔 형변환을 시도하면 실행 시점(Runtime)에 치명적인 오류가 발생한다. Object setter에 문자열을 입력한 뒤에, 다음 setter에 숫자도 저장 할 수 있으니 그렇게 해도 자체 컴파일 오류가 발생하지 않는다. 하지만 런타임 시점에 String을 숫자로 바꾸려는 순간 ClassCastException이 발생한다. 그래서 이런 위험성 때문에 제네릭을 사용한다.
    - 컴파일러에서 바로 발견하는 오류가 가장 좋은 오류이다. 실제 서비스가 돌아가는 도중(Runtime)에 발견되는 오류는 최악의 오류이다.


### 2. 코드 예시 (Code)
```text
- 일반적인 백엔드 개발 작동 흐름
C controller: 사용자의 요청을 받음
⬇️		⬆️
S Service: 실제 업무 규칙과 처리 로직을 실행
⬇️		⬆️
R Repository: 데이터를 조회하거나 저장
⬇️		⬆️
처리 결과는 반대방향으로 전달됨

- formatting 포매팅 문법
// Format: LocalDateTime -> String
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 HH시 mm분 출발");
String ticket = trainDeparture.format(formatter);
System.out.println("ticket = " + ticket);

// Parse: String -> LocalDate
String christmas = "20261225";  // yyyyMMdd 형식의 문자열
DateTimeFormatter parser = DateTimeFormatter.ofPattern("yyyyMMdd");
LocalDate parsedDate = LocalDate.parse(christmas, parser);
System.out.println("parsedDate = " + parsedDate);

- Wrapper 클래스 문법
// Auto-Boxing
Integer age = 20;
// Auto-Unboxing
int unboxedAge = age;
```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- 제네릭과 다형성을 활용하면서 IS-A의 올바른 상속 구조를 생각하고 인터페이스의 규칙까지 지정하는 것이 아직 와닿지 않는다. 개별적으로 개념을 이해하고 있지만, 모든 개념을 다 합쳐서 새로운 프로젝트를 만드려고 하니 어디서부터 시작해야할지 모르겠다.


### 4. 내일 공부할 내용 (Next)

