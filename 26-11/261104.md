# 2026-11-04 TIL — Spring Data JPA, 쿼리 메서드, JPQL과 페이지 조회

> 수업 메모와 `chap04-spring-data-jpa-crud`, `chap05-spring-data-jpa-query` 소스를 바탕으로 정리했다. 빈칸과 물음표는 공식 문서를 대조해 채우고, 본문에서 벗어나는 보충 메모는 맨 아래에 모았다. 코드 예시는 핵심 부분 발췌다.

## 1. Spring Data JPA는 무엇을 더 해 주는가?

Spring Data JPA는 Spring Data 프로젝트의 모듈로, JPA를 이용한 데이터 접근 코드를 편리하게 작성하도록 돕는다. JPA를 대체하는 별도의 ORM이 아니라, Repository 구현과 반복 코드를 줄여 주는 기능을 제공한다.

```text
애플리케이션의 Repository 인터페이스
  → Spring Data JPA가 제공하는 구현·쿼리 처리
  → JPA API
  → Hibernate 같은 JPA 구현체
  → JDBC·DB 드라이버
  → DB
```

**쉽게 풀면:** 이전에는 EntityManager를 직접 사용해 저장·조회 코드를 작성했다. 이제는 Repository 인터페이스에 관리 대상을 선언하면 기본 저장·조회·삭제 기능을 제공받을 수 있다.

이전 수업에서도 Spring과 JPA를 함께 사용했다. 오늘의 핵심은 Spring을 처음 붙였다는 것이 아니라 **Spring Data JPA의 Repository 추상화**를 사용하는 데 있다. 추상화는 자주 필요한 작업의 사용법을 공통 형태로 제공해 내부 세부 코드를 덜 작성하게 하는 것이다.

### JpaRepository<Menu, Integer> 읽기

```java
public interface MenuRepository extends JpaRepository<Menu, Integer> {
}
```

- `Menu`: 이 Repository가 관리할 엔티티 타입
- `Integer`: 해당 엔티티 식별자의 자바 타입. 엔티티 필드가 int여도 제네릭에는 참조 타입인 Integer를 사용한다.
- `extends`: JpaRepository가 정의한 메서드들을 상속받는다.

Spring Data JPA가 Repository 프록시와 기본 구현 등을 구성하므로 기본 기능에 대해 직접 구현 클래스를 작성할 필요가 줄어든다. 모든 임의의 메서드 이름을 자동 구현한다는 뜻은 아니다. 기본 메서드, 이름 기반 쿼리, @Query, 사용자 정의 구현 등 각각의 규칙을 따라야 한다.

### Repository 인터페이스의 상속 구조

최근 Spring Data의 주요 구조를 기능별로 보면 다음과 같다.

```text
JpaRepository<T, ID>
  ├─ ListCrudRepository<T, ID>
  │    └─ CrudRepository<T, ID>
  │         └─ Repository<T, ID>
  ├─ ListPagingAndSortingRepository<T, ID>
  │    └─ PagingAndSortingRepository<T, ID>
  │         └─ Repository<T, ID>
  └─ QueryByExampleExecutor<T>
```

Repository는 관리할 타입을 나타내는 기본 인터페이스이고, CrudRepository는 생성·조회·수정·삭제 기능, PagingAndSortingRepository는 페이징·정렬 기능을 제공한다. List가 붙은 인터페이스는 일부 여러 건 조회의 반환 타입을 List로 제공한다. QueryByExampleExecutor는 예시 객체를 이용한 조회 기능이다.

오래된 자료의 상속 구조와 현재 구조는 다를 수 있다. 현재의 PagingAndSortingRepository를 CrudRepository의 하위 인터페이스라고 외우지 않는다. JpaRepository가 여러 기능을 함께 상속받는 구조로 이해한다.

근거: [JpaRepository 공식 API](https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html).

## 2. Controller → Service → Repository의 역할

| 계층 | 수업 코드에서 하는 일 | 쉬운 풀이 |
|---|---|---|
| Controller | 요청 주소·HTTP 메서드 연결, 입력 수신, 서비스 호출, HTTP 응답 구성 | 외부 요청과 내부 기능을 연결 |
| Service | 존재 여부 확인, 업무 순서 결정, 트랜잭션 처리, 엔티티 변경, 응답 DTO 변환 | 무엇을 어떤 순서로 처리할지 결정 |
| Repository | 엔티티 저장·조회·삭제와 쿼리 실행 | 데이터를 읽고 쓰는 접근 기능 |
| DB | SQL에 따라 데이터 저장·조회 | 실제 데이터 유지 |

```text
HTTP 요청
  → Controller
  → Service
  → Repository
  → JPA/Hibernate와 JDBC
  → DB
  → 조회 결과가 Repository·Service로 돌아옴
  → Service에서 응답 DTO 구성
  → Controller에서 상태 코드와 응답 구성
  → Spring이 JSON 등으로 변환해 응답
```

**쉽게 풀면:** Service는 DTO 변환만 하는 곳이 아니다. “회원이나 메뉴가 존재하는지 확인하고, 어떤 값을 바꾸고, 어떤 결과를 반환할지” 같은 업무 처리를 묶는 곳이다.

### 실제 단건 조회 코드 따라가기

```java
// Controller
return ResponseEntity.ok(menuService.findMenu(menuCode));
```

서비스는 Repository의 findById로 엔티티를 찾고, 없으면 ResourceNotFoundException을 던진다. 있으면 toResponse(menu)로 응답 DTO를 만든다. 수업의 MenuResponse에는 메뉴 값뿐 아니라 카테고리 번호와 이름도 들어간다.

```java
return menuRepository.findById(menuCode)
        .orElseThrow(() -> new ResourceNotFoundException("메뉴를 찾을 수 없습니다."));
```

인터페이스와 클래스도 구분한다. 수업의 MenuRepository는 **인터페이스**, MenuService와 MenuController는 **클래스**다. Repository의 호출 대상은 Spring이 구성한 구현 객체다.

### 기본 CRUD 메서드와 엔티티 변경

| 메서드 | 역할 |
|---|---|
| findById(id) | 식별자로 한 건 조회. Optional로 결과 표현 |
| findAll() | 여러 엔티티 조회 |
| save(entity) | 새 엔티티 여부 판단에 따라 persist 또는 merge |
| delete(entity) | 엔티티 삭제 처리 |
| flush() | 관리 중인 변경을 DB와 동기화 |

save가 항상 INSERT만 실행하는 것은 아니다. persist인지 merge인지는 Spring Data JPA의 새 엔티티 판단 규칙에 따라 달라진다. save 호출과 즉시 커밋도 같은 의미가 아니다.

수업의 Menu는 여러 setter를 열어 두는 대신 update(...) 메서드를 둔다.

```java
@Transactional
public MenuResponse updateMenu(int menuCode, MenuRequest request) {
    Menu menu = findMenuEntity(menuCode);
    Category category = findCategory(request.getCategoryCode());

    menu.update(request.getMenuName(), request.getMenuPrice(),
            category, request.getOrderableStatus());

    return toResponse(menu);
}
```

**쉽게 풀면:** “메뉴 정보 수정”이라는 의도를 가진 메서드에서 관련 값들을 함께 바꾼다. 일반적인 영속 엔티티는 트랜잭션 안의 변경 감지로 반영되므로 이 코드가 save를 다시 호출하지 않아도 수정될 수 있다. update라는 이름에 특별한 JPA 기능이 있는 것은 아니다. 자바 메서드가 값을 바꾸고, JPA가 관리 객체의 변경을 추적한다.

