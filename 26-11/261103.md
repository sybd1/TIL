# 2026-11-03 TIL — 엔티티 매핑, 임베디드 매핑, 연관관계 매핑

> 수업 메모와 `chap02-mapping`, `chap03-association-mapping` 소스를 바탕으로 정리했다. 본문은 매핑 학습 순서에 맞추고, 설정 파일 문법·Java 문법·트랜잭션 테스트 메모는 맨 아래에 모았다. 코드 예시는 핵심 부분만 발췌했으며 import와 일부 메서드는 생략했다.

## 1. 오늘 배운 흐름

```text
엔티티의 필드와 DB 컬럼 연결
  → 관련 필드를 임베디드 값 객체로 묶기
  → 엔티티끼리 참조하는 관계를 외래 키와 연결
  → 연관 객체를 언제 조회할지 결정
  → 양방향 관계의 양쪽 참조와 외래 키 관리
```

**매핑(mapping)**은 자바 객체의 구조와 DB 저장 구조를 연결하는 설정이다. 예를 들어 Member.memberId는 tbl_member.member_id에 연결되고, Menu.category는 tbl_menu.category_code 외래 키를 통해 Category와 연결된다.

**쉽게 풀면:** 어떤 객체의 어떤 값을 어느 테이블·컬럼에 저장하고, 어떤 키로 다른 데이터를 연결할지 정하는 것이다.

## 2. 엔티티와 컬럼 매핑

수업 Member 엔티티의 주요 매핑은 다음과 같다.

```java
@Entity
@Table(name = "tbl_member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_no")
    private int memberNo;

    @Column(name = "member_id", nullable = false, unique = true, length = 50)
    private String memberId;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_role", nullable = false)
    private MemberRole memberRole;

    protected Member() {}
}
```

| 어노테이션·속성 | 의미 | 쉬운 풀이 |
|---|---|---|
| `@Entity` | JPA 엔티티로 선언 | JPA가 저장·조회·상태 관리 대상으로 다룰 클래스 |
| `@Table(name = "tbl_member")` | 연결할 테이블 지정 | Member 객체를 어느 테이블에 저장할지 지정 |
| `@Id` | 엔티티 식별자 지정 | 각 회원을 구분할 기본 키와 연결 |
| `@GeneratedValue` | 식별자 자동 생성 방식 지정 | 새 회원 번호를 어떻게 만들지 설정 |
| `GenerationType.IDENTITY` | DB identity 기능으로 식별자 생성 | 수업의 MySQL에서는 AUTO_INCREMENT 사용 |
| `@Column(name = "member_id")` | 컬럼 연결 | 필드와 다른 이름의 DB 컬럼 연결 |
| `nullable = false` | 컬럼의 null 허용 여부 | DB에 NULL을 허용하지 않는 매핑 |
| `unique = true` | 단일 컬럼 유일 제약 지정 | 해당 컬럼 값의 중복을 막는 제약 |
| `length = 50` | 문자열 컬럼 길이 등의 스키마 정보 | 테이블 생성 시 컬럼 길이 설정에 활용 |

`@Entity`가 Spring의 `@Component`처럼 객체를 싱글톤 Bean으로 등록하는 것은 아니다. 엔티티 매핑 메타데이터로 사용하는 선언이다. 엔티티 인스턴스가 실제 관리되는 상태인지는 persist·find 등으로 영속성 컨텍스트와 연결되는 과정도 봐야 한다.

`@Id`가 직접 또는 상속을 통해 정의되지 않으면 정상적인 엔티티로 구성할 수 없다. 하지만 **일반적인 자바 컴파일러가 어노테이션 누락 자체를 컴파일 오류로 판단하는 것은 아니다.** 보통 애플리케이션 시작 중 Hibernate가 매핑 정보를 검사할 때 식별자 누락 오류가 발생한다.

