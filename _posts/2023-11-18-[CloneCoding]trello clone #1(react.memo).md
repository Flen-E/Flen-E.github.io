---
layout: post
title:  "Trello Clone Coding #1"
date:   2023-11-18 15:25:00 -0500
excerpt: "React.memo를 사용하여 리렌더링을 방지해보도록 하자"
project: true
tags: react typescript trello
---

# Trello Clone Coding #1 (React.memo)

## 시작하기 앞서

이제 부터 클론 코딩 강의에 따라 내용을 기록 하여 다시 강의를 보지 않더라도 원하는 부분을 바로바로 알 수 있게 기록으로 남길 것이다. <br>
수업 후 복습은 물론 원하는 기능과 왜 이러한 기능을 썼는지 파악하기 위함이다.<br>
이전 포스팅의 react-beautiful-dnd에 이어서 진행 하도록 하겠다.

##  프로젝트 목표
![enter image description here](https://i.ibb.co/dgLFns0/53614150-efbed780-3c2c-11e9-9204-a5d2e746faca.gif)
  
 react-beautiful-dnd 에 나와있는 trello이다.

## 이전 포스팅에서의 부족한점
일단 코드가 길어져서 Draggable은 따로 Component로 나누어 주었다.
그리고 이전 코드에서 Drag and Drop을 할 때 버벅거림이 있었는데,
이는 부모의 magic이 바뀌게 되면서 자식들이 전부 rerendering되던 문제가 있기 때문이다.<br>
<script src="https://gist.github.com/Flen-E/69e77d7bc3d008664e7d5e8643870fc2.js"></script>

저번 포스팅에서 Draggable과 Card를 분리한 component이다.
그리고 출력을 해보면<br>

![enter image description here](https://i.ibb.co/RC56VKS/2023-11-20-163954.png)

a를 f 밑으로 옮겼을 뿐인데 원하는 값만 rerendering되는 것이 아닌 모든 값들이 다 rendering되고 있음을 확인 할 수 있다.<br>

이와 같은현상은 parent가 많은 children을 가지게 된다면 많은 양을 rerendering하게 될 것이며 이는 속도가 느려지는 데 직결된다.<br>

해결하기 위해 사용할 방법은 `react memo`이다.<br>

## react memo
`react memo`는 react.js에게 prop이 바뀌지 않는다면 Component를 rendering하지 않도록 해주는 것이다.

```
export  default  React.memo(DragabbleCard);
```

export를 DragabbleCard가 아닌 React.memo를 이용해 주기만 하면 적용이 된다.
![enter image description here](https://i.ibb.co/XZHYydb/2023-11-20-164945.png)

이번에는 abcdef가 렌더링되었고 e와 f를 변경하니 바뀐 e와 f만 렌더링 되는 것을 확인 할 수 있다.<br>
react.js가 가진 최적화 기능이라고 볼 수 있다.<br>
불필요한 렌더링을 없앰으로 버벅거림이 사라진 것 또한 확인 할 수 있다.

