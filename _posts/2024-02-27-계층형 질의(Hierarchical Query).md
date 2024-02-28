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
    - 부모 => 자식 방향으로 순방향
    - 