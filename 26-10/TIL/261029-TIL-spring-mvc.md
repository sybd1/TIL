# 2026-10-29 TIL — Spring 파일 업로드, 인터셉터, React 연동

## 오늘 배운 내용

- React가 보낸 파일을 Spring이 `MultipartFile`로 받아 서버 파일 시스템에 저장하는 흐름
- 단일 업로드와 다중 업로드, 저장 결과 응답, 실패 시 정리
- Spring MVC `HandlerInterceptor`로 컨트롤러 실행 전후의 공통 작업 처리
- React 개발 서버와 Spring API 서버 사이의 CORS 설정

## 한눈에 보는 요청 흐름

```text
React에서 파일 선택
  → FormData에 파일과 입력값을 추가
  → multipart/form-data 요청
  → Spring이 MultipartFile로 요청을 읽음
  → Controller가 파일 검사 후 디스크에 저장
  → 저장 결과의 메타 정보와 HTTP 응답을 반환
```

여기서 **디스크에 저장되는 것은 파일 내용**이고, 응답의 `FileDTO`에는 파일 내용이 아니라 원본 이름, 서버 저장 이름, 경로, 크기 같은 **파일 정보(메타 정보)**가 들어간다. 이 예제는 데이터베이스가 아니라 서버의 `uploads` 폴더에 파일을 저장한다.

---

## 1. 파일 업로드 요청은 어떻게 전달될까?

파일은 보통 HTTP 요청의 `multipart/form-data` 형식으로 전송한다. `FormData`는 파일과 일반 입력값을 한 요청에 함께 담을 수 있는 브라우저의 객체다.

```javascript
const formData = new FormData();
formData.append("file", selectedFile); // Spring의 @RequestParam("file")와 이름이 같아야 함
formData.append("description", description);

await fetch("http://localhost:8080/api/v1/files/single", {
  method: "POST",
  body: formData,
});
```

브라우저가 `multipart/form-data`의 경계(boundary)를 포함한 `Content-Type`을 설정하므로, `FormData`를 보낼 때는 보통 `Content-Type` 헤더를 직접 지정하지 않는다.

Spring은 multipart 요청을 해석해 파일을 `MultipartFile`로 제공한다. Spring Boot 설정에서 파일 하나의 최대 크기는 `spring.servlet.multipart.max-file-size`, 요청 전체 최대 크기는 `spring.servlet.multipart.max-request-size`로 제한할 수 있다. 수업 코드의 설정은 파일당 `10MB`, 요청 전체 `50MB`다.

> **쉽게 말하면:** React가 파일을 담아 보내면 Spring이 업로드된 파일을 다룰 수 있는 `MultipartFile` 객체로 꺼내 준다. 이 객체를 받았다고 파일이 원하는 폴더에 영구 저장된 것은 아니다. 실제 저장은 코드에서 `transferTo(...)`를 호출할 때 일어난다.

---

## 2. 단일 파일 저장 흐름

컨트롤러의 단일 업로드 메서드는 다음 순서로 동작한다.

1. `@RequestParam("file")`로 multipart 요청에서 이름이 `file`인 파일을 받는다.
2. `description`은 선택 항목으로 받는다. (`required = false`)
3. `saveFile(...)`에서 파일이 비어 있지 않은지, 파일 이름이 있는지 확인한다.
4. `uploads/single` 폴더를 만든다. 이미 있으면 그대로 사용한다.
5. 원본 파일 이름을 정리하고 경로 조작에 쓰일 수 있는 `..`이 있는지 검사한다.
6. 원본 이름이 아닌 UUID 기반의 새 이름을 만든다. 확장자는 원본 파일 이름에서 가져온다.
7. `file.transferTo(targetPath)`가 파일 내용을 서버의 해당 경로에 기록한다.
8. `FileDTO`에 파일 관련 정보를 담아 만든 뒤, 메시지와 함께 응답한다.
9. 성공 응답은 `201 Created`다. 이는 새 리소스가 생성되었음을 나타내는 상태 코드다.

