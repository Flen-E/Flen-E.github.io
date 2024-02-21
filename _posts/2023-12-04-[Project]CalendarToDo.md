---
layout: post
title:  "CalendarToDo #개발"
date:   2023-12-04 19:25:00 -0500
excerpt: "다음 프로젝트는 어떻게 기록을 남기며 진행 할지 더 자세히 설계를 하고 다져보도록 하겠다."
tags: CalendarToDo
category : [ToyProject 개발일지]

---

# [ToyProject] CalendarToDo #개발


## 시작하기 앞서
여태 팀프로젝트를 하면서 모든 프로젝트를 문서로 남겨오며 하는 연습을 하였지만 이게 제한 조건이 없는 나 혼자만의 프로젝트다 보니 나도 모르게 개발 진도를 남기지 않게 되었다.

글 쓸 시간에 하나라도 더 짜서 기능을 추가하면 어떨까? 라는 생각이 들기 일수 였고, markdown으로 글을 쓰려고 editor를 킬 때마다 이거만 추가하고 글을 써야지 하면서 손이 google검색창으로 가기 일수였다.

이게 프로젝트를 너무 작게 잡다 보니 이렇게 된게 아닌가 싶기도 하다. 정말 말 그래도 토이 프로젝트였기 때문이 아니였을까...

다음 프로젝트는 어떻게 기록을 남기며 진행 할지 더 자세히 설계를 하고 다져보도록 하겠다.

앞서 설계단계에서 잡았던 기능에 대한 설명과 함께 어떠한 라이브리러나 기술을 썻는지 적어보겠다.

## 1. 달력선택

처음 기획을 할 때 생각 했던 달력이다.
코드를 통해 현재 날짜를 가져온 다음 달력을 구현할 생각도 잠시 하였지만,
사실 웬만한 기능은 모두 라이브러리로 만들어 있기 마련이다.

