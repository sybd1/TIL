## [2026-10-26] Spring Framework

### 오늘 배운 핵심 개념 (What I Learned)
#### Spring Core
- **Spring Core (IoC / DI Container)**: 모든 스프링 생태계 모듈의 근간이 되는 필수 엔진.  스프링 프레임워크의 가장 밑바탕이 되는 핵심 모듈이다.
- **POJO vs Spring Bean**:
  - **POJO (Plain Old Java Object)**: 특정 기술이나 프레임워크 규격에 얽매이지 않은 순수 자바 객체입니다. 개발자가 필요할 때마다 직접 `Member member = new Member();` 형태로 인스턴스를 생성하고 소멸을 제어합니다.
  - **Spring Bean**: 개발자가 직접 `new`로 만드는 것이 아니라 스프링 컨테이너(Spring Container)에 위임하여 생성, 생명주기 관리, 의존성 조립(DI)을 전적으로 제어하는 객체입니다.
  - **build.gradele(빌드 도구)**: Gradle 빌드 도구의 설정 파일이다. 프로젝트가 사용할 스프링 프레임워크 모듈의 버전을 명시하고 중앙저장소(Maven Central)로부터 자동으로 다운로드 받아 빌드 경로에 포함시킨다.

#### IoC (제어의 역전), DI (의존성 주입)
- IoC (Inversion of Control): 객체의 생성, 생명주기 관리, 호출 흐름의 주도권을 개발자가 아닌 프레임워크(스프링 컨테이너)가 가져가는 것을 의미한다. 컨테이너에게 "이 객체들을 등록하고 조립해줘"라고 설정 정보만 넘겨준다.
- DI (Dependency Injection): IoC 원칙을 소프트웨어 아키텍처에서 구체적으로 실현하는 디자인 패턴이다. 객체 내부에서 의존 대상을 직접 생성(new)하지 않고, 외부(Spring Container)로부터 주입(전달)받는 방식이다. 의존성 자동 주입이란 객체가 필요한 다른 객체를 직접 생성하지 않아도, Spring 컨테이너가 적절한 빈을 찾아 자동으로 연결해 주는 기능이다.

##### 의존성 주입(DI)의 3가지 방법
1. **필드 주입 (`@Autowired` 필드 선언)**: 코드가 짧지만 외부에서 변경이 불가능하여 순수 단위 테스트 작성이 매우 어렵습니다. (실무 안티패턴)
2. **수정자 주입 (`setter` 메서드)**: 주입받을 객체가 변경될 가능성이 있는 경우 사용하나, 런타임에 의존성이 누락되어 `NullPointerException`이 발생할 위험이 있습니다.
3. **생성자 주입 (Constructor Injection - ★ 실무 표준)**:
   - 객체 생성 시점에 의존성이 완전히 주입되므로 **불변성(`final`)**을 보장합니다.
   - 의존 관계가 누락되면 컴파일 시점에 즉시 오류를 감지할 수 있습니다.
   - 순환 참조(Circular Dependency) 문제를 애플리케이션 시작 시점에 방지합니다.

#### Spring Bean 등록 방식 3가지
스프링 컨테이너(ApplicationContext)는 설계도(Configuration Metadata)를 바탕으로 빈을 생성한다.

- XML 설정 방식: 컴파일 없이 XML 수정만으로 빈 변경 가능, 오타 검증이 어렵고 파일 관리가 복잡해서 거의 사용하지 않는 방식이다.
- Java Config(Configuration): @Configuration 클래스 내부에 @Bean 메서드를 정의하여 스프링 빈을 수동으로 등록하는 방식.
    - @Configuration: 해당 클래스가 스프링 설정 클래스임을 나타내는 어노테이션. 빈을 만드는 방법이 적힌 설정 클래스.
    - @Bean: Sping 메서드가 반환하는 객체를 스프링 컨테이너에 빈으로 등록하는 어노테이션.