```java
@PostMapping("/single")
public ResponseEntity<Map<String, Object>> uploadSingleFile(
        @RequestParam("file") MultipartFile file,
        @RequestParam(value = "description", required = false) String description
) throws IOException {
    FileDTO savedFile = saveFile(file, "single", description);

    Map<String, Object> response = new LinkedHashMap<>();
    response.put("message", "단일 파일 업로드 성공!");
    response.put("file", savedFile);

    return ResponseEntity.status(HttpStatus.CREATED).body(response);
}
```

`@RequestParam("file")`의 이름은 React에서 `formData.append("file", ...)`로 추가한 키와 일치해야 연결된다. 이름이 다르면 Spring이 해당 파일 항목을 찾지 못한다.

### 저장 경로와 이름

- `file.upload-dir=uploads`: 기본 업로드 루트 폴더 설정
- `@Value("${file.upload-dir}")`: 설정값을 생성자에 전달
- `Paths.get(uploadDir).toAbsolutePath().normalize()`: 기준 경로를 정리된 절대 경로로 준비
- `Files.createDirectories(uploadPath)`: 필요한 폴더를 만든다. 폴더가 이미 있어도 사용할 수 있다.
- `UUID`: 파일마다 충돌 가능성이 매우 낮은 고유한 이름을 만든다.
- `uploadRoot.relativize(targetPath)`: 서버의 절대 경로 전체 대신 업로드 루트 기준의 상대 경로를 만든다.

**경로 정규화(normalize)**는 `.`과 `..`처럼 경로를 이동시키는 부분을 정리하는 것이다. 코드에서 `startsWith(uploadPath)`를 확인하는 것도 저장 대상이 허용된 업로드 폴더 아래에 있는지 검사하기 위해서다.

**쉽게 풀면:** 사용자가 올린 이름 그대로 저장하지 않고, 서버가 새 이름을 붙여 지정한 업로드 폴더에 파일을 쓴다. 응답에는 파일 그 자체가 아니라 나중에 파일을 찾는 데 쓸 정보가 담긴다.

---

## 3. 여러 파일 업로드와 실패 정리

다중 업로드는 같은 이름의 `files` 항목으로 파일 여러 개를 보내고, Spring에서 `List<MultipartFile>`로 받는다.

```java
@PostMapping("/multiple")
public ResponseEntity<Map<String, Object>> uploadMultipleFiles(
        @RequestParam("files") List<MultipartFile> files,
        @RequestParam(value = "description", required = false) String description
) throws IOException {
    // 파일들을 순서대로 저장한 뒤 개수와 파일 정보 목록을 응답
}
```

여러 파일은 다음과 같은 문제가 생길 수 있다. 앞의 파일들은 이미 저장됐는데 뒤의 파일 저장이 실패하는 경우다. 수업 코드의 `cleanupSavedFiles(...)`는 앞서 저장에 성공한 파일들을 삭제하려고 시도한 다음, 처음 발생한 오류를 다시 던진다.

- `try` 안에서 파일별 저장을 진행한다.
- `catch`에서 이미 저장된 파일들의 경로를 다시 계산해 삭제한다.
- 삭제 중에도 오류가 나면 `originalException.addSuppressed(cleanupException)`으로 정리 오류를 최초 업로드 오류에 부가 정보로 붙인다.
- 이렇게 하면 정리 작업이 실패해도 최초 저장 실패의 원인을 잃지 않는다.

**쉽게 풀면:** 여러 장을 올리다가 중간에 실패하면, 이미 저장한 앞선 파일을 지워서 일부만 저장된 상태를 줄이려는 처리다. 다만 삭제 작업 자체가 실패할 수 있으므로 데이터베이스 트랜잭션처럼 완전한 되돌리기를 보장하는 것은 아니다.

### 코드가 하는 검사와 운영 시 추가로 확인할 점

현재 코드는 빈 파일과 빈 파일 이름, `..` 경로 조각 등을 확인하고 서버가 만든 UUID 이름으로 저장한다. 하지만 원본 확장자를 그대로 저장 이름에 붙이고, `file.getContentType()`도 응답 정보로 담는다. 파일 이름과 Content-Type은 클라이언트가 보낸 값이므로 이것만으로 실제 파일 형식이나 안전성을 확인했다고 볼 수 없다.

