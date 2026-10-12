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
- singleton



- final
    - 재할당이 불가능한 상수. 조회만 가능하고 setter 메서드는 만들 수 없다.
    - 이름은 전부 대문자, 단어는 언더스코어로 구분. SNAKE_CASE를 사용하는 관례가 있다.
    - final 인스턴스 필드: 객체 생성 시 딱 한 번 결정, 이후 변경 불가.

    'public static final' = 공유하고(static) + 절대 못 바꾸는(final) 값?????????? 얘는 뭐하는 공식임?

#### static


#### variable


#### 객체 배열


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




```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- 얕은 복사, 깊은복사와 값이 복사되는 방식(Pass by Value), 주소가 복사되는 방식(Pass by Reference) 이것들의 개념이 서로 상충되면서 헷갈린다. 메서드에 전달할 때는 '무엇이 복사되는가'를 생각하고, 객체를 복사할 때는 '내부 데이터까지 독립적으로 복사했는가'를 생각한다?


### 4. 내일 공부할 내용 (Next)

