---
layout: post
title:  "[SQLD] 표준 조인 (STANDARD JOIN)"
date:   2024-02-24 19:20:00 -0500
excerpt: "표준 조인에 대해 알아보자"
tags: SQLD
category : [ SQLD ]
---

# 표준 조인 (STANDARD JOIN)

## STANDARD SQL 개요
    - ANSI/ISO SQL 표준을 통해 STANDARD JOIN을 포함 한 기능이 상호 벤치마킹하고 발전하면서 DBMS 간 평준화를 이루고 있다.
    - STANDARD JOIN 기능 추가(CROSS, OUTER JOIN등 새로운 FROM절 JOIN 기능들)
    - SCALAR SUBQUERY, TOP-N QUERY 등 새로운 SUBQUERY 기능
    - ROLLUP, CUBE, GROUPING SETS 등의 새로운 리포팅 기능
    - WINDOW FUNCTION 같은 새로운 개념의 분석 기능들

### 가. 일반 연산자

|일반 집합 연산자|현재 SQL|
|---|---|
|UNION|UNION|
|INTERSECTION|INTERSECT|
|DIFFRENCE|EXCEPT(ORACLE에서는 MINUS)|
|PRODUCT|CROSS JOIN|

**UNION(합집합)**  
공통 교집합의 중복을 없애줌.

INTERSECT(차집합)

### 나. 순수 관계 연산자

|일반 집합 연산자|현재 SQL|
|---|---|
|SELCT|WHERE 절|
|PROJECT|SELECT 절|
|(NATURAL) JOIN|JOIN(ORACLE에서는 MINUS)|
|DIVIDE|없어짐|

## FROM 절 JOIN 형태

<a href="https://imgbb.com/"><img src="https://i.ibb.co/F5jFgrR/JOIN.png" alt="JOIN" border="0"></a>

다양한 JOIN의 형태들을 볼 수 있다.

## INNER JOIN

우리가 흔히 보던 WHERE 절에서 오는 JOIN이 INNER JOIN과 같은 역할을 한다.  
대신 WHERE 절 대신 INNER JOIN을 사용하면 JOIN조건을 FROM절에 정의하겠다는 표시라 USING 조건절이나 ON 조건절을 활용해 조건을 주어야한다.  

SELECT * FROM EMP,DEPT  
WHERE EMP.DEPTNO = DEPT.DEPTNO;

SELECT * FROM EMP INNER JOIN DEPT  
ON EMP.DEPTNO = DEPT.DEPTNO;  

둘다 같은 결과같은 내놓는다.

## NATURAL JOIN

솔직히 매번 NATURAL JOIN이 뭐지 싶다.  
내가 프로젝트 하면서 NATURAL JOIN자체를 써본적이 없기 때문일 수도 있다.    

찾아보니깐 그냥 자동으로 INNER JOIN 역할을 한다는데 따라서 ON 절, WHERE 절, USING 절에서 JOIN 조건을 정의 할 수 없다.  

그리고 INNER JOIN과 다르게 동일한 칼럼명이면 하나의 칼럼으로 처리한다고 한다.  

참고로, ALIAS나 테이블명과 같은 접두사를 못 붙이며,
SQL SERVER에서는 지원을 안한다고 한다.

## USING 조건절

같은 이름을 가진 칼럼중에서 원하는 칼럼에 대해서만 선택적으로 진행한다는 뜻.(SQL SERVER 지원X)  

SELECT * FROM EMP JOIN DEPT USING (DEPTNO);

과 같은 형식으로 사용하면 동등 조건을 DEPTNO만 보고 출력한다는 뜻임.  
참고로 USING절도 NATURAL JOIN과 같이 별칭이나 접두사를 못붙인다고 한다.

## ON 조건절

NATURAL JOIN의 JOIN 조건이 같은 이름을 가진 모든 칼럼에 대해 동등 조건이지만, 임의의 JOIN조건을 지정하거나, 이름이 다른 칼럼명을 JOIN 조건으로 사용할때 ON 조건절을 사용한다.

SELECT * FROM EMP E JOIN DEPT D  
ON (E.DEPTNO = D.DEPT_NO);

DEPT_NO처럼 같은 역할인데 칼럼명이 다른 경우 사용한다는 뜻으로 바꿔둔거임.  

앞서 이전 포스팅에서 설명 한거 처럼 ON 절과 WHERE 절의 순서에 유의하며 사용해야함.

## CROSS JOIN

그냥 순수하게 생길 수 있는 모든 데이터 조합을 말한다.
CARTESIAN PRODUCT 또는 CROSS PRDUCT와 같은 표현으로 결과는 M*N건의 데이터 조합이 발생한다.

## OUTER JOIN

TAB1의 모든 값에 대해 TAB2의 데이터가 반드시 존재한다는 보장이 없는 경우, OUTER JOIN을 사용하고 데이터가 없는 곳에는 NULL로 표시해 조인해준다.  


### 가. LEFT OUTER JOIN

조인문의 왼쪽에 있는 테이블의 모든 결과를 가져 온 후 오른쪽 테이블의 데이터와 매칭하고, 매칭 데이터가 없는 경우 NULL을 표시한다.  

SELECT * FROM TB1 LEFT OUTER JOIN TB2  
ON TB1.NO = TB2.NO;

<ORACLE>
SELECT * FROM TB1, TB2  
WHERE TB1.NO = TB2.NO(+);

ORACLE을 SQLD 공부전에 안써봐서 몰랐는데 문제에 자주 출제 되더라  
오른쪽에 (+)있으면 LEFT OUTER JOIN.


### 나. RIGHT OUTER JOIN

당연히 LEFT OUTER JOIN 반대다 오른쪽으로 보면된다.(생략..)

<ORACLE>
SELECT * FROM TB1, TB2  
WHERE TB1.NO(+) = TB2.NO;

### 다. FULL OUTER JOIN

조인 시 좌측, 우측 테이블의 모든 데이터를 읽어 JOIN하여 결과를 생성한다. 

즉 LEFT JOIN,RIGHT JOIN연산후 UNION을 하여 중복을 제거 한 합집합이라 볼 수 있다.
