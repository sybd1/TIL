/*### Q1.
부서별 직원 급여의 총합 중 가장 큰 액수를 출력하세요. */
SELECT
	MAX(SAL_SUM)
FROM (
	SELECT
		SUM(salary) AS 'SAL_SUM'
	FROM
		employee
	GROUP BY
		dept_code
) AS sal_totals;
	


/*### Q2.
서브쿼리를 이용하여 영업부인 직원들의 사원번호, 직원명, 부서코드, 급여를 출력하세요.
참고. 영업부인 직원은 부서명에 ‘영업’이 포함된 직원임 */
SELECT
	emp_id,
    emp_name,
    dept_code,
    salary
FROM 
	employee
WHERE
	dept_code IN (
	SELECT
		dept_id
	FROM
		department
	WHERE
		dept_title LIKE '%영업%'
)
ORDER BY
	dept_code;


/*### Q3.
서브쿼리와 JOIN을 이용하여 영업부인 직원들의 사원번호, 직원명, 부서명, 급여를 출력하세요. */
SELECT
	a.emp_id,
    a.emp_name,
    b.dept_title,
    a.salary
FROM
	employee a
JOIN department b ON a.dept_code = b.dept_id
WHERE b.dept_id IN (
					SELECT
						dept_id
					FROM
						department
					WHERE
						dept_title LIKE '%영업%'
) ORDER BY
	b.dept_title;
				


/*### Q4.
1. JOIN을 이용하여 부서의 부서코드, 부서명, 해당 부서가 위치한 지역명, 국가명을 추출하는 쿼리를 작성하세요.
2. 위 1에서 작성한 쿼리를 서브쿼리로 활용하여 모든 직원의 사원번호, 직원명, 급여, 부서명, (부서의) 국가명을 출력하세요.
단, 국가명 내림차순으로 출력되도록 하세요.  */
SELECT
	a.dept_id,
    a.dept_title,
    b.local_name,
    c.national_name
FROM
	department a
LEFT JOIN location b ON a.location_id = b.local_code
LEFT JOIN nation c ON b.national_code = c.national_code
ORDER BY
	c.national_name DESC;

SELECT
	d.emp_id,
    d.emp_name,
    d.salary,
    a.dept_title,
    a.national_name
FROM
	employee d
JOIN (
SELECT
	a.dept_id,
    a.dept_title,
    b.local_name,
    c.national_name
FROM
	department a
LEFT JOIN location b ON a.location_id = b.local_code
LEFT JOIN nation c ON b.national_code = c.national_code
) AS a ON d.dept_code = a.dept_id
ORDER BY
	a.national_name DESC,
    a.dept_title ASC;

/*### Q5.
러시아에서 발발한 전쟁으로 인해 정신적 피해를 입은 직원들에게 위로금을 전달하려고 합니다. 위로금은 각자의 급여에 해당 직원의 급여 등급에 해당하는 최소 금액을 더한 금액으로 정했습니다.
Q4에서 작성한 쿼리를 활용하여 해당 부서의 국가가 ‘러시아’인 직원들을 대상으로, 직원의 사원번호, 직원명, 급여, 부서명, 국가명, 위로금을 출력하세요.
단, 위로금의 결과 집합 헤더는 ‘위로금’으로 출력되도록 하고, 위로금 내림차순으로 출력되도록 하세요.  */
SELECT
	a.emp_id,
    a.emp_name,
    a.salary,
    b.dept_title,
    d.national_name,
    a.salary + e.min_sal AS '위로금'
FROM
	employee a
JOIN department b ON a.dept_code = b.dept_id
JOIN location c ON b.location_id = c.local_code
JOIN nation d ON c.national_code = d.national_code
JOIN sal_grade e ON a.sal_level = e.sal_level
WHERE
	d.national_name = '러시아'
ORDER BY
	위로금 DESC;












