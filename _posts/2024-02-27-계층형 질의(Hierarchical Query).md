---
layout: post
title:  "[SQLD] 계층형 질의(Hierarchical Query)"
date:   2024-02-27 11:20:00 -0500
excerpt: "계층형 질의에 대해서 알아보자"
tags: SQLD
category : [ SQLD ]
---

# 계층형 질의 (Hierarchical Query)

말 그대로다. 계층형 데이터를 다루는 쿼리를 수행하는 것이다.  

계층형 데이터는 뭘까?

### 계층형 데이터  
동일한 테이블에 계층적으로 상위와 하위 데이터가 포함되어진 데이터  

예를 들면 사원 테이블에 사원들마다 직급과 관리자 or 직속상관들이 있기 마련이다.  
여기서 사원들의 직급이 하위데이터, 상관이 상위데이터가 되는 것을 의미한다.  


## Oracle 계층형 질의

**계층형 질의 구문**  

```
SELECT ...
    FROM ...
    WHERE 조건
    START WITH 조건
    CONNECT BY [ NOCYCLE ] 조건
        [ ORDER SIBLINGS BY 컬럼명1, 컬럼명2 ... ] ;
```

- START WITH : 계층 구조 전개의 시작 위치를 정하는 구문. (루프 데이터 지정)
- CONNECT BY : 다음 전개될 자식 데이터를 지정하는 구문.(자식 데이터는 CONNECT BY절에 주어진 조건에 만족해야함.)
- PRIOR : CONNECT BY 절에 사용되며, 현재 읽은 칼럼을 지정해줌.
  - PRIOR 자식 = 부모
    - 부모 => 자식 방향으로 순방향 전개
  - PRIOR 부모 = 자식
    - 자식 => 부모 방향으로 역방향 전개
- NOCYCLE : 데이터 전개 도중 동일 데이터가 전개 중에 다시 나타나면 사이클(CYCLE)이 형성 된다.  
사이클이 발생한 데이터는 런타임 오류를 발생시킨다. 이를 해결하기 위해 NOCYCLE을 추가해주면 사이클 발생이후 데이터는 전개하지 않는다.  
- ORDER SIBLINGS BY : 형제 노드 사이에서 정렬을 수행
- WHERE : 모든 전개 수행 후 지정된 조건을 만족하는 데이터만 추출.

또한 오라클은 계층형 질의를 사용할 때 다음과 같은 가상 칼럼을 제공한다.

**주로 사용되는 가상 칼럼**

- LEVEL : 전개 과정에서 루트 데이터면 1, 그 하위 데이터면 2, 루트에서 리프로 내려갈 때 1씩 증가.
- CONNECT_BY_ISLEAF : 전개 과정에서 리프 데이터면 1, 그렇지 않으면 0.
- CONNECT_BY_ISCYCLE : 전개 과정에서 자식이 존재하면 1, 그렇지 않으면 0. CYCLE기능 사용할 때만 사용 가능.


### 사원 테이블
예시로 사원 테이블을 가져왔다.

<a href="https://imgbb.com/"><img src="https://i.ibb.co/7vbRZ9d/1.png" alt="1" border="0"></a>

사원 테이블을 보면 '사원이름' 과 ' 직속상관' 컬럼은 계층형 데이터이다.  



### 순방향 쿼리

```
SELECT LEVEL, 사원이름, 직속상관, 직급, 월급
  FROM 사원
  START WITH 직속상관 IS NULL
  CONNECT BY PRIOR 사원이름 = 직속상관
  ORDER SIBLINGS BY 월급 DESC;
```

`START WITH 직속상관`을 줘서 '직속상관' 컬럼을 루트데이터로 지정하고, IS NULL 조건을 통해  
직속상관이 없는 사원부터 데이터 전개가 시작되어 진다.  
위 테이블에서의 직속상관이 없는 직급은 사장이고 사장부터 데이터가 전개가 시작된다.  
`CONNECT BY PRIOR 사원이름 = 직속상관` 을 통해 직속상관(부모)에서 사원이름(자식) 으로 순방향 전개가 시작되어 진다.  
`ORDER SIBLINGS BY 월급 DESC`를 통해서는 전개 중 동일 LEVEL에서 월급을 이용하여 내림차순으로 정렬을 해주었다.

**결과**

<a href="https://imgbb.com/"><img src="https://i.ibb.co/yhqkdy2/2.png" alt="2" border="0"></a>

### 역방향 쿼리

```
SELECT LEVEL, 사원이름, 직속상관, 직급, 월급
  FROM 사원
  START WITH 사원이름 = '최정재'
  CONNECT BY PRIOR 직속상관 = 사원이름;
```

`START WITH 사원이름 = '최정재'`을 줘서 사원이름이 최정재인 사원부터 전개를 시작한다.  
`CONNECT BY PRIOR 직속상관 = 사원이름`을 통해 사원이름(자식)에서 직속상관(부모) 으로 역방향 전개가 시작되어 진다.  

**결과**

<a href="https://imgbb.com/"><img src="https://i.ibb.co/cLxnbFN/3.png" alt="3" border="0"></a>

---

ORACLE은 계층형 질의를 사용할 때 사용자 편의성을 위해 계층형 질의 함수를 제공한다.

### 계층형 질의 함수

- SYS_CONNECT_BY_PATH(컬럼명, 경로분리기호) : 루트 데이터로부터 현재 위치까지 전개할 데이터의 경로를 표시.
- CONNECT_BY_ROOT(컬럼명) : 현재 전개할 데이터의 루트 데이터를 표시.

### 계층형 질의 함수를 사용한 쿼리
 
 ```
 SELECT LEVEL, 
        사원이름, 
        직속상관, 
        직급, 
        월급,
        SYS_CONNECT_BY_PATH(사원이름, '/') 직급경로,
        CONNECT_BY_ROOT(사원이름) 최상위사원
  FROM 사원
  START WITH 직속상관 IS NULL
  CONNECT BY PRIOR 사원이름 = 직속상관
  ORDER SIBLINGS BY 월급 DESC;
 ```

`SYS_CONNECT_BY_PATH(사원이름, '/')` 를 이용하여 루트데이터인 직속상관 IS NULL 부터 현재 위치까지 전개할 데이터 경로를 표시.  
`CONNECT_BY_ROOT(사원이름)`를 이용하여 최상위 데이터를 표시.

**결과**

<a href="https://ibb.co/fxcR0x0"><img src="https://i.ibb.co/P6SpC6C/4.png" alt="4" border="0"></a>

