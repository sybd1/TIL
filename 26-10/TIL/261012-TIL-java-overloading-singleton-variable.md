## [2026-10-12] Java Overloading, Parameter 전달 방식, Final, Singleton, Static, Variable, 객체 배열, Class 분리 구조 흐름

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### Overloading
- 같은 **메서드**나 **생성자** 이름을 사용하지만, 매개변수의 타입, 개수, 순서를 다르게 정의할 수 있는 기술. = 이름은 같지만, 시그니처가 다른 메서드를 여러 개 정의하는 기술.
    - 메서드 시그니처: 메서드를 식별하는 고유한 바코드. 메서드이름 + 매개타입 변수, 개수, 순서
- 성립하지 않는 경우: 반환 타입, 접근 제한자, 매개변수 이름만 다른 경우.
- 오버로딩을 적용한 메서드는 자바가 인자를 보고 알맞는 메서드를 알아서 찾아준다.
- println은 대표적인 오버로딩이 적용된 메서드다. 정수, 실수, 문자, 문자열 등 모든 타입에 맞춰서 알맞은 메서드를 호출해준다.

#### Parameter 전달 방식
- Pass by Value (값이 복사되는 방식): 전달받은 메서드에서 값을 바꾸더라도 원래 변수에는 영향을 주지 않는다. 값 자체만 복사를 한다.
- Pass by Reference (주소가 복사되는 방식): 배열, 객체를 가리키는 참조 값이 복사된다. 같은 객체 내부 데이터를 바꿔 원본이 바뀐다.
- Copy: 객체나 배열을 복사할 때, 내부 데이터까지 별도로 복사하는지 아니면 기존 데이터와 공유하는지의 차이.
    - Shallow Copy (얕은 복사): 복사한 객체와 원본 객체가 내부 객체를 함께 참조할 수 있음. 공유하는 내부 객체를 수정하면 양쪽에서 변경된 결과가 보임.
    - Deep Copy (깊은 복사): 내부 객체까지 새롭게 복사해 독립적으로 만든다. 원본과 복사본이 서로 다른 내부 객체를 가진다. 한쪽의 내부 객체를 수정해도 다른 쪽에는 영향을 주지 않는다.
- 가변인자(...rest): 전달 인자의 개수가 유동적일 때 사용하는 기술. JS의 rest parameter과 유사하다. 전달한 값 0개 이상을 받아 메소드 내부에서 배열로 취급한다. 매개 변수의 마지막 위치에 작성해야 한다.

#### singleton, final
- 디자인 패턴: 프로그래밍을 하면서 자주 등장하는 문제를 효과적으로 해결하기 위한 검증된 설계 템플릿. singleton도 디자인 패턴의 일종이다.
- singleton: 프로그램 전체에서 특정 클래스의 인스턴스(객체)가 단 하나만 존재하도록 보장한다.
    - singleton = static + private 생성자.
    - 예시) DB연결 설정, 로그 시스템, 앱 전역 설정 값... 등.
    - Spring Boot 프레임워크에선 @Service, @Repository로 싱글톤을 간단하게 관리할 수 있다고 한다.
- EagerSingleton: 클래스가 초기화될 때 객체가 생성된다. 사용하지 않아도 객체를 생성한다. 거의 항상 필요한 객체가 필요할 때 사용한다.
- LazySingleton: 조건에 맞아 요청될 때 객체가 생성된다. 사용하지 않으면 생성하지 않는다. 필요할 때만 불러와야 하는 상황에 사용한다.

- final
    - 재할당이 불가능한 상수. 조회만 가능하고 setter 메서드는 만들 수 없다.
    - 이름은 전부 대문자, 단어는 언더스코어로 구분. SNAKE_CASE를 사용하는 관례가 있다.
    - final 인스턴스 필드: 객체 생성 시 딱 한 번 결정, 이후 변경 불가. 말 그대로 객체가 생설될 때 전달받은 값으로 초기화 되고, 초기화 된 이후에는 변경할 수 없다.

- 'public static final' = 공유하고(static) + 절대 못 바꾸는(final) 값
    - 자바에서 모든 객체가 함께 사용하는, 재대입할 수 없는 값을 만들 때 자주 사용하는 문법.
    - public -> 다른 클래스에서도 사용 가능.
    - static -> 객체를 만들지 않아도 사용 가능.
    - final -> 값을 다시 지정할 수 없음.

#### static, variable
- static: static 멤버는 특정 객체가 아니라 클래스에 속한다. 객체를 생성하지 않고 클래스 이름으로 접근할 수 있으며 모든 인스턴스(객체)가 하나를 공유한다.
    - Member: 클래스 안에 선언된 변수와 메서드를 통틀어 부르는 말.

