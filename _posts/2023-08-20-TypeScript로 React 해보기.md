---
layout: post
title:  "React + TypeScript 시작하기"
date:   2023-08-20 01:19:00 -0500
tags: typescript react
category : [react] [typescript]
---
 
# React + TypeScript 시작

여태`React`를 `JavaScript`로 짜기도 했고 수업이나 프로젝트 또한 `JavaScript`로 진행하였지만<br/>
`TypeScript` 의 매력을 알고 이제부터 프로젝트들을 `TypeScript`로 진행 할까 한다. 


## 장점

`JavaScript`는 코드 실행 전 타입에 대한 정의가 존재하지 않는데<br/>
내가 코드를 작성하고 실행시키면 바로 실행이 되지만<br/>
`TypeScript`는 코드를 쓰면 그 값들이 어떤 것인지 타입을 정의하게 되고 만약 실수나 잘못된 타입을 <br/>
입력하게 된다면 코드 실행 전 오류를 알려주게 되고 실수를 수정할 때 까지 실행을 막아준다.<br/>

쉽게 말해 Java나 C++등 다른 언어를 사용해본 사람에게 말하자면<br/>
int, string, char 과 같은 타입을 정의 해주는 것이다.<br/>

물론 이 일을 작업하게 된다면  `Java`나 `C언어`등이 `Python`과 달리 <br/>
편하지 않은 것처럼 초기 설정이 편하지 않겠지만 <br/>
결과는 확실하게 보장해 줄 것이다.

이를 코드를 통해 알아보도록 하자

## 프로젝트 생성
```
npx create-react-app my-app --template typescript
```

해당 명령어를 터미널에 입력하여 쉽게 `typescript`를 적용할 리액트 프로젝트를 생성해보자.

기존 프로젝트에 이어서 진행을 하고 싶다 하면 
```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```
를 이용하여 설치 해주고<br/>
`tsc --init` 명령어를 실행하여 `tsconfig.json`파일을 생성한다.<br/>
후에 `tsconfig.json`파일에 `"jsx": "react-jsx"`를 추가해주도록 한다.<br/>

이렇게 세팅을 해주어야 `typescript`에서 `javascript`로 컴파일이 가능해진다.<br/>
이후 기존 파일들을 (.jsx , .js) -> `.tsx`로 수정해준다.<br/>

이제 설치가 완료 되었다면 `typescript`를 살펴보도록 하겠다.<br/>


## 시작하기

