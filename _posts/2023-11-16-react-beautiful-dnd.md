---
layout: post
title:  "react-beautiful-dnd 사용하기"
date:   2023-11-16 18:25:00 -0500
tags: react typescript
category : [react]
---

# react-beautiful-dnd 사용하기

## react-beautiful-dnd

Drag and Drop List를 만들 때 유용하고 사용하기 아주 쉽게 해주는 라이브러리이다.


## react-beautiful-dnd 설치하기

react-beautiful-dnd는 npm을 통해 관리되는 패키지라 간단하게 npm 명령어를 통해 설치가 가능하다.
```
npm i react-beautiful-dnd 
npm i  --save-dev  @types/react-beautiful-dnd
```

## 간단한 설명

![enter image description here](https://i.ibb.co/mR7WFQX/image.png)

그림과 같은 구조로 이루어 져있다.

### DragDropContext
Drag and Drop이 가능하게 하고자 하는 영역을 감싸주는 상위 컨테이너이다. <br>
`onDragEnd`라는 prop이 필수로 필요하다. 이는 자식 컴포넌트와 드래그를 끝낸 시점에서 불려지는 함수를 뜻한다.

### Droppable
Droppable은 안에 있는 Draggable을 드롭할 수 있는 영역을 의미한다.<br> 
해당 컨테이너에는 `droppableId`라는 prop과 함수 형식의 자식 요소를 필수로 필요하다.<br> 
Droppable의 자식 요소에 전달 되는 prop은 DroppableProvided이며 해당 prop들은 inteface DroppableProvided를 통해 알 수 있다.

<script src="https://gist.github.com/Flen-E/290e75c45c18912974d681ba1c5187fb.js"></script>

### Draggable

Draggable은 Drag and Drop 직접 할 수 있는 영역을 의미한다.<br> 
해당 컨테이너에는 `draggableId`라는 prop와 함수 형식의 자식 요소를 필수로 필요하다. <br> 
Draggable의 자식 요소에 전달 되는 prop은 DraggableProvided이며 해당 prop들은 inteface DraggableProvided를 통해 알 수 있다.

<script src="https://gist.github.com/Flen-E/854ac9df8f6f075c2feddc96f3e76f71.js"></script>

- draggableProps : 해당 요소가 드래그 되기를 원하면 추가 해주면 됨
- dragHandleProps : 원하는 위치에서 드래그해서 옮기는 것을 의미함


## 간단한 예제
<script src="https://gist.github.com/Flen-E/aa11492bd2b909d4cc8e478b2db44994.js"></script>

간단한 예제에 컨테이너로 만들어 간단한 css를 주었다.

앞으로 있을 예제에서 생략 해주기 위해 간단히 코드를 적어두고 다음 설명부터는 예쁜 출력을 위해 사용하고 설명은 생략하겠다.<br> 
theme에서 색을 정의 해주었고 bgColor, boardColor, cardColor등<br> 
styled.d.ts에서 typescript 사용을 위해 타입을 지정해주었다.

#### theme.ts
<script src="https://gist.github.com/Flen-E/05b5579f6df3a32939779e9bc63aeb2e.js"></script>

#### styled.d.ts
<script src="https://gist.github.com/Flen-E/48063785ae8ad0d2fa9ae2ab799653e6.js"></script>

#### index.tsx
<script src="https://gist.github.com/Flen-E/b66eb9af6ee09722203acbcc0f133fc9.js"></script>

앞으로 이런 형식이 기본으로 깔려 있는 채 예제를 올리도록 하겠다.

![enter image description here](https://i.ibb.co/1RpyVyF/2023-11-16-193149.png)

(맨 위에 있던 a를 끌어다가 옮기는 모습이다.)

실행시키면 해당 그림처럼 drag가 되는 것을 확인 할 수 있다.

<br>

#### placeholder
마지막 map이 끝나는 부분에서는 placeholder을 추가하여 Draggable요소가 드래그 되는 동안 Droppable 리스트의 크기가 작아지는 것을 방지하기 위하여 추가하였다.

### onDragEnd
앞에 예제를 통해 해보면 Drag는 잘되는 것을 확인 할 수 있다. <br>
우리는 이제 Drag한 것을 원하는 위치에 Drop하여 바꿔주고 싶은데 그렇게 하기 위해서는 onDragEnd에 이에 맞는 함수를 넣어주면 된다.

<script src="https://gist.github.com/Flen-E/a7b3e86b8073176f481b0f4d91bacafb.js"></script>

toDos를 이번에는 recoil을 이용하여 만들어 주었고,
#### atoms.tsx

<script src="https://gist.github.com/Flen-E/6f6418647d2ab18933c7dea7b0b33213.js"></script>

그리고 drag and drop시 arguments를 출력해보았다.

![enter image description here](https://i.ibb.co/RD825hK/2023-11-16-194651.png)


출력문을 보면 a를 drag 하여 옮겼을 시 destination이 index 4를 향하고 있음을 알 수 있다.<br> 
droppableId는 같은 Board를 사용중이라 같은 것으로 나오는 중이다.

이제 이를 활용 해보도록 하자.

<script src="https://gist.github.com/Flen-E/76ec57f86f7e65253b1c31e74bf72ae5.js"></script>

1) 현재 ToDos를 가져와 선택한 위치인 source.index를 item에서 삭제해주고
2)  목적지의 인덱스에 draggableId를 가져다 놓는 식으로 구현해준다.

![enter image description here](https://i.ibb.co/1TR3JKG/2023-11-16-215436.png)

이제 원하는 위치로 drag and drop이 되는 것을 확인 할 수 있다.<br> 
Board가 여러개가 된다면 droppableId를 이용하여 활용도 할 수 있는 것을 알 수 있었다.


