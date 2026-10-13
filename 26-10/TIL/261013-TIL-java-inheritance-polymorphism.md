## [2026-10-13] Inheritance, Polymorphism

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### Inheritance (상속), super(), Overriding

##### Inheritance
- 공통 상태와 기능을 부모(상위) 클래스에 정의하고, 자식(하위) 클래스가 그것을 이어받아 사용하거나 자신의 목적에 맞게 확장하는 방법.
- 공통 기능을 가진 여러 클래스의 관계를 표현할 때 선택적으로 사용한다.
- 한번에 하나의 클래스만 상속받을 수 있다.
- 개념적으로 "IS-A" 관계가 성립해야 부모 자식의 관계가 잘 성립할 수 있다. "IS-A" 관계가 잘 성립하지 않는데, 상속을 하면 이후에 수정할 때 더욱 복잡해질 수 있다.

        IS-A: "A는 B이다." 라는 의미로, 클래스 간의 상속 관계를 나타낸다.
        강아지는 동물이다. (O)
        동물은 강아지다. (X)

##### super()
- 부모 클래스의 생성자를 호출할 수 있는 코드. 자식 클래스 생성자, 매서드 내부에 작성하여 부모 클래스를 호출할 수 있다.
- 부모 클래스에 기본 생성자는 코드를 적지 않아도 자바의 컴파일러가 자동으로 호출해주지만, **매개변수가 있는 생성자는 직접 코드를 작성**해야 한다.

##### Overriding (재정의)
- 부모 클래스에서 정의한 메서드를 자식 클래스에서 목적에 맞게 같은 형태로 다시 작성하는 것. 오버로딩과는 다른 기술이다.
- @Override: 자바 컴파일러가 부모 메서드를 올바르게 재정의 했는지 검사해준다.
    - "@": 어노테이션이라고 부른다.
- 부모에게 물려받은 메서드는 선언문(접근제한자 반환값 메서드명)을 동일하게 적은 뒤에 확장할 수 있다.

**Overriding 규칙**
- 성공 조건
    - 메서드 이름과 매개변수 목록이 부모와 동일해야 한다.
    - 반환 타입도 부모와 동일하게 작성하는 것이 기본이다. (부모 반환 타입의 자식타입이라면 가능하다.)
    - 접근 제한자의 범위는 부모와 같거나 더 넓어야 한다.
        - (private < default < protected < public)
- 불가능한 대상
    1. private 메서드: 자식에게 보이지 않는다.
    2. final 메서드: 변경이 금지되어 있다. 호출은 가능하다.
    3. 생성자: 상속되지 않는다.

#### Polymorphism (다형성), Abstract Class (추상 클래스), Interface (인터페이스)

##### Polymorphsim
- 하나의 부모 타입으로 여러 자식 객체를 다룰 수 있게 해서 코드를 유연하고 편리하게 작성할 수 있다.
- 다양성을 적용하지 않으면, 자식 클래스 별로 인스턴스를 만들고 각각 호출해야 하지만, 다양성을 적용하면 서로 다른 자식 객체를 부모 클래스 타입 하나로 한꺼번에 관리할 수 있다.
- 부모 타입 참조 변수로 자식 객체를 참조할 수 있다.
    - 부모타입 변수 = new 자식클래스();
    - 부모 Animal과 자식 Dog 클래스가 있다면, "Animal animal = new Dog();" 이런식으로 생성된 하나의 Dog객체를 부모 타입의 변수로 참조하게 할 수 있다.
- 동적 바인딩
    1. 가장 처음 컴파일 시 부모 타입의 멤버만 접근 가능하다.
    2. 실행(Runtime) 시 오버라이딩된 자식 메서드가 실행된다.
    3. 자식 고유 멤버 사용 시 다운캐스팅이 필요하다.
- 업캐스팅: 자식 객체의 참조값을 부모 타입 변수에 저장.
- 다운캐스팅: 자식 고유 멤버 사용시 사용한다. 다른 객체로 형변환은 불가능하다. if문과 instanceof 메서드를 활용해서 안전하게 확인한다.





### 2. 코드 예시 (Code)
```text
- 상속 받는 자식 클래스의 기본 문법
접근제한자 클래스 자식클래스 extends 부모클래스 {}
public class Child extends Parents {}

- Overriding 문법
// 부모 클래스
public class Nmixx {
    public String member() {return "윤아";}
}
// 자식 클래스
public class Nswer extends Nmixx {
    @Override
    super();
    public String member() {return "지우";}
}

- 다형성을 활용한 객체 배열
Nmixx[] nmixx = new Nmixx[6];
nmixx[0] = new Lilly();
nmixx[1] = new Haewon();
nmixx[2] = new Sullyoon();
nmixx[3] = new Bae();
nmixx[4] = new Jiwoo();
nmixx[5] = new Kyujin();

for (Nmixx nmixxAll : nmixx) {
    if (nmixxAll instanceof Lilly) {
        ((Lilly)nmixxAll).thx();
    } else if (nmixxAll instanceof Haewon) {
        ((Haewon)nmixxAll).smile();
    }
}

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- 오버로딩은 상속 관계가 없어도 사용할 수 있지만, 오버라이딩은 상속관계에서 부모 클래스의 메서드를 자식 클래스가 재정의 하는 개념이다.


### 4. 내일 공부할 내용 (Next)
- API