![enter image description here](https://i.ibb.co/SVJkMMj/2023-12-04-200029.png)

npm 패키저에 있는 react-calendar가 당연하게도 있었고 달력은 이 라이브러리를 통해 해결하기로 하였다.
### 1.1 react-calendar
```
npm i react-calendar
```
간단한 명령어로 설치를 마치고,

    import  Calendar  from  "react-calendar";
import해주면 바로 달력을 쓸 수 있는 것이다.

[react-calendar - npm (npmjs.com)](https://www.npmjs.com/package/react-calendar)
해당 주소로 가면 react-calendar에 대한 자세한 가이드가 나오니 참고하면 된다.

이제 기본적으로 달력을 가져왔으면 우리에게 필요한 기능은 넣고 필요하지 않은 기능들을 제거해주면 된다.

### 1.2 달력 선택 기능들

react-calendar에서의 불필요한 기능들이 우리 프로젝트 진행에 많아 이를 제거해주도록 하겠다.

#### 추가 작업
-  달력 년도를 클릭 시 년도 선택 화면으로 가게 되는 기능 삭제
-  next2btn,prev2btn등 년 단위로 넘어가는 버튼 삭제
-  month 단위로 넘어가는 버튼과 기능 생성
-  기본적인 달력 크기 조절
-  주말에는 폰트색이 빨간색으로 조절
-  계획 의도와 맞는 폰트 다운
-  및 여러 styled작업들(배경, 달력 모양, 색, 마우스 hover 등등)

![enter image description here](https://i.ibb.co/F0cfXZG/2023-12-04-201614.png)

자잘한 여러 작업을 통하여 지금과 같이 귀여운 느낌의 달력을 얻을 수 있었다.

## 2. 날짜 선택

달력을 완성했으면 날짜를 선택 후 날짜 선택 시 원하는 trello page로 넘어가야한다.
우리가 이 행동을 취할 때 필요 한 것은 날짜이다.
날짜를 넘기면 해당 날짜와 중복될 일이 없으니 날짜를 키값으로 localStorage를 이용하여 저장도 할 수 있으며 trello Page에도 날짜를 출력 시킬 수 있는 점이 있다.

이는 `react-router-dom` 에 있는 useNavigate를 이용하여 page를 이동시키고 함께 date를 전달 시켜준다.
다음 Page에서는 useParam을 통해 받아오면 된다.

#### CalendarComponent.tsx

```
const  handleDateClick  = (value:  Date) => {
	const  formattedDate  =  value.toLocaleDateString().split("T")[0];
	navigate(`/date/${formattedDate}`);
};
```
#### DateDetailPage.tsx
```
const { date } =  useParams();
```

date로 받아오는 이유는 당연하게도 Route에 path="/date/:date"로 받아왔기 때문이다.

![enter image description here](https://i.ibb.co/x67LYYx/React-App-Microsoft-Edge-2023-12-04-22-04-52.gif)

## 3. Board 생성 및 Card생성

![enter image description here](https://i.ibb.co/W600yVX/React-App-Microsoft-Edge-2023-12-04-22-08-30.gif)

<br>

#### 기능
-  날짜 별 ToDoList
-  Board간의 이동
-  Board 생성 Modal
-  Card 생성
-  Card간의 이동

```
useEffect(() => {
	if (date) {
	const  storedToDoList  =  localStorage.getItem(date);
	const  toDoList  =  storedToDoList  ?  JSON.parse(storedToDoList) : [];
	setToDos(toDoList);
	}
}, [date]);
```

localStorage에 저장된 날짜에 해당하는 toDoList를 불러오는 과정이다.
밑에서 toDoList를 localStorage에 저장하는 법 또한 적도록 하겠다.

Board와 Card의 이동을 담당하는 함수이다.
<script src="https://gist.github.com/Flen-E/37b07440d0c0fdf9aa8bf9e7debcf5ab.js"></script>

이전에 설명을 했으니 생략하도록 하겠다.
if(info.type == "BOARD") 인 부분만 이해하면 될 것이다. 이 또한 응용이므로 생략하겠다.

(해당 코드 설명)
[Trello Clone Coding #3 – 최정재 (flen-e.github.io)](https://flen-e.github.io/CloneCoding-trello-clone-3/)

Modal창은 Popup.tsx를 만들어 ModalProps를 이용해주었다.
그리고 Board name을 정한 후 완료시 setToDos에 추가해주었다.

## 4. 그 외 trello Page 기능

#### 기능
-  해당 날짜의 trello 저장
-  해당 날짜의 trello 삭제
-  달력으로 이동

이제 Board를 만들고 Card를 만들었으면 localStorage에 저장을 해주어야한다.

이는 간단하게 구현할 수 있다.
우리는 날짜를 key값으로 toDos를 저장하기로 하였으니 
```
localStorage.setItem(date, JSON.stringify(toDos));
```
저장하는 데 지장 없게 코드를 구현하였기 때문에
localStorage에 그대로 저장해주면 그만 일 뿐이다.

삭제 또한 
```
localStorage.removeItem(date);
```
해당 날짜를 키 값으로 넣어 localStorage에서 삭제해주면 된다.

![enter image description here](https://i.ibb.co/PgG37SH/React-App-2-Microsoft-Edge-2023-12-04-22-36-05.gif)


## 일정 확인

이제 localStorage에 저장 되어있는 날짜를 이용하여 달력에 표시해주는 작업을 하도록 하겠다.

CalendarComponent.tsx에서 useEffect를 이용하여 

```
useEffect(() => {
	const  markedDates  =  Object.keys(localStorage);
```
모든 key들을 불러오고 key를 aria-label의 이름과 같은 형식으로 맞추어 달력의 날짜와 일치하는 것을 찾아낸다.
```
const  dateObject  =  new  Date(date.replace(/\./g, "/"));
// 월과 일을 가져와서 월은 0부터 시작하므로 1을 더해줌
const  year  =  dateObject.getFullYear();
const  month  =  dateObject.getMonth() +  1;
const  day  =  dateObject.getDate();
// 변환된 날짜를 문자열로 조합
const  formattedDate  =  `${year}년 ${month}월 ${day}일`;
// aria-label과 현재 달력의 날짜가 일치하는지 확인
const  tile  =  document.querySelector(`[aria-label="${formattedDate}"]`);
```

그리고 해당 날짜에 div를 만들어주어 내가 주고 싶은 포인트를 넣어 일정이 있음을 알려주면 된다.
이때 문제가 생기는 데 달력의 날짜를 옮기게 되면 rendering이 안되는 문제가 있어 달력의 prevLabel과 nextLabel에 onClick함수를 넣어주고 useEffect에 상태가 변경되면 다시 rendering 할 수 있게 추가 해주면 된다.

## 마무리

![enter image description here](https://i.ibb.co/sJYpPqh/React-App-2-Microsoft-Edge-2023-12-04-22-51-55.gif)

(이미지 올리기 free를 이용하다 보니 gif가 빠른 점 이해 바란다.)

정상적으로 동작을 하는 것을 볼 수 있다.
조금 더 공부하여 많은 기능을 사용해보고 익혀서 좋은 프로젝트로 돌아오도록 하겠다.

프로젝트 주소
https://flen-e.github.io/calendatodo/
