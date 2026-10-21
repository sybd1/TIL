## [2026-10-20] MySQL Basic

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### MySQL
##### MySQL 전체 구조
- MySQL은 관계형 데이터베이스 관리 시스템(RDBMS)이다.
- MySQL Server: 데이터베이스를 관리하고 SQL 명령을 처리하는 서버 프로그램.
    - User Accounts: 사용자 인증 및 권한 관리. 서버에 접속하기 위한 인증 정보.
    - Schemas(스키마): 데이터베이스 및 객체 관리. 사실상 데이터베이스와 동의어로 사용된다.
        - Database Objects: Tables, Views, Indexes, Stored Procedures 등
            - Table Data: Rows, Columns

- Workbench: 데이터베이스 관리도구 GUI(Graphical User Interface).
- SQL 파일: 데이터베이스에 어떤 작업을 할지 기록한 파일.
- 데이터베이스: 실제 테이블과 데이터를 저장하고 관리하는 시스템.
    - Column (컬럼): 열. 각 데이터가 어떤 항목인지 나타냄.
    - Row (로우): 행. 하나의 데이터 기록.
    - Table (테이블): 데이터를 행과 열로 정리한 표.

- 주석: #, --

#### MySQL 문법
- SELECT/FROM: 단일 열(컬럼) 데이터 검색.
    - SELECT NOW(): 현재 시각을 알 수 있는 함수.
    - SELECT CONCAT(): 여러 문자열이나 값을 하나의 문자열로 연결하는 함수.
    -----
- ORDER BY: SELECT문의 가장 마지막에 위치하며, 결과 집합을 하나의 열로 정렬.
    - ASC: 오름차순. 생략가능.
    - DESC: 내림차순. 생략 불가능.
    - FIELD(): 컬럼 값이 목록의 몇 번째에 있는지 숫자로 알려준다. 지정한 목록에서 값의 순번을 반환하는 함수이며, ORDER BY와 함께 사용해 사용자 지정 순서의 정렬을 구현할 수 있다.
    -----
- IS NULL: true면 1을 반환하고, false면 0을 반환하는 것을 이용해 순서를 정렬할 수 있다.
- WHERE: **조건 필터링**의 역할, 특정 조건에 맞는 행만 선택하는데 사용된다.
    - 비교 연산자 (=, <>, > <=): <>는 jAVA의 !=같은 두 값이 서로 같지 않은지를 비교하는 연산자이다.
    - AND: 두 조건이 모두 참이어야 참이다.
    - OR: 둘 중 하나라도 참이면 참이다.
        - AND와 OR을 함께 사용하면, AND가 우선 순위로 연산하고 OR을 연산한다.
    - BETWWEN/AND: AND 구문 양쪽의 값을 비교하는 조건.
    - LIKE: 특정 패턴과 일치하는지 검색하는 연산자. 주로 문자열 검색에 사용.
    - IN: 컬럼의 값이 지정한 값 목록 중 하나와 일치하는지 확인하는 연산자.
    -----
- DISTINCT: 중복된 값을 제거하고 고유한 값들의 목록만 보고 싶을때 사용한다. SELECT 구문 바로 앞에 붙여 사용한다.
-----
- LIMIT: 결과 중에 딱 내가 원하는 만큼만 잘라달라고 요청하는 키워드. "시작위치, 가져올 행의 개수" 문법으로 사용할 수 있다.
-----
- JOIN: 각 테이블의 행을 연결해서 한 결과에서 볼 수 있는 기능. 테이블 별칭을 붙이는 건 JOIN 구문에서 필수이다. 테이블에 붙인 별칭이 a 라면 칼럼 앞에 a.칼럼으로 명시적으로 표현해줘야한다.
    - AS: 별칭을 붙이는 문법. 띄어쓰기가 있으면 따옴표 사용하고 없으면 생략 가능하다.
    - INNER JOIN: 교집합. 가장 기본적인 JOIN. 
        - ON: 같은 행을 찾을 연결 조건.
    - OUTER JOIN(LEFT/RIGHT)
        - LEFT JOIN: JOIN 구문을 기준으로 왼쪽 테이블의 데이터는 모두 보여주고, 오른쪽 테이블에서 짝이 맞는 데이터가 없으면 NULL로 채워서 보여준다. FROM 절(왼쪽 테이블)에 기준을 삼을 컬럼을 정한다.
        보통 왼쪽을 기준으로 잡기 때문에 RIGHT 구문은 잘 사용하지 않는다.
    - SELF JOIN: 같은 테이블 안에서 행과 행의 관계가 있는 경우, 그걸 연결해서 보고 싶을 때 사용할 수 있다.
    -----
- GROUP BY: 지정된 컬럼의 값이 같은 데이터들을 하나의 그룹으로 묶는다. GROUP BY를 사용하면, GROUP BY에 사용된 컬럼과 집계함수만 사용할 수 있다.
    - HAVING: 그룹에 대한 조건 필터링(WHERE는 그룹화 전 조건 필터링.)
    - WITH ROLLUP: 그룹별 집계 결과와 합계 그 그룹들의 소계와 총계를 마지막 행에 보여줌.
    - COUNT(): 각 그룹에 속한 행의 개수를 센다.
    - SUM(): 더하기.
    - AVG(): 빼기.
    - MAX(): 최대 수.
----
- SUBQUERIES: 메인쿼리 안에 포함되어, 메인쿼리의 작업에 필요한 값을 구하는 쿼리.
- MAINQUERIES: 바깥쪽에서 최종적으로 데이터를 조회하거나 처리하는 쿼리.
    - FROM 절에서 서브쿼리를 사용할 수 있다. 즉석에서 만들어 쓰는 임시 테이블처럼 동작하고, 파생 테이블이라고도 부른다.
----
- SET OPERATORS (집합 연산자)
    - UNION: 두 결과를 합치고 중복은 제거한다. 합칠 두 SELECT 구문 중간에 UNION을 적으면 된다.
    - UNION ALL: 두 결과를 합치고 중복을 포함한다.
    - INTERSECT: 교집합 구하기.
    - EXCEPT: 차집합 구하기.
----
- DML: (Data Manipulation Language)은 데이터베이스에 저장된 데이터를 조회하거나 변경하는 데 사용하는 SQL 명령어

    - INSERT INTO/VALUES: 새로운 행을 추가하는 구문이다.
    - UPDATE/SET/WHERE: 테이블에 이미 존재하는 행의 컬럼 값을 수정한다. SET으로 내용을 지정하고, WHERE에서 바꿀 내용을 지정한다.
    - DELETE FROM/WHERE: 테이블에서 특정 행을 삭제하는 구문.
    - REPLACE INTO/VALUES: 해당 키의 데이터가 있으면 기존 데이터를 DELETE하고, 새로운 데이터를 INSERT한다. INSERT시에 PRIMARY KEY 또는 UNIQUE KEY가 충돌할 수 있지만, REPLACE는 중복된 데이터를 덮어 쓸 수 있어서 충돌을 피할 수 있다.
    - SELECT(DQL)
----
- Transaction: 여러 SQL 작업이 서로 의존하고, 일부만 반영되면 데이터가 잘못되는 경우 트랜잭션을 사용한다. 부분적으로 잘못 변경되는 것을 방지하기 위해 사용한다.
- ALL or Nothing 모두 성공하거나, 모두 실패해야 하는 하나의 작업 단위. MYSQL은 기본적으로 autocommit 모드가 켜져있다. 조절하고 싶다면 설정을 바꿔줘야한다.
    - SET autocommit = OFF: auto commit을 끄는 동작.
    - START TRANSACTION: 트랜잭션을 시작
    - ROLLBACK: 트랜잭션 시작 전의 상태로 되돌린다. 커밋을 한 이후에는 되돌릴 수 없다.
    - COMMIT: 작업이 올바르다고 판단되면 최종 저장 명령한다.
    
```문법 순서: SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY ```

### 2. 코드 예시 (Code)
```text
- INNER JOIN 문법
SELECT
	a.menu_name,
    b.category_name
FROM
	tbl_menu a
JOIN tbl_category b ON a.category_code = b.category_code;

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)



### 4. 내일 공부할 내용 (Next)

