## [2026-10-27] Spring AOP, Spring Boot

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### Spring Bean의 초기화와 소멸
- Spring 컨테이너는 Bean을 만들고 필요한 의존성을 연결한 뒤 초기화한다. 컨테이너가 종료될 때는 Bean의 정리 작업을 실행하고 자원을 해제할 수 있다.
- `@Bean`의 `initMethod`와 `destroyMethod` 속성에 메서드 이름을 지정하면 생명주기 시점에 호출할 메서드를 등록할 수 있다.
- 이 방식은 직접 수정할 수 없는 외부 라이브러리의 객체에 초기화·정리 동작을 연결할 때도 쓸 수 있다. 예를 들면 연결을 열고 닫거나, 백그라운드 작업을 시작하고 중지하는 작업이다.

```text
컨테이너 시작
  → Bean 생성
  → 의존성 주입
  → 초기화 메서드 실행
  → Bean 사용

컨테이너 종료
  → 소멸 메서드 실행
  → 자원 정리
```
#### Build와 classpath
- **Build(빌드)**: 소스 코드를 컴파일하고 필요한 라이브러리를 모아 실행·배포할 수 있는 산출물을 만드는 과정이다. 프로젝트 설정에 따라 테스트나 패키징도 포함된다.
    - Spring 문법과 기능을 사용하려면, Spring 라이브러리가 필요하다. 이것들을 실행하거나 배포할 수 있도록 준비하는 전체 과정을 Build라고 한다. 컴파일, 테스트, 리소스 처리, 패키징 등을 함께 수행.
- **Classpath(클래스패스)**: Java가 클래스와 리소스를 찾을 때 참조하는 경로 또는 목록이다. Spring 설정 파일이나 라이브러리도 실행 환경의 클래스패스에서 찾을 수 있다. Java에게 위치를 알려주는 목록이 Classpath다.

#### AOP (Aspect-Oriented Programming)
AOP: AOP는 여러 기능에 반복해서 나타나는 공통 관심사(cross-cutting concern)를 핵심 업무 코드와 분리해 관리하는 방식이다.
- 예를 들어 여러 서비스 메서드에서 같은 로그 기록, 실행 시간 측정, 권한 확인, 트랜잭션 처리가 필요할 수 있다. 이를 각 메서드에 반복해서 작성하는 대신 공통 기능으로 분리하고, 어떤 메서드에 적용할지 규칙을 지정한다.
- **핵심 관심사**: 주문 생성, 회원 조회처럼 애플리케이션의 주된 업무
- **횡단 관심사**: 여러 업무에 걸쳐 공통으로 필요한 로깅, 보안, 트랜잭션 등
- **Aspect(애스펙트)**: 적용 대상과 공통 동작을 함께 정의한 모듈
- **Join point(조인 포인트)**: 공통 기능을 끼워 넣을 수 있는 실행 지점. Spring AOP에서는 주로 메서드 실행이다.
- **Pointcut(포인트컷)**: 공통 기능을 적용할 메서드를 선택하는 조건식
- **Advice(어드바이스)**: 선택된 지점에서 실행할 공통 동작
- **Proxy(프록시)**: 대상 객체를 감싸 요청을 먼저 받아 Advice를 실행한 뒤 실제 객체에 전달하는 대리 객체
- `@EnableAspectJAutoProxy`: 일반 Spring Java 설정에서 프록시 기반 AOP 처리를 활성화한다. 프로젝트 구성에 따라 Spring Boot AOP 자동 설정이 이를 대신할 수 있다.

```text
호출자 → 프록시 → (공통 기능 실행) → 대상 객체의 메서드
```

따라서 “AOP가 원본 메서드 코드를 찾아 그 안에 코드를 직접 삽입한다”기보다는, Spring의 프록시가 호출을 가로채 공통 기능을 실행한다고 이해하면 된다. Spring AOP는 프록시 기반이므로, 같은 객체 내부에서 `this.someMethod()`처럼 직접 호출하는 경우 프록시를 거치지 않아 AOP가 적용되지 않을 수 있다.

##### Advice 종류

| 어노테이션 | 실행 시점 | 주 용도 |
|---|---|---|
| `@Before` | 대상 메서드 실행 전 | 사전 검사, 실행 전 로그 |
| `@AfterReturning` | 대상 메서드가 예외 없이 정상 반환한 뒤 | 결과값 기록, 성공 후 처리 |
| `@AfterThrowing` | 대상 메서드가 예외를 던져 종료된 뒤 | 예외 기록, 실패 후 처리 |
| `@After` | 성공·예외 여부와 관계없이 메서드 종료 뒤 | 자원 정리처럼 `finally`에 가까운 처리 |
| `@Around` | 대상 메서드 실행 전후를 감쌈 | 실행 시간 측정, 실행 전후 상태 관리 |

