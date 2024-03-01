---
layout: post
title:  "[SQLD] PIVOT, UNPIVOT"
date:   2024-02-29 11:20:00 -0500
excerpt: "PIVOT과 UNPIVOT 사용법과 예제를 통해 알아보자."
tags: SQLD
category : [ SQLD ]
---

이번 2024년도 SQLD에 추가된 PIVOT 절과 UNPIVOT 절에 대해서 알아보도록 하겠다.  
PIVOT, UNPIVOT 내용은 노랭이 개정판에도 추가되지 않아 어떤 느낌의 문제가 나올지 감이 잡히진 않지만 쓰는 방법을 알면 문제도 풀 수 있지않을까?

# ORACLE에서의 PIVOT, UNPIVOT 

## PIVOT 

- PIVOT은 행 데이터를 열 데이터로 변환하는 것.  
일반적으로 특정 열을 기준으로 집계를 수행하고 이를 새로운 열로 표현함.  
- PIVOT은 특정 열의 고유한 값에 따라 행을 그룹화하고 이를 새로운 열로 변환함.  
- 예를 들어, 날짜별 판매량으로 집계 할 때, PIVOT을 사용하여 날짜를 열로 변환하고 날짜에 대한 판매량을 표시 할 수 있다.  

### 원본 데이터

<a href="https://imgbb.com/"><img src="https://i.ibb.co/rMpFyHZ/2.png" alt="2" border="0"></a>

### PIVOT을 이용한 SQL문

```
SELECT *
    FROM (
        SELECT 상품, 날짜, 판매량
            FROM SALES
        ) 
    PIVOT (
        SUM(판매량)
            FOR 날짜 IN ('2024-02-01','2024-02-02')
    );
```

### 결과

<a href="https://imgbb.com/"><img src="https://i.ibb.co/sWdg9PQ/3.png" alt="3" border="0"></a>

## UNPIVOT

이름과 같이 PIVOT과 반대로 동작을 수행함. (반대 연산자는 아님 집계 함수를 사용한 PIVOT 테이블을 UNPIVOT 한다고 원래대로 안돌아감.)
열을 행으로 변환한다는 뜻.  

### 원본 데이터

<a href="https://imgbb.com/"><img src="https://i.ibb.co/Y8XKk1n/4.png" alt="4" border="0"></a>

### UNPIVOT을 이용한 SQL문

```
SELECT * 
    FROM SEASON
    UNPIVOT(
        할인률 
            FOR 계절 IN (봄, 여름, 가을, 겨울)
    );
```

### 결과

<a href="https://imgbb.com/"><img src="https://i.ibb.co/XVjyPYq/5.png" alt="5" border="0"></a>

