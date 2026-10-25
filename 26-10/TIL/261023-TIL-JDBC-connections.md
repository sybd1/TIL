## [2026-10-23] JDBC

### 오늘 배운 핵심 개념 (What I Learned)
#### JDBC
- 자바 애플리케이션에서 RDBMS (관계형 데이터베이스)에 접근하고 SQL을 실행할 수 있도록 지원하는 자바 표준 인터페이스 규격 (API)이다.
- 특정 DB(MySQL, Oracle, PostgreSQL 등)에 종속되지 않고 동일한 자바 코드 구조로 DB를 다룰 수 있도록 java.sql패키지 인터페이스를 제공하며, 각 DB제조사는 이를 구현한 JDBC Driver를 제공한다.

```
+-------------------------------------------------------+
|                Java Application                       |
+-------------------------------------------------------+
                           |
                           v
+-------------------------------------------------------+
|               JDBC API (java.sql)                     |
|      Connection, PreparedStatement, ResultSet|        |
+-------------------------------------------------------+
                           |
                           v
+-------------------------------------------------------+
|             JDBC Driver (MySQL / Oracle)              |
+-------------------------------------------------------+
                           |
                           v
+-------------------------------------------------------+
|                  Database Server                      |
+-------------------------------------------------------+
```
----
#### JDBC 핵심 객체

JDBC의 기본 흐름은 [연결 -> 준비 -> 실행 -> 결과 매핑 -> 자원 해제] 5단계로 진행된다.
- Interface (인터페이스)
    - Connection: 데이터베이스와의 연결 세션을 나타내는 인터페이스. 실제 사용 시에는 이 인터페이스로 SQL을 실행할 객체를 생성한다. 트랜잭션을 관리한다. 
        - DriverManager.getConnection(url, user, password): url에서 데이터베이스 종류를 확인 -> 해당 데이터베이스용 JDBC Driver를 찾기 -> 유저 정보로 접속 시도 -> 접속 성공시 Connection 객체를 반환. 실패하면 SQLException이 발생.
    - Statement: 완성된 정적 SQL 쿼리를 실행할 때 사용하는 객체. 현업에서 시장된 문법.
    - PreparedStatement: Statement의 자식 인터페이스. SQL을 준비하고 실행시키는 인터페이스. 매개변수화된 쿼리(?)를 사전 컴파일하여 재사용성과 보안을 높인다.
    - ResultSet: SELECT 쿼리 실행 결과로 반환되는 가상의 결과 테이블(결과 집합 커서).
- Method (메서드)
    - excuteQuery(): SQL 실행 메서드. SELECT 문을 실행할 때 사용하며, 결과로 ResultSet을 반환.
    - executeUpdate(): INSERT, UPDATE, DELETE (DML) 및 DDL을 실행할 때 사용하며, 영향받은 행(Row)의 개수인 int를 반환.
    - close(): 자원 해제 메서드. 데이터베이스 서버와 연결된 자원이기 때문에 사용이 끝나면 반드시 닫아줘야 한다. 닫지 않으면 연결이 계속 남아있고, 사용하지 않는 연결이 쌓여 나중에 새로운 연결을 만들 수 없게 되고, 프로그램이나 서버 성능이 저하된다.

##### JDBC 패키지와 파일 구조
- config/jdbc-config.properties: url, driver, user 정보를 관리한다.
- common/JDBCTemplate.java: 여러 클래스에서 반복해서 사용하는 DB 연결 및 자원 해제 코드를 공통으로 관리할 수 있게 만든 템플릿이다.
- model/dto/MenuDTO.java: DB에서 받아온 데이터를 객체에 담아 전달하기 위한 클래스.

##### PreparedStatement
- Placeholder (위치 홀더, ?): SQL 쿼리에서 실제 데이터 값이 채워질 빈자리(파라미터 자리)이다.
- Binding (바인딩): 준비된 SQL 문장 틀(?가 포함된 구문)에 사용자가 입력한 **실제 데이터 값을 연결(대입)하는 과정**을 말한다. SQL 구문 자체를 더하기(+)로 이어 붙이는 것이 아니라, 구문(Syntax)과 데이터(Literal)를 완전히 분리하여 처리한다.
- SQL Injection 공격과 방어
    - SQL Injection (SQL 삽입 공격): 사용자 입력값에 악의적인 SQL조각을 끼워 넣어 의도치 않은 쿼리가 실행되도록 만들어 검증을 우회하거나 전체 데이터를 유출하는 공격 기법.
    - ```PreparedStatement```의 방어 메커니즘
        - SQL의 문법 구조가 이미 컴파일되어 확정되어 있으므로, 바인딩되는 값은 특수문자나 쿼리 제어문자가 포함되어 있더라도 **순수한 데이터(단순 리터럴 문자열)**로만 이스케이프(Escape) 처리된다.
        - 따라서 공격 코드가 SQL 문법으로 해석될 여지가 원천 차단된다.

        ```위치 홀더 ?에 LIKE CONCAT 함수를 사용하면 가독성과 문법 오류를 줄일 수 있다. LIKE CONCAT('%', ?, '%') ```

#### ResultSet과 데이터 추출 원리
- ResultSet은 쿼리 결과 행들을 가리키는 Cursor(커서)기반의 인터페이스.
- 초기상태: 커서는 테이블의 첫 번째 행이 아니라, **그 이전의 가상 위치(Before-First)를 가리키고 있다.**
- next() 호출: 커서를 다음 행으로 한 칸 전진시킨다. 이동한 위치에 행 데이터가 존재하면 true, 없으면 false를 반환시킨다.
- 조회 패턴
    - 단건 조회: if (rset.next()) {...} 사용.
    - 다건 조회: while (rset.next()) {...} 사용.

#### DTO (Data Transfer Object)
- DB에서 꺼낸 각 컬럼 데이터를 개별 변수로 다루면 파라미터 전달이 복잡해지고 유지보수가 불가능해진다.
- 하나의 테이블 행 정보를 하나의 자바 객체로 묶어 계층 간에 전달하기 위해 DTO 클래스를 작성한다.
- DB 컬럼에는 NULL이 들어갈 수 있지만, 자바의 기본 자료형인 int는 NULL을 담지 못하므로, NULL을 허용하는 참조형 타입 Integer를 사용한다. 해당 행에 NULL이 들어가는 숫자형인지 아닌지 확인하고 Integer를 사용하면 된다.


#### DAO (Data Access Object)
- Latered Architecture (계층형 아키텍처): 역할과 책임을 분리하여 유지보수성을 극대화하는 소프트웨어 구조. 순수하게 데이터베이스와의 CRUD 연산만을 담당하는 메서드들의 집합으로 이루어진 클래스.



### 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- DDL (Data Definition Language): 테이블과 컬럼 등 데이터 베이스 구조 정의, 변경. / CREATE, ALTER, DROP, TRUNCATE
- DML (Data Manipulation Language): 테이블에 저장된 행 데이터 삽입, 수정, 삭제 / INSERT, UPDATE, DELETE
- DQL (Data Query Language): 데이터 조회 / SELECT
- Properties: 설정 정보를 Key-Value 형태로 저장하고 읽는 클래스.
    - load(): 파일에 저장된 설정 정보를 읽어 들이는 메서드.
    - getProperty(): 특정 키에 해당하는 값을 가져오는 메서드.
- FileReader: 문자 단위로 읽어 오는 스트림.

### 그 외 개념
##### 1) SQL 쿼리의 외부 분리 (XML / Properties)
- 자바 코드 안에 긴 SQL 문자열을 하드코딩하면 가독성이 떨어지고, 쿼리가 바뀔 때마다 자바 소스를 재컴파일해야 한다.
- 따라서 쿼리를 별도의 `.xml` 또는 `.properties` 파일에 Key-Value 형태로 저장해두고 자바에서 키값으로 불러와 사용하는 기법을 사용한다.

##### 2) 영속성 프레임워크의 진화
1. **순수 JDBC**: 
   - `Connection`, `PreparedStatement`, `ResultSet`, 예외 처리, 자원 반납 등 반복적인 보일러플레이트 코드가 너무 많다.
2. **MyBatis (SQL Mapper)**:
   - 복잡한 JDBC 코드를 대신 처리해주며, SQL 문을 XML에 직접 작성하여 정교하고 세밀하게 튜닝 가능하다.
3. **JPA / Hibernate (ORM - Object Relational Mapping)**:
   - SQL을 직접 작성하기보다 자바 객체(Entity)와 DB 테이블을 매핑하여 객체 지향적인 관점에서 데이터베이스를 다룬다.
   *두 기술은 장단점이 뚜렷하여 한 프로젝트에서 복잡한 통계 쿼리에는 MyBatis, 기본 도메인 CRUD에는 JPA를 혼용하기도 한다.*


##### 3) Spring IoC (Inversion of Control, 제어의 역전)
- 순수 자바/JDBC에서는 개발자가 직접 `new MenuDAO()`, `new MenuService()`처럼 객체의 생성과 의존 관계를 제어한다.
- 스프링(Spring)에서는 스프링 컨테이너가 객체(Bean)를 대신 생성하고 관리하며 필요한 곳에 주입(DI)해줍니다. 이를 **제어의 역전(IoC)**이라고 한다.