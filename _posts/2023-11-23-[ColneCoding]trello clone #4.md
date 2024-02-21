---
layout: post
title:  "Trello Clone Coding #4"
date:   2023-11-23 19:25:00 -0500
excerpt: "snapshot을 이용하여 styled를 주도록 하자"
tags: trello
category : [ToyProject 개발일지]
---

# Trello Clone Coding #4

##  프로젝트 목표
![enter image description here](https://i.ibb.co/dgLFns0/53614150-efbed780-3c2c-11e9-9204-a5d2e746faca.gif)
  
 react-beautiful-dnd 에 나와있는 trello이다.

## 이전 포스팅에서의 부족한점
이전 포스팅까지 잘 따라왔다면 느꼈을 것이다. item을 이동할 때 조금이라도 위치에 어긋나게 된다면 목적지 miss로 return처리가 된다는 것을.<br>

그리고 이동할 때의 느낌을 살리기 위하여 css도 조금 추가 해보도록 하겠다.


##  Board.tsx  수정
우리의 이전 `Board.tsx`를 보면 item을 담는 영역이 `div`로 작성 되어 있을 것이다.<br> css를 주기위하여 `Area`로 만들어준 뒤 sytled를 변경해보도록 하겠다.

<script src="https://gist.github.com/Flen-E/fb7004ed0f9666cfc2a566ba23670362.js"></script>

`Area`로 바꿔준뒤 이제 `Area`를 정의 해주면 된다.

그리고 우리가 이제 `magic`말고 같이 `snapshot`인 `info`를 같이 던져주었는데<br> `info`에서 오른쪽 클릭으로 type 정의를 보면 우리가 무엇을 얻을 지 알 수 있다.

    export  interface  DroppableStateSnapshot {
	    isDraggingOver:  boolean;
	    draggingOverWith:  DraggableId  |  null  |  undefined;
	    draggingFromThisWith:  DraggableId  |  null  |  undefined;
	    isUsingPlaceholder:  boolean;
	}
`isDraggingOver`을 통하여 유저가 board 위로 드래그 해서 <br>들어오고 있는지를 boolean값으로 받아 올 수 있다.

`draggingFromThisWith`을 통하여 유저가 해당 board로 부터 드래그를 시작했는지도 알려준다. <br>한마디로 어떤 board를 떠난다면 , 그 board로 부터 drag를 시작했다는 뜻이다.<br> 그후 board로 들어올 때 `isDraggigOver`이라고 알려주는 방법이다.

우린 이제 이 정보를 활용해 볼 것이다.<br> 위에 `div`를 수정한 `Area`를 보면 `isDraggingOver`과 `isDraggingFromThis`을 받아오고<br> 이를 이용하여 styled 또한 수정해보겠다.

<script src="https://gist.github.com/Flen-E/73070152839108f629aa3a4e48feab5c.js"></script>

interface는 typescript니 이제 당연히 만들어주고,<br>
`isDraggingOver`과 `isDraggingFromThis`에 해당하는 배경색을 넣어주었다.

그리고 `Wrapper`에는 display:flex와 flex-direction:column을 준 다음,<br> Area에 flex-grow에 1을 주면 모든곳이 area가 되어 자연스럽게 drop이 되는 것을 확인 할 수 있다.

그리고 옮기고 있다는 것을 강조하기 위한 transition을 주어 조금 더 detail하게 만들 어 주었다.

![enter image description here](https://i.ibb.co/PwLTD4j/React-App-Microsoft-Edge-2023-11-27-17-35-53.gif)

## DragabbleCard.tsx 수정
지금도 괜찮지만 이동할때의 card도 css를 수정하고 싶다.<br>
방법은 똑같으니 간단하게 바로 수정해보도록 하자.

<script src="https://gist.github.com/Flen-E/5d15f7626c5e6f63dfd6d604c6e3d946.js"></script>


## 마무리

![enter image description here](https://i.ibb.co/f00Vn4m/React-App-Microsoft-Edge-2023-11-27-17-44-21.gif)

간단하게 styled를 수정 후 동작해보았다.
