---
layout: post
title:  "[SQLD] 윈도우 함수 (WINDOW FUNCTION)"
date:   2024-02-23 11:20:00 -0500
excerpt: "윈도우 함수의 종류와 그에 대해서 알아보자"
tags: SQLD
category : [ SQLD ]
---

## WINDOW FUNCTION 개요

SQL의 윈도우 함수란 행과 행 간을 비교, 연산, 정의하기 위한 함수.  
분석함수 OR 순위함수라 불린다.  
다른 함수들처럼 중첩해 사용은 불가능하지만 서브쿼리에서의 사용은 가능하다.  

## WINDOW FUNCTION 종류

|구분|함수|비교|
|---|---|---|
|순위함수|RANK, DENSE_RANK, ROW_NUMBER||
|일반 집계 함수|SUM, MAX, MIN, AVG, COUNT|SQL SERVER에서는 OVER 절 내에서 ORDER BY 지원 X|
|그룹 내 행 순서 함수|FIRST_VALUE, LAST_VALUE, LAG, LEAD|SQL SERVER 지원 X|
|그룹 내 비율 함수|RATIO_TO_REPORT, PERCENT_PANK, CUM_DIST, NTILE|NTILE 제외 SQL SERVER 지원 X|


## WINDOW FUNCTION 문법

```
SELECT WINDOW_FUNCTION (ARGUMENTS) OVER  
([PARTITION BY 컬럼] [ORDER BY 컬럼] [WINDOWING 절])  
FROM 테이블명 ;
```

- WINDOW_FUNCTION : 윈도우 함수
- ARGUMENTS(인수) : 함수에 따라 들어가는 인수 0~N개
- PARTITION BY절 : 전체 집합을 기준에 의해 소그룹으로 나눔.
- ORDER BY 절 : 어떤 항목에 대해 순위를 지정할 지..
- WINDOWING 절 : 함수의 대상이 되는 행 기준의 범위를 강력하게 지정(SQL SERVER 지원X)

## 순위 함수

### RANK
PARTITION을 이용하여 특정 그룹 내에서 순위를 구할 수도 있고, 전체 데이터에 대한 순위도 구할 수 있다.

동일한 값에 대해선 동일한 순위를 부여한다.

**순위**  
1-1-3-4-5-5-5-8-9-10

### DENSE_RANK
RANK와 흡사하나 동일한 순위를 하나의 건수로 취급함

**순위**  
1-1-2-3-4-4-4-5-6-7

### ROW_NUMBER

RANK,DENSE_RANK와 달리 동일한 값이라도 고유한 순위를 부여한다.  

**순위**
1-2-3-4-5-6-7-8-9-10

## 일반 집계 함수

SUM, MAX, MIN, AVG, COUNT 사용법은 아니 생략하고,  
OVER과 같이 쓰는 구문 WINDOWING 절에 대해 알아보자.  

WINDOWING 절을 사용하면 윈도우 함수에 포함시킬 로우 조건(범위)를 지정 할 수 있다. 크게 ROWS와 RANGE를 사용할 수 있다.

**ROWS** : 현재 ROW 위치에서의 물리적인 범위(행의 순서)  
**RANGE** : 현재 ROW 값을 기준으로 논리적인 범위(데이터 값의 크기와 순서)  

보통은 PARTITION BY ~ ORDER BY ~ RANGE/ROWS UNBOUNDED PRECEDING (BETWEEN CURRENT ROW) 형식으로 사용한다.

BETWEEN CURRENT ROW는 생략이 가능하며 현재 행이 아닌 맨 마지막 행을 끝 위치로 표현하고 싶으면 AND UNBOUNDED FOLLOWING을 사용해주면 된다.  

현재 행을 기준으로 위치를 N개만큼 지정도 가능하다.

말로만 디디디딕 적어놓아봤자 이해 하기 어렵다. 예시를 통해 알아보자.  

<a href="https://ibb.co/3B2P99j"><img src="https://i.ibb.co/YpmVFF1/1.png" alt="1" border="0"></a>

<a href="https://ibb.co/CbF066z"><img src="https://i.ibb.co/c6dTww1/2.png" alt="2" border="0"></a>

정확한 결과를 보이기 위해 타이핑 대신 사진을 가져왔다.

RANGE UNBOUNCED PRECEDING 은 RANGE BETWEEN UNBOUNCED PRECEDING AND CURRENT ROW와 같은 표현식이다.

현재는 N의 값으로 비교한 것이 없기에 RANGE든 ROW든 똑같은 값이 나온다.

<a href="https://ibb.co/dcCjks1"><img src="https://i.ibb.co/RSrYQGZ/3.png" alt="3" border="0"></a>

CURRENT ROW가 아닌 마지막 행까지 비교하고 싶다면 UNBOUNDED FOLLOWING을 사용하면 된다.  

이제 N값을 사용하여 범위에 따른 결과를 보고 RANGE와 ROW 차이를 느껴 봐보자.  
(위에 내용은 RANGE나 ROW나 똑같다)

<a href="https://ibb.co/T2K6Pqh"><img src="https://i.ibb.co/LRQm9hp/4.png" alt="4" border="0"></a>

ROW를 사용 하게 되면 1 PRECEDING으로 인해 현재 행에서 앞으로 1 행,  
 2 FOLLOWING으로 인해 현재 행에서 뒤로 2행까지의 값들의 합이 출력되는 것을 확인 할 수 있다.  