- non-static 필드: new로 객체를 만들 때마다 Heap에 새로 생성되며, 객체마다 독립적이다. "개인 사물함"
- static 필드: 프로그램 시작 시 static 영역에 단 하나만 생성되며, 모든 객체가 공유한다. "공용 사물함". 클래스에 속하므로 this 문법을 사용할 수 없다.

- 인스턴스 변수(non-static) : new로 객체를 만들 때 Heap 메모리에 생성. 같은 클래스 내 어느 메서드에서든 접근 가능. 객체가 살아있는 동안만 존재한다.
- static 변수(클래스 변수): 프로그램 시작시 static 영역에 단 하나만 생성된다. 모든 인스턴스(객체)가 공유하며 프로그램 종료시까지 사라지지 않는다.
    - 일반적인 JVM 메모리 모델에서는 클래스 관련 데이터로 관리. JVM 구현에 따라 세부적으로 달라진다. HotSpot에서는 실제 값이 Heap의 Class 관련 데이터에 저장됨.
- 지역 변수: 메서드 안에서 선언하는 변수. Stack에 저장된다. 메서드가 호출 될 때 Stack 메모리에 생성되었다가 '}'를 만나는 순간 즉시 사라진다. 기본값이 없기 때문에 초기화 하지 않으면 사용이 불가능하다.
    - JS에서는 이럴 경우 유연하게 undefined를 내뱉었지만, 자바에서는 얄짤없다. 메서드 내에서 생성됐다가 사라지기 때문에, 다른 메서드 블럭에서는 아예 불러올 수도 존재하지도 않는 값이다.

#### 객체 배열
- 사용자 정의 자료형을 만들어 객체 배열을 만들 수 있다. 객체 배열도 선언과 동시에 객체 배열 초기화가 가능하다.
- 객체 배열 문법: 사용자정의자료형[] 변수명 = new 클래스[크기];
    - Car[] car = new Car[3];
- NullPointerException: 객체가 없는 상태(null)에서 그 객체를 사용하려고 할 때 발생하는 오류.

#### Class 분리 구조 흐름


#### 그 외 Java 생태계
- OOP(Object-Oriented Programming 객체 지향 프로그래밍): 객체들이 각자의 역할을 수행하고 서로 상호작용하도록 프로그램을 설계하는 방식.
    - 객체지향의 특징: Encapsulation(캡슐화), Inheritance(상속), Polymorphism(다형성), Abstraction(추상화)
- JDBC: 자바에서 데이터베이스와 통신하기 위한 표준 API.
- JPA, MyBatis: 자바와 데이터베이스를 연결할 수 있는 원론적인 프레임워크.

### 2. 코드 예시 (Code)
```text
- Overloading 문법
private String mem1; ... private String mem6;

public nmixx(String mem1, String mem2, String mem3, String mem4) {
    this.mem1 = mem1;
    this.mem2 = mem2;
    this.mem3 = mem3;
    this.mem4 = mem4;
}
// 같은 클래스 내의 다른 생성자를 this()로 호출하는 문법. 이 방법으로 호출 시에 반드시 클래스 내 첫번째 줄에 작성해야 한다.
public nmixx(String mem1, String mem2, String mem3, String mem4, String mem5, String mem6) {
    this(mem1, mem2, mem3, mem4);   
    this.mem5 = mem5;
    this.mem6 = mem6;
}

- EagerSingleton (이른 초기화)
// 1. 클래스가 로딩되는 즉시 인스턴스를 딱 하나 미리 만들어 보관
private static EagerSingleton eager = new EagerSingleton();

// 2. 외부에서 new로 만들지 못하게 생성자를 private로 잠근다.
private EagerSingleton() {}

// 3. 유일한 객체를 건네주는 통로
public static EagerSingleton getInstance() {
    return eager;
}

- LaztSingleton (게으른 초기화)
//1. 처음에는 null 값으로 비워둔다.
private static LazySingleton lazy;

// 2. 외부에서 new로 만들지 못하게 생성자를 private로 잠근다.
private LazySingleton() {}

// 3. 상황에 맞게 객체를 건네주는 유일한 통로
public static LazySingleton getInstance() {
    // 처음 호출될 때만 만들고, 이후에는 이미 만들어진 것을 반환
    if (lazy == null) {
        lazy = new LazySingleton();
    }
    return lazy;
}


```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- 얕은 복사, 깊은복사와 값이 복사되는 방식(Pass by Value), 주소가 복사되는 방식(Pass by Reference) 이것들의 개념이 서로 상충되면서 헷갈린다. 메서드에 전달할 때는 '무엇이 복사되는가'를 생각하고, 객체를 복사할 때는 '내부 데이터까지 독립적으로 복사했는가'를 생각한다?
- final 상수를 선언한 뒤에 잇따라 자료형도 사용해야 한다. final은 자료형이 아니다.


### 4. 내일 공부할 내용 (Next)

