---
layout: post
title:  "Trello Clone Coding #3"
date:   2023-11-20 19:25:00 -0500
excerpt: "item들을 서로 Drag and Drop시켜보자"
tags: react typescript trello
project: true
---

# Trello Clone Coding #3

## 시작하기 앞서

이전 포스팅에 이어 이번 포스팅에서는 다시 object의 item들을 옮기는 작업을 다시 해주도록 하겠다.<br>
더 나아가 같은 Board에서 뿐 아니라 다른 Board로의 이동도 같이 해 볼 생각이다.<br>

##  프로젝트 목표
![enter image description here](https://i.ibb.co/dgLFns0/53614150-efbed780-3c2c-11e9-9204-a5d2e746faca.gif)
  
 react-beautiful-dnd 에 나와있는 trello이다.<br>

## 이전 포스팅에서의 부족한점
앞서 말한 대로 `Board` item의 재배열과 간단한 styled작업을 추가로 해주도록 하겠다.<br>
Board에서 다른 `Board`로 item을 옮기는 작업까지 같이 해주도록 하겠다.

이전 포스팅인 `react-beautiful-dnd 사용하기` 

[react-beautiful-dnd 사용하기 – 최정재 (flen-e.github.io)](https://flen-e.github.io/react-beautiful-dnd/)

를 통해서 다시 복습을 한 후 보기를 바란다.

기본적인 구조로 `DragDropContext와 Droppable, Draggable`이 존재하는데,<br>
`DragDropContext`에서 필수적으로 필요로 하는 prop인 `onDragEnd`는 자식 컴포넌트와 드래그를 끝낸 시점에서 불려지는 함수를 뜻한다.

### 복습
onDragEnd에 원하는 함수를 넣으면 드래그 드랍에 할 때 이용할 함수를 넣어 줄 수 있다는 뜻이다.

    const onDragEnd = (info : DropResult) =>{
	    console.log(info);
    };

복습하는 셈 치고 다시 한번 더 연습해보도록 하자.<br>

![enter image description here](https://i.ibb.co/zQFymZL/2023-11-21-203310.png)

현재 우리가 만든 trello 이다<br> 
여기서 "Doing"에 있는 item `c`를 "To Do"의 item `a`밑으로 보내보도록 하자

![enter image description here](https://i.ibb.co/fQQxbTr/2023-11-21-203258.png)

우린 DropResult `info`를 출력 해보았다.<br>
여기서 알 수 있듯이 출발지인  `source`에서 `droppableId`가 "Doing"인 곳에서 index가 0이였던 item `c`를 가리키고,<br>
목적지인 `destination`에서 `droppableId`가 "To Do"인 index가 1번째 자리인 곳을 가리키고 있음을 알 수 있다.<br>
그곳에 `draggableId`인 `c`가 가려했다는 것을 얻을 수 있다.<br>
이제 `info`에 담긴 정보를 알아보았으니 해당 정보를 이용해주기만 하면 해결된다.

##  item 옮기는 것을 해결해보자
우리에게 필요한 정보는 destination, draggableId, source가 있다.<br>

    const {destination, draggableId, source} = info; 

원하는 정보를 info에서 가져오도록 한다.<br>
그리고 3개의 절차로 나누어 코드를 짜보도록 하자.<br>
처음에는 목적지가 없을 때는 변화가 없어야 한다.<br>

    if(!destination) return;
<br>

두번째로는 같은 보드에서의 이동이다.<br>
이는 지난 react-beautiful-dnd포스팅에서 다루었지만<br> 다른 점이 있다면 이제 바로 배열을 가져오는 것이 아닌 <br>어떤 보드인지 알고 해당 보드 배열을 가져올 것이다.

    if(destination?.droppableId === source.droppableId){
	    //same board movement.
	    setToDos((allBoards) =>{
		    const boardCopy = [...allBoards[source.droppableId]];
		});
	}

먼저 `boardCopy`에 해당 `Board`를 가져온 다음 이전과 같은 방식으로 `source.index`를 자르고 원하는 위치(destination.index)에 넣어 준 후 리턴해주는 방식이다.<br>
리턴은 한 보드만 바뀌었으니 ...allBoards 와<br>
"Doing" 보드에서 바뀌었으면 "Doing" : boardCopy형식이 되면 되니,<br>
[source.droppableId] : boardCopy를 리턴해주면 된다.

<script src="https://gist.github.com/Flen-E/c8326ded252a6bc0b620522ff98fc142.js"></script>

<br>
세번째는 다른 보드로의 이동인데 이는 위에 문제에 목적지만 더 생각해주면 되는 방식이다.<br>


똑같이 `sourceBoard`를 받아오고 그다음 `destinationBoard`를 받아온다.<bR>
`sourceBoard`는 해당 index를 잘라주고 `destinationBoard`에 해당 `draggableId`를 넣어주고 두 `Board`를 return해주면 해결된다.

<script src="https://gist.github.com/Flen-E/a79e5a6cb855a61c86203bf55cfbda90.js"></script>

## 마무리

![enter image description here](https://i.ibb.co/DgXMjhh/React-App-Microsoft-Edge-2023-11-21-21-04-01.gif)

위에 내용을 잘 따라 하였다면 지금과 같이 `Board`간에 item들이 서로 이동을 잘 되는 것을 확인 할 수 있다.
