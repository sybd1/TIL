# 2026-10-30 TIL — HTTP, REST API, 입력값 검증, Swagger

## 오늘 배운 내용

오늘의 핵심은 **클라이언트가 보낸 요청을 Spring이 어떻게 읽고, 검사하고, 응답하는가**다. HTTP, JSON, REST, Validation, Swagger는 각각 따로 외울 주제가 아니라 이 흐름을 설명하는 도구다.

| 개념 | 해결하는 문제 |
|---|---|
| HTTP | 클라이언트와 서버가 어떤 규칙으로 통신할까? |
| JSON | 주고받을 데이터를 어떤 형식으로 표현할까? |
| REST API 설계 | 어떤 주소와 메서드로 어떤 자원을 다룰까? |
| `ResponseEntity` | 응답 상태 코드, 헤더, 본문을 어떻게 정할까? |
| Validation | 요청 데이터가 정해진 조건에 맞는지 어떻게 검사할까? |
| 예외 처리 | 실패했을 때 클라이언트에 어떤 정보를 보낼까? |
| OpenAPI / Swagger UI | API 사용법을 어떻게 공유하고 직접 호출해 볼까? |


## 1. 전체 흐름부터 이해하기

```text
React에서 회원 등록 버튼 클릭
  → POST 요청 + JSON 본문 전송
  → Spring MVC가 요청에 맞는 컨트롤러 메서드를 찾음
  → @RequestBody: JSON을 Java DTO로 변환
  → @Valid: DTO에 선언한 조건을 검사
      ├─ 성공: 컨트롤러 메서드 실행 → 처리 결과 응답
      └─ 실패: 예외 발생 → 예외 처리기가 오류 응답
  → React가 상태 코드와 응답 본문을 확인
  → 성공 화면 또는 오류 메시지 표시
```

실제 서비스에서는 컨트롤러가 보통 Service와 Repository를 거쳐 DB에 접근한다. **오늘 수업의 회원 관리 예제는 DB 대신 메모리의 `List`를 사용한다.** 서버를 다시 시작하면 목록은 초기화된다.

Validation 예제의 등록 메서드는 입력 검증 후 `201 Created`를 반환하는 연습용 코드이며, 실제 회원 저장은 구현되어 있지 않다.

## 2. HTTP — 요청과 응답을 주고받는 규칙

HTTP는 클라이언트와 서버가 요청과 응답을 주고받는 애플리케이션 계층의 프로토콜이다. 웹페이지, 이미지, API 데이터 등을 전달하는 데 사용한다. HTTPS는 HTTP 통신을 TLS로 보호하는 방식이다.

### 요청과 응답의 구성

아래는 구조를 이해하기 위한 HTTP/1.1 형식의 예시다. 실제 전송에 필요한 일부 헤더는 생략했다.

```http
POST /api/v1/response/users HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Accept: application/json

{
  "id": "user04",
  "pwd": "pass04",
  "name": "신규회원",
  "status": "active"
}
```

| 요청의 부분 | 의미 |
|---|---|
| `POST` | 서버에 요청하는 동작 |
| `/api/v1/response/users` | 요청 대상 경로 |
| Headers | 본문 형식, 인증 정보 등 부가 정보 |
| 빈 줄 다음의 Body | 실제로 보내는 데이터 |

**`Content-Type: application/json`은 본문을 만들어 넣는 명령이 아니다.** 이미 보내는 본문의 형식이 JSON임을 알려 주는 헤더다. `Accept`는 클라이언트가 받고 싶은 응답 형식을 표현한다.

인증 정보를 보내는 헤더의 한 예는 `Authorization: Bearer <토큰>`이다. 토큰을 발급받고 서버가 검증하는 과정은 별도로 구현해야 하며, 헤더가 있다고 인증이 자동으로 완성되지는 않는다.

서버는 다음과 같이 응답할 수 있다.

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "httpStatus": 200,
  "message": "조회 성공",
  "results": {
    "users": []
  }
}
```

- **상태 코드**: 요청 처리 결과를 나타낸다. 예: `200`, `404`.
- **응답 헤더**: 본문 형식이나 새 리소스의 위치 같은 부가 정보를 담는다.
- **응답 본문**: 조회 데이터나 오류 설명 등을 담는다. 항상 있는 것은 아니다.

본문의 `"httpStatus": 200`은 수업에서 정한 JSON 필드다. **실제 HTTP 상태 코드는 응답 상태로 따로 지정해야 한다.** JSON에 `400`을 써 놓아도 실제 응답 상태를 `200`으로 보내면 HTTP 응답은 `200`이다. [HTTP 의미와 메시지 구성](https://www.rfc-editor.org/rfc/rfc9110.html)

### 무상태성과 연결 유지는 다른 이야기다

메모의 “요청이 끝나면 클라이언트 정보를 유지하지 않는다”는 설명은 다음처럼 나누어 이해한다.

| 구분 | 정확히 이해할 내용 |
|---|---|
| 무상태성, Stateless | HTTP 자체가 이전 요청의 로그인 상태 등을 자동으로 기억해 주지 않는다. |
| 연결 유지 | 여러 요청에서 같은 네트워크 연결을 재사용할 수 있다. 로그인 상태 기억과는 별개다. |

서버는 DB에 회원 정보를 저장할 수 있고, 세션 저장소에 로그인 정보를 보관할 수도 있다. HTTP의 무상태성이 “서버는 데이터를 저장할 수 없다”는 뜻은 아니다. 쿠키는 클라이언트가 값을 저장했다가 요청에 보내는 수단이고, 세션과 토큰은 인증 상태를 다루는 방식에 사용된다. [HTTP의 무상태성](https://www.rfc-editor.org/rfc/rfc9110.html#section-3.3)

“HTTP는 텍스트 기반”이라는 말도 범위를 구분해야 한다. HTTP/1.1의 시작줄과 헤더는 텍스트 형식이지만 본문에는 이미지 같은 바이너리도 담을 수 있다. HTTP/2는 바이너리 프레임을 사용한다. [HTTP/2 프레임 구조](https://www.rfc-editor.org/rfc/rfc9113.html#section-4)

## 3. JSON — 데이터를 표현하는 형식

JSON은 JavaScript 객체 표기법에서 유래한 **언어에 독립적인 텍스트 데이터 교환 형식**이다. JavaScript 전용 객체도 아니고, 실행할 코드도 아니다. Java, Python 등에서도 읽고 쓸 수 있다.

```json
{
  "name": "설윤아",
  "age": 23,
  "active": true,
  "roles": ["USER", "WRITER"],
  "profile": null
}
```

- 객체는 `{}`, 배열은 `[]`로 표현한다.
- 객체의 키와 문자열 값에는 큰따옴표를 쓴다.
- 값으로 문자열, 숫자, 불리언, 객체, 배열, `null`을 사용할 수 있다.
- 숫자와 `true`, `false`, `null`에는 따옴표를 붙이지 않는다.
- 표준 JSON에는 주석과 마지막 항목 뒤의 쉼표를 넣지 않는다.

XML도 JSON도 텍스트 형식이다. 따라서 “과거에는 문자열로 응답했고, 지금은 JSON으로 응답한다”보다는 **“여러 데이터 표현 방식 중 JSON을 사용하는 경우가 많다”**고 이해한다. JSON은 XML을 완전히 대체한 유일한 형식이 아니다. [JSON 표준](https://www.rfc-editor.org/rfc/rfc8259.html)

## 4. REST API — 자원을 중심으로 설계하기

API는 프로그램끼리 기능과 데이터를 주고받는 인터페이스다. REST는 자원 식별, 일관된 인터페이스, 무상태성 등 여러 제약을 가진 아키텍처 스타일이다. 오늘은 그중 **자원과 HTTP 메서드를 연결하는 설계**를 먼저 배웠다.

JSON을 반환하거나 URL에 복수 명사를 쓴다는 사실만으로 REST의 모든 조건을 만족하는 것은 아니다. 복수형 URL, `/api/v1` 버전 경로 등은 팀이 일관되게 정하는 설계 관례다. [REST의 제약 조건](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)

### URL은 대상, HTTP 메서드는 동작

회원이라는 자원을 예로 들면 다음과 같이 설계할 수 있다.

| 하고 싶은 일 | 메서드와 경로 | Spring 매핑 |
|---|---|---|
| 회원 목록 조회 | `GET /api/v1/users` | `@GetMapping` |
| 회원 한 명 조회 | `GET /api/v1/users/1` | `@GetMapping("/{userNo}")` |
| 회원 등록 | `POST /api/v1/users` | `@PostMapping` |
| 회원 정보 전체 교체 | `PUT /api/v1/users/1` | `@PutMapping("/{userNo}")` |
| 회원 정보 일부 수정 | `PATCH /api/v1/users/1` | `@PatchMapping("/{userNo}")` |
| 회원 삭제 | `DELETE /api/v1/users/1` | `@DeleteMapping("/{userNo}")` |

`/getUsers`, `/deleteUser/1`처럼 동작을 경로에 반복해서 넣기보다는 HTTP 메서드가 동작을 표현하게 한다. 메모의 `@PUT`, `@DELETE`에 해당하는 Spring 애너테이션 이름은 **`@PutMapping`, `@DeleteMapping`**이다.

### PUT과 PATCH의 차이

`PUT`은 대상 자원의 표현을 교체하는 의미다. API가 정한 수정 가능한 전체 정보를 보내는 형태로 설계한다. 다만 DB의 모든 열을 보내야 한다는 뜻은 아니다. 번호, 가입일처럼 서버가 관리하는 값은 요청 DTO에서 제외할 수 있다.

수업의 `PUT` 코드는 `id`, `name`, `status`를 요청 DTO 값으로 각각 덮어쓴다. 따라서 `name`을 빼고 보내면 기존 이름을 보존하는 것이 아니라 `null`로 설정할 수 있다. **`@PutMapping`이 필수 필드를 자동으로 검사하지는 않는다.** 필요한 검증을 따로 선언해야 한다.

`PATCH`는 일부 변경을 적용하는 의미다. 예를 들어 이름만 바꾸는 API를 설계할 수 있다. 이때 누락된 필드와 명시적으로 보낸 `null`을 어떻게 처리할지도 정해야 한다. **`@PatchMapping`만 붙인다고 부분 수정 로직이 자동으로 만들어지지는 않는다.** [PUT 의미](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.3.4), [PATCH 표준](https://www.rfc-editor.org/rfc/rfc5789.html)

### 중첩 리소스와 검색 조건

```text
GET /users/1/posts        → 1번 회원이 작성한 게시글 목록
GET /posts/10/comments    → 10번 게시글의 댓글 목록
GET /users?status=active  → 회원 목록 중 상태가 active인 회원 검색
```

중첩 경로는 자원의 소속 관계를 표현하는 데 쓴다. 검색·정렬·페이지 조건은 보통 쿼리 파라미터로 전달한다. 경로를 무조건 깊게 중첩하기보다 관계와 사용 목적에 맞게 정한다.

로그인은 예를 들어 `POST /auth/login` 또는 로그인 세션 생성을 뜻하는 `POST /sessions`로 설계할 수 있다. 하나의 정답 URL이 강제되는 것은 아니며, 인증 방식과 팀의 API 계약에 따라 정한다. 아래 회원 수업 예제에는 실제 로그인 기능이 없다.

## 5. URI와 URL은 무엇이 다를까?

| 용어 | 의미 |
|---|---|
| URI, Uniform Resource Identifier | 자원을 식별하는 표현 |
| URL, Uniform Resource Locator | 자원의 위치와 접근 방식을 나타내는 URI |

예를 들어 `http://localhost:8080/api/v1/users/1`은 URL이면서 URI다. `/api/v1/users/1`은 이 주소에서 경로에 해당하며, 상대 URI 참조로도 사용할 수 있다.

수업의 `URI.create("/api/v1/swagger/users/4")`는 문자열을 Java의 `URI` 객체로 만든다. 이것만으로 HTTP 요청을 보내거나 DB에 회원을 저장하지는 않는다. [URI와 URL의 관계](https://www.rfc-editor.org/rfc/rfc3986.html#section-1.1.3)

## 6. Spring이 JSON을 받고 반환하는 방법

### `@RestController`는 무엇인가?

`@RestController`는 `@Controller`와 `@ResponseBody`의 의미를 합친 애너테이션이다. 컨트롤러의 반환값을 뷰 이름으로 해석하는 대신 응답 본문으로 처리하게 한다.

```java
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @GetMapping("/sample")
    public Map<String, Object> sample() {
        return Map.of("name", "설윤아", "age", 23);
    }
}
```

위는 **보충 예시**다. JSON 변환 환경에서 호출하면 Java의 `Map`이 JSON 응답 본문으로 직렬화된다. 실제 변환은 Spring MVC의 `HttpMessageConverter`가 담당하며 JSON 처리에는 Jackson 등이 사용된다. `@RestController`가 직접 JSON 문자열을 만드는 것은 아니다. 반환 타입과 설정에 따라 문자열이나 다른 형식으로 응답할 수도 있다. [응답 본문 변환](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/responsebody.html)

### 요청값을 받는 세 가지 위치

| 애너테이션 | 읽는 위치 | 예시 |
|---|---|---|
| `@PathVariable` | URL 경로의 변수 | `/users/1`의 `1` |
| `@RequestParam` | 쿼리 파라미터나 폼 데이터 | `?name=고릴라`의 `name` |
| `@RequestBody` | 요청 본문 | JSON으로 보낸 회원 등록 정보 |

`@RequestBody UserRequestDTO request`는 JSON을 읽어 `UserRequestDTO` 객체로 변환하라는 뜻이다. Java 객체를 JSON으로 만드는 **직렬화**와 반대 방향인 **역직렬화**다. [요청 본문 변환](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestbody.html)

## 7. `ResponseEntity`와 상태 코드

`ResponseEntity<T>`는 HTTP 응답의 **상태 코드, 헤더, 본문**을 정할 때 사용한다. `<T>`는 본문에 담을 Java 데이터의 타입이다. `ResponseEntity<Void>`는 본문을 담지 않는 응답에 사용할 수 있다.

```java
// 200 OK + 본문
return ResponseEntity.ok(responseMessage);

// 201 Created + Location 헤더, 본문 없음
return ResponseEntity
        .created(URI.create("/api/v1/swagger/users/" + newUser.getNo()))
        .build();

// 204 No Content, 본문 없음
return ResponseEntity.noContent().build();
```

- `created(...)`: 상태를 `201`로 정하고 전달한 URI를 `Location` 헤더에 넣는다.
- `noContent()`: 상태를 `204`로 정한다.
- `body(...)`: 본문을 넣어 응답을 완성한다.
- `build()`: 본문 없이 응답을 완성한다.

`created(...)`는 새 리소스를 생성하는 코드가 아니다. **생성 처리 뒤에 보낼 응답을 구성하는 코드**다. [ResponseEntity 공식 설명](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/responseentity.html)

### 자주 쓰는 상태 코드

| 분류 / 코드 | 의미와 사용 예 |
|---|---|
| `1xx` | 요청 처리 중의 정보성 응답 |
| `200 OK` | 요청 성공, 조회 결과 등을 반환 |
| `201 Created` | 새 리소스 생성 성공 |
| `204 No Content` | 처리 성공, 응답 본문 없음 |
| `3xx` | 리다이렉트 등 추가 동작을 안내하는 응답 |
| `400 Bad Request` | 잘못된 요청, 입력값 검증 실패 등 |
| `401 Unauthorized` | 유효한 인증 정보가 없거나 인증 실패 |
| `403 Forbidden` | 요청을 이해했지만 접근을 거부함. 권한 부족이 대표적 |
| `404 Not Found` | 요청한 자원을 찾을 수 없음 |
| `500 Internal Server Error` | 서버에서 예상하지 못한 오류 발생 |

`401`은 “누구인지 확인할 유효한 인증 정보가 필요하다”, `403`은 “이 요청을 허용하지 않는다”로 구분한다. `403`이 언제나 로그인 완료를 뜻하는 것은 아니다. `500`도 개발자 실수만의 결과는 아니며 DB나 외부 시스템 문제 등 여러 원인이 있을 수 있다. [HTTP 상태 코드](https://www.rfc-editor.org/rfc/rfc9110.html#section-15)

**`204` 응답에는 JSON 본문이 없다.** React에서 모든 응답에 무조건 `response.json()`을 호출하면 빈 본문을 JSON으로 해석하다가 오류가 날 수 있다. 상태 코드와 API 계약에 맞게 처리한다.

## 8. `required = false`는 무슨 뜻인가?

수업의 회원 검색 메서드는 다음과 같이 선택적인 검색 조건을 받는다.

```java
@RequestParam(required = false) String name,
@RequestParam(required = false) String status
```

`required`는 **해당 요청 파라미터가 반드시 있어야 하는지**를 정하는 속성이다. 기본값은 `true`다. `false`이면 그 파라미터를 생략할 수 있고, 위 `String` 매개변수는 생략 시 `null`을 받는다.

| 요청 예시 | `name` | `status` | 수업 코드의 처리 |
|---|---|---|---|
| `/users` | `null` | `null` | 전체 목록 조회 |
| `/users?status=active` | `null` | `"active"` | 상태로 검색 |
| `/users?name=고릴라` | `"고릴라"` | `null` | 이름 포함 여부로 검색 |

수업 코드는 아래처럼 **조건이 전달됐을 때만 필터를 적용**한다.

```java
if (status != null && !user.getStatus().equals(status)) {
    return false;
}
```

`required = false`가 필터링까지 해 주는 것은 아니다. 파라미터 생략을 허용할 뿐이며 실제 검색 조건은 위 코드가 적용한다.

또한 `?name=`처럼 빈 문자열을 보낸 것과 파라미터 자체를 생략한 것은 다르다. `required`는 “공백이 아닌 올바른 내용인지”까지 검사하지 않는다. 선택적인 숫자 값을 받을 때는 `null`을 담을 수 없는 `int` 대신 `Integer`나 기본값 설정 등을 고려한다. [@RequestParam 공식 설명](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestparam.html)

## 9. Validation — 요청 DTO의 값 검사하기

### 규칙을 적는 곳과 검사를 시작하는 곳

DTO 필드에는 **조건**을 선언하고, 컨트롤러 매개변수의 `@Valid`로 **그 객체에 선언한 조건을 검사하도록 요청**한다.

```java
// 수업 UserDTO의 일부
@NotBlank(message = "아이디는 반드시 입력되어야 합니다.")
private String id;

@NotBlank(message = "이름은 반드시 입력되어야 합니다.")
@Size(max = 10, message = "이름은 길이 10을 초과할 수 없습니다.")
private String name;
```

```java
// 수업 컨트롤러
@PostMapping("/users")
public ResponseEntity<Void> registUser(@Valid @RequestBody UserDTO user) {
    return ResponseEntity
            .created(URI.create("/api/v1/validation/users/1"))
            .build();
}
```

여기서 `@RequestBody`는 JSON을 DTO로 읽고, `@Valid`는 읽은 DTO의 검증 조건을 적용한다. **`@Valid` 자체가 필수 입력이나 길이 제한을 정하는 것은 아니다.** 검증할 조건은 DTO의 `@NotBlank`, `@Size` 등에 있다.

이 수업처럼 `@Valid @RequestBody`를 사용하고 `BindingResult`로 직접 오류를 받지 않는 경우, 일반적인 DTO 검증 실패는 `MethodArgumentNotValidException`을 발생시키고 기본적으로 `400` 응답으로 처리된다. 컨트롤러 메서드 본문이 실행되기 전에 검사가 이루어진다. [Spring의 요청 본문 검증](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestbody.html)

### 수업에 나온 검증 애너테이션

| 애너테이션 | 의미 | 주의할 점 |
|---|---|---|
| `@NotNull` | `null` 금지 | 문자열의 `""`, `"   "`까지 막지는 않음 |
| `@NotBlank` | `null`, 빈 문자열, 공백 문자만 있는 문자열 금지 | 문자열에 사용 |
| `@Size(max = 10)` | 문자열 길이 등의 최대값 제한 | `null`은 허용하므로 필수 조건과 조합 |
| `@Past` | 과거 날짜인지 확인 | 필수 값이면 `@NotNull`도 함께 사용 |

예를 들어 이름이 `"   "`이면 `@NotBlank`에 실패한다. 이름이 11글자라면 `@Size(max = 10)`에 실패한다. `@NotBlank`는 공백을 자동으로 삭제하거나 올바른 값으로 바꿔 주는 기능이 아니다. [Jakarta Validation 제약 조건](https://jakarta.ee/specifications/platform/11/apidocs/jakarta/validation/constraints/package-summary.html)

수업에서는 `jakarta.validation.Valid`와 `jakarta.validation.constraints.*`를 사용하며, Gradle에 `spring-boot-starter-validation` 의존성을 추가했다. **입력 형식 검증과 “이미 가입된 아이디인가?” 같은 DB 조회가 필요한 업무 규칙 검사는 별개**로 생각한다.

## 10. 검증 실패를 일관된 오류 응답으로 바꾸기

검증은 “잘못된 값인지 판단”하는 역할이고, 예외 처리는 “실패를 어떤 상태 코드와 데이터로 알려 줄지 결정”하는 역할이다.

```text
name = "   "인 요청
  → @NotBlank 조건 위반
  → MethodArgumentNotValidException
  → @ExceptionHandler가 예외 처리
  → HTTP 400 + ErrorResponse JSON
  → React가 오류 내용을 화면에 표시
```

| 애너테이션 | 역할 |
|---|---|
| `@RestControllerAdvice` | 여러 컨트롤러에서 발생한 예외를 공통으로 처리하고 응답 본문을 반환할 수 있게 함 |
| `@ExceptionHandler(예외클래스.class)` | 지정한 예외를 처리할 메서드 연결 |

수업의 `ErrorResponse`는 `code`, `description`, `detail` 필드를 갖는다. 이름 공백 오류를 설명하는 응답 예시는 다음과 같다.

```json
{
  "code": "ERROR_CODE_00001",
  "description": "필수 값이 누락되었거나 공백입니다.",
  "detail": "이름은 반드시 입력되어야 합니다."
}
```

실제 HTTP 상태는 `400 Bad Request`이고, `ERROR_CODE_00001`은 애플리케이션이 정한 오류 코드다. HTTP 상태 코드와 별개의 값이다.

### 수업 예외 처리 코드 읽기

- `e.getBindingResult().getFieldError()`: 필드 검증 오류 중 하나를 가져온다.
- `getDefaultMessage()`: `@NotBlank(message = "...")` 등에 작성한 메시지를 가져온다.
- `getCode()`: `NotBlank`, `Size` 같은 검증 규칙 이름을 가져온다.
- `switch`: 규칙 이름을 기준으로 서비스의 오류 코드와 설명을 정한다.
- `ResponseEntity`의 상태를 `BAD_REQUEST`로 지정해 JSON과 함께 반환한다.

현재 수업 코드는 모든 필드 오류를 모아서 보내는 대신 **오류 하나를 골라 응답**한다. 여러 조건이 동시에 실패하면 어떤 메시지가 먼저 나올지에 의존하지 않는 것이 좋다. 모든 오류가 필요하면 `getFieldErrors()`를 순회해 목록을 만드는 방식으로 확장할 수 있다.

수업의 `UserNotFoundException`은 `404`로 처리한다. Swagger 예제의 예외 처리기는 `basePackageClasses = SwaggerTestController.class`로 적용 범위를 제한하며, 오류 본문도 `status`, `error`, `message` 구조다. **현재 두 예제의 오류 형식은 서로 다르다.** 실제 API를 협업용으로 만들 때는 공통 형식을 합의하면 프론트엔드가 처리하기 쉬워진다.

## 11. 의존성과 Lombok 정리

수업 `build.gradle` 기준은 Spring Boot `4.0.9`, Java `21`, springdoc `3.0.3`이다. 이 버전은 수업 프로젝트의 설정이며 최신 버전이라는 뜻은 아니다.

| 의존성 | 수업에서 하는 일 |
|---|---|
| `spring-boot-starter-webmvc` | Spring MVC 기반 웹 요청·응답 처리 환경 제공 |
| `spring-boot-starter-validation` | Jakarta Validation 기반의 입력값 검사 환경 제공 |
| `spring-boot-devtools` | 개발 중 재시작, LiveReload 등 편의 기능 제공 |
| Lombok | 생성자, getter, setter, `toString()` 등의 반복 코드 생성 |
| `springdoc-openapi-starter-webmvc-ui` | API 명세 자동 생성과 Swagger UI 제공 |

DevTools의 자동 재시작은 클래스패스 변경 감지를 기반으로 한다. 소스 파일을 저장했다고 언제나 즉시 반영되는 것은 아니며 IDE의 빌드 설정 등에 영향을 받는다. 브라우저 새로고침과 애플리케이션 재시작도 구분한다. [DevTools 공식 설명](https://docs.spring.io/spring-boot/reference/using/devtools.html)

### Lombok 애너테이션

| 애너테이션 | 생성하는 코드 |
|---|---|
| `@AllArgsConstructor` | 대상 필드들을 매개변수로 받는 생성자 |
| `@NoArgsConstructor` | 매개변수 없는 생성자 |
| `@Getter` | 필드 값을 읽는 getter |
| `@Setter` | 필드 값을 바꾸는 setter |
| `@ToString` | 객체 정보를 문자열로 표현하는 `toString()` |

`@ToString(exclude = "pwd")`는 `toString()` 출력에서 `pwd`를 제외한다는 뜻이다. **JSON 응답에서 비밀번호를 제외하거나 비밀번호를 안전하게 저장하는 기능은 아니다.** 수업의 응답 DTO에는 `pwd` 필드가 없으므로 요청 DTO와 응답 DTO를 구분하는 의도를 함께 이해한다. [Lombok의 출력 제외 기능](https://projectlombok.org/features/ToString)

비밀번호 저장은 별도 주제다. 보통 복호화를 전제로 하는 암호화가 아니라 BCrypt, Argon2 같은 비밀번호 해시 방식을 사용한다. `@ToString` 설정과 입력 검증만으로 비밀번호 저장이 안전해지는 것은 아니다. 수업의 비밀번호 최대 10글자 제한도 검증 연습용 조건으로 이해한다. [Spring Security의 비밀번호 저장](https://docs.spring.io/spring-security/reference/features/authentication/password-storage.html)

## 12. OpenAPI와 Swagger UI

API 명세는 프론트엔드와 백엔드가 **요청과 응답의 사용법을 합의하는 문서**다. 서로의 내부 코드를 전부 읽지 않아도 연동할 수 있게 해 준다.

| 이름 | 역할 |
|---|---|
| OpenAPI | HTTP API의 경로, 요청, 응답 등을 기술하는 표준 명세 |
| springdoc-openapi | Spring의 컨트롤러와 애너테이션 등을 읽어 OpenAPI 문서를 생성하는 라이브러리 |
| Swagger UI | 명세를 읽어 문서 화면과 API 호출 기능을 제공하는 도구 |

수업 의존성을 추가하고 서버를 실행하면 기본 설정에서 다음 경로로 확인할 수 있다. 포트나 경로 설정을 바꾸면 주소도 달라진다.

- 문서 UI: [Swagger UI 열기](http://localhost:8080/swagger-ui/index.html)
- OpenAPI JSON: [명세 JSON 열기](http://localhost:8080/v3/api-docs)

`Try it out`과 `Execute`로 실제 HTTP 요청을 보낼 수 있다. 등록·수정·삭제 요청은 실행 중인 서버의 데이터를 변경한다. 현재 회원 예제에서는 메모리 목록에 반영된다. [springdoc 공식 문서](https://springdoc.org/)

### 문서화 애너테이션의 역할

| 애너테이션 | 설명하는 대상 |
|---|---|
| `@Tag(name = "...", description = "...")` | 관련 API의 그룹과 설명 |
| `@Operation(summary = "...", description = "...")` | 개별 API 작업의 요약과 상세 설명 |
| `@Schema(description = "...", example = "...")` | DTO나 필드의 의미와 예시 값 |
| `@ApiResponse(responseCode = "404", description = "...")` | 특정 응답 상태에 대한 설명 |
| `@ApiResponses({...})` | 여러 `@ApiResponse`를 묶어서 선언 |

수업의 회원 조회 메서드는 `@ApiResponses`로 `200`과 `404` 응답을 설명한다. 이 설명은 **문서화**이며, `404`를 실제로 반환하려면 조회 실패 예외와 예외 처리 같은 실행 코드가 필요하다. `@Schema(example = "user04")`도 실제 데이터의 기본값을 설정하는 기능이 아니다.

```java
// 수업 Swagger 컨트롤러의 문서화 일부
@Operation(summary = "회원 목록 조회/검색",
        description = "전체 회원을 조회하거나 name, status query string으로 회원을 검색한다.")
@ApiResponses({
    @ApiResponse(responseCode = "200", description = "회원 목록 조회 성공")
})
```

수업의 `SwaggerConfig.openAPI()`에는 현재 `@Bean`이 없다. 별도 등록이 없다면 그 메서드가 반환하는 `OpenAPI` 객체가 설정 빈으로 자동 등록되지는 않으므로, 사용자 지정 제목 등이 반영되지 않을 때 확인할 부분이다. 기본 문서 UI 제공과 사용자 지정 `OpenAPI` 빈 등록은 별개의 이야기다. [OpenAPI 설정 예시](https://springdoc.org/#adding-api-information-and-security-documentation)

### 협업용 API 명세에 들어갈 내용

| 항목 | 정해야 하는 내용 |
|---|---|
| 요청 주소와 메서드 | 예: `POST /api/v1/users` |
| 인증 | 인증 필요 여부와 토큰·쿠키 전달 방식 |
| 요청 데이터 | 경로·쿼리·본문 필드의 이름, 타입, 필수 여부, 제약 |
| 성공 응답 | 상태 코드, 응답 헤더, 본문 유무와 JSON 구조 |
| 실패 응답 | 오류 조건, 상태 코드, 공통 오류 코드와 메시지 구조 |

문서에는 실제 API가 사용하는 필드명과 구조를 적어야 한다. 예를 들어 프론트엔드가 `userName`을 보내는데 백엔드가 `name`을 기대한다면, 서로의 의도가 같아도 그대로는 연결되지 않는다. [OpenAPI의 경로와 작업 정의](https://swagger.io/docs/specification/v3_0/paths-and-operations/)

## 13. 메모의 물음표에 대한 답

| 메모에 남긴 질문 | 복습용 답 |
|---|---|
| `Authorization: ?` | 토큰 등 인증 정보를 전달하는 요청 헤더. 서버의 검증 로직이 필요하다. |
| HTTP 응답의 Headers / Body는? | 헤더는 부가 정보, 본문은 데이터·오류 설명 등이다. 상태 코드도 별도로 있다. |
| `@RestController`는? | 컨트롤러의 반환값을 응답 본문으로 처리하도록 하는 애너테이션이다. |
| 중첩 리소스는? | `/posts/10/comments`처럼 자원의 관계를 경로로 표현하는 방식이다. |
| 에러 응답 설계는? | 상태 코드와 함께 어떤 오류 코드·설명·세부 정보를 보낼지 정하는 일이다. |
| URL과 URI는? | URI는 자원 식별 표현, URL은 위치와 접근 방식을 나타내는 URI다. |
| `@Valid`는? | DTO에 선언한 검증 조건을 적용하도록 요청한다. |
| 실패 시 일관된 처리는 왜? | 클라이언트가 오류마다 제각각 해석하지 않고 공통 구조로 처리하게 하기 위해서다. |
| `@Schema`, `@Tag`, `@Operation`은? | DTO·API 그룹·개별 API 작업을 설명하는 문서화 정보다. |
| `@ApiResponses`는? | 가능한 응답 상태와 설명을 여러 개 묶어서 문서화한다. |
| `required = false`는? | 해당 요청 파라미터를 생략해도 된다는 뜻이다. 값의 유효성 검사와는 다르다. |

## 14. 다음에 직접 확인할 내용

- [ ] `api-test.http`의 목록 조회, 회원 등록, 삭제 요청을 보내고 `200`, `201`, `204`를 비교한다.
- [ ] 회원 등록 응답의 `Location` 헤더가 새 회원의 주소를 가리키는지 확인한다.
- [ ] `name` 조건을 생략한 요청과 `?name=` 요청의 차이를 확인한다.
- [ ] 검증 요청에서 `id`를 빼거나 `name`을 공백으로 보내 `400`과 오류 본문을 확인한다.
- [ ] Swagger 조회 예제에서 없는 번호를 조회해 `404` 문서 설명과 실제 응답을 비교한다.
- [ ] PUT 요청에서 `name`을 생략하면 어떻게 되는지 학습용 메모리 데이터로 확인한다.
- [ ] 로그인·토큰 검증과 DB 저장은 다음 학습 주제로 남겨 둔다.

## 정리 근거

- 원본 메모: [261030.txt](../../../course-materials/26-10/memo/261030.txt)
- 수업 예제: [chap08-rest-api](../../../course-materials/26-10/09_spring-web-main/chap08-rest-api/)
- 실행 연습용 요청: [api-test.http](../../../course-materials/26-10/09_spring-web-main/chap08-rest-api/api-test.http)

공식 문서 링크는 각 설명에 함께 표시했다. 위 체크리스트는 앞으로 직접 실행할 복습 항목이며, 완료한 실습 결과를 뜻하지 않는다.
