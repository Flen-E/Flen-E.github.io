---
layout: post
title:  "Netflix  Clone #1"
date:   2023-12-17 15:25:00 -0500
excerpt: "프로젝트 목표를 정의하고 계획을 짠뒤 Header를 만들어보자"
tags: react typescript Netflix
project: true
---

# Netflix  Clone #1

## 시작하기 앞서
이전에 framer-motion을 포스팅 하였는데 이를 적극 활용하고 이전에 배운 기술들을 종합하여 넷플릭스 사이트를 클론코딩 해보도록 하겠다.
크게 Header, Home Screen, Slider Part, Animation, Modal, Search 순으로 제작하며 포스팅 하겠다.
이번 포스팅에서는 Header로 시작하겠다.

##  프로젝트 목표
![enter image description here](https://i.ibb.co/YtVSCZh/Microsoft-Edge-2023-12-16-22-16-29.gif)
넷플릭스 사이트를 참고하여 클론 사이트를 만들어 보도록 하겠다.


## 이번 포스팅에 구현 할 것들

### header 색변화

  - 상단부분에 있을 때 rgba(0,0,0,0)
![enter image description here](https://i.ibb.co/ww9mxtr/2023-12-16-223624.png)
- 스크롤을 내렸을 때 rgba(0,0,0,1)
![enter image description here](https://i.ibb.co/jJ9LRG9/2023-12-16-223822.png)


### searchBox 변화
 - Search svg누르기 전
 ![enter image description here](https://i.ibb.co/y6bfXwS/2023-12-16-223924.png)
- Search svg 누른 후
![enter image description here](https://i.ibb.co/gM81cQV/2023-12-16-223936.png)

### 현재 선택된 item circle
![enter image description here](https://i.ibb.co/dG9ZLQd/2023-12-16-224310.png)

### 그 외 기타 styled
![enter image description here](https://i.ibb.co/G70kfwp/2023-12-16-224446.png)

## header 색 변화
이전 포스팅에서 `useScroll`을 해보았는데 이를 이용하여 scrollY값을 구한 후 Y값에 따라서 header의 색 변화를 줘보도록 하겠다.

<script src="https://gist.github.com/Flen-E/a79395d0ff8702b4092aab741d6cdb15.js"></script>

useEffect(()=>{},[scrollY, navAnimation])이 아닌,
framer motion에서 지원해주는 `useMotionValueEvent`를 지정해주면 [scrollY]와  같이 반환 함수에 올바르게 전달되었는지 확인 할 필요 없이 매칭 해준다.
기능은 `useEffect`로 구현한 것과 같다.

scrollY.get()으로 값을 받아와 배경색을 지정 해주었다.

## searchBox 변화

일단 좋은 svg 사이트 하나를 공유하겠다.
[svg 사이트](https://www.svgviewer.dev/) 여기서 svg코드를 react코드로 받아 올 수 있다.
 
우리가 원하는 것은 넷플렉스 검색 창과 같이 클릭하면 input이 나오는 형식이다.

그리고 searchBox의 변화에 대해서 설명해줬는데,<br>
`animate ={{ scaleX : searchOpen ? 1 : 0}}`형식으로 search에 애니메이션을 주었지만 우리가 프로젝트를 진행하다보면 특정 코드를 통해서 애니메이션을 실행시키고 싶을 때가 있기 때문에 다른 방법으로 짜보도록 하겠다.
```
const inputAnimation = useAnimation();

const  toggleSearch  = () => {
	if (searchOpen) {
		// trigger the close animation
		inputAnimation.start({
			scaleX:  0,
		});
	} else {
		// trigger the open animation
		inputAnimation.start({
			scaleX:  1,
		});
	}
setSearchOpen((prev) =>  !prev);
};

...

<Input
	initial=  {{scaleX :  0}}
	animate={inputAnimation}
	transition={{ type:  "linear" }}
	placeholder="제목, 사람, 장르"
/>
```
이러한 형식으로 useAnimation을 이용하여 코드를 활용한 애니메이션을 주었다.

##  현재 선택된 item circle

이전 포스팅에서 한 내용이기에 간단히 설명하겠다.
일단 해당 item들에게 circle을 주고 layoutId를 모두 같게 해준뒤,
```
const  homeMatch  =  useMatch("/");
const  seriesMatch  =  useMatch("/series");
const  movieMatch  =  useMatch("/movie");
```
useMatch를 이용하여 현재 Match된 route에 해당하면 원이 있는 형식으로 만들어 주었다.
```
<Link  to="/">
	홈 {homeMatch && <Circle  layoutId="circle"  />}</Link>
<Link  to="/series">
	시리즈 {seriesMatch && <Circle  layoutId="circle"  />}
</Link>
...
```

### 그 외 기타 styled
그 외 스타일로 netflix로고에 마우스를 가져다되면 svg animation이 나온다던가, 등등 styled을 만들었다.

![enter image description here](https://i.ibb.co/myZRK9D/React-App-Microsoft-Edge-2023-12-17-20-35-00.gif)

<script src="https://gist.github.com/Flen-E/da3f6a65635d09be5c9013bffd85da34.js"></script>