실제 서비스에서는 목적에 맞는 허용 확장자, 파일 내용 검사, 크기 제한, 업로드 권한, 저장 위치와 다운로드 정책 등을 함께 정해야 한다. 특히 MIME 타입은 사용자가 보낸 값만 믿어서는 안 된다. 업로드 파일 보안은 여러 검사를 조합해야 한다.

---

## 4. 인터셉터(Interceptor)

인터셉터는 **Spring MVC가 컨트롤러 핸들러를 실행하기 전후에 공통 작업을 할 수 있게 하는 기능**이다. `HandlerInterceptor`는 Java 표준 인터페이스가 아니라 Spring MVC에서 제공하는 인터페이스다.

| 메서드 | 호출 시점 | 쉽게 말하면 |
|---|---|---|
| `preHandle()` | 핸들러 메서드 실행 전 | 요청을 계속 진행해도 되는지 먼저 확인 |
| `postHandle()` | 핸들러 실행 후 | 핸들러가 끝난 직후 처리 |
| `afterCompletion()` | 요청 처리가 끝난 뒤 | 요청이 마무리될 때 정리·기록 |

요청 흐름은 대략 다음과 같다.

```text
HTTP 요청
  → Spring MVC가 요청에 맞는 핸들러를 찾음
  → preHandle()
  → Controller 핸들러 메서드
  → postHandle()
  → 응답 처리 완료
  → afterCompletion()
```

`preHandle()`이 `true`를 반환하면 다음 단계로 진행한다. `false`를 반환하면 핸들러가 실행되지 않는다. 요청을 막는 인터셉터는 이때 응답 상태와 본문도 직접 작성해야 한다.

`WebMvcConfigurer`는 Spring MVC 설정을 추가할 때 구현하는 Spring의 인터페이스다. `addInterceptors()` 안에서 인터셉터를 등록하고 적용 경로를 정한다.

```java
@Override
public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(stopwatchInterceptor)
            .addPathPatterns("/api/v1/**")
            .order(1);

    registry.addInterceptor(apiKeyInterceptor)
            .addPathPatterns("/api/v1/admin/**")
            .order(2);
}
```

이 설정에서는 `/api/v1/**` 요청에 실행 시간 측정 인터셉터가 적용되고, 그보다 좁은 `/api/v1/admin/**`에는 API 키 확인 인터셉터도 적용된다. 순서값이 낮은 `StopwatchInterceptor`가 먼저 실행된다.

### 수업 코드에 나온 두 인터셉터

- **`StopwatchInterceptor`**: `preHandle()`에서 시작 시간을 요청 속성에 저장하고, `afterCompletion()`에서 경과 시간을 계산해 출력한다. `System.nanoTime()` 차이를 밀리초로 바꿔 측정한다.
- **`ApiKeyInterceptor`**: `X-API-KEY` 헤더의 값을 확인한다. 일치하면 진행하고, 일치하지 않으면 `401 Unauthorized`와 JSON 오류 응답을 직접 쓴 뒤 `false`를 반환해 컨트롤러 실행을 막는다.
- **요청 속성(request attribute)**: 현재 요청을 처리하는 동안 서버 내부에서 값을 보관하는 공간이다. 여기서는 시작 시간을 `preHandle()`에서 `afterCompletion()`으로 전달하는 데 쓴다.

`@ResponseBody`나 `ResponseEntity`를 쓰는 REST 핸들러는 응답 본문이 `postHandle()`보다 먼저 작성될 수 있다. 그러므로 `postHandle()`에서 이미 만들어진 JSON 본문이나 헤더를 바꾸려고 해서는 안 된다. 응답 본문을 공통으로 바꿔야 하는 경우 Spring의 `ResponseBodyAdvice` 같은 기능을 검토한다.

