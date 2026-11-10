# 2026-11-10 TIL — Spring Security 인증·인가와 JWT

메모와 강의 PDF 세 편을 바탕으로 `chap01-security-basic`의 회원가입·HTTP Basic 흐름과 `chap02-jwt-authentication`의 JWT 설정을 따라갔다. `chap02`에서 작성이 덜 된 로그인·토큰 발급 부분은 `chap03-refresh-token`의 코드를 참고했다. 테스트 상태 코드는 소스에 적힌 기대값이다.

## 1. 회원가입, 인증, 인가를 구분하기

| 구분 | 서버가 하는 일 | 수업 예시 |
|---|---|---|
| 회원가입 | 나중에 인증에 사용할 계정을 만든다. | `POST /api/auth/signup`에서 일반 회원 생성 |
| 인증, Authentication | 요청에 제시한 자격 증명으로 사용자가 누구인지 확인한다. | 입력한 비밀번호가 저장된 해시와 일치하는지 검사 |
| 인가, Authorization | 그 사용자가 해당 자원에 접근할 수 있는지 판단한다. | `/api/admin/**`에 `ADMIN` 역할을 요구 |

`Principal`은 보호된 자원에 접근하는 주체다. `Credentials`는 주체를 확인하는 데 쓰는 자격 증명이다. 수업에서는 회원의 아이디를 주체 이름으로 쓰고, HTTP Basic에서는 비밀번호를 자격 증명으로 쓴다. JWT로 보호된 API를 요청할 때는 액세스 토큰을 제시한다.