IDENTITY는 MySQL에서 사용할 수 있는 전략이지, MySQL이라는 이유만으로 무조건 이 전략만 가능한 것은 아니다. 수업 코드는 DB 자동 증가 기능을 활용하도록 선택했다. 번호를 얻으려면 INSERT가 필요해 persist 시점에 SQL이 먼저 실행될 수 있으며, INSERT 실행과 트랜잭션 커밋 완료는 구분해야 한다.

### nullable=false와 @NotBlank는 역할이 다르다

`nullable = false`에서 null은 값 자체가 없다는 뜻이다. 문자열 `""`나 `"   "`까지 자동으로 거부한다는 뜻은 아니다. 수업의 MySQL에서는 빈 문자열도 NULL과 다르다.

**쉽게 풀면:** `nullable=false`는 DB 컬럼의 NULL 허용 여부이고, `@NotBlank`는 입력 문자열이 null·빈 문자열·공백만 있는 값인지 검사하는 규칙이다. 입력 검증과 저장 구조의 제약은 함께 설계할 수 있다.

`unique=true`나 `length=50`도 입력 요청을 미리 검사하는 Bean Validation 어노테이션이 아니다. 스키마 생성 시 제약을 만드는 데 사용된다. 기존 DB 스키마를 바꾸지 않는 설정에서는 실제 DB에 해당 제약이 있는지도 확인해야 한다. 애플리케이션의 사전 중복 조회만으로 동시 요청까지 모두 막을 수 없으므로 DB 제약도 중요하다.