근거: [Spring Data JPA의 엔티티 저장](https://docs.spring.io/spring-data/jpa/reference/jpa/entity-persistence.html).

## 3. 이름을 해석하는 쿼리 메서드

쿼리(query)는 데이터를 조회하거나 변경하는 요청을 뜻한다. SQL도 쿼리 언어다. 쿼리 메서드는 Repository 메서드로 쿼리를 실행하는 방식이며, 오늘은 그중 **이름 기반 쿼리 생성**과 **@Query로 직접 선언하는 방식**을 사용했다.

수업의 이름 기반 메서드는 다음과 같다.

```java
List<Menu> findByMenuPriceGreaterThanEqualOrderByMenuPriceDesc(int minPrice);
```

| 이름의 부분 | 뜻 |
|---|---|
| findBy | 조건에 맞는 엔티티 조회 |
| MenuPrice | Menu 엔티티의 menuPrice 속성 |
| GreaterThanEqual | 이상, 즉 >= |
| OrderByMenuPriceDesc | menuPrice 내림차순 정렬 |

minPrice에 20000을 전달하면 “20,000원 이상인 메뉴를 가격이 높은 순서로 조회”한다. 최종 SQL은 대략 WHERE menu_price >= ?와 ORDER BY menu_price DESC 조건을 갖게 된다. 이는 이해를 위한 SQL 대응 설명이고 실제 SQL의 별칭·모양은 JPA 구현체와 DB에 따라 달라진다.

**쉽게 풀면:** 자바 코드에 if 조건을 작성하는 것이 아니라 Repository 메서드의 이름으로 조회 조건을 선언한다. Spring Data가 엔티티 속성과 정해진 키워드를 해석해 JPA 쿼리로 처리하고, 구현체가 SQL을 실행한다.

메서드 이름에는 DB 컬럼명 menu_price가 아니라 **자바 속성명 menuPrice**를 쓴다. And·Or, Between, LessThan, Containing, OrderBy 같은 키워드로 여러 조건을 표현할 수 있지만, 임의의 문장을 모두 해석하지는 않는다. 조건이 길어지면 @Query나 다른 쿼리 작성 방식이 읽기 쉬울 수 있다.

수업 요청 주소는 `GET /api/v1/menus/search/price?minPrice=20000`이다. Controller의 @RequestParam이 값을 받아 Service를 거쳐 위 메서드에 전달한다.

근거: [쿼리 메서드 정의](https://docs.spring.io/spring-data/jpa/reference/repositories/query-methods-details.html), [JPA 쿼리 메서드](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html).

## 4. JPQL, @Query, @Param

JPQL(Java Persistence Query Language)은 테이블·컬럼 대신 **엔티티와 자바 속성**을 대상으로 작성하는 JPA 쿼리 언어다. SELECT·WHERE·ORDER BY처럼 SQL과 비슷한 키워드를 사용한다.

```java
@Query("SELECT m FROM Menu m "
        + "WHERE m.menuName LIKE CONCAT('%', :keyword, '%') "
        + "ORDER BY m.menuCode")
List<Menu> searchByMenuName(@Param("keyword") String keyword);
```

- Menu는 기본 엔티티 이름이다. 실제 테이블 이름 tbl_menu와 구분한다.
- m은 이 쿼리에서 Menu를 가리키는 별칭이다.
- m.menuName과 m.menuCode는 엔티티 속성이다.
- :keyword는 실행할 때 실제 값을 연결할 이름 있는 파라미터다.
- @Param("keyword")는 메서드의 keyword 인자를 그 파라미터에 연결한다.
- LIKE와 앞뒤 %는 검색 문자열을 포함하는 이름을 찾기 위한 패턴이다. 검색값 자체의 %·_도 LIKE의 와일드카드로 해석될 수 있다.

**파라미터 바인딩**은 쿼리의 값 자리에 실행 시 실제 인자를 연결하는 것이다. 문자열을 임의로 이어 붙여 JPQL 코드를 만드는 것과 구분한다. @Param은 HTTP 요청에서 값을 읽는 @RequestParam과도 역할이 다르다.

@Query는 이름으로 유추할 쿼리 대신 직접 작성한 쿼리를 연결한다. 기본적으로 JPQL을 사용하며, nativeQuery=true 등으로 네이티브 SQL을 선언하는 방식은 별도다. JPQL에는 UPDATE·DELETE도 있지만 Repository의 변경 쿼리에는 @Modifying 및 적절한 트랜잭션 설정 등이 추가로 필요하다.

수업 요청은 `GET /api/v1/menus/search/name?keyword=라떼`다. 이를 통해 전달된 문자열을 위 :keyword에 바인딩한다.

근거: [Spring Data JPA — @Query와 파라미터 바인딩](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html).

## 5. Pageable과 Page — 요청 조건과 조회 결과

페이징(paging)은 전체 데이터를 일정 개수씩 나눠 조회하는 것이다. Pageable은 **어떻게 나눠 조회할지에 관한 조건**, Page는 **조회된 한 묶음과 전체 개수 등 결과 정보**다.

```java
@GetMapping("/page")
public ResponseEntity<PageResponse<MenuResponse>> findMenuPage(
        @PageableDefault(size = 5, sort = "menuCode") Pageable pageable) {
    return ResponseEntity.ok(menuService.findMenuPage(pageable));
}
```

Spring의 웹 인자 처리 기능이 page·size·sort 요청 파라미터를 읽어 Pageable 인자를 구성한다. @PageableDefault는 해당 요청 파라미터가 없을 때 적용할 기본값이다. 조회 SQL을 직접 실행하는 어노테이션은 아니다.

| 요청 | 의미 |
|---|---|
| `/api/v1/menus/page` | 기본 첫 페이지, 5개씩, menuCode 오름차순 |
| `/api/v1/menus/page?page=1` | 기본 설정에서 두 번째 페이지 |
| `/api/v1/menus/page?page=0&size=10&sort=menuPrice,desc` | 첫 페이지, 10개씩, 가격 내림차순 |

기본 페이지 번호는 0부터 시작한다. size=5, page=2라면 앞의 10개를 건너뛰고 다음 최대 5개를 요청한다. sort에는 엔티티 속성명을 사용한다. 가격처럼 중복값이 있는 정렬에서는 menuCode 같은 고유한 기준도 함께 정하면 조회 순서가 더 안정적이다.

### Page<T>가 담는 정보

| 메서드 | 의미 |
|---|---|
| getContent() | 현재 페이지 데이터 목록 |
| getNumber() | 현재 페이지 번호 |
| getSize() | 요청한 페이지 크기 |
| getNumberOfElements() | 현재 페이지에 실제 들어 있는 개수 |
| getTotalElements() | 조건에 맞는 전체 데이터 개수 |
| getTotalPages() | 전체 페이지 수 |

페이지 크기가 5여도 마지막 페이지에는 실제 데이터가 2개만 있을 수 있다. getSize와 실제 개수를 구분한다. 예를 들어 전체 12개라면 5개씩 3페이지다.

Page는 전체 개수 계산을 위해 COUNT 쿼리가 추가로 필요할 수 있다. 최적화로 생략되는 경우도 있어 반드시 매번 두 SQL이라고 단정하지 않는다. 전체 개수 없이 다음 묶음 존재 여부만 필요한 경우에는 Slice 같은 반환 형식도 있다.

**쉽게 풀면:** Pageable은 “몇 번째부터 몇 개를 어떤 순서로 볼지”, Page는 “이번 결과와 전체가 얼마나 되는지”를 나타낸다.

근거: [@PageableDefault](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/web/PageableDefault.html), [Page API](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Page.html), [페이징과 반환 타입](https://docs.spring.io/spring-data/jpa/reference/repositories/query-methods-details.html).

## 6. Page.map(), Stream.map(), Map은 어떻게 다를까?

| 이름 | 역할 | 결과 |
|---|---|---|
| Page.map(변환함수) | 페이지 내용의 각 요소 변환 | 새 Page<U> |
| Stream.map(변환함수) | 스트림 요소마다 변환 작업 선언 | Stream<U> |
| java.util.Map<K,V> | 키와 값을 연결하는 자료구조 | 그 자체가 자료구조 |

Page.map과 Stream.map은 **각 요소를 다른 값으로 변환한다는 목적이 비슷하다.** 어느 타입에서 호출하는지와 반환 타입·실행 방식이 다르다. Map 자료구조는 이름이 비슷할 뿐 별개다. Map 인터페이스는 Java Collection 인터페이스를 상속하지 않는다.

### Stream으로 목록 DTO 변환

```java
List<MenuResponse> responses = menuRepository.findAll().stream()
        .map(this::toResponse)
        .toList();
```

Menu 목록에서 스트림을 만들고, 각 Menu를 MenuResponse로 바꾸는 작업을 연결한 뒤 toList로 결과를 모은다. Stream의 map은 중간 연산이므로 일반적으로 toList 같은 최종 연산이 실행될 때 변환이 진행된다.

this::toResponse는 메서드 참조 문법이며, 여기서는 `menu -> this.toResponse(menu)`와 같은 의미다. 현재 서비스의 toResponse 메서드를 각 Menu에 적용하라는 뜻이다.

### Page의 DTO 변환

```java
Page<MenuResponse> responsePage = menuRepository
        .findPageWithCategory(pageable)
        .map(this::toResponse);

return PageResponse.from(responsePage);
```

Repository는 Page<Menu>를 반환한다. Page.map은 content의 Menu를 MenuResponse로 바꾸고 페이지 번호·전체 건수 같은 메타 정보를 유지한 Page<MenuResponse>를 만든다. 수업의 일반적인 Page 구현에서는 변환 결과가 새 페이지 내용으로 구성된다.

PageResponse.from은 수업에서 만든 응답 DTO의 정적 생성 메서드다. content·page·size·totalElements·totalPages를 읽어 API 응답 구조를 만든다. Spring의 Page와 수업의 PageResponse는 서로 다른 타입이다.

**쉽게 풀면:** 메뉴 목록의 내용을 응답용 정보로 바꾸되, 몇 번째 페이지인지와 전체 개수도 함께 유지하는 과정이다. map 자체가 새 DB 검색 조건을 만드는 것은 아니다. 다만 변환 함수가 아직 로딩되지 않은 연관 객체에 접근하면 그 과정에서 추가 조회가 생길 수 있다.

근거: [Page.map](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/domain/Page.html), [Stream.map](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html), [Map 인터페이스](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Map.html).

## 7. JOIN FETCH와 N+1 문제

수업 Menu.category는 LAZY다. 메뉴 목록을 조회한 뒤 응답 DTO를 만들면서 category.getCategoryName()을 호출하면, 아직 읽지 않은 카테고리 정보를 추가 조회할 수 있다.

**N+1 문제**는 목록을 읽는 1번의 쿼리 뒤에 각 결과와 연결된 데이터를 얻기 위한 추가 조회가 반복되는 현상이다. 예를 들어 메뉴 N개가 서로 다른 카테고리를 참조하고 모두 아직 로딩되지 않았다면, 메뉴 목록 1번에 카테고리 조회 N번이 뒤따를 수 있다. 같은 카테고리의 재사용이나 캐시·배치 설정에 따라 실제 횟수는 달라진다.

**쉽게 풀면:** 한 번에 목록을 가져온 뒤, 결과를 사용하면서 작은 추가 조회가 여러 번 발생하는 문제다. LAZY를 썼다고 자동으로 해결되는 것도, EAGER로 바꾸면 무조건 해결되는 것도 아니다.

수업은 다음 JPQL로 메뉴와 카테고리를 함께 가져온다.

```java
@Query(
    value = "SELECT m FROM Menu m JOIN FETCH m.category",
    countQuery = "SELECT COUNT(m) FROM Menu m"
)
Page<Menu> findPageWithCategory(Pageable pageable);
```

JOIN FETCH는 연결된 엔티티를 조인할 뿐 아니라 **그 연관 객체도 함께 로딩하라**는 의도를 가진다. 여기서는 메뉴 조회 시 Category도 준비해, DTO 변환 중 카테고리 이름 때문에 발생하는 추가 로딩을 줄인다. 일반 JOIN을 썼다는 이유만으로 연관 객체가 항상 초기화되는 것은 아니다.

countQuery는 전체 메뉴 개수를 계산하기 위한 별도 쿼리다. 데이터 조회에서 연관 객체를 로딩하는 일과 전체 개수만 세는 일은 목적이 다르다. 그래서 전체 페이지 수를 계산할 때 FETCH를 붙인 본문 쿼리를 그대로 쓰지 않도록 명시했다.

이 JOIN FETCH는 INNER JOIN이므로 연결된 카테고리가 없는 메뉴는 결과에서 빠질 수 있다. 수업은 모든 메뉴에 유효한 카테고리가 있다는 전제다. 검색 조건이나 조인 조건을 바꾸면 countQuery도 같은 조회 대상을 세도록 맞춰야 한다.

수업의 fetch 대상은 Menu → Category라는 단일값 N:1 관계다. 이를 컬렉션 1:N fetch join과 동일하게 생각하면 안 된다. 컬렉션 조인은 결과 행 수를 늘릴 수 있어 페이지 제한과 함께 쓸 때 메모리 페이징 등 성능 문제가 발생할 수 있다. 필요한 관계와 결과 크기에 맞게 조회 방법을 선택한다.

근거: [Hibernate — fetch join과 조회 전략](https://docs.hibernate.org/orm/7.2/userguide/html_single/), [Spring Data JPA — @Query와 countQuery](https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html).

## 8. 페이지 조회 요청을 처음부터 따라가기

```text
GET /api/v1/menus/page?page=0&size=5&sort=menuCode,asc
  → Controller: Pageable 구성
  → Service.findMenuPage(pageable)
  → Repository.findPageWithCategory(pageable)
  → 메뉴와 Category를 함께 로딩, 필요한 경우 전체 건수 조회
  → Page<Menu>
  → Page.map(this::toResponse)
  → Page<MenuResponse>
  → PageResponse.from(...)
  → Controller가 200 응답 구성
  → Spring이 JSON 본문으로 변환
```

MenuResponse를 만드는 시점은 서비스의 읽기 전용 트랜잭션 안이다. 응답 DTO에는 일반 값들이 들어가므로 Controller와 JSON 변환 단계에서 엔티티의 지연 연관관계에 추가 접근할 필요가 줄어든다.

수업 코드와 공식 동작을 대조해 정리했으며 실제 SQL 횟수나 테스트 실행 결과를 보고한 것은 아니다.

---

## 9. 본문 흐름과 별도로 모은 메모

### open-in-view: false

```yaml
spring:
  jpa:
    open-in-view: false
```

Open EntityManager in View는 웹 요청 처리 동안 EntityManager를 유지해 서비스 트랜잭션이 끝난 뒤에도 웹 계층에서 지연 로딩을 할 수 있게 하는 방식이다. open-in-view=false는 이 요청 범위의 자동 유지를 끄는 설정이다.

일반적인 서비스 트랜잭션 구조에서는 트랜잭션 종료 후 컨트롤러·응답 변환 단계가 엔티티를 추가 로딩하는 데 의존하지 않도록 한다. 다만 바깥 트랜잭션이나 별도 컨텍스트 관리가 있으면 실제 수명은 달라질 수 있다. OSIV가 켜져 있다고 트랜잭션 자체도 HTTP 응답까지 계속 열린다는 뜻은 아니다.

**쉽게 풀면:** 영속성 컨텍스트를 클라이언트로 보내는 설정이 아니다. 서버 내부에서 엔티티 관리 환경을 웹 요청 끝까지 유지할지에 관한 설정이다. 수업 코드는 서비스 안에서 필요한 데이터를 DTO로 바꿔 반환한다.

근거: [Spring OpenEntityManagerInViewInterceptor](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/orm/jpa/support/OpenEntityManagerInViewInterceptor.html).

### @Id가 두 종류인 이유

| import | 용도 |
|---|---|
| jakarta.persistence.Id | JPA 표준 엔티티 식별자 매핑 |
| org.springframework.data.annotation.Id | Spring Data 공통 식별자 메타데이터. JPA 이외 저장소 모듈 등에서 활용 |

이름은 같지만 서로 다른 타입의 어노테이션이다. 수업의 Hibernate/JPA 엔티티에는 **jakarta.persistence.Id**를 사용한다. Spring Data JPA를 사용해도 엔티티 매핑을 해석하는 것은 JPA 구현체이므로 JPA 표준 식별자 어노테이션이 필요하다. 잘못 import하면 Hibernate가 식별자를 발견하지 못해 초기화 오류가 날 수 있다.

**쉽게 풀면:** Repository 기능을 Spring Data가 제공해도 테이블과 엔티티의 연결 규칙은 JPA가 사용한다. 그래서 식별자 선언도 JPA가 이해하는 어노테이션을 선택한다.

근거: [Spring Data 공통 @Id](https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/annotation/Id.html), [Jakarta Persistence 식별자 규칙](https://jakarta.ee/specifications/persistence/3.2/jakarta-persistence-spec-3.2.html).

### Optional — 결과 없음까지 반환 타입에 표현

Optional<T>는 값이 하나 있거나 비어 있는 상태를 표현하는 타입이다. findById가 Optional<Menu>를 반환하면 해당 메뉴가 있을 수도, 없을 수도 있음을 호출자에게 알린다.

```java
Menu menu = menuRepository.findById(menuCode)
        .orElseThrow(() -> new ResourceNotFoundException("메뉴를 찾을 수 없습니다."));
```

결과가 있으면 Menu를 꺼내고 없으면 지정한 예외를 발생시킨다. 이 예외를 실제 404 HTTP 응답으로 바꾸는 일은 별도의 예외 처리 코드가 담당한다. Optional 자체가 HTTP 상태를 결정하지 않는다. 값이 없는 상태에서 무조건 get()을 호출하면 예외가 발생할 수 있다.

**쉽게 풀면:** 조회 결과가 없을 때 어떻게 처리할지 코드에서 분명하게 결정하도록 하는 반환 형식이다.

근거: [Java Optional](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Optional.html).

### 프로젝트 빌드와 build() 메서드

**프로젝트 빌드**는 소스 컴파일, 리소스 처리, 패키징 등으로 실행·배포 가능한 산출물을 준비하는 과정이다. Gradle Java 플러그인의 build 작업은 assemble과 check에 연결되어 있으며 일반 구성에서는 테스트도 포함된다. 정확한 작업 범위는 플러그인·설정·실행 옵션에 따라 달라진다.

```java
return ResponseEntity.noContent().build();
```

여기의 **build()**는 자바 프로젝트 전체를 빌드하는 명령이 아니다. 앞에서 정한 응답 상태와 헤더로 **본문 없는 ResponseEntity 객체를 완성하는 메서드**다.

**쉽게 풀면:** 빌드는 실행 가능한 프로그램을 준비하는 작업을 뜻할 수도 있고, 객체를 단계적으로 구성한 뒤 최종 객체를 만드는 메서드 이름으로 쓰일 수도 있다. 어떤 대상에서 호출하는지 읽어야 한다.

근거: [Gradle Java 플러그인](https://docs.gradle.org/current/userguide/java_plugin.html), [ResponseEntity.HeadersBuilder.build](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/ResponseEntity.HeadersBuilder.html).

### 204 No Content

204는 요청 처리가 성공했고 응답 본문이 없다는 뜻이다. 수업의 삭제 API는 deleteMenu 처리 후 ResponseEntity.noContent().build()를 반환한다. 수정 후 본문 없이 응답할 때도 사용할 수 있다.

응답 본문이 없으므로 프론트엔드에서 항상 response.json()을 호출하도록 만들면 안 된다. 성공 상태를 확인하고 본문 유무에 맞게 처리해야 한다.

근거: [HTTP 204 표준](https://www.rfc-editor.org/rfc/rfc9110.html#section-15.3.5).