아키텍처 PDF 2쪽의 용어 목록에는 영어 표기가 뒤바뀐 부분이 있다. **Authentication은 인증, Authorization은 인가**로 읽는다. 수업의 보호 API에서 인증 정보가 없거나 유효하지 않으면 `401`, 인증된 일반 회원에게 관리자 권한이 없으면 `403`이다. [Security 개요 PDF 1쪽](<../../../course-materials/26-11/11_security-main/00. Security 개요 및 환경 설정.pdf#page=1>) · [아키텍처 PDF 2쪽](<../../../course-materials/26-11/11_security-main/01. SpringSecurity architecture.pdf#page=2>)

## 2. 회원가입에서 비밀번호와 응답을 처리하는 방법

```text
POST /api/auth/signup + 회원가입 JSON
  → AuthController가 SignupRequest를 받고 입력 조건 검사
  → UserAccountService가 아이디와 이메일의 중복을 각각 확인
  → PasswordEncoder.encode(...)로 비밀번호를 해시
  → UserAccountRepository에 USER 역할의 회원 저장
  → UserResponse.from(...)으로 응답 DTO 생성
  → 201 Created + 회원 정보 JSON
```

| 코드 | 읽는 법 |
|---|---|
| `PasswordEncoder` | `encode`와 `matches`를 제공하는 인터페이스 |
| `BCryptPasswordEncoder` | BCrypt로 위 기능을 수행하는 구현 클래스 |
| `passwordEncoder.encode(request.password())` | 가입할 때 입력한 비밀번호에서 저장용 해시를 만든다. |
| `passwordEncoder.matches(rawPassword, storedHash)` | 인증할 때 입력한 비밀번호를 저장된 해시와 대조한다. |

BCrypt 해시에는 솔트 정보가 포함된다. 같은 비밀번호도 `encode`를 두 번 호출하면 서로 다른 결과가 나올 수 있다. 비교는 `matches`에 맡긴다. [Spring Security 비밀번호 저장 문서](https://docs.spring.io/spring-security/reference/7.0/features/authentication/password-storage.html)

`UserResponse.from(user)`는 `UserAccount` 엔티티를 받아 `UserResponse`를 만드는 수업 코드의 `static` 메서드다. `from`은 코드 작성자가 붙인 이름이다. 이 메서드는 `id`, `userId`, `userName`, `email`, `role`만 골라 담는다. 비밀번호 해시는 인증을 위해 DB에 보관하고, 회원 정보 JSON에는 포함하지 않는다.

## 3. HTTP Basic 요청 한 번을 끝까지 따라가기

`chap01`은 `GET /api/users/me` 같은 보호 요청에 `Authorization: Basic <인코딩된 자격 증명>`을 붙인다. Basic은 `아이디:비밀번호`를 Base64로 표현하므로 수업의 `STATELESS` 설정에서는 보호 요청마다 자격 증명을 제시한다. 전송 중 자격 증명을 보호하는 역할은 HTTPS가 맡는다. [Spring Security HTTP Basic 문서](https://docs.spring.io/spring-security/reference/7.0/servlet/authentication/passwords/basic.html)

```text
GET /api/users/me + Basic 헤더
  → BasicAuthenticationFilter가 아이디와 비밀번호를 꺼냄
  → UsernamePasswordAuthenticationToken에 인증 요청을 담음
  → AuthenticationManager가 DaoAuthenticationProvider에 인증을 맡김
      → UserDetailsService가 DB에서 회원을 조회해 UserDetails 반환
      → Provider가 계정 상태와 비밀번호 일치 여부 확인
  → 필터가 인증된 Authentication을 SecurityContext에 설정
  → URL 접근 조건 검사
  → UserController가 authentication.getName()으로 내 회원 정보 조회
```

아키텍처 PDF 1쪽의 그림을 수업의 Basic 요청에 대입하면, 왼쪽 인증 필터가 요청을 받아 오른쪽의 조회·검증 구성 요소에 넘긴다. 인증 결과는 다시 필터로 돌아와 `SecurityContextHolder`에서 접근할 수 있게 된다. [아키텍처 PDF 1~6쪽](<../../../course-materials/26-11/11_security-main/01. SpringSecurity architecture.pdf#page=1>) · [DaoAuthenticationProvider 공식 흐름](https://docs.spring.io/spring-security/reference/7.0/servlet/authentication/passwords/dao-authentication-provider.html)

| 이름 | 종류와 역할 |
|---|---|
| `Authentication` | 인증 정보를 나타내는 인터페이스. 인증 전에는 제출한 자격 증명을, 인증 후에는 확인된 주체와 권한을 담을 수 있다. |
| `UsernamePasswordAuthenticationToken` | 아이디와 비밀번호를 기반으로 한 `Authentication` 구현 객체. 요청 헤더로 보내는 JWT 문자열과 쓰이는 위치가 다르다. |
| `AuthenticationManager` | `authenticate(...)`를 받는 인터페이스. 대표 구현인 `ProviderManager`가 요청을 처리할 수 있는 Provider에 검증을 맡긴다. |
| `AuthenticationProvider` | 특정 방식의 인증을 수행하는 인터페이스. |
| `DaoAuthenticationProvider` | `UserDetailsService`로 회원을 불러오고 `PasswordEncoder`로 비밀번호를 확인하는 구현 클래스. |
| `UserDetailsService` | `loadUserByUsername(String username)`으로 사용자 정보를 찾아주는 인터페이스. |
| `UserDetails` | Security가 사용자 이름, 저장된 해시, 권한, 계정 상태를 읽는 규격. 수업은 Spring Security의 `User` 구현 객체를 반환한다. |
| `GrantedAuthority` | `ROLE_USER`, `ROLE_ADMIN`처럼 접근 판단에 쓰는 권한 하나를 표현한다. |
| `SecurityContext` / `SecurityContextHolder` | 현재 인증 결과를 담는 객체와 그 객체에 접근하는 진입점. |

수업의 `CustomUserDetailService`는 `implements UserDetailsService`를 선언한 구체 클래스다. 이 클래스에서 `loadUserByUsername`을 `@Override`해 실제 조회 방법을 작성한다. `username` 변수에는 수업의 `userId`가 들어가므로 `findByUserId(username)`으로 찾는다. 조회 담당은 저장된 해시를 넘기고, 비밀번호의 일치 여부는 Provider가 판단한다. `.roles(user.getRole().name())`은 `USER`를 `ROLE_USER` 권한으로 만든다. `.disabled(!user.isEnabled())`는 회원의 활성 상태를 Security에 전달한다. [Spring Security 인증 구성 요소](https://docs.spring.io/spring-security/reference/7.0/servlet/authentication/architecture.html)

## 4. 필터 체인을 거친다는 말의 뜻

서블릿 요청은 `DispatcherServlet`이 컨트롤러를 호출하기 전에 필터를 순서대로 지난다. 필터는 요청을 다음 단계로 넘기거나 그 자리에서 응답을 끝낼 수 있다. `SecurityFilterChain`에는 Spring Security가 이 요청에 적용할 필터들이 들어 있다. 수업의 `SecurityConfig`는 `HttpSecurity`로 설정을 조립하고 `http.build()`로 체인을 만든다.

| `chap01`의 설정 | 요청에 적용되는 규칙 |
|---|---|
| `.requestMatchers(HttpMethod.POST, "/api/auth/signup").permitAll()` | 회원가입 POST는 인증을 요구하지 않는다. 입력값 검증과 중복 확인은 그대로 수행한다. |
| `.requestMatchers("/api/admin/**").hasRole("ADMIN")` | 관리자 경로에는 기본 접두어가 붙은 `ROLE_ADMIN` 권한을 요구한다. |
| `.anyRequest().authenticated()` | 위에 해당하지 않는 요청은 인증을 요구한다. `/api/users/me`가 여기에 해당한다. |
| `.httpBasic(Customizer.withDefaults())` | Basic 헤더를 처리하도록 설정한다. |
| `.authenticationProvider(authenticationProvider)` | 아이디·비밀번호를 검사할 Provider를 연결한다. |
| `SessionCreationPolicy.STATELESS` | 인증 결과를 현재 요청에서 사용한다. 다음 요청의 인증은 그 요청의 자격 증명으로 다시 수행한다. |

`authorizeHttpRequests`는 요청과 **먼저 일치한 규칙**을 적용한다. 그래서 구체적인 회원가입·관리자 조건 뒤에 `anyRequest()`를 둔다. [Spring Security HTTP 요청 인가](https://docs.spring.io/spring-security/reference/7.0/servlet/authorization/authorize-http-requests.html)

### 필터 PDF의 그림과 현재 코드를 연결하기

| PDF에 나온 필터 또는 역할 | 현재 수업에서 읽는 법 |
|---|---|
| `SecurityContextPersistenceFilter` | 보안 컨텍스트를 읽고 저장하는 흐름을 설명한다. 최신 구성에서 컨텍스트를 읽는 `SecurityContextHolderFilter`와 세션 저장 여부는 구분한다. |
| `UsernamePasswordAuthenticationFilter`와 기본 로그인 페이지 필터 | 폼 로그인 설정에서 쓰인다. `chap01`의 자격 증명은 `BasicAuthenticationFilter`가 읽는다. |
| `AnonymousAuthenticationFilter` | 인증된 주체가 없는 경우 내부적으로 익명 주체를 표현할 수 있다. 보호 경로의 인증 요구는 계속 적용된다. |
| `ExceptionTranslationFilter` | 뒤에서 발생한 인증·접근 거부 예외를 인증 진입점이나 접근 거부 처리기로 연결한다. |
| `FilterSecurityInterceptor` | PDF의 인가 담당 필터다. 수업 코드의 `authorizeHttpRequests` 구성은 `AuthorizationFilter`가 처리한다. |

PDF의 목록은 여러 인증 기능을 포함한 구성도다. 실제로 들어가는 필터는 Basic, 폼 로그인, Bearer, 세션 정책 등 설정에 따라 달라진다. [필터 PDF 1~8쪽](<../../../course-materials/26-11/11_security-main/02. Security Filter.pdf#page=1>) · [SecurityContext 보관 방식](https://docs.spring.io/spring-security/reference/7.0/servlet/authentication/persistence.html)

### 개요 PDF에서 가져온 보안 설정 맥락

수업 예제는 `csrf(...::disable)`로 CSRF 검사를 끈다. CSRF 설정을 판단할 때는 브라우저가 쿠키나 Basic 자격 증명처럼 인증 정보를 자동으로 붙이는지 살핀다. `STATELESS`는 세션 정책이고, CSRF 설정은 요청 위조를 다루는 별도 정책이다. [Spring Security CSRF 문서](https://docs.spring.io/spring-security/reference/7.0/servlet/exploits/csrf.html)

개요 PDF는 CSRF 외에 XSS, 세션 관리, 보안 헤더도 소개한다. XSS 대응에는 출력 위치에 맞는 이스케이프가 필요하고 CSP 같은 응답 정책을 함께 적용할 수 있다. 수업 프로젝트의 `build.gradle`에는 Java 21과 Spring Boot 4.0.9가 지정돼 있다. 기본 장은 `spring-boot-starter-security`를 사용하고, JWT 장은 Resource Server 스타터를 함께 사용한다. [Security 개요 PDF 2~9쪽](<../../../course-materials/26-11/11_security-main/00. Security 개요 및 환경 설정.pdf#page=2>) · [Spring Security 보안 헤더](https://docs.spring.io/spring-security/reference/7.0/features/exploits/headers.html)

## 5. MockMvc 테스트가 확인하는 내용

| 코드 | 역할 |
|---|---|
| `@SpringBootTest` | 애플리케이션 테스트 컨텍스트를 구성한다. |
| `@AutoConfigureMockMvc` | 테스트에서 사용할 `MockMvc`를 구성한다. 이 예제는 보안 필터도 거친다. |
| `@ActiveProfiles("test")` | `test` 프로필을 활성화한다. 수업에서는 `application-test.yml`의 H2 설정이 적용된다. |
| `testRuntimeOnly 'com.h2database:h2'` | 테스트 실행 시 인메모리 H2 DB를 사용할 수 있게 한다. |
| `perform(...)` | 테스트 요청을 실행한다. |
| `andExpect(...)` | 실제 테스트 응답이 지정한 조건을 만족하는지 단언한다. |

```java
mockMvc.perform(get("/api/users/me"))
        .andExpect(status().isUnauthorized());
```

이 코드는 인증 헤더 없이 내 정보 조회를 요청하고 응답이 `401`인지 검사한다. MockMvc는 HTTP 서버 포트를 열지 않고 Spring MVC 요청 처리를 테스트한다. [MockMvc 공식 문서](https://docs.spring.io/spring-framework/reference/testing/mockmvc.html)

`chap01`의 `SecurityFlowTests`는 가입 `201`과 응답에서의 비밀번호 제외, 저장된 해시와 원래 비밀번호의 일치 여부를 확인한다. 보호 경로에 자격 증명을 보내지 않으면 `401`, 올바른 Basic 자격 증명으로 내 정보를 조회하면 `200`, 일반 회원과 관리자 계정으로 관리자 경로를 요청하면 각각 `403`과 `200`을 기대한다.

## 6. JWT에서 액세스 토큰이 하는 일

**액세스 토큰**은 보호 API 요청에 제시하는 자격 증명이다. **JWT**는 그 토큰을 표현할 수 있는 형식이다. **Bearer**는 `Authorization` 헤더에서 토큰을 제시할 때 사용하는 인증 스킴이다. 유효한 Bearer 토큰을 가진 쪽이 토큰의 권한으로 요청할 수 있으므로 비밀번호처럼 다룬다. [Bearer 토큰 표준](https://www.rfc-editor.org/rfc/rfc6750.html) · [JWT 표준](https://www.rfc-editor.org/rfc/rfc7519.html)

```http
Authorization: Bearer <header>.<payload>.<signature>
```

위 세 부분 구조는 수업의 **서명된 JWT**에 해당한다. `Bearer`와 토큰은 공백으로 나누고, 토큰 내부의 세 부분은 마침표로 나눈다. 구현에서는 Spring Security의 필터와 JWT 라이브러리가 각각을 읽는다.

| 부분 | 들어가는 값 |
|---|---|
| 헤더 | 서명 또는 MAC 알고리즘 정보. 수업은 `HS256`을 쓴다. |
| 페이로드 | 클레임이라고 부르는 데이터. 예를 들어 `sub`는 사용자 식별자, `iat`는 발급 시각, `exp`는 만료 시각이다. `authorities`는 수업이 추가한 권한 목록이다. |
| 서명 부분 | 수업의 HS256에서는 인코딩된 헤더와 페이로드를 공유 비밀키로 계산한 HMAC 검증값이다. |

JWT 헤더와 페이로드는 Base64URL로 표현되므로 읽을 수 있다. 수업 코드의 클레임에는 사용자 식별자, 권한, 발급·만료 시각 등이 들어간다. 비밀번호는 클레임에서 제외한다. `accessToken` 필드에는 세 부분을 합친 **JWT 전체 문자열**이 들어간다.

### 발급용 로그인 요청과 보호 API 요청은 별개다

```text
1. POST /api/auth/login + 아이디·비밀번호 JSON
   → AuthController가 LoginRequest를 받음
   → AuthService가 AuthenticationManager에 비밀번호 인증을 요청
   → 인증 성공 결과의 사용자 이름과 권한으로 JwtService가 클레임 구성
   → JwtEncoder가 JWT 발급 → TokenResponse 반환

2. GET /api/users/me + Authorization: Bearer <JWT>
   → BearerTokenAuthenticationFilter가 헤더에서 토큰 추출
   → JwtDecoder가 HMAC과 만료 시각 등 유효성 확인
   → JwtAuthenticationConverter가 인증 객체 구성
   → SecurityContext에 저장 → URL 권한 검사 → 컨트롤러 실행
```

첫 번째 흐름은 `chap03`의 발급 코드로 확인했다. `TokenResponse`의 `tokenType`은 `Bearer`, `accessToken`은 발급된 문자열, `expiresIn`은 유효 기간을 초로 나타낸 값이다. `expiration-seconds: 3600`은 발급 후 1시간을 뜻하고, `exp`에는 발급 시각에 이 시간을 더한 만료 시각이 들어간다.

두 번째 흐름은 `chap02`가 연결하려는 Resource Server 기능이다. `chap02`의 설정에는 HTTP Basic과 JWT가 모두 있고, `chap03`은 보호 API에서 Bearer 인증을 사용한다. `JwtAuthenticationConverter`는 검증된 토큰의 `sub`를 주체 이름으로 사용한다. 수업의 `JwtGrantedAuthoritiesConverter`는 `authorities`를 읽고 접두어를 빈 문자열로 설정한다. 토큰에 들어 있는 `ROLE_ADMIN`을 그대로 사용해야 `hasRole("ADMIN")`과 연결되기 때문이다. `/api/users/me`는 이 인증 결과에서 `getName()`을 읽어 회원 정보를 조회한다. [Spring Security JWT 검증 흐름](https://docs.spring.io/spring-security/reference/7.0/servlet/oauth2/resource-server/jwt.html)

### `record` 선언의 괄호는 무엇인가?

```java
public record LoginRequest(
        @NotBlank String userId,
        @NotBlank String password
) {}
```

`record` 이름 뒤의 괄호는 **데이터 구성 요소를 선언하는 헤더**다. Java는 이 선언에서 `private final` 필드, 생성자, `userId()`와 `password()` 접근 메서드를 만든다. 값은 생성할 때 전달하고, 나중에는 접근 메서드로 읽는다. `@NotBlank`는 `@Valid`를 사용한 요청 검증에서 `null`, 빈 문자열, 공백만 있는 문자열을 거부한다. `UserResponse`와 `TokenResponse`도 같은 방식으로 구성 요소를 선언한다. [Java 21 record 문서](https://docs.oracle.com/en/java/javase/21/language/records.html)

### `SecretKeySpec`, `JwtEncoder`, `JwtDecoder`

```java
byte[] keyBytes = Base64.getDecoder().decode(secret);
return new SecretKeySpec(keyBytes, "HmacSHA256");
```

1. `application.yml`의 `security.jwt.secret`에는 Base64 문자열로 표현한 키를 설정한다. `${JWT_SECRET:…}`는 환경 변수 값을 읽고, 값이 없으면 뒤의 기본값을 사용하는 설정 표현이다.
2. `Base64.getDecoder().decode(secret)`이 설정 문자열을 원래의 키 바이트 배열로 바꾼다.
3. `SecretKeySpec`은 주어진 바이트 배열과 알고리즘 이름을 묶어서 `SecretKey`로 사용할 객체를 만든다.
4. `JwtEncoder`는 이 키로 토큰에 HMAC을 붙이고, `JwtDecoder`는 같은 키와 `HS256` 설정으로 받은 토큰을 검증한다.

여기서 Base64는 설정의 키 바이트를 문자열로 보관하는 표현 방식이다. 키의 비밀성은 키 값에 대한 접근 관리에 달려 있다. `SecretKeySpec`의 역할은 이미 준비된 키 바이트를 Java 암호 API에 넘길 객체로 감싸는 것이다. [Java 21 SecretKeySpec 문서](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/javax/crypto/spec/SecretKeySpec.html)

## 7. 수업 소스에서 확인한 차이와 복습

`chap02`의 `api-test.http`는 `POST /api/auth/login`을 요청하지만, `SecurityConfig`의 공개 경로에는 `/apit/auth/login`으로 적혀 있고 `AuthController`에는 회원가입만 있다. `SecurityConfig`가 참조하는 `jwtAuthenticationConverter`도 해당 클래스의 필드나 메서드 매개변수로 선언돼 있지 않다. 별도 설정의 Bean을 체인에서 쓰려면 참조가 연결돼야 한다. `chap03`의 `SecurityConfig`에는 올바른 로그인 경로와 `JwtAuthenticationConverter` 매개변수가 있고, `AuthController`, `AuthService`, `JwtService`에 로그인과 발급 흐름이 이어져 있다.

- [ ] `chap01`에서 `encode`가 호출되는 가입 코드와 `matches`로 검증하는 Provider의 역할을 설명해 보기.
- [ ] `SecurityFlowTests`에서 무인증 `401`과 일반 회원의 관리자 접근 `403`을 나란히 읽기.
- [ ] `chap03`에서 로그인으로 토큰을 **발급하는 요청**과 `Bearer`로 토큰을 **제시하는 요청**을 하나씩 찾아보기.
- [ ] `UserResponse.from(...)`이 고르는 회원 정보와 JWT `authorities`에 들어가는 권한 목록을 구분해 보기.

## 수업 자료

- [261110.txt 메모](../../../course-materials/26-11/memo/261110.txt)
- [Security 개요 및 환경 설정 PDF](<../../../course-materials/26-11/11_security-main/00. Security 개요 및 환경 설정.pdf>)
- [SpringSecurity architecture PDF](<../../../course-materials/26-11/11_security-main/01. SpringSecurity architecture.pdf>)
- [Security Filter PDF](<../../../course-materials/26-11/11_security-main/02. Security Filter.pdf>)
- [chap01-security-basic](../../../course-materials/26-11/11_security-main/chap01-security-basic/) · [chap02-jwt-authentication](../../../course-materials/26-11/11_security-main/chap02-jwt-authentication/) · [chap03-refresh-token](../../../course-materials/26-11/11_security-main/chap03-refresh-token/)