근거: [Jakarta Persistence 표준](https://jakarta.ee/specifications/persistence/3.2/jakarta-persistence-spec-3.2.html), [@Column 공식 API](https://jakarta.ee/specifications/persistence/3.2/apidocs/jakarta.persistence/jakarta/persistence/Column.html).

### enum을 DB에 저장하는 방식

enum은 ROLE_MEMBER, ROLE_ADMIN처럼 사용할 값의 종류를 자바 코드에 정의하는 타입이다.

| 방식 | 저장 표현 | 변경 시 주의점 |
|---|---|---|
| `EnumType.STRING` | 보통 enum 상수 이름 | 이름 자체를 바꾸면 기존 DB 값과의 호환성 검토 필요 |
| `EnumType.ORDINAL` | enum 선언 순서인 정수. 첫 값은 0 | 중간 삽입이나 순서 변경 시 기존 숫자의 의미가 달라질 수 있음 |

**쉽게 풀면:** STRING은 이름으로 구분하므로 선언 순서를 바꿔도 기존 값의 의미가 유지된다. ORDINAL은 위치 번호이므로 순서를 바꾸면 다른 값을 뜻할 수 있다. STRING도 이름 변경까지 자동으로 해결하는 것은 아니다.

### ddl-auto는 언제 테이블을 만드는가?

수업의 chap02-mapping은 다음 설정을 사용한다.

```yaml
spring:
  jpa:
    hibernate:
      ddl-auto: create
```

DDL(Data Definition Language)은 CREATE TABLE, ALTER TABLE처럼 DB 구조를 정의하는 SQL이다. `ddl-auto: create`는 Hibernate 초기화 때 매핑을 기준으로 스키마를 삭제 후 다시 생성하는 설정이다. 단순히 DB 서버를 켤 때마다 실행되는 규칙이 아니라 JPA 애플리케이션의 초기화와 연결된다. 영향을 받는 기존 테이블과 데이터가 사라질 수 있으므로 학습용 DB와 설정을 확인해야 한다.

| 설정 | 일반적인 동작 |
|---|---|
| `none` | 자동 스키마 생성·수정 안 함 |
| `validate` | 엔티티 매핑과 기존 스키마의 적합성 검사 |
| `update` | 기존 스키마를 매핑에 맞춰 변경 시도 |
| `create` | 초기화 때 스키마 재생성 |
| `create-drop` | 초기화 때 생성하고 정상 종료 시에도 삭제 |

실제 서비스에서는 데이터 보존과 변경 이력 관리가 필요하므로 create를 무심코 적용하지 않는다. update도 모든 데이터 변경·이력 관리를 해결하는 기능은 아니다. 수업의 chap03-association-mapping은 `ddl-auto: none`으로 기존 테이블을 사용한다.

근거: [Spring Boot — 데이터베이스 초기화](https://docs.spring.io/spring-boot/how-to/data-initialization.html).

## 3. 임베디드 매핑 — 관련 필드를 값 객체로 묶기

임베디드 매핑은 관련된 필드를 별도 자바 타입으로 묶고, 그 내부 필드를 소유 엔티티의 테이블 컬럼에 포함하는 매핑이다. 수업에서는 Book이 가격 정보 Price를 포함한다.

```java
@Embeddable
public class Price {
    @Column(name = "regular_price", nullable = false)
    private int regularPrice;

    @Column(name = "discount_rate", nullable = false)
    private double discountRate;

    @Column(name = "sell_price", nullable = false)
    private int sellPrice;

    protected Price() {}
    // 가격 검증·계산용 생성자와 메서드 생략
}
```

```java
@Entity
@Table(name = "tbl_book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_no")
    private int bookNo;

    @Embedded
    private Price price;

    protected Book() {}
}
```

```text
Java 객체: Book → Price(정가, 할인율, 판매가)
DB 컬럼:   tbl_book의 regular_price, discount_rate, sell_price
```

`@Embeddable`은 포함될 수 있는 값 타입을 선언하고, `@Embedded`는 엔티티의 해당 필드에 값 타입을 포함해 매핑한다는 표시다. 타입이 @Embeddable이면 기본 매핑 규칙으로 @Embedded 생략이 가능한 경우도 있지만 명시하면 의도가 잘 보인다.

**값 객체**는 별도 식별자를 가진 엔티티라기보다 여러 값으로 의미를 나타내는 객체다. Price는 가격 구성과 계산을 묶는다. 이 예제에서는 별도 Price 테이블이나 Price의 @Id를 만들지 않는다. Book을 통해 그 값들을 함께 저장한다.

**쉽게 풀면:** DB 컬럼 수를 줄이는 것이 목적이 아니다. 서로 관련된 값을 자바 코드에서 한 타입으로 묶어, 계산과 검증도 함께 관리하는 것이다.

수업 Price 생성자는 정가가 음수인지, 할인율이 0~1 범위인지 검사하고 판매가를 계산한다. 정가 10,000원에 할인율 0.2라면 판매가는 8,000원이다. 생성자의 검증은 이 생성자를 호출할 때 동작하는 코드이며 JPA가 필드를 로딩할 때 매번 해당 계산 생성자를 실행한다는 뜻은 아니다.

근거: [@Embedded 공식 API](https://jakarta.ee/specifications/persistence/3.2/apidocs/jakarta.persistence/jakarta/persistence/Embedded.html), [Jakarta Persistence — 임베디드 타입](https://jakarta.ee/specifications/persistence/3.2/jakarta-persistence-spec-3.2.html).

## 4. 연관관계 매핑 — 객체 참조와 외래 키 연결

**연관관계**는 엔티티가 다른 엔티티를 참조하는 관계다. 메뉴 여러 개가 같은 카테고리에 속할 수 있다면 메뉴에서 카테고리를 보는 관계는 N:1이다.

| 관계를 보는 방향 | 다중성 | 어노테이션 |
|---|---|---|
| 여러 메뉴 → 한 카테고리 | N:1 | `@ManyToOne` |
| 한 카테고리 → 여러 메뉴 | 1:N | `@OneToMany` |
| 한 대상 → 한 대상 | 1:1 | `@OneToOne` |
| 여러 대상 ↔ 여러 대상 | N:N | `@ManyToMany` |

**다중성**은 서로 몇 개씩 연결될 수 있는지의 의미다. 단방향·양방향은 자바 객체에서 어느 쪽으로 참조를 따라갈 수 있는지의 구분이다. 다중성과 방향은 서로 다른 기준이다.

### @ManyToOne과 @JoinColumn

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "category_code", nullable = false)
private Category category;
```

수업 Menu의 category는 숫자가 아니라 Category 객체 참조다. DB에는 자바 객체를 그대로 저장하는 대신 tbl_menu.category_code에 그 Category의 식별자 값을 저장한다.

- `@ManyToOne`: 여러 Menu가 하나의 Category를 참조할 수 있다.
- `@JoinColumn(name = "category_code")`: 이 관계를 연결할 외래 키 컬럼을 지정한다. 이 N:1 매핑에서는 Menu 쪽 테이블에 있다.
- `nullable = false`: 이 외래 키 컬럼에 NULL을 허용하지 않는 매핑이다.

**쉽게 풀면:** 자바에서는 menu.getCategory()로 관련 객체를 찾고, DB에서는 category_code라는 외래 키로 관련 행을 연결한다. 두 구조를 JPA가 매핑한다.

### 등록 요청의 categoryCode가 객체 참조가 되는 흐름

```text
요청 DTO: categoryCode = 4
  → 서비스에서 4번 Category 조회
  → 존재하지 않으면 예외 처리
  → 찾은 Category 객체를 새 Menu에 연결
  → Menu 저장
  → DB의 category_code 외래 키에 4 반영
```

요청 DTO에는 식별자만 보내고 서비스가 엔티티를 조회해 관계를 설정할 수 있다. 수업 ManyToOneService도 이 순서다. Category를 연결하는 것만으로 새 카테고리를 생성하는 것은 아니며, 기존 카테고리를 찾아 참조한다.

근거: [@ManyToOne](https://jakarta.ee/specifications/persistence/3.2/apidocs/jakarta.persistence/jakarta/persistence/ManyToOne.html), [@JoinColumn](https://jakarta.ee/specifications/persistence/3.2/apidocs/jakarta.persistence/jakarta/persistence/JoinColumn.html).

## 5. LAZY와 EAGER — 연관 객체를 언제 읽는가?

fetch 설정은 해당 연관관계의 데이터를 어느 시점에 로딩할지 정한다.

| 설정 | 의미 | 쉬운 풀이 |
|---|---|---|
| `FetchType.LAZY` | 연관 데이터 로딩을 필요할 때까지 미루는 전략 | 관련 객체의 실제 데이터가 필요해질 때 조회하도록 지연 |
| `FetchType.EAGER` | 연관 데이터를 미리 로딩해야 하는 전략 | 최초 엔티티 조회를 마칠 때 관련 데이터도 준비 |

JPA 표준에서 EAGER는 즉시 로딩 요구사항이고 LAZY는 구현체에 주는 지연 로딩 힌트다. 실제 SQL과 로딩 여부는 쿼리 방식, 영속성 컨텍스트의 상태 등에 따라 달라질 수 있다.

```java
Menu menu = entityManager.find(Menu.class, 1);
String categoryName = menu.getCategory().getCategoryName();
```

LAZY 관계라면 첫 조회에서는 메뉴를 읽고, 카테고리의 실제 데이터가 필요할 때 추가 조회가 실행될 수 있다. category_code 숫자 하나만 나중에 가져온다는 설명은 부정확하다. 여기서는 **연관된 Category 엔티티의 로딩 시점**을 다루는 것이다. getCategory() 호출만으로 항상 쿼리가 실행된다고 외우지도 않는다. 프록시, 접근하는 값, 이미 로딩된 상태 등에 따라 달라진다.

**EAGER가 항상 LEFT JOIN 한 번으로 조회한다는 뜻은 아니다.** JOIN을 사용할 수도 있고 별도 SELECT로 연관 데이터를 가져올 수도 있다. EAGER·LAZY는 조회 시점 전략이며 JOIN 종류를 직접 지정하는 설정이 아니다.

| 관계 어노테이션 | 기본 fetch |
|---|---|
| `@ManyToOne` | EAGER |
| `@OneToOne` | EAGER |
| `@OneToMany` | LAZY |
| `@ManyToMany` | LAZY |

수업의 N:1 Menu.category는 기본값을 바꿔 LAZY로 설정했다. 반면 1:N 단방향 예제 Category.menuList에는 소스상 `fetch = FetchType.EAGER`가 명시되어 있다. **OneToMany의 기본값은 LAZY지만, 이 예제의 실제 설정은 EAGER**라는 점을 구분한다.

또 이 단방향 예제의 JoinColumn은 insertable=false, updatable=false다. 해당 매핑으로 외래 키를 쓰거나 수정하지 않는다는 뜻이지 메뉴 조회까지 막는다는 뜻은 아니다.

아직 초기화되지 않은 지연 연관 데이터를 세션·영속성 컨텍스트가 닫힌 뒤 접근하면 Hibernate의 LazyInitializationException 등이 발생할 수 있다. 필요한 데이터를 트랜잭션 안에서 조회하고 DTO로 구성하거나, 필요한 연관 데이터를 쿼리에서 명시적으로 가져오는 방식으로 조회 범위를 설계한다. 로그 출력에서 toString이 연관 객체의 값을 읽으면 예상보다 일찍 로딩될 수도 있다.

근거: [@ManyToOne fetch](https://jakarta.ee/specifications/persistence/3.2/apidocs/jakarta.persistence/jakarta/persistence/ManyToOne.html), [@OneToMany fetch](https://jakarta.ee/specifications/persistence/3.2/apidocs/jakarta.persistence/jakarta/persistence/OneToMany.html), [Hibernate 로딩 설명](https://docs.hibernate.org/orm/7.2/introduction/html_single/).

## 6. 양방향 연관관계와 mappedBy

단방향 Menu → Category에 Category → List<Menu> 참조를 추가하면 양방향으로 탐색할 수 있다. DB의 외래 키가 방향마다 두 개 생기는 것은 아니다.

```text
Java: Menu.category → Category
      Category.menuList → 여러 Menu

DB:   tbl_menu.category_code → tbl_category.category_code
```

수업의 양방향 예제는 다음과 같다.

```java
// Menu의 필드
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "category_code", nullable = false)
private Category category;
```

```java
// Category의 필드
@OneToMany(mappedBy = "category")
private List<Menu> menuList = new ArrayList<>();
```

`mappedBy = "category"`에는 DB 컬럼명 category_code가 아니라 **Menu의 자바 연관관계 필드명 category**를 쓴다. “이 관계의 외래 키 관리는 반대편 Menu.category 매핑을 따른다”는 뜻이다.

### 연관관계의 주인은 무엇인가?

연관관계의 주인은 외래 키 변경을 반영하는 기준이 되는 매핑 쪽이다. 이 양방향 N:1 관계에서는 외래 키를 가진 Menu.category가 주인이고, mappedBy를 선언한 Category.menuList는 반대편 관계를 보여 주는 쪽이다.

**쉽게 풀면:** 카테고리의 자바 목록에 메뉴를 추가했다고 DB의 category_code가 자동 변경되는 것으로 생각하면 안 된다. 외래 키를 바꾸려면 주인 쪽인 Menu.category도 맞춰야 한다. 주인이라는 말이 업무상 더 중요한 객체를 뜻하지는 않는다.

### 양쪽 참조를 맞추는 편의 메서드

```java
public void addMenu(Menu menu) {
    menuList.add(menu);
    menu.setCategory(this);
}
```

첫 줄은 현재 카테고리의 자바 목록에 메뉴를 추가하고, 둘째 줄은 메뉴의 category 참조를 현재 Category 객체로 바꾼다. this는 이 addMenu를 실행하는 현재 카테고리 객체다.

양쪽 값을 함께 맞추면 같은 실행 중에 menu.getCategory()와 category.getMenuList()를 읽을 때 서로 일치하는 관계를 볼 수 있다. JPA가 자바 객체의 양쪽 참조를 항상 자동으로 맞춰 주지는 않으므로 편의 메서드로 묶는다.

수업 메서드는 단순 추가 예시다. 이미 다른 카테고리에 있던 메뉴를 이동시키는 경우에는 이전 카테고리 목록에서 제거하는 처리와 중복 추가 여부도 함께 고려해야 한다. 또한 addMenu만 호출했다고 새 Menu가 자동 persist되는 것은 아니다. 별도 저장 또는 cascade 설정이 필요하다. 수업의 위 OneToMany에는 cascade가 명시되어 있지 않다.

근거: [@OneToMany의 mappedBy·cascade](https://jakarta.ee/specifications/persistence/3.2/apidocs/jakarta.persistence/jakarta/persistence/OneToMany.html), [Jakarta Persistence 연관관계 규칙](https://jakarta.ee/specifications/persistence/3.2/jakarta-persistence-spec-3.2.html).

## 7. 매핑 개념 비교와 복습

| 비교 | 차이 |
|---|---|
| @Column / @JoinColumn | 일반 값의 컬럼 연결 / 엔티티 참조를 연결하는 외래 키 컬럼 |
| @Embeddable / @Entity | 별도 식별자 없이 소유 객체에 포함되는 값 타입 / 식별자를 가진 독립 엔티티 |
| @Embedded / @ManyToOne | 값 타입의 필드들을 소유 엔티티 컬럼에 포함 / 다른 엔티티와 외래 키로 연결 |
| 다중성 / 방향 | 몇 개가 연결되는가 / 어느 객체에서 어느 객체로 탐색할 수 있는가 |
| LAZY / EAGER | 필요할 때 로딩을 미룸 / 연관 데이터도 미리 로딩 |
| category_code / category | DB 외래 키 컬럼명 / 자바의 연관관계 필드명 |

복습할 때는 다음 질문에 답해 보면 된다.

1. **nullable=false는 빈 문자열도 막는가?** null 제약이며 빈 문자열 검증과 다르다.
2. **임베디드를 쓰면 컬럼이 줄어드는가?** 관련 필드를 자바 타입으로 묶는 것이 핵심이고, 내부 값들은 테이블 컬럼으로 매핑된다.
3. **EAGER이면 LEFT JOIN인가?** 로딩 시점 요구사항이며 SQL 방식은 달라질 수 있다.
4. **mappedBy에는 무엇을 쓰는가?** 주인 쪽 자바 연관관계 필드명이다.
5. **양방향이면 DB 관계가 두 개인가?** 하나의 외래 키 관계를 자바의 두 참조로 표현할 수 있다.
6. **목록에 메뉴만 추가하면 저장이 완료되는가?** 주인 쪽 참조, 엔티티 저장, 동기화와 트랜잭션 확정까지 구분해야 한다.

수업 코드의 동작은 소스와 공식 규칙을 대조해 설명했다. 실제 DB 테스트의 실행 결과를 보고한 것은 아니다.

---

## 8. 본문 흐름과 별도로 모은 메모

### YAML(.yml) — 계층형 설정 파일 문법

YAML은 키와 값을 들여쓰기로 묶어 계층 구조를 표현할 수 있는 데이터 형식이다. Spring Boot는 application.yml을 설정 파일로 읽는다.

```yaml
spring:
  jpa:
    hibernate:
      ddl-auto: none
```

이는 application.properties의 `spring.jpa.hibernate.ddl-auto=none`과 같은 설정 항목을 계층으로 적은 것이다. 들여쓰기 단계가 부모·자식 관계를 나타내므로 위치를 맞춰야 한다. 들여쓰기에 탭 대신 공백을 사용한다.

**쉽게 풀면:** 점으로 연결된 긴 설정 이름을 들여쓰기 단계로 나누어 적을 수 있는 문법이다. .yml 확장자를 쓴다고 자동으로 JPA 매핑이 되는 것은 아니다.

### Java var — 지역 변수 타입 추론

```java
var menu = entityManager.find(Menu.class, 1);
```

컴파일러가 초기화식의 반환 타입을 보고 menu를 Menu 타입으로 결정한다. Java 10부터 사용할 수 있는 지역 변수 타입 추론이다. 타입 추론은 코드를 컴파일할 때 타입을 결정하는 것이며, 실행 중 아무 타입으로 계속 바뀌는 변수라는 뜻은 아니다.

```java
var name = "메뉴"; // String으로 결정
// name = 123;     // String 변수에 int를 넣을 수 없어 컴파일 오류
```

일반적인 클래스 필드나 메서드 반환 타입을 var로 선언할 수 없고, `var value = null;`처럼 타입을 정할 정보가 없는 선언도 사용할 수 없다.

**쉽게 풀면:** 타입이 없어지는 것이 아니라 컴파일러가 오른쪽 값을 보고 타입 이름을 대신 정해 주는 것이다.

근거: [Java 21 — 지역 변수 타입 추론](https://docs.oracle.com/en/java/javase/21/language/local-variable-type-inference.html).

### @Transactional — DB 작업 범위와 확정·취소

Spring이 관리하는 Bean의 메서드를 트랜잭션 프록시를 통해 호출하면 @Transactional 설정에 따라 DB 작업을 트랜잭션으로 처리한다. 기본 전파 방식에서는 기존 트랜잭션에 참여하거나 없으면 새 트랜잭션을 시작한다.

**쉽게 풀면:** 여러 DB 작업을 하나의 처리 범위로 묶어 함께 확정하거나 취소할 수 있게 하는 설정이다. 메서드마다 반드시 별도 커밋이 생긴다고 이해하지 않는다.

기본 규칙에서는 처리 경계 밖으로 RuntimeException 또는 Error가 전파되면 롤백한다. checked exception은 기본적으로 같은 롤백 규칙이 아니며 rollbackFor 같은 설정으로 바꿀 수 있다. 예외를 내부에서 잡아 버린 경우에도 무조건 자동 롤백된다고 생각하면 안 된다. 반대로 이미 rollback-only로 표시되었다면 예외를 잡아도 커밋이 실패할 수 있다.

수업 서비스의 `@Transactional(readOnly = true)`는 읽기 전용 의도와 최적화 힌트를 전달한다. 쓰기 동작을 모든 환경에서 절대 금지하는 보안 장치로 생각하면 안 된다.

근거: [Spring 트랜잭션 롤백 규칙](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/rolling-back.html).

### @Commit — 테스트 트랜잭션을 끝날 때 커밋하도록 지정

수업 MemberRegistServiceTests는 @SpringBootTest와 @Transactional을 사용하고, 회원 등록 테스트에 @Commit을 붙였다.

```java
@Test
@Commit
void testRegistMember() {
    Member savedMember = memberRegistService.registMember(newMember);
    assertTrue(savedMember.getMemberNo() > 0);
}
```

위는 핵심 부분 발췌이며 newMember는 테스트의 given 단계에서 준비한 입력 DTO다.

Spring TestContext가 관리하는 트랜잭션 테스트는 기본적으로 종료 시 롤백한다. @Commit은 이 테스트 트랜잭션을 종료할 때 커밋하도록 지정하며 @Rollback(false)와 같은 의도로 사용한다. 이전 수업처럼 AfterEach에서 직접 rollback을 작성하는 방식과 구분한다.

**쉽게 풀면:** @Commit 자체가 회원을 등록하는 명령이 아니다. 등록 동작은 서비스가 수행하고, @Commit은 테스트에서 실행한 DB 변경을 끝날 때 확정하도록 지정한다. 일반 서비스 메서드의 트랜잭션 처리 용도로 붙이는 어노테이션도 아니다.

다만 테스트가 rollback-only로 표시되거나 커밋에 실패한 경우까지 무조건 확정되는 것은 아니다. 또 해당 애플리케이션을 다시 초기화할 때 ddl-auto:create가 실행되면, 앞서 커밋한 데이터도 테이블 재생성과 함께 사라질 수 있다. **커밋으로 이번 트랜잭션을 확정하는 일과, 다음 초기화에서 스키마를 재생성하는 일은 별개**다.

근거: [Spring @Commit](https://docs.spring.io/spring-framework/reference/testing/annotations/integration-spring/annotation-commit.html), [Spring 테스트의 기본 롤백](https://docs.spring.io/spring-framework/reference/testing/annotations/integration-spring/annotation-rollback.html).