- 컴포넌트 스캔(ComponentScan): Spring에서 **컴포넌트 스캔(Component Scan)**은 개발자가 빈을 일일이 등록하지 않아도, 특정 패키지 내의 클래스를 탐색하여 스프링 빈(Spring Bean)으로 자동 등록하는 기능이다. 주로 @ComponentScan과 @Component 어노테이션을 사용한다.
    - @ComponentScan: 지정된 패키지와 하위 패키지를 탐색하여 @Component가 붙은 클래스를 자동으로 스프링 빈으로 등록하는 기능입니다.
    - @Component: 빈 등록 대상 클래스 지정.
    - @Service: 서비스 계층의 컴포넌트.
    - @Repository: 데이터 접근 계층의 컴포넌트.
    - @Controller: 웹 요청 처리 계층의 컴포넌트.
    - **@Autowired**: 의존성 자동 주입.
    - @SpringBootApplication: 컴포넌트 스캔 기능 포함.


#### 아키텍처 및 계층 분리와 의존 관계 (Controller - Service - Repository)

웹 애플리케이션의 3계층(Layered Architecture) 구조와 각 어노테이션의 명확한 역할 매핑입니다.

```
                     [ HTTP Client (Browser / Postman) ]
                                     │
                                     ▼
[ Presentation Layer ]     @Controller / @RestController
                           - 클라이언트의 HTTP 요청 수신 및 응답 반환
                           - 입력 데이터 검증(Validation)
                                     │ (Service 호출)
                                     ▼
[ Business Layer ]         @Service
                           - 핵심 비즈니스 로직 및 트랜잭션 관리
                           - 여러 Repository 조합 및 업무 규칙 실행
                                     │ (Repository 호출)
                                     ▼
[ Data Access Layer ]      @Repository (DAO: Data Access Object)
                           - 데이터베이스에 접근하여 CRUD 수행
                           - DB 예외를 스프링의 DataAccessException으로 추상화 변환
                                     │
                                     ▼
                           [ Database (MySQL / Oracle) ]
```

##### `@Component`의 세분화 어노테이션
스프링은 계층별 역할을 명확히 구분하고 AOP/예외 변환 처리를 돕기 위해 `@Component`를 상속받은 전문 어노테이션을 제공합니다.
- **`@Controller`**: 웹 MVC 컨트롤러로 인식하여 요청 라우팅 처리.
- **`@Service`**: 비즈니스 로직 계층임을 명시 (가독성 및 비즈니스 트랜잭션 경계 설정).
- **`@Repository`**: 데이터 접근 계층임을 명시하며, DB 벤더별 고유 SQL Exception을 스프링 공통 추상 예외로 자동 변환.
- **`@Configuration`**: 스프링 설정 정보 클래스임을 명시.


#### 심화 및 연계 학습 (Next Step: Bean Scope & Spring Boot)

##### 1) 빈 스코프(Bean Scope): Singleton vs Prototype
스프링 컨테이너는 기본적으로 빈을 **싱글톤(Singleton)**으로 관리합니다.
- **Singleton (기본값)**: 애플리케이션 구동 시 단 하나의 인스턴스만 생성되어 컨테이너 전체에서 공유됩니다. 서버 자원을 획기적으로 아낄 수 있지만, **상태를 가지지 않는 무상태(Stateless) 방식**으로 설계해야 멀티스레드 환경에서 안전합니다.
- **Prototype (`@Scope("prototype")`)**: 컨테이너에 요청할 때마다(`getBean()` 또는 주입 시) 새로운 인스턴스를 생성하여 반환합니다. 생성 및 의존관계 주입까지만 컨테이너가 관여하고 소멸 제어는 클라이언트가 담당합니다.

##### 2) 동일 타입 빈이 2개 이상일 때 충돌 해결 전략
인터페이스 구현체가 2개 이상(`MemoryMemberRepository`, `JdbcMemberRepository`)일 때:
1. **`@Primary`**: 메인으로 사용할 기본 빈 클래스에 선언하여 우선권 부여.
2. **`@Qualifier("빈이름")`**: 주입받는 위치에서 특정 빈 이름을 지정하여 명시적으로 선택 (`@Qualifier`가 `@Primary`보다 우선순위가 높음).
3. **`List<MemberRepository>` / `Map<String, MemberRepository>`**: 모든 구현체를 컬렉션으로 한 번에 주입받아 전략 패턴(Strategy Pattern)으로 다형적 활용.