인터셉터는 요청 흐름의 공통 처리나 측정에는 편리하지만, 보안의 유일한 방어선으로 삼는 것은 권장되지 않는다. 경로 판단이 컨트롤러의 요청 매핑과 다르게 동작할 여지가 있으므로 인증·인가가 필요한 실제 애플리케이션은 Spring Security 등 필터 체인과 통합된 보안 기능을 사용해야 한다. 수업 코드의 고정 API 키 문자열은 학습용 예시로만 이해한다.

---

## 5. React와 Spring의 CORS 설정

CORS는 **브라우저가 서로 다른 출처(origin)의 서버에 요청할 때, 응답을 프론트엔드 코드가 읽어도 되는지 서버가 허용하는 규칙**이다.

출처는 다음 세 부분으로 정해진다.

```text
출처 = 프로토콜(scheme) + 호스트(host) + 포트(port)
예: http://localhost:3000
```

따라서 React 개발 서버 `http://localhost:3000`과 Spring 서버 `http://localhost:8080`은 포트가 달라 서로 다른 출처다. 브라우저에서 React가 Spring으로 `fetch`를 보내려면 Spring API가 해당 출처를 CORS 설정으로 허용해야 한다. 개발 중에는 두 서버를 각각 실행해 둔다.

```java
@Configuration
public class WebConfiguration implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "OPTIONS")
                .allowedHeaders("Content-Type");
    }
}
```

- `addMapping("/api/**")`: `/api/`로 시작하는 요청에 CORS 규칙 적용
- `allowedOrigins(...)`: 허용할 프론트엔드 출처 지정
- `allowedMethods(...)`: 허용할 HTTP 메서드 지정
- `allowedHeaders(...)`: 브라우저 요청에서 허용할 헤더 지정

CORS는 로그인이나 API 키 인증을 대신하지 않는다. 브라우저가 응답을 프론트엔드 코드에 공개할지 결정하는 정책이다. 서버 간 통신을 막는 기능도 아니다.

**현재 수업 설정의 주의점:** `allowedHeaders`에 `Content-Type`만 있다. 브라우저에서 `X-API-KEY`를 붙여 관리자 API를 요청하려면 그 헤더도 허용 목록에 추가해야 한다. 그렇지 않으면 브라우저의 사전 확인 요청(preflight)에서 차단될 수 있다. 또한 실제 배포에서는 `localhost:3000` 대신 실제 프론트엔드 출처를 정확히 등록해야 한다.

> **쉽게 풀면:** React와 Spring이 같은 컴퓨터에서 실행 중이어도 포트가 다르면 브라우저는 다른 출처로 본다. Spring이 React의 출처를 허용해야 브라우저가 API 응답을 React 코드에 전달한다.

---

## 핵심 용어 다시 보기

| 용어 | 쉬운 설명 |
|---|---|
| `MultipartFile` | Spring이 multipart 요청에서 꺼내 준 업로드 파일 객체 |
| `transferTo()` | 업로드된 파일 내용을 지정한 서버 경로에 실제로 기록하는 메서드 |
| 메타 정보 | 파일 자체가 아니라 파일명·크기·형식·저장 경로 같은 설명 정보 |
| `Path` | 파일이나 폴더의 위치를 Java 코드에서 다루는 타입 |
| UUID | 파일 이름 충돌을 피하려고 서버에서 만드는 고유한 식별 문자열 |
| 인터셉터 | Spring MVC 핸들러 실행 전후의 공통 처리를 담당하는 기능 |
| 사전 확인 요청(preflight) | 브라우저가 실제 CORS 요청 전에 허용 여부를 확인하려고 보내는 `OPTIONS` 요청 |
| CORS | 다른 출처의 응답을 브라우저가 프론트엔드에 전달해도 되는지 정하는 규칙 |

## 참고 자료

- [Spring Framework — Multipart 요청과 파일 받기](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/multipart-forms.html)
- [Spring Framework — Spring MVC Interceptor](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet/handlermapping-interceptor.html)
- [Spring Framework — Spring MVC CORS 설정과 처리](https://docs.spring.io/spring-framework/reference/web/webmvc-cors.html)
- [OWASP — File Upload 보안 권장사항](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
