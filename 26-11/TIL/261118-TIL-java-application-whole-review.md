## [2026-11-18] Java Application whole review

### 전체 복습
1. Spring Web MVC
- Servlet API 기반의 웹 프레임워크. spring-webmvc 라이브러리 모듈로 제공한다.
    - Servlet API: 자바 서버에서 HTTP 요청·응답을 처리하기 위해 정한 표준 API야. Jakarta EE에서 정의하고, 자바 클래스와 인터페이스 형태로 제공.
    - Servlet API로 직접 처리하던 작업을 Spring MVC가 추상화해서, 어노테이션과 메서드로 편하게 표현할 수 있다. Spring Boot는 그 Spring MVC와 서버를 사용할 수 있도록 설정을 자동으로 준비해준다.
- HTTP 웹 요청 응답과 그 코드를 연결하는 웹 처리 과정을 맡는다.
- Controller를 호출하기 위한 준비부터, Controller의 결과를 HTTP 응답으로 내보내는 과정까지 담당한다.
- 실행할 메서드(@GetMapping, @PostMapping 등)를 찾고, 주소 검색 조건(@PathVariable, @RequestParm)을 매개변수로 전달, 요청 본문(@RequestBody, JSON)을 객체로 변환 처리, 입력값 검증(@Valid), Controller 메서드 호출, 반환값을 HTTP 응답으로 처리, 예외에 맞는 응답 처리(@ExceptionHandler)

2. REST API
- 클라이언트와 서버가 자원을 주고받는 통신 인터페이스.
- 자원을 "GET api/posts/1" 링크 형식으로 나타내고 HTTP 메서드로 작업을 구분하는 설계.







### 헷갈리는 개념
- 프레임워크 안에 프레임워크가 존재한다는 개념이 어색하다.
- Spring Framework는 자바(Java) 기반의 오픈소스 애플리케이션 프레임워크로, 엔터프라이즈급 애플리케이션을 쉽게 개발할 수 있도록 DI(의존성 주입), IoC(제어의 역전), AOP(관점 지향 프로그래밍) 등의 핵심 기능을 제공하는 거대한 생태계.
- Spring MVC(Spring Web MVC)는 Spring Framework의 수많은 모듈 중 웹 애플리케이션(서버 사이드 렌더링 및 REST API)을 만들기 위해 서블릿(Servlet) API를 기반으로 구축된 웹 프레임워크 모듈