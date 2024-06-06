---
layout: post
title:  "CalendarToDo #기획"
date:   2023-11-28 19:25:00 -0500
excerpt: "ToyProject를 시작하기 앞서 기획을 짜보도록하자"
tags: CalendarToDo
category : [ToyProject 개발일지]
---

# [ToyProject] CalendarToDo #기획


## 1. 요구분석

### 1.1 문제 정의
업무 일정과 관리를 조금 더 체계적이고 사용자 친화적이고<br> 자유도가 높은 일정 관리 프로그램이 있다면 좋겠다고 생각하여 제작하게 되었다.

### 1.2 요구사항

|구분|요구사항|
|---|---|
|1| 날짜를 선택 할 수 있는 달력이 존재해야함|
|2| 선택한 날짜를 클릭 시 trello화면이 나와야함|
|3| trello에는 사용자가 Board를 만들 수 있어야함|
|4| ... card 생성이 가능하며 교차가 되어야함|
|5| 해당 날짜에 기록이 있다면 달력에 표시 되어야함|

## 2. 목표 시스템 정의

### 2.1 기능

| 구분 | 기능명 | 동작 | 결과|
|---|---|---|---|
|1| 달력 선택 | 달력 넘기기버튼 클릭 | 다음 달로 넘어감|
|2| 날짜 선택 | 해당 날짜를 클릭 | 날짜에 해당하는 trello페이지로 넘어감|
|3| Board 생성 | trello에서 board생성| Board가 생성|
|4| Card 생성 | board에서 card생성| card(할일)이 생성|
|5| 일정 확인 | trello생성 | 달력에 일정이 있음을 알림|

### 2.2 예상 사용자 인터페이스

![enter image description here](https://i.ibb.co/w7FZbZC/2023-11-28-172149.png)

출처 : [빨간색, 달력, 캘린더, 일정, 세미나 웹디자인 콘텐츠몰 - 스타코어 (stacore.co.kr)](https://stacore.co.kr/webuser/product/view.html?pr_id=11595)

![enter image description here](https://i.ibb.co/yQTBLW0/2023-11-28-172314.png)

## 3. 기존 시스템

#### Trello
트렐로는 웹기반의 프로젝트 관리 소프트웨어이다.

![enter image description here](https://i.ibb.co/PchR40p/Boards-2x.png)


## 4. 사용 예정 기술과 예상 개발방법
- React를 사용하여 Front-end개발
- local Storage를 활용해 정보 저장
- react-calendar를 활용해 달력 생성 및 확장
- styled-component를 이용해 쉽게 css 꾸미기
- react-router-dom을 이용해 페이지 이동
- recoil을 활용하여 상태관리
- react-beautiful-dnd를 활용하여 todo 설계
- typeScript를 이용하여 보다 더 안정적인 개발

## 5. 진행 일정
목표는 한달간의 ToyProject로 진행한다. <br>이번 프로젝트는 팀원간의 협업이 아닌 자기개발을 위한 Project인 관계로 일정이 조금 당겨 질 수 있다는 점.

크게 기획 - 디자인 - 개발 - 시연 으로 나눌 것이다.<br>

이미 기획과 디자인은 잡혀있는 상태로 진행되는 프로젝트로 개발에 상세하게 일정을 잡도록 하겠다.

### 기능 일정
![enter image description here](https://i.ibb.co/88bQ040/2023-11-28-173205.png)

앞서 디자인과 기획, 후에 시연과 보완할 점을 추가하여 프로젝트 일정을 잡았다.<br>

## 6. 산출물
산출물은 계속 현재 진행 현황에 대해 블로그에 기록을 하기로 하겠다. 
