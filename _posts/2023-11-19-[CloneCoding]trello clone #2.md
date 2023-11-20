---
layout: project
title:  "Trello Clone Coding #2"
date:   2023-11-19 15:25:00 -0500
tags: react typescript trello
---

# Trello Clone Coding #2

## 시작하기 앞서

이전 포스팅에서는 Board를 하나로만 사용하였는데 이번에는 `to_do` `doing` `done` 3가지 Board로 나누어서 적용 해보도록 하겠다.

##  프로젝트 목표
![enter image description here](https://i.ibb.co/dgLFns0/53614150-efbed780-3c2c-11e9-9204-a5d2e746faca.gif)
  
 react-beautiful-dnd 에 나와있는 trello이다.

## 이전 포스팅에서의 부족한점

우리가 하고 싶은 것은 여러 `Board`에서 contents를 이동 해주는 것이기에 원하는 목표인 일정 관리 기능 (to_do, doing, done)인 3가지 Board로 나누어 주는 작업이 필요하다.<br>

<script src="https://gist.github.com/Flen-E/2a03cd78fd7e362b106e6a095b9ea24c.js"></script>

toDoState가 이전엔 그저 단지 array이지만 이제 우리는 3개의 `Board`가 필요하기 때문에 바꾸어 줄 것이다.
<script src="https://gist.github.com/Flen-E/2a03cd78fd7e362b106e6a095b9ea24c.js"></script>

우선 state를 object형식으로 바꾸어 준 다음 object는 각각의 `Board`가 가질 id를 만들어준다.<bR>

이전 `react-beautiful-dnd`포스팅에서 index의 item을 옮기는 방법을 배웠으니 array에서 다른 array로의 연결만 해주면 된다. 이는 나중 포스팅에서 알아보도록하고, 현재 `Board`가 바뀜으로` App.tsx`자체가 이전과 많이 달라져야 할 것이다.

#### why?
현재 App.tsx를 보면 Board에 map을 사용 중인데 map은 array 에서만 사용할 수 있는 기능이므로 구조 자체를 바꿔줘야 한다는 말이다.
지금의 toDos를 확인해보면
![enter image description here](https://i.ibb.co/CWzxjVD/2023-11-20-174602.png)

각각 String으로 이루어진 array 3개로 이루어 진 것을 알 수 있다.
`Boards`를 지워준후 `Board.tsx`라는 새로운 Component를 만들어 시작해보도록 하자.

## Board.tsx

<script src="https://gist.github.com/Flen-E/398468d1b7773f5e66b0d283ed32706b.js"></script>

App.tsx에 있던 Board를 잘라서 Board.tsx에 옮겨주도록 하자.
그리고 기존에 있던 Board 컨테이너는 이름이 겹치므로 Wrapper로 변경 해주었다.<br>

Board props에 필요한 정보는 toDos를 가져야 하고 그리고 이제 droppableId가 필요하다. 그래야 어떤게 움직일 Board인지 어디로 가야하는지 알 수 있기 때문이다.

```
<Droppable  droppableId={boardId}>
```
droppableId에 boardId를 주어 이제 재사용 가능한 board component가 생겼다.

이제 해결 할 문제는 object를 loop할 방법을 찾으면 board 3개와 board안에 item까지 출력 할 수 있을 것이다.

### 해결법

![enter image description here](https://i.ibb.co/dJ7qsTL/2023-11-20-184502.png)

간단한 코드 예제를 통해 알아보도록 하겠다.
현재 우리가 object toDos에 있는 x 와 y의 자식들을 까지 보게 되어 Board Component에 key, boardId, toDos를 전달해주면 된다.<br>

그러기 위해 Object.keys(toDos)를 통해  key를 뽑아준 다음
toDos['x'] 출력을 보면 x의 자식들을 출력함을 알 수 있다.<br>
이제 이를 활용하여 코드를 짜주게 되면 원하는 값들을 가져올 수 있다.

<script src="https://gist.github.com/Flen-E/a914281995e7754d6d3573f69f1db1e9.js"></script>

App.tsx코드를 바꾸어 주었다.
하지만 우린 Typescript를 사용하고 있으므로 toDos boardId는 string이 아니라고 에러를 보여 줄 것이다.
<br>

### atoms.tsx
<script src="https://gist.github.com/Flen-E/e50bf8fa21d7a8350a32330f87219fbb.js"></script>

interface를 생성하여 타입을 지정해주면 해결된다. 하지만 우리가 더 나아가 유저가 board를 만들 경우 까지 생각해서 toDoState는 단지 key이고 key는 string이고 해당 key는 string으로 이루어진 array를 가질 거라고 정의 해주었다.

## 마무리
그리고 styled를 조금 건들여 주면 지금과 같은 화면을 얻을 수 있다.

![enter image description here](https://i.ibb.co/8XmZ7j5/2023-11-20-185549.png)

하지만 우리가 해주던 재배열을 주석 처리 해주었기에 이동이 안되는 것을 볼 수 있다. 다음 포스팅 때 이어서 하도록 하자.