<a href="https://ibb.co/mTZVCnb"><img src="https://i.ibb.co/jf0PvCb/5.png" alt="5" border="0"></a>

RANGE를 사용하게 되면 현재 행으로 부터 값의 크기를 비교하게 되는데,  
600 PRECEDING으로 인해 현재 행값에서 -600인 값부터,  
400 FOLLOWING으로 인해 현재 행값에서 +400인 값까지의 합을 출력하는 것을 확인 할 수 있다.  

## 그룹 내 행 순서 함수

### FIRST_VALUE

파티션별 윈도우에서 가장 먼저 나온 값을 구한다. 공동 등수를 인정하지 않고 맨 처음 나온 행을 가져온다.

### LAST_VALUE

FIRST_VALUE 반대로 가장 마지막에 나온 값을 구한다.

### LAG

이전 몇 번째 행의 값을 가져오는 함수이다.

LAG(A, B, C) 형태로 사용한다.  
A : 사용될 칼럼  
B : B번째 앞의 행(생략시 1번째 앞의 행)
C : B번째 앞의 행이 없을 경우 DEFAULT값으로 C로 지정
(생략시 NULL)

### LEAD

이후 몇 번째 행의 값을 가져오는 함수로 LAG와 반대


## 그룹 내 비율 함수

### RATIO_TO_REPORT

파티션 내의 주어진 칼럼 값의 합계에 대한 행별 백분율을 소수점으로 출력한다.  
결과값은 0 <= Y <=1이며 개별 비율의 합을 구하면 1이다.  

```
SELECT ENAME, SAL
     , ROUND(RATIO_TO_REPORT(SAL) OVER (), 2) as R_R 
  FROM EMP 
 WHERE JOB = 'SALESMAN'; 
```

|ENAME|SAL|R_R|
|---|---|---|
ALLEN|1600| .29|
WARD| 1250| .22|
MARTIN| 1250| .22|
TURNER| 1500 |.27|

### PERCENT_RANK
파티션별로 가장 먼저 나온값을 0, 마지막 나온값을 1로 해서 행 순서별 백분율을 출력한다.  
(구간별 백분율.)

```
SELECT DEPTNO, ENAME, SAL
     , PERCENT_RANK() OVER (PARTITION BY DEPTNO ORDER BY SAL DESC) as P_R 
  FROM EMP; 
```

|DEPTNO |NAME|SAL|    P_R|
|---|---|---|---|
|10 |KING             |5000|          0|
|10 |CLARK            |2450|         .5|
|10 |MILLER           |1300|          1|
|20 |SCOTT            |3000|          0|
|20 |FORD             |3000|          0|
|20 |JONES            |2975|         .5|
|20 |ADAMS            |1100|        .75|
|20 |SMITH             |800|          1|
|30 |BLAKE            |2850|          0|
|30 |ALLEN            |1600|         .2|
|30 |TURNER           |1500|         .4|
|30 |MARTIN           |1250|         .6|
|30 |WARD             |1250|         .6|
|30 |JAMES             |950|          1|

(RANK와 같은 느낌으로 동일 값이면 동률을 보여준다. EX) 0 -> 0 -> 0.5 -> 0.75 -> 1)

### CUME_DIST

파티션별 전체건수에서 현재 행보다 작거나 같은 건수에 대한 누적백분율을 구한다.  

PERCENT_RANK와 흡사하여 착각 할 수 있으니 주의.  


```
SELECT DEPTNO, ENAME, SAL
     , CUME_DIST() OVER (PARTITION BY DEPTNO ORDER BY SAL DESC) as CUME_DIST 
  FROM EMP; 
```


|DEPTNO |ENAME             |SAL  |CUME_DIST|
|---|---|---|---|
|10| KING             |5000| .333333333|
|10| CLARK            |2450| .666666667|
|10| MILLER           |1300    |      1|
|20| SCOTT            |3000      |   .4|
|20| FORD             |3000     |    .4|
|20| JONES            |2975      |   .6|
|20| ADAMS            |1100    |     .8|
|20| SMITH             |800       |   1|
|30| BLAKE            |2850| .166666667|
|30| ALLEN            |1600 |.333333333|
|30| TURNER           |1500  |       .5|
|30| MARTIN           |1250| .833333333|
|30| WARD             |1250 |.833333333|
|30| JAMES             |950    |      1|

### NTILE

파티션별 전체 건수를 ARGUMENT값으로 N등분한 결과를 출력한다.

```
SELECT ENAME, SAL
     , NTILE(4) OVER (ORDER BY SAL DESC) as QUAR_TILE 
  FROM EMP ;
```

|ENAME| SAL | QUAR_TILE|
|---|---|---|
|KING |            5000|          1|
|FORD    |         3000 |         1|
|SCOTT    |        3000  |        1|
|JONES     |       2975   |       1|
|BLAKE      |      2850    |      2|
|CLARK       |     2450     |     2|
|ALLEN        |    1600      |    2|
|TURNER        |   1500|          2|
|MILLER |          1300 |         3|
|WARD    |         1250  |        3|
|MARTIN   |        1250   |       3|
|ADAMS     |       1100    |      4|
|JAMES      |       950     |     4|
|SMITH       |      800      |    4|

전체 건수를 4등분한 결과이다

14개를 4로 나누면 3 나머지는 2라서, 나머지 2는 앞의 조부터 할당으로 4, 4, 3, 3개씩 나눠진다.