`@Around`는 대상 메서드를 실행할지 결정할 수 있고, 실행하려면 `ProceedingJoinPoint.proceed()`를 호출해야 한다. 특별한 이유가 없다면 요구에 맞는 가장 단순한 Advice를 선택한다.

### Spring Framework와 Spring Boot
**Spring Framework**는 IoC 컨테이너, 의존성 주입, 웹 MVC, 트랜잭션 등 애플리케이션 개발에 필요한 기반 기능을 제공한다.

**Spring Boot**는 Spring Framework를 더 빠르게 구성하고 실행하도록 돕는 도구다. 프레임워크를 대체하는 별개의 프레임워크라기보다, Spring 애플리케이션을 편리하게 시작하고 운영하기 위한 구성과 관례를 제공한다.

- **Starter 의존성**: 웹, 테스트 등 목적별로 자주 함께 쓰는 라이브러리를 묶어 쉽게 추가한다.
- **자동 설정**: 클래스패스의 라이브러리와 설정을 보고 필요한 Spring Bean과 구성을 자동으로 마련한다. 직접 설정한 Bean이 있으면 일부 기본 설정이 물러나는 등 사용자 설정을 반영한다.
- **내장 웹 서버**: 웹 애플리케이션에 서버를 포함해 별도 서버에 배포하지 않고도 실행할 수 있다. Spring MVC용 `spring-boot-starter-web`은 기본적으로 Tomcat을 포함한다.
- **실행 가능한 애플리케이션 구성**: 애플리케이션을 실행 가능한 형태로 패키징해 간편하게 구동할 수 있다.

`@SpringBootApplication`은 다음 기능을 묶어 제공한다.

- `@SpringBootConfiguration`(일반적으로 `@Configuration` 역할): 설정 클래스임을 나타낸다.
- `@EnableAutoConfiguration`: 자동 설정을 활성화한다.
- `@ComponentScan`: 시작 클래스가 있는 패키지와 하위 패키지에서 컴포넌트를 찾는다.

#### HTTP 요청에서 핸들러 메서드까지
웹 애플리케이션에서 React 같은 클라이언트는 HTTP 요청을 Spring 서버로 보낸다. Spring MVC는 요청 방식과 경로를 보고 알맞은 컨트롤러의 메서드를 찾아 실행한다. HTTP 요청과 연결되어 실행되는 컨트롤러 메서드를 **핸들러 메서드(handler method)**라고 한다.

```text
클라이언트(예: React)
  → HTTP 요청
  → 내장 웹 서버(Tomcat 등)
  → Spring MVC가 경로와 HTTP 메서드로 핸들러 선택
  → 핸들러 메서드 실행
  → HTTP 응답
```
요청에는 보통 HTTP 메서드, 경로, 헤더, 본문이 포함된다. 응답에는 상태 코드, 헤더, 본문이 포함된다. 본문은 요청·응답에 따라 없을 수도 있다.

```text
HTTP 요청  = 메서드 + 경로 + 헤더 + (선택적 본문)
HTTP 응답  = 상태 코드 + 헤더 + (선택적 본문)
```

개발 서버의 기본 포트는 보통 `8080`이지만 `server.port` 설정으로 바꿀 수 있다.

```text
MVC
→ 웹 애플리케이션을 Model, View, Controller로 분리하는 설계 방식

Spring MVC
→ Spring이 HTTP 요청을 Controller에 연결하고,
  Model 데이터를 View에 전달하여 응답하도록 지원하는 웹 기술
  ```
- `@RestController`: 웹 요청을 처리하는 컨트롤러이며 반환값을 응답 본문으로 보낸다. `@Controller`와 클래스 수준의 `@ResponseBody`를 결합한 의미다.
- `@RequestMapping("/menus")`: 클래스의 핸들러에 공통 경로를 붙인다.
- `@GetMapping("/hello")`: GET 요청의 `/menus/hello` 경로를 메서드와 연결한다.
- 이 예시에서 `hello()`가 반환한 문자열이 HTTP 응답 본문에 들어간다.

`@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`은 각각 특정 HTTP 메서드에 맞춘 `@RequestMapping`의 축약형이다.

##### 경로 변수: `@PathVariable`

```java
@GetMapping("/{menuCode}")
public ResponseEntity<Map<String, Object>> findMenu(
        @PathVariable int menuCode) {

    Map<String, Object> response = Map.of(
            "message", menuCode + "번 메뉴 조회용 핸들러 메서드 호출");

    return ResponseEntity.ok(response);
}

1. @GetMapping("/{menuCode}")
  - GET 요청으로 메뉴 번호를 받는다. {menuCode}는 URL에서 값이 바뀌는 부분을 표시하는 Spring MVC 문법이다.
2. public ResponseEntity<Map<String, Object>> findMenu(
        @PathVariable int menuCode)
  - 받은 번호로 응답 데이터를 만든다.
  - ResponseEntity: 반환 타입이다. HTTP 응답 전체를 나타내는 Spring 객체이다.
  - <Map<String, Object>>: 이 Map은 HTTP 응답의 본문 Body에 들어갈 데이터 타입이다. key, value를 담는 Map을 HTTP 응답 본문으로 가지는 ResponseEntity.
  - @PathVariable: URL 경로에 들어온 값을 메서드 매개변수로 꺼내는 어노테이션이다. menuCode에 들어온 URL 값을 꺼낸다.
3. Map<String, Object> response = Map.of(
            "message", menuCode + "번 메뉴 조회용 핸들러 메서드 호출");
  - HTTP 상태 코드 200과 JSON을 반환한다.
  - response: 지역 변수 선언. 이 변수에는 React에 보내 줄 응답 본문 데이터가 들어간다.
  - Map.of(): key-value 데이터를 가진 Map 객체를 만드는 Java 메서드이다. Map.of()로 만든 Map은 생성 이후 내용을 추가하거나 변경할 수 없는 불변 Map이다. "messeage"는 Spring이 Map을 JSON으로 변환하면 JSON의 속성 이름이 된다.
4. return ResponseEntity.ok(response);
  - Controller 메서드에서는 Spring MVC가 반환값을 받아 HTTP 응답으로 처리한다.
  - ResponseEntity.ok(response): ok()는 ResponseEntity 클래스가 제공하는 메서드. ok는 HTTP 상태 코드 200 OK를 뜻한다. 괄호 안의 response는 HTTP 응답 본문으로 사용한다.
```
##### 요청 파라미터: `@RequestParam`
쿼리 문자열 같은 요청 파라미터를 메서드 인자로 받는다.
- `name`은 요청 파라미터 이름이다.
- `required`는 필수 여부이며 기본값은 `true`다. 필수 파라미터가 빠지면 기본적으로 요청 처리 오류가 발생한다.
- 선택값은 `required = false` 또는 `Optional<String>` 등으로 받을 수 있다.
- URL 경로의 일부는 `@PathVariable`, 쿼리 파라미터는 `@RequestParam`으로 받는다.


### HTTP 메서드와 응답 상태

| 매핑 | 일반적인 용도 | 예시 응답 |
|---|---|---|
| `@GetMapping` | 조회 | `200 OK` |
| `@PostMapping` | 새 리소스 생성 | `201 Created` |
| `@PutMapping` | 리소스 전체 수정 또는 교체 | `200 OK` 또는 본문 없는 `204 No Content` |
| `@DeleteMapping` | 삭제 | `204 No Content` 등 |


### 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- @Configuration으로 이 클래스는 객체를 생성하고 조립하는 Spring 설정 클래스라고 Spring에게 알려주는 어노테이션이다. 영어로 설정이라는 뜻. 보통 @Bean과 함께 사용된다. @Bean은 이 메서드가 반환하는 객체를 Spring Container에 등록해라고 알려주는 어노테이션이다. 


#### 빠르게 구분하기

| 개념 | 답하는 질문 |
|---|---|
| Bean | Spring 컨테이너가 생성하고 관리하는 객체인가? |
| IoC | 객체의 생성과 관리 책임이 누구에게 있는가? |
| DI | 객체가 필요로 하는 의존성을 누가 연결해 주는가? |
| AOP | 여러 곳에 반복되는 공통 기능을 어떻게 분리하고 적용하는가? |
| Pointcut | 어느 메서드에 공통 기능을 적용할 것인가? |
| Advice | 선택된 메서드에서 어떤 공통 기능을 언제 실행할 것인가? |
| Controller | HTTP 요청을 받아 응답 흐름을 연결하는 곳인가? |
| Handler method | 특정 HTTP 요청에 실제로 연결되어 실행되는 메서드인가? |
| `@PathVariable` | URL 경로의 `{값}`을 받을 것인가? |
| `@RequestParam` | `?name=value` 형식의 요청 파라미터를 받을 것인가? |
| `@RequestBody` | HTTP 본문의 JSON을 객체로 받을 것인가? |
| `ResponseEntity` | 응답 상태 코드·헤더·본문을 직접 구성할 것인가? |