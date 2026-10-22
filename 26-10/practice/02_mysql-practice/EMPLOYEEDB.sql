#DROP TABLE `EMPLOYEE`;
#DROP TABLE `DEPARTMENT`;
#DROP TABLE `JOB`;
#DROP TABLE `LOCATION`;
#DROP TABLE `NATION`;
#DROP TABLE `SAL_GRADE`;


CREATE TABLE `DEPARTMENT`
(
    `DEPT_ID`    CHAR(2)  NOT NULL COMMENT '부서코드',
    `DEPT_TITLE`    VARCHAR(35) NOT NULL COMMENT '부서명',
    `LOCATION_ID`    CHAR(2) NOT NULL COMMENT '지역코드',
 PRIMARY KEY ( `DEPT_ID` )
)
 COMMENT = '부서';
 
INSERT INTO DEPARTMENT (DEPT_ID,DEPT_TITLE,LOCATION_ID) VALUES 
('D1','인사관리부','L1'),
('D2','회계관리부','L1'),
('D3','마케팅부','L1'),
('D4','국내영업부','L1'),
('D5','해외영업1부','L2'),
('D6','해외영업2부','L3'),
('D7','해외영업3부','L4'),
('D8','기술지원부','L5'),
('D9','총무부','L1');


CREATE TABLE `EMPLOYEE`
(
    `EMP_ID`    VARCHAR(3)  NOT NULL COMMENT '사원번호',
    `EMP_NAME`    VARCHAR(20) NOT NULL COMMENT '직원명',
    `EMP_NO`    CHAR(14) NOT NULL COMMENT '주민등록번호',
    `EMAIL`    VARCHAR(35) COMMENT '이메일',
    `PHONE`    VARCHAR(12) COMMENT '전화번호',
    `DEPT_CODE`    CHAR(2) COMMENT '부서코드',
    `JOB_CODE`    CHAR(2) NOT NULL COMMENT '직급코드',
    `SAL_LEVEL`    CHAR(2) NOT NULL COMMENT '급여등급',
    `SALARY`    DECIMAL COMMENT '급여',
    `BONUS`    float COMMENT '보너스율',
    `MANAGER_ID`    VARCHAR(3) COMMENT '관리자사번',
    `HIRE_DATE`    DATE COMMENT '입사일',
    `ENT_DATE`    DATE COMMENT '퇴사일',
    `ENT_YN`    CHAR(1) DEFAULT 'N' COMMENT '퇴직여부',
 PRIMARY KEY ( `EMP_ID` )
)
 COMMENT = '사원';   
 
