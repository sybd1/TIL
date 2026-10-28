# [2026-10-28] Spring Web 핵심 정리

## 1. 전체 흐름

Spring MVC는 HTTP 요청에서 필요한 값을 꺼내 Java 메서드에 전달하고, Java 객체를 HTTP 응답으로 바꿔 준다.

```text
React·브라우저
→ HTTP 요청
→ Spring MVC가 요청 값 추출
→ Controller 실행
→ Java 객체 반환
→ Jackson이 JSON으로 변환
→ HTTP 응답
```

---

## 2. 요청 값을 받는 어노테이션

| 어노테이션 | 값을 가져오는 곳 | 예시 |
|---|---|---|
| `@RequestParam` | Query String | `/menus?keyword=coffee` |
| `@PathVariable` | URL 경로 | `/menus/3` |
| `@RequestBody` | 요청 본문 | JSON 데이터 |
| `@RequestHeader` | 요청 헤더 | `Content-Type` |
| `@CookieValue` | 쿠키 | `clientId=abc` |

### Query String

```java
@GetMapping
public void findMenus(
        @RequestParam(required = false) String keyword,
        @RequestParam(defaultValue = "1") int page) {
}
```

- `required = false`: 값이 없어도 요청을 허용한다.
- `defaultValue`: 값이 없을 때 기본값을 사용한다.
- `keyword`가 `null`일 수 있다면 `null`을 허용하지 않는 `Map.of()`보다 `LinkedHashMap`을 사용할 수 있다.

### URL 경로 값

```java
@GetMapping("/{menuCode}")
public void findMenu(@PathVariable int menuCode) {
}
```

```text
GET /menus/3
→ menuCode = 3
```

### JSON 본문

```java
@PostMapping
public void createMenu(@RequestBody MenuDTO menu) {
}
```

Spring이 JSON의 key와 DTO의 필드 이름을 연결한다.

```text
JSON menuName  → MenuDTO.menuName
JSON menuPrice → MenuDTO.menuPrice
```

JSON 객체 하나는 DTO 하나로, JSON 배열은 `List<DTO>`로 받는다.

```java
@RequestBody MemberDTO member
@RequestBody List<MemberDTO> members
```

---

## 3. Jackson: JSON 변환

Jackson은 Java 객체와 JSON을 서로 변환한다.

```text
역직렬화: JSON → Java 객체
직렬화:   Java 객체 → JSON
```

### 요청

```java
public void create(@RequestBody MemberDTO member)
```

`@RequestBody`가 JSON을 `MemberDTO`로 역직렬화한다.

### 응답

```java
return ResponseEntity.ok(member);
```

Jackson이 `MemberDTO`를 JSON으로 직렬화한다.

### 주요 어노테이션

```java
@JsonProperty("memberNo")
private int no;

@JsonFormat(pattern = "yyyy-MM-dd")
private LocalDate enrollDate;
```

- `@JsonProperty`: Java 필드 이름과 JSON key가 다를 때 연결한다.
- `@JsonFormat`: 날짜 형식을 지정한다.

### ObjectMapper

```java
String json = objectMapper.writeValueAsString(member);
```

Java 객체를 JSON 형식의 **문자열**로 바꾼다. 파일이나 DB에 자동으로 저장하는 메서드는 아니다. 일반적인 Controller 응답은 Spring이 자동 변환하므로 직접 호출할 일이 많지 않다.

---

## 4. ResponseEntity

`ResponseEntity`는 HTTP 상태 코드와 응답 본문을 함께 표현한다.

```java
return ResponseEntity.ok(response);
```

```text
상태 코드: 200 OK
본문: response 객체를 변환한 JSON
```

등록 성공은 보통 `201 Created`를 사용한다.

```java
return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(response);
```

자주 사용하는 상태 코드:

| 코드 | 의미 |
|---:|---|
| `200` | 요청 성공 |
| `201` | 생성 성공 |
| `400` | 요청 값이나 JSON이 잘못됨 |
| `404` | 요청한 자원이 없음 |
| `415` | 지원하지 않는 Content-Type |
| `500` | 예상하지 못한 서버 오류 |

---

## 5. Validation과 예외 처리

DTO에 입력값 규칙을 선언한다.

```java
@NotBlank(message = "회원 이름이 비어 있을 수 없습니다.")
private String name;

@Min(value = 0, message = "나이는 0 이상이어야 합니다.")
private int age;
```

Controller에서 `@Valid`로 검사를 실행한다.

```java
public void create(
        @Valid @RequestBody MemberDTO member) {
}
```

```text
JSON 역직렬화
→ DTO 생성
→ @Valid 검증
→ 성공하면 Controller 실행
→ 실패하면 예외 발생
```

이 검사는 컴파일러가 아니라 **실행 중인 Spring**이 수행한다.

### 사용자 정의 예외

```java
public class MemberNotFoundException
        extends RuntimeException {

    public MemberNotFoundException(String message) {
        super(message);
    }
}
```

특정 실패 상황에 이름을 붙인 예외다. 예를 들어 회원이 없으면 `MemberNotFoundException`을 발생시킬 수 있다.

### 공통 예외 처리

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            MemberNotFoundException exception) {

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(exception.getMessage()));
    }
}
```

- `@RestControllerAdvice`: 여러 Controller의 예외 처리를 한곳에 모은다.
- `@ExceptionHandler`: 어떤 예외를 처리할 메서드인지 지정한다.

```text
Controller에서 예외 발생
→ 일치하는 @ExceptionHandler 실행
→ 상태 코드와 오류 JSON 반환
```

예상하지 못한 `500` 오류의 자세한 원인은 클라이언트에게 노출하지 않고 `Logger`로 서버 로그에 기록한다.

---

## 6. 파일 업로드

파일과 일반 입력값을 함께 보낼 때는 `multipart/form-data`를 사용한다.

```text
React의 파일과 입력값
→ multipart/form-data
→ Spring MultipartFile
→ 서버 uploads 디렉터리에 저장
```

```java
@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public void upload(
        @RequestPart MultipartFile file,
        @RequestParam String description) {
}
```

서버는 파일 자체를 저장하고, 응답 DTO에는 원래 파일명, 서버 저장 파일명, 경로, 크기, MIME 타입 등을 담을 수 있다. 파일명 충돌을 피하기 위해 저장 파일명은 보통 UUID 등으로 새로 만든다.

---

## 7. 오늘의 핵심

```text
@RequestParam  → Query String
@PathVariable → URL 경로 값
@RequestBody  → JSON 본문

역직렬화 → JSON을 Java 객체로 변환
직렬화   → Java 객체를 JSON으로 변환

@Valid → 요청 DTO 검사
@RestControllerAdvice → 예외 처리 공통화
@ExceptionHandler → 예외별 HTTP 응답 결정

ResponseEntity → 상태 코드와 응답 본문 구성
MultipartFile  → 업로드 파일 받기
```

가장 중요한 흐름 하나만 기억하면 된다.

```text
HTTP 요청
→ Spring이 Java 값으로 변환
→ Controller 실행
→ Java 결과 반환
→ Spring이 JSON 응답으로 변환
```
