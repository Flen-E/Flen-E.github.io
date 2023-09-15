---
layout: post
title:  "Global Styled Components (Global Style)를 적용시켜보자"
date:   2023-09-16 01:19:00 -0500
tags: react typescript
---

 
# 전역 Styled Components (Global Style)

`Styled Component`를 이용해 styled을 주는 방법을 이전 포스팅에서 알아보았을것이다. 

[Styled-Components 에 대해서 – 최정재 (flen-e.github.io)](https://flen-e.github.io/styled-components%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C/)

이번 포스팅에서는 `Styled Components`를 이용하여 `Global Styled`를 주는 방법에 대해 알아보겠다.

## Reset-CSS
기본적으로 react를 짜면 padding,border,margine과 font-size ul li 스타일 등 제공이 되어있는데 <br>
이를 어느 정도 초기화를 해주기 위해 reset-css를 가져오겠다.

![enter image description here](https://i.ibb.co/3NCJwF5/reset-css.png)

[Eric Meyer’s “Reset CSS” 2.0 | CSS Reset (cssdeck.com)](https://cssdeck.com/blog/scripts/eric-meyer-reset-css/)
해당 사이트에 들어가면 `reset-css` 를 쉽게 얻을 수 있다.

## Styled-Components

style을 Global로 적용시키는 것은 어렵지않다.<br>
이전에 배운 styled-component 라이브러리를 사용 할 줄 안다면 금방 할 것이다.

```
npm install @types/styled-components
```
npm 설치 명령어를 통해 `styled-component`를 설치 해준후<br>
`createGlobalStyle`이라는 것을 import 하여 사용해주면 된다.

<script src="https://gist.github.com/Flen-E/7b0604eb1ca4b7ef1c991970b8830ad6.js"></script>

그리고 적용하려는 대상에 적용시켜주면된다.

<script src="https://gist.github.com/Flen-E/b0a802db5cc059ef8c4e222ae653c459.js"></script>

```
return(
	<GlobalSytle/>
	<Router/>
)
```
같이 두 개의 Element 를 보내고 싶다면 보통은

```
return(
	<div>
		<GlobalSytle/>
		<Router/>
	</div>
)
```

`div`를 이용하여 return하여주었겠지만 이런식으로 사용한다면 쓸모없는 `div`로 도배될 것이다.<br>
그래서 우리는 이거 대신에 Fragment `<></>` 를 이용해 줄 것이다.

<script src="https://gist.github.com/Flen-E/b0a802db5cc059ef8c4e222ae653c459.js"></script>

이제 적용하고 보면 `App`안에 `Element`에 `GlobalStyle`이 적용된 것을 확인 할 수 있을 것이다.

## Font도 바꿔보자

`body`안에 들어갈 Font들도 Global Style로 적용해 볼것인데,<br>
[Browse Fonts - Google Fonts](https://fonts.google.com/)
해당 사이트를 이용하면 다양한 폰트들을 무료로 이용할 수 있다.

![enter image description here](https://i.ibb.co/5Lp1NVy/font.png)

원하는 Font를 클릭하면 이런식으로 다운을 받을 수 있는데 원하는 크기를 `+` 버튼을 눌러 넣어주고 우측을 보면

![enter image description here](https://i.ibb.co/L5s1cWJ/2023-09-15-235245.png)

use on the web 박스가 있는데 <link>말고 @import를 눌러준후 style을 복사해주자.<br>
그리고 아까 만들어두었던 GlobalStyle에 @import해주면 된다.

<script src="https://gist.github.com/Flen-E/9ac22a3c60c3eae9e951261aec9556a8.js"></script>

@import를 복사하여 넣어준뒤 해당 폰트를 쓸 곳에 (나는 body에 적용해주었다.)
![enter image description here](https://i.ibb.co/0fq8Xh0/2023-09-15-235731.png)
해당 font-family를 복사하여 넣어주면 된다.

위에 `GlobalStyle`은 reset-css와 font를 @import 해준뒤 `body`에 적용시킨 모습이다.

## Theme도 설정해주자


### Styled.d.ts
`styled.d.ts` 라는 타입 선언 파일을 생성해주자.<br>
`~.d.ts`파일은 해당 객체 또는 함수의 타입을 추론을 도와주는 유용한 파일로 <br>
`TypeScript`는 해당 함수의 타입을 정의해 주어야 하는데 한데 모아서 정리해준다고 생각하면 좋을 것 같다.

<li> ./module/styled.d.ts</li>
<script src="https://gist.github.com/Flen-E/e0e7b1ff92b02b951d12a8723cffd752.js"></script>

기본적으로 `DefaultTheme` 는 비어있는 상태인데 이곳에 공통적으로 사용되는 <br>
스타일들을 묶어서 일관성을 유지할 수 있게 해준다.

### DefaultTheme 적용
<li>./theme.ts

<script src="https://gist.github.com/Flen-E/ac779aafc5c7ff5ad3c838f7805a5c24.js"></script>

`DefaultTheme`를 만들어 주었다면 이제 적용할 일이 남았다.<br>
`Styled-Components`는 `ThemeProvider`라는 `React`의 `ContextAPI`사용 해주면 된다.

<script src="https://gist.github.com/Flen-E/c89b2be9deb7a2cef6b9bfcf8d83e951.js"></script>

이제 `App`은 `ThemeProvider`내에 존재하게 되니 `App`은 `Theme`에 접근을 할 수 있는 것이다.<br>
그럼 우린 `App`의 `GlobalStyle`에 적용해 볼 것이다.

```
body {
	line-height: 1;
	font-family: 'Signika Negative', sans-serif;
	background-color:${(props) =>  props.theme.bgColor};
	color:${(props) =>  props.theme.textColor};	
}
```
`body`를 해당 처럼 작성이 가능하다는 것이다.<br>
그럼 이제 `background-color`은 우리가 설정한 `bgColor`가 될 것이고,<br>
`color`은 설정해준 `textColor`가 될 것이다.

![enter image description here](https://i.ibb.co/VTxqySS/2023-09-16-011951.png)

`theme.ts`에 설정해준 색으로 변하게 된 것을 확인 할 수 있다.<br>
(색은 임의로 바꿔줌)<br>

## 마무리

`GlobalStyle`을 이용하여 reset-css, font, theme등을 변경해 보았다.<br>
이를 이용하여 dark테마 white테마 식으로도 만들어 줄 수 있으며 <br>
해당 Global Style로 기본 나만의 style을 모두 적용해줄 수 있다.