INSERT INTO EMPLOYEE (EMP_ID,EMP_NAME,EMP_NO,EMAIL,PHONE,DEPT_CODE,JOB_CODE,SAL_LEVEL,SALARY,BONUS,MANAGER_ID,HIRE_DATE,ENT_DATE,ENT_YN) VALUES 
('200','선동일','621235-1985634','sun_di@greedy.com','01099546325','D9','J1','S1',8000000,0.3,null,STR_TO_DATE('90/02/06','%y/%m/%d'),null,'N'),
('201','송종기','631156-1548654','song_jk@greedy.com','01045686656','D9','J2','S1',6000000,null,'200',STR_TO_DATE('01/09/01','%y/%m/%d'),null,'N'),
('202','노옹철','861015-1356452','no_oc@greedy.com','01066656263','D9','J2','S4',3700000,null,'201',STR_TO_DATE('01/01/01','%y/%m/%d'),null,'N'),
('203','송은희','631010-2653546','song_eh@greedy.com','01077607879','D6','J4','S5',2800000,null,'204',STR_TO_DATE('96/05/03','%y/%m/%d'),null,'N'),
('204','유재식','660508-1342154','yoo_js@greedy.com','01099999129','D6','J3','S4',3400000,0.2,'200',STR_TO_DATE('00/12/29','%y/%m/%d'),null,'N'),
('205','정중하','770102-1357951','jung_jh@greedy.com','01036654875','D6','J3','S4',3900000,null,'204',STR_TO_DATE('99/09/09','%y/%m/%d'),null,'N'),
('206','박나라','630709-2054321','pack_nr@greedy.com','01096935222','D5','J7','S6',1800000,null,'207',STR_TO_DATE('08/04/02','%y/%m/%d'),null,'N'),
('207','하이유','690402-2040612','ha_iy@greedy.com','01036654488','D5','J5','S5',2200000,0.1,'200',STR_TO_DATE('94/07/07','%y/%m/%d'),null,'N'),
('208','김해술','870927-1313564','kim_hs@greedy.com','01078634444','D5','J5','S5',2500000,null,'207',STR_TO_DATE('04/04/30','%y/%m/%d'),null,'N'),
('209','심봉선','750206-1325546','sim_bs@greedy.com','0113654485','D5','J3','S4',3500000,0.15,'207',STR_TO_DATE('11/11/11','%y/%m/%d'),null,'N'),
('210','윤은해','650505-2356985','youn_eh@greedy.com','0179964233','D5','J7','S5',2000000,null,'207',STR_TO_DATE('01/02/03','%y/%m/%d'),null,'N'),
('211','전형돈','830807-1121321','jun_hd@greedy.com','01044432222','D8','J6','S5',2000000,null,'200',STR_TO_DATE('12/12/12','%y/%m/%d'),null,'N'),
('212','장쯔위','780923-2234542','jang_zw@greedy.com','01066682224','D8','J6','S5',2550000,0.25,'211',STR_TO_DATE('15/06/17','%y/%m/%d'),null,'N'),
('213','하동운','621111-1785463','ha_dh@greedy.com','01158456632',null,'J6','S5',2320000,0.1,null,STR_TO_DATE('99/12/31','%y/%m/%d'),null,'N'),
('214','방명수','856795-1313513','bang_ms@greedy.com','01074127545','D1','J7','S6',1380000,null,'200',STR_TO_DATE('10/04/04','%y/%m/%d'),null,'N'),
('215','대북혼','881130-1050911','dae_bh@greedy.com','01088808584','D5','J5','S4',3760000,null,null,STR_TO_DATE('17/06/19','%y/%m/%d'),null,'N'),
('216','차태연','770808-1364897','cha_ty@greedy.com','01064643212','D1','J6','S5',2780000,0.2,'214',STR_TO_DATE('13/03/01','%y/%m/%d'),null,'N'),
('217','전지연','770808-2665412','jun_jy@greedy.com','01033624442','D1','J6','S4',3660000,0.3,'214',STR_TO_DATE('07/03/20','%y/%m/%d'),null,'N'),
('218','이오리','870427-2232123','lee_or@greedy.com','01022306545',null,'J7','S5',2890000,null,null,STR_TO_DATE('16/11/28','%y/%m/%d'),null,'N'),
('219','임시환','660712-1212123','im_sh@greedy.com',null,'D2','J4','S6',1550000,null,null,STR_TO_DATE('99/09/09','%y/%m/%d'),null,'N'),
('220','이중석','770823-1113111','lee_js@greedy.com',null,'D2','J4','S5',2490000,null,null,STR_TO_DATE('14/09/18','%y/%m/%d'),null,'N'),
('221','유하진','800808-1123341','yoo_hj@greedy.com',null,'D2','J4','S5',2480000,null,null,STR_TO_DATE('94/01/20','%y/%m/%d'),null,'N'),
('222','이태림','760918-2854697','lee_tr@greedy.com','01033000002','D8','J6','S5',2436240,0.35,'100',STR_TO_DATE('97/09/12','%y/%m/%d'),STR_TO_DATE('17/09/12','%y/%m/%d'),'Y');


CREATE TABLE `JOB`
(
    `JOB_CODE`    CHAR(2)  NOT NULL COMMENT '직급코드',
    `JOB_NAME`    VARCHAR(35) COMMENT '직급명',
 PRIMARY KEY ( `JOB_CODE` )
)
 COMMENT = '직급';
 
INSERT INTO JOB (JOB_CODE,JOB_NAME) VALUES 
('J1','대표'),
('J2','부사장'),
('J3','부장'),
('J4','차장'),
('J5','과장'),
('J6','대리'),
('J7','사원');


CREATE TABLE `LOCATION`
(
    `LOCAL_CODE`    CHAR(2)  NOT NULL COMMENT '지역코드',
    `NATIONAL_CODE`    CHAR(2) NOT NULL COMMENT '국가코드',
    `LOCAL_NAME`    VARCHAR(40) COMMENT '지역명',
 PRIMARY KEY ( `LOCAL_CODE` )
)
 COMMENT = '지역';

INSERT INTO LOCATION (LOCAL_CODE,NATIONAL_CODE,LOCAL_NAME) VALUES 
('L1','KO','ASIA1'),
('L2','JP','ASIA2'),
('L3','CH','ASIA3'),
('L4','US','AMERICA'),
('L5','RU','EU');


CREATE TABLE NATION
(
    `NATIONAL_CODE`    CHAR(2)  NOT NULL COMMENT '국가코드',
    `NATIONAL_NAME`    VARCHAR(35) COMMENT '국가명',
 PRIMARY KEY ( `NATIONAL_CODE` )
)
 COMMENT = '국가';
 
INSERT INTO NATION (NATIONAL_CODE,NATIONAL_NAME) VALUES 
('KO','한국'),
('JP','일본'),
('CH','중국'),
('US','미국'),
('RU','러시아');


CREATE TABLE SAL_GRADE
(
    `SAL_LEVEL`    CHAR(2)  NOT NULL COMMENT '급여등급',
    `MIN_SAL`    DECIMAL COMMENT '최소급여',
    `MAX_SAL`    DECIMAL COMMENT '최대급여',
 PRIMARY KEY ( `SAL_LEVEL` )
)
 COMMENT = '급여등급';
 
INSERT INTO SAL_GRADE (SAL_LEVEL,MIN_SAL,MAX_SAL) VALUES 
('S1',6000000,10000000),
('S2',5000000,5999999),
('S3',4000000,4999999),
('S4',3000000,3999999),
('S5',2000000,2999999),
('S6',1000000,1999999);

commit;