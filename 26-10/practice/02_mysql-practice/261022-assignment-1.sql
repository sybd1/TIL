/*### Q1.
다음 논리ERD와 물리ERD를 참고하여, 아래 조건을 만족하는 테이블을 생성하는 DDL 구문을 작성하세요. */
CREATE TABLE IF NOT EXISTS TEAM_INFO (
	TEAM_CODE INT AUTO_INCREMENT PRIMARY KEY,
    TEAM_NAME VARCHAR(100) NOT NULL,
    TEAM_DETAIL VARCHAR(500),
    USE_YN CHAR(1) DEFAULT ('Y'),
    CHECK (USE_YN IN ('Y', 'N'))
) ENGINE = INNODB;

CREATE TABLE IF NOT EXISTS MEMBER_INFO (
	MEMBER_CODE INT AUTO_INCREMENT PRIMARY KEY,
    MEMBER_NAME VARCHAR(70) NOT NULL,
    BIRTH_DATE DATE,
    DIVISION_CODE CHAR(2),
    DETAIL_INFO VARCHAR(500),
    CONTACT VARCHAR(50) NOT NULL,
    TEAM_CODE INT NOT NULL,
    FOREIGN KEY (TEAM_CODE) REFERENCES TEAM_INFO (TEAM_CODE),
    ACTIVE_STATUS CHAR(2) DEFAULT ('Y'),
    CHECK (ACTIVE_STATUS IN ('Y', 'N', 'H'))
) ENGINE = INNODB;
    
/* ### Q2.
Q1에서 생성한 TEAM_INFO 테이블과 MEMBER_INFO 테이블에 아래와 같이 데이터를 INSERT하는 쿼리를 작성하세요.
단, 삽입 대상 컬럼명은 반드시 명시해야 합니다. */
INSERT INTO TEAM_INFO VALUES 
	(1, '음악감상부', '클래식 및 재즈 음악을 감상하는 사람들의 모임', 'Y'),
    (2, '맛집탐방부', '맛집을 찾아다니는 사람들의 모임', 'N'),
    (3, '행복찾기부', NULL, 'Y');

INSERT INTO MEMBER_INFO VALUES
(1, '송가인', '1990-01-30', 1, '안녕하세요 송가인입니다~', '010-9494-9494', 1, 'H'),
(2, '임영웅', '1992-05-03', NULL, '국민아들 임영웅입니다~', 'hero@trot.com', 1, 'Y'),
(3, '태진아', NULL, NULL, NULL, '(1급 기밀)', 3, 'Y');

/*### Q3.
단합을 위한 사내 체육대회를 위하여 팀을 꾸리는 중입니다. 기술지원부의 대리, 인사관리부의 사원, 영업부(팀명에 ‘영업’이 포함되면 영업부로 봄)의 부장을 한 팀으로 묶으려고 합니다. 
이때, 이 팀의 팀원 수를 출력하세요.
단, UNION과 SUBQUERY를 활용하여 출력하세요. */
SELECT 
	COUNT(*) AS team_member_count
FROM (
    SELECT emp_id FROM employee 
    WHERE dept_code = (SELECT dept_id FROM department WHERE dept_title = '기술지원부')
      AND job_code = (SELECT job_code FROM job WHERE job_name = '대리')
    
    UNION
    
    SELECT 
		emp_id 
	FROM employee 
    WHERE dept_code = (SELECT dept_id FROM department WHERE dept_title = '인사관리부')
      AND job_code = (SELECT job_code FROM job WHERE job_name = '사원')
    
    UNION
    
    SELECT 
		emp_id 
	FROM employee 
    WHERE dept_code IN (SELECT dept_id FROM department WHERE dept_title LIKE '%영업%')
      AND job_code = (SELECT job_code FROM job WHERE job_name = '부장')
) AS target_members;

/*### Q4.
1. 부서가 영업부가 아니면서(부서명에 ‘영업’이 포함되지 않음) 직급명이 ‘대리’ 혹은 ‘차장’인 
직원의 목록과 급여가 200만원 이상 300만원 이하인 직원의 목록을 합쳐 출력합니다. 
(이때, 직원의 사원번호, 직원명, 전화번호, 부서명, 직급명, 급여를 출력하도록 하세요.) 
UNION ALL을 활용하세요. */
SELECT 
	e.emp_id, e.emp_name, e.phone, d.dept_title, j.job_name, e.salary
FROM 
	employee e
JOIN job j ON e.job_code = j.job_code
JOIN department d ON e.dept_code = d.dept_id
WHERE j.job_name IN ('대리', '차장')
AND d.dept_title NOT LIKE ('%영업%')

UNION ALL
    
SELECT
    e.emp_id, e.emp_name, e.phone, d.dept_title, j.job_name, e.salary
FROM 
	employee e
JOIN department d ON e.dept_code = d.dept_id
JOIN job j ON e.job_code = j.job_code
WHERE e.salary BETWEEN 2000000 AND 3000000;
	

/* 2. 1에서 출력한 목록에서 직원의 이름과 급여를 기준으로 묶어 해당 직원이 몇 번 나오는지 카운트합니다. 
(이때, 추출한 목록에는 직원명, 급여, 나온 횟수가 출력되도록 하세요.)
SUBQUERY와 GROUP BY를 활용하세요 */

/* 3. 2에서 출력한 목록을 목록에 나온 횟수가 많은 순으로 정렬한 뒤에 급여가 많은 순으로 정렬하여 최상위 3명만 출력되도록 합니다. */

SELECT emp_name, salary, COUNT(*) AS count
FROM (
    SELECT e.emp_id, e.emp_name, e.phone, d.dept_title, j.job_name, e.salary
    FROM employee e
    LEFT JOIN department d ON e.dept_code = d.dept_id
    JOIN job j ON e.job_code = j.job_code
    WHERE (d.dept_title NOT LIKE '%영업%' OR d.dept_title IS NULL) 
      AND j.job_name IN ('대리', '차장')
    
    UNION ALL
    
    SELECT e.emp_id, e.emp_name, e.phone, d.dept_title, j.job_name, e.salary
    FROM employee e
    LEFT JOIN department d ON e.dept_code = d.dept_id
    JOIN job j ON e.job_code = j.job_code
    WHERE e.salary BETWEEN 2000000 AND 3000000
) sub

GROUP BY emp_name, salary

ORDER BY count DESC, salary DESC
LIMIT 3;