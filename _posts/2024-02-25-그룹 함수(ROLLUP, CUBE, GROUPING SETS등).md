---
layout: post
title:  "[SQLD] 그룹 함수와 관련된 확장 기능 (ROLLUP, CUBE, GROUPING SETS)"
date:   2024-02-25 12:20:00 -0500
excerpt: "그룹화 확장 기능인 ROLLUP, CUBE, GROUPING SETS에 대해 알아보자"
tags: SQLD
category : [ SQLD ]
---


GROUP BY 절에 쓰이는 ROLLUP, CUBE, GROUPING SETS 등 다양한 그룹 함수와 관련된 기능들을 알아보도록하겠다.

## 초기 데이터

일단 데이터는 예외들을 보여주고 완전히 익힌다는 목적으로 헷갈리게 넣은 점 유의하길 바란다.

<a href="https://imgbb.com/"><img src="https://i.ibb.co/mbfpb55/25-1.png" alt="25-1" border="0"></a>

데이터를 7개를 집어 넣은 테이블을 가지고 예시를 보며 공부해보도록 하자.  

## GROUP BY 절

흔히들 사용하는 GROUP BY 절이다.  
이번에는 상품ID별로 나 날짜 별로 묶는 것이 아닌 상품ID와 날짜에 대해 매출액의 합계를 나타내보았다.

```
SELECT 상품ID, 날짜, SUM(매출액) 매출액
    FROM 상품
    GROUP BY 상품ID, 날짜;
```

<a href="https://imgbb.com/"><img src="https://i.ibb.co/qs1zhRh/25-2.png" alt="25-2" border="0"></a>

상품ID,날짜로 그룹하여 P1 11월들이 그룹화되어 매출액이 합해진것을 확인 할 수 있다.  


# ROLLUP

ROLLUP함수는 소그룹간의 합계를 계산하는 함수이다. ROLLUP을 사용하게 되면  
1.첫번째 인자(상품ID)별 두번째인자(날짜)  
2.첫번째 인자(상품ID)별 두번째 인자(날짜)의 소계(SUBTOTAL)  
3.() -> 총계(GRAND TOTAL)  
의 결과가 나온다.

따라서 ROLLUP함수는 인자들의 순서에 영향을 받게 된다.

```
SELECT 상품ID, 날짜, SUM(매출액) 매출액
    FROM 상품
    GROUP BY ROLLUP(상품ID, 날짜)
```

<a href="https://imgbb.com/"><img src="https://i.ibb.co/PYS5T9F/25-3.jpg" alt="25-3" border="0"></a>

인자 순서를 다르게 한다면 당연히 값도 달라지는 것을 확인 할 수 있다.

```
SELECT 상품ID, 날짜, SUM(매출액) 매출액
    FROM 상품
    GROUP BY ROLLUP(날짜, 상품ID)
```

<a href="https://imgbb.com/"><img src="https://i.ibb.co/BgSzV9P/25-4.jpg" alt="25-4" border="0"></a>

아까와 반대로 
1. 첫번째 인자(날짜) 별 두번째 인자(상품ID)  
2. 첫번째 인자(날짜) 별 두번째 인자(상품ID)의 소계  
3. () -> 총계  

의 결과가 나오게 된다.

```
SELECT 상품ID, 날짜, SUM(매출액) 매출액
    FROM 상품
    GROUP BY ROLLUP(상품ID), 날짜
```

같은 경우도 알아두면 좋다.  

<a href="https://imgbb.com/"><img src="https://i.ibb.co/FHvsv9W/25-5.jpg" alt="25-5" border="0"></a>

더 이해하기 쉽게 설명하자면
1. GROUP BY (상품ID), 날짜
2. GROUP BY 날짜

형식으로 ROLLUP안에 부터 없애면서 GROUP BY 해주면 된다.  

이제 응용을 해보자.  

**GROUP BY 인자가 3개라면??**  

**GROUP BY ROLLUP(COL1, COL2, COL3)**
1. COL1, COL2, COL3
2. COL1, COL2
3. COL1
4. 총계

<a href="https://ibb.co/NYwYkyQ"><img src="https://i.ibb.co/ysLsMQG/25-6.jpg" alt="25-6" border="0"></a>

**GROUP BY ROLLUP(COL1, (COL2, COL3))**
1. COL1, (COL2, COL3)
2. COL1
3. 총계

<a href="https://ibb.co/pv5FCbC"><img src="https://i.ibb.co/99S5RcR/25-8.jpg" alt="25-8" border="0"></a>

**GROUP BY COL1, ROLLUP((COL2,COL3))**
1. COL1, (COL2,COL3)
2. COL1

<a href="https://imgbb.com/"><img src="https://i.ibb.co/nkChpLc/25-7.jpg" alt="25-7" border="0"></a>

(괄호 실수로 빼먹음 COL1,(COL2,COL3))

이런식으로 출력이 된다는 뜻이다.

이정도면 어떤 문제가 나와도 이해하고 해결 할 수 있을 거라 생각한다.(응용이니깐~)

# CUBE

CUBE 함수는 항목들 간의 다차원적인 소계를 계산한다.  
 ROLLUP과 달리 모든 컬럼에 대해 소그룹 합계를 계산해주기에 순서는 상관이 없다.

```
SELECT 상품ID, 날짜, SUM(매출액) 총계
    FROM 상품
    GROUP BY CUBE(상품ID, 날짜)
```

<a href="https://imgbb.com/"><img src="https://i.ibb.co/gwL2Rfq/25-9.jpg" alt="25-9" border="0"></a>

아까 위에 열심히 설명 한거 처럼 CUBE도 똑같이 적용되기에,

```
SELECT 상품ID, 날짜, SUM(매출액) 총계
    FROM 상품
    GROUP BY 상품ID, CUBE(날짜)
```

```
SELECT 상품ID, 날짜, SUM(매출액) 총계
    FROM 상품
    GROUP BY 상품ID, ROLLUP(날짜)
```

똑같은 값이 출력된다.

야매지만,
CUBE는 ROLLUP에서 순서 바뀐게 포함된다 생각하면 됨.(모든 경우의 수)


# GROUPING SETS

특정 항목에 대한 소계를 계산하는 함수이다.  

여태 위에 설명을 묶어서 한 이유가 바로 이 GROUPING SETS와 연관시키기 위해서도 있다.  
얘는 말 그대로 우리가 특정한 항목에 대해서만 소계를 계산해준다.  

```
SELECT 상품ID, 날짜, SUM(매출액) 총계
    FROM 상품
    GROUP BY GROUPING SETS(상품ID, 날짜)
```

<a href="https://imgbb.com/"><img src="https://i.ibb.co/HC62GD9/25-10.jpg" alt="25-10" border="0"></a>

여태 그렸던 것들이 이제 떠오르면서 ROLLUP과 CUBE에 어떻게 맞춰야 할지 감이 올 것이다.

1. ROLLUP(상품ID, 날짜) -> GROUPING SETS((상품ID,날짜), 상품ID, ())
2. CUBE(상품ID, 날짜) -> GROUPING SETS((상품ID, 날짜), 상품ID, 날짜, ())

이제 배운 것들을 응용하여 SQLD 문제를 풀어주면 될 거 같다.



