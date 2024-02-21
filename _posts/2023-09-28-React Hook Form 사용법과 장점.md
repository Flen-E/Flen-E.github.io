---
layout: post
title:  "React Hook Form의 장점을 알고 사용해보자"
date:   2023-09-28 18:25:00 -0500
tags: react typescript
category : [react]
---


# React Hook Form 라이브러리

`React Hook Form`은 React 기반의 Form 관리 라이브러리이다.<br>
기본적으로 Form 상태와 유효성 검사 등 처리를 간편한 방법으로 제공하여 Form Component의 개발과 유지보수를 용이하게 할 수 있다.<br>

이번 포스팅에서는 회원가입 Form을 예시로 만들어 얼마나 코드가 간편화 되고 유지보수 가독성들이 향상 되는지 알아보도록 하겠다.<br>

![enter image description here](https://i.ibb.co/7tdX2N5/image.jpg)
[React Hook Form - performant, flexible and extensible form library (react-hook-form.com)](https://react-hook-form.com/)

해당 사이트를 이용하여 React Hook Form에 대한 다양한 정보를 얻을 수 있으니 사용할 때 들어가서 보면서 사용하도록 하자.<br>

## react-hook-form 사용법
들어가기 앞서 해당 라이브러리의 주요 개념을 짚고 넘어가도록 하자

<ol>
	<li> useForm :  react-hook-form을 사용하기 위한 핵심 함수로, Form의 Instance를 생성하고 Form의 Data와 Method를 제공해준다 </li>
	<li> register : useForm hook을 사용해서 가져올 수 있으며, 입력 필드를 react-hook-form에 등록하여 유효성 검사,패턴, 에러 등을 설정할 수 있다.</li>
	<li> handleSubmit : Form Submit시에 실행할 함수를 정의 해주어 해당 함수는 대게 유효성 검사나 제출 데이터를 처리하는 로직을 작성한다. </li>
	<li>formState : Form 전체에 대한 State로  상호작용을 추적하는데 도움을 준다.  </li>
	<li>errors: errors 객체는 유효성 검사 실패시 해당 필드의 에러 메시지를 포함해준다.</li>
</ol>

다양한 개념들이 있지만 나머지는 공식문서를 통해 공부하도록 하고 간단하게 넘어가겠다.<br>
<br>

### 이전에 사용법
우리가 이전에 회원가입 Form을 만들기 위해서는 어떠한 방식으로 사용했는지 부터 알아보자.<br>
예시로 Form과 입력할 수 있는 칸을 만들어주고 Button을 클릭했을 경우 10글자를 넘지못하면 에러를 띄어주는 예제를 만들어보겠다.<br>

<script src="https://gist.github.com/Flen-E/1c239ab2edd0b796cd94a8c47666c866.js"></script>

(값이 10자를 넘지 못하면 출력)
![enter image description here](https://i.ibb.co/vdbgSJ2/2023-09-28-135055.png)

### 문제점
해당 이벤트를 실행 하기 위해서는 `input`에 `onChange`를 주어 하나하나 함수를 만들어 주어야 하며 <br>입력값을 가져오기 위해 `value`를 사용해 저장을 `useState`로 가져오게 되는데 <br> 지금과 같은 경우에서는 간단하게 만들 수 있지만, 만약 여러개의 작업을 해야 한다면? <br>
예를 들어 아이디, 비밀번호, 이름, 전화번호, 학교 등 여러 input문을 만들어야 한다면? <br>
현재 위의 코드의 5~6배 길어질 것이다.<br>


###  react-hook-form 사용해보자

익숙해지기 위해서 간단하게 `name`을 입력하고 5글자 이하면 에러메시지를 출력해주는 Form을 만들어보겠다.

<script src="https://gist.github.com/Flen-E/7cc5f7a4596a7f0b302c51ede00e4d95.js"></script>

`register`를 이용하여 `name`을 등록해주고 `handleSubmit`을 이용해 `onSubmit`할 시 실행할 함수를 만들어 주었다.<br>
우리는 현재 Form에 `name`이 있으니 형식을 알려줄 interface `Iform`을 만들어주어 `typeScript` 문법에 맞게 입력해주고,<br> `handleSubmit`시 시행 할 함수에 `onValid`함수를 만들어주어 현재 data의 `name`이 5글자를 넘지 못할지<br> `setError`을 이용하여 `name`의 `message`에 "should be longer than"을 넣어주고 <br>`shouldFocus`를 이용하여 해당 입력란에 focus가 자동으로 가도록 설정 해주었다.

여기까지만 보면  Form안에 하나의 입력란만 놓고 보았을 때에는 코드의 간결성이 느껴지지 않으며 매력이 없어 보일 수 있다.<br>
하지만 여기서 여러 `input`란이 추가되고 유효검사를 진행할 때 비로소 가치가 보인다.

<script src="https://gist.github.com/Flen-E/7c1620ce48c3c8db95d0969874e654cc.js"></script>

여러 부가 조건을 더 달아 회원가입 Form을 만들어 보았다.<br>
`useForm`에 `defaultValues`를 이용하여 `email`란에 @naver.com이 입력되어 있게 해주었고,<br> `register`에 있는 `required, pattern, minLength, validate`를 이용하여 다양한 기능을 손쉽게 넣어 줄 수 있었다.

<em>처음 실행했을 때</em>
![enter image description here](https://i.ibb.co/Phc7JHk/2023-09-28-155237.png)


<em>형식에 맞지 않으면 뜨는 error message</em>
![enter image description here](https://i.ibb.co/3CzM56j/2023-09-28-155329.png)


만약 이 모든것을 `react-hook-form`없이 만들려면 코드의 길이가 지금보다 훨씬 길어질 것이다. <br>
이전과 같은 방법을 사용하였더라면 `onChange`함수 관리하는 곳 `value`관리하는 곳 `error`메시지 관리하는 곳 등 <br> 다 나눠서 관리해야 그나마 가독성이 올라가겠지만 `react-hook-form`을 이용하여 모든 것을 한 곳에서 해결 할 수 있었다.

## 마무리

React Hook Form은 Form형식으로 만들어야 하는 무언가 있을 때 자주 사용할 것 같다.<br> 그만큼 간편하고 간결하게 코드를 짤 수 있는 라이브러리라는 뜻이다.<br>
이런 라이브러리들을 이용하여 코드 유지보수에 있어서나 코드의 가독성을 높여 줄 수 있는<br> 유용한 라이브러리들이 있으면 바로 적용해보고 익숙해 질 수 있도록 노력해야겠다.









