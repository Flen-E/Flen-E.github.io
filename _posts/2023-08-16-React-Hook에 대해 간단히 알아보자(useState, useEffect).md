---
layout: post
title:  "React-Hook에 대해 간단히 알아보자(useState, useEffect)"
date:   2023-08-16 18:19:00 -0500
tags: react
---

# React-Hook

`React-Hook`은 `react`를 사용하는 개발자라면 모두 들어봤을 것이다.<br/>
나는 `useState`와 `useEffect`에 관한 설명은 검색을 통해 쉽게 찾을 수 있기 때문에 <br/>
설명보다는 보기 쉽게 어디에 사용하는지 설명을 해보겠다. <br/>

## useState
`react.js`를 사용할 때의 멋진점은 `vanilla Script`와 다르게 <br/>
`useState`를 사용한다면 component를 refresh한다는 점이다.<br/>
새로운 데이터가 들어올때 마다 UI를 refresh해준다.<br/>
이는 우리가 직접 refresh해주는 것이 아닌 `react.js`에서 대신 해주기 때문에 매우 유용하다.<br/>

<script src="https://gist.github.com/Flen-E/8be0438719c3a4a504f1ff776f812d36.js"></script>

위 코드와 같이 버튼을 클릭하면 counter가 증가하게 되고, <br/>
`useState`를 통해 상태변화를 감지했으므로 UI가 refresh되어 화면에서는 증가한 값들이 보일 것이다.<br/>

하지만 어쩌면 코드를 시작시에만 렌더링 이후 한번 실행하고 싶을 수도 있고 <br/>
특정 값이 변경되었을 경우에만 실행이 되고 싶을 수도 있는데 `useState`만으로는 이를 해결할 수 없다.

## useEffect
하지만 이를 해결해줄 `useEffect`라는 `React-Hook`이 있는데<br/>
<script src="https://gist.github.com/Flen-E/ac43bb89ca886e8502f78e588f5febba.js"></script>
`useEffect`를 뜯어보면 첫번째 argument는 우리가 실행시키고 싶은 코드가 들어가면되고,<br/>
두번째 argument는 Dependency로 `react.js`가 지켜보고 있는 것이다.<br/>
지켜보고있는것들이 변화할 때 첫번째 argument를 실행시키는 것이다.

<script src="https://gist.github.com/Flen-E/5091f1d6d41addde220dab0aaeeded1a.js"></script>

첫번째 argument에 키워드가 입력이 되고 글자가 5자 초과시 코드를 실행시키게 해주었고 <br/>
두번째 argument에는 keyword를 주어 keyword가 변경될때 코드를 실행시키게 해주었다.<br/>

![enter image description here](https://i.ibb.co/QJ908V5/2023-08-15-180649.png)

숫자를 123456까지 입력후에야 I run when 'keyword' change라는 콘솔 출력문이 보이는 것을 확인할 수 있다.<br/>

<script src="https://gist.github.com/Flen-E/d3175fdf9b72598db12cf16894635769.js"></script>

두번째 argument에 아무런 인자없이 []가 들어간다면 지켜볼 대상이 없기에 코드가 한번만 실행되는 것을 의미한다.<br/>
바로 i run only once.가 출력됨을 알수 있다.<br/>

## Clean Up

`useEffect()` 에서 return 함수이다.<br/>
Component에 update직전이나 unmount이전(Component가 사라지기 이전)에 <br/>
작업을 수행하고 싶다면 `Clean up`함수를 사용해서 반환을 해줘야한다. <br/>
이는 메모리 누수를 방지해 메모리를 관리하거나 Component가 사라질 때, <br/>
수행할 작업을 추가하기 위해 사용 된다고 한다.<br/>
<script src="https://gist.github.com/Flen-E/cddb7511544c4f6b511f5fd2a9ed2c34.js"></script>

간단한 예제를 보여주겠다.<br/>
`useEffect` 로인해 showing 이 true일때 hi가 출력될테고<br/>

![enter image description here](https://i.ibb.co/KL9CVhS/1.png)

버튼을 클릭함으로써 showing이 false가 되어 Component가 사라질때,<br/>
return하여 bye가 출력이 됨을 확인 해볼 수 있다.<br/>

![enter image description here](https://i.ibb.co/P69dHjW/2.png)



## 마무리



여기까지 알기 쉽게 간단히 `useState`와 `useEffect`에 대해 알아보았다.<br/>
간단한 내용이니 까먹지 않게 한번씩 보고 여러 프로젝트를 진행하여 몸에 익혀야겠다.<br/>