##### 3) 다음 단계 기술 연계 (Spring Boot & 영속성 프레임워크)
- 오늘 배운 순수 스프링 코드는 **Spring Boot**로 넘어가면서 `@SpringBootApplication` 어노테이션 하나로 설정이 극대화되어 자동화됩니다.
- 메모리 저장소(`store Map`)는 향후 **MyBatis**(SQL 매핑 프레임워크) 또는 **JPA / Spring Data JPA**(ORM 기술)를 통해 실제 관계형 데이터베이스(MySQL, PostgreSQL)와 연결되어 트랜잭션 단위로 안전하게 영속화됩니다.




오늘 수업 핵심 Q&A (궁금증 및 혼란 해소)

| 질문 | 원인 분석 및 기술적 답변 |
| :--- | :--- |
| **Q1. 의존성이 대체 무엇인가요? 왜 스프링이 대신 연결해주나요?** | **A.** 자동차가 엔진 없이는 달릴 수 없듯, 한 클래스가 제 역할을 하기 위해 다른 객체의 기능을 호출하는 관계를 "의존성"이라 부릅니다. 개발자가 직접 내부에서 `new 엔진()`으로 만들면 엔진 종류가 바뀔 때마다 차 코드를 전부 뜯어고쳐야 합니다. 스프링이 외부에서 규격(인터페이스)에 맞게 엔진을 주입해주면, 차 코드는 한 줄도 건드리지 않고 가솔린 엔진에서 전기 모터로 갈아끼울 수 있어 유지보수성과 테스트가 극대화됩니다. |
| **Q2. 어노테이션(`@Component`, `@Autowired` 등)은 대체 무슨 일을 하나요?** | **A.** 어노테이션은 자바의 메타데이터 표기법입니다. 스프링 컨테이너는 시작할 때 클래스들을 스캔하면서:<br>1) `@Component`가 붙은 클래스를 발견하면 "아, 이건 내가 생성해서 보관할 빈(Bean)이구나!" 하고 인스턴스를 만듭니다.<br>2) 생성자나 필드에 `@Autowired`를 발견하면 "이 객체를 만들려면 생성자 파라미터 타입의 빈이 필요하구나!" 하고 컨테이너 보관소에서 일치하는 객체를 찾아 자동으로 꽂아(주입)줍니다. |
| **Q3. 기본 생성자는 왜 무조건 만드는 것이 아니라 생각하고 만들어야 하나요?** | **A.** 무분별하게 `public` 기본 생성자를 열어두면, 필수 필드(예: 회원 이름, ID)가 채워지지 않은 불완전한 상태의 객체가 생성될 수 있습니다. 객체는 생성 시점에 유효한 상태를 갖추어야(불변식 유지) 버그를 막을 수 있습니다. 다만 프레임워크(JPA, Jackson 역직렬화 등)가 리플렉션 기술로 객체를 생성하기 위해 기본 생성자를 요구하는 경우가 있는데, 이때는 `protected` 수준으로 가시성을 제한하여 안전성을 확보하는 것이 실무 규칙입니다. |
| **Q4. `@Autowired` 필드 주입보다 생성자 주입을 왜 무조건 권장하나요?** | **A.** 필드 주입(`@Autowired private MemberRepo repo;`)은 스프링 컨테이너가 켜져 있지 않은 순수 자바 단위 테스트(JUnit) 환경에서 객체를 생성할 때 외부에서 의존성을 넣어줄 방법이 없어 무조건 `NullPointerException`이 발생합니다. 생성자 주입은 `new MemberService(mockRepo)`처럼 순수 자바로도 손쉽게 테스트할 수 있고, `final` 키워드로 누락을 컴파일 시점에 즉시 잡아줍니다. |

---

#### 오늘의 한 줄 회고
> **"내가 직접 `new` 하던 제어권을 스프링 컨테이너(IoC)에 넘기고, 인터페이스 기반으로 의존성을 주입(DI)받음으로써 비로소 레고 블록처럼 유연하고 테스트 가능한 객체지향 설계가 완성된다."**