간단한 예제를 통해 알아보도록 하자.<br/>
`typescript`는 `javascript`와 달리 타입을 정의 해주어야 한다.<br/>
`javascript` 예제를 통해 먼저 설명하겠다.<br/>
`const  plus  = (a, b) =>  a+b; `<br/>
평범한 함수이다 우리는 이곳에 `plus(1,2)` 를 하게 된다면 `3`이 될 것이고,<br/>
`plus(1, "나")`를 하게 되면 `1나`가 될 것이다.<br/>
이는 a와 b에 타입을 명시해 주지 않기 때문에 문제 없이 코드가 실행 될 것이며 <br/>
숫자만 더하고 싶었던 우리는 영문도 모른 채 `1`과 `나`가 더해진 결과를 얻을 것이다.<br/>
현재 예제야 단순하게 생각 될 수 있겠지만 더 나아가 큰 문제를 직관 했을 때 <br/>
무엇 때문에 오류가 발생하고 어느 부분이 잘못 되었는지 모른체 시간을 소비할 것이다.<br/>
간단하게 `typescript`로 작성해보자.<br/>
`const  plus  = (a:number, b:number) =>  a+b; `<br/>
단지 :(콜론)을 이용하여 타입을 명시해 주었을 뿐이다.<br/>
하지만 결과는 다르다 똑같이 `plus(1,2)`를 하게 된다면 `3`을 얻을 것이고,<br/>
`plus(1, "나")`를 하게 된다면 코드를 실행하기 전에 미리 잘못된 것을 알려줄 것이다.<br>
![enter image description here](https://i.ibb.co/hKTB7jj/2023-08-20-171123.png)
해당 타입은 `string`으로 현재 `number`타입에 맞지 않다고 <br/>
빨간색 줄로 미리 알려주며 고칠 수 있도록 방향을 제시해준다.<br/>
간단한 예제를 통해 어떤 느낌인지 알았다면 이제 자주 쓰일 <br/>
`components`를 생성한 뒤 `props`를 어떻게 보내주는 지 알아보겠다.<br/>

<script src="https://gist.github.com/Flen-E/396a4a52b2e83a739161c52e14ad686a.js"></script>
현재 코드를 본다면 모든 건 다 동작을 잘하지만 <br/>
`typescript`는 `text`가 무엇인지 모른다.<br/>
그래서 오류를 보여줄 것이고<br/>
![enter image description here](https://i.ibb.co/124G9RZ/2023-08-20-171653.png)
`text`는 `any`타입을 가진다고 하지만 원하는 것은 `text`에게 타입을 정의해주는 것이다.<br/>
<script src="https://gist.github.com/Flen-E/7e0989b967474d45979df7df09b424a2.js"></script>
함수 Dummy의 props타입을 정의해줄 interface를 만들어 <br/>
text에 대해 정의해주고 otherThingHere이라는 것도 같이 정의 해주었다.<br/>
그리고 해당 `text`와`otherThingHere`의 타입은 DummyProps라고 정의 해주었다.<br/>
하지만 밑에 `App`에서 `Dummy`Component는 <br/>
현재 `text`라는 하나의 `prop`만 보냈지 `otherThingHere`을 보내지 않았다.<br/>
이는 간단히 해결 해줄 수 있다.<br/>
<script src="https://gist.github.com/Flen-E/7974c20272c6f3375a246d74e29f59ee.js"></script>
`?`표시를 넣어주어 해결 해줄 수 있다.<br/>
하지만 prop을 보내주지 않는다면 undefined가 <br/>
들어가게 되는데 default 값도 설정해 줄 수가 있다.<br/>
<script src="https://gist.github.com/Flen-E/0c9b72ec238e7e5b19525d1263ef8a1b.js"></script>

## SyntheticEvent

event에 타입을 지정하는 법도 알아보겠다.

<script src="https://gist.github.com/Flen-E/c4fdbce3b5a0bc8f9f83049841ab1e54.js"></script>

`button`을 클릭하게 되면 event를 받을텐데 event 타입을 <br/>
`event:React.FormEvent<HTMLButtonElement>`로 지정해주었는데 <br/>
현재는 `form`안에 있어서 `FormEvent`이지만 `Form`밖에 있었다면 `MouseEvent` <br/>
이런식으로 타입시스템 모습은 제각기 쓰임새에 따라 다 다르다.<br/>
이러한 `eventHandler`들을 모든 브라우저에서 동일하게 처리하기 위한 <br/>
`eventWrapper` 를 전달 받아야 하며 React에서 제공해주는 것이 바로 `SyntheticEvent`인 것이다

[합성 이벤트(SyntheticEvent) – React (reactjs.org)](https://ko.legacy.reactjs.org/docs/events.html#gatsby-focus-wrapper)
해당 내용과 event는 React Docs에 자세히 나와있다.<br/>
우리가 사용한 Form Event또한 나와있다.<br/>
![enter image description here](https://i.ibb.co/JsLSzQz/2023-08-20-175305.png)
(`onChange`를 볼 수 있다)

## 마무리
이 내용만 보아도 `typeScript`의 매력은 충분히 느낄 수 있었다.<br/>
항상 `javaScript`를 사용하면서 오류가 어디서 나는지 왜 나는지도 모른체 <br/>
코드가 실행되어 시간을 낭비하는 일을 줄 일 수 있으며 <br/>
해결 방향과 오류 부분을 바로 찾아주니 `javaScript`의 장점과 단점을 해결해주는 <br/>
`typeScript` 손 쉽게 이용 할 수 있도록 노력해야겠다.
