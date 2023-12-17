---
layout: post
title:  "Animation - Framer Motion"
date:   2023-12-15 18:25:00 -0500
excerpt: "Framer-Motion을 활용하여 다양한 애니메이션 효과를 내보자"
tags: react typescript
---

#  Animation - Framer Motion
이 라이브러리를 알기전에는 css로 엄청난 노가다 작업을 하면서 애니메이션을 조절했지만<br> Framer Motion하나만 알고 있어도 엄청나게 큰 도움이 될 것이다.

##  Framer-Motion

Framer는 디자이너들을 위해 프로토타입 등을 만들어주는 회사이다.<br>

![enter image description here](https://i.ibb.co/9bZVgs8/0a-Rm-Rz-Gm-HGa-Esl-Bl-CFg2-Tm-St-ZM.png)

사이트에 접속해보니 로고는 작년에 사용한 flutter-flow의 로고와 비슷해 보였고<br> 디자인 작업은 비슷해보였다. 뭔가 연관관계가 있는건 아닐지..?<br>
아무튼 Framer Motion은 그들이 제공해주는 ReactJS 애니메이션 라이브리러이다.

이번 포스팅에서는 간단한 예시들을 보여주며 익혀보도록 하겠다.
![enter image description here](https://i.ibb.co/N3V0Wk6/2023-12-14-224324.png)


## Framer-Motion을 사용해보자
```
npm install framer-motion
```

설치는 npm을 통해 간단히 할 수 있다.<br>
사용법 역시 매우 간단한데,<br>

```
<Wrapper>
	<Box/>
	<motion.div></motion.div>
<Wrapper>
```

사용하려는 컴포넌트앞에 motion을 붙여주면 준비가 된 것이다.<br>
styled를 통하여도 가능한데<br>

```
const Box = styled.div``;
```

```
const Box = styled(motion.div)``;
```

위에 형식을 밑에 형식으로 바꿔주면 준비가 완료된 것이다.<br>

[Framer motion docs](https://www.framer.com/motion/component/)에 나와있는 문서를 읽으면 이용할 수 있는 기능이 다양하게 있다.<br>
이들을 활용하여 다양한 애니메이션을 구현해보겠다.


### Framer-Motion #1
![enter image description here](https://i.ibb.co/fNYbKGc/React-App-Microsoft-Edge-2023-12-14-23-04-54.gif)
<script src="https://gist.github.com/Flen-E/0d17695442e7aad1ceb396a7295dcd99.js"></script>

Prop으로 transition, initial, animate를 사용해주었다.<br>

transition type을 spring으로 해주었는데 이로 인해 튕기는 느낌을 주어 부드러운 움직임이 되었다.<br> 그외에도 tween도 있으며 ease : linear을 사용하여 애니메이션의 속도를 부드럽게 해줄 수도 있다.<br>
이는 내가 이전에 Unity 게임개발을 진행하며 사용했던 DOTween과 비슷한 기능이 많아 보다 이해하기 좋았다.<br>
bounce말고도 mass, damping, stiffness, velocity, restSpeed, restDelta등 다양하게 추가적인 기능이 있다.<br>
그 외에도 많은 기능이 있으며 , initial을 통해 초기값, animate를 사용하여 위와같은 결과를 얻을 수 있었다.<br>

### Framer-Motion #2

이번에는 variants를 사용하여 두번째 애니메이션을 만들어 보도록 하겠다.<br>

![enter image description here](https://i.ibb.co/3d3Sywx/React-App-Microsoft-Edge-2023-12-14-23-48-04.gif)

<script src="https://gist.github.com/Flen-E/3bf41cd8d97b3aad733470522d248fb9.js"></script>

variants를 줘서 initial과 animate를 알아서 이름에 맞게 적용 시킬 수가 있다.<br>
지금 보면 Box Component에 boxVariants를 주었는데 기본적으로 부모에게 variants를 주면 자식은 그대로 똑같이 적용된다.<br>

덕분에 자식인 Circle에는 따로 initial과 animate를 주지 않아도 이름만 같다면 적용이 되는 것이다.<br>

boxVariants를 자세히 살펴보면
```
transition: {
	delayChildren:  0.3,
	staggerChildren:  0.2,
},
```
delayChildren은 자식들에게 딜레이를 주는 것이고, staggerChildren은 자식 하나하나 마다 딜레이를 적용 해주는 방법이다.<br>
예를 들어 staggerChildren:0.2를 주었다면 자식인 원이 하나 생길 때마다 0.2초씩 딜레이가 생기는 것이다.<br>


### Framer-Motion #3
이번에는 Gestures와 Drag를 해볼 것이다. 마우스가 hover되었을 때,<br> Drag할때, 그리고 일정 범위를 이탈할 경우 overflow:hidden까지 적용해주도록 하겠다.<br>

![enter image description here](https://i.ibb.co/yRZqKSj/React-App-Microsoft-Edge-2023-12-15-00-14-50.gif)

일단 간단하게 hover와 tap을 짜보도록 하겠다.<br>

```
<Box
	whileHover = {% raw %}{{rotateZ :  90}}{% endraw %}
	whileTap = {% raw %}{{scale : 1, borderRadius : "100px"}}{% endraw %}
/>
```

해주면 hover일때 90도 돌것이며, tap하면 원형태로 변하게 된다.<br>
그리고 이제 drag를 위해서 props로 drag를 달아주고 <br>
drag제한을 해주고 싶다면 dragConstraints를 적용해주면 된다.<br>
걸어둔 제약을 넘어가게 되면 원래 자리로 돌아오게 된다.<br>
dragSnapToOrigin을 사용하게 되면 언제나 원래 자리로 돌아오게 된다.<br>

코드로 다시 보여주겠다.
<script src="https://gist.github.com/Flen-E/e9e67fa79ff3011e0a0a0df80a7c0e4e.js"></script>

일단 제약을 걸어주기 위하여 box element를 잡아줬는데 코드로 특정 element를 잡는 방법이 있다.<br>
useRef를 이용하여 BiggerBox에다가 주어 BiggerBox의 element를 잡아줘서 제한  주었다.<br>

보면 dragElastic도 사용해주었는데 이는 원위치에서 움직임을 허용하는 정도이다.<br>

### Framer-Motion #4

이번에 활용 해볼 것은 useScroll이다.<br>

![enter image description here](https://i.ibb.co/D4ckzfX/React-App-Microsoft-Edge-2023-12-15-02-36-04.gif)

<script src="https://gist.github.com/Flen-E/42b288fe54e6d6bb2e0dbbc4727d546d.js"></script>

##### useMotionValue
MotionValue 는 애니메이션 내의 수치를 트래킹할 때 필요한 것이다.<br>

```
const x = useMotionValue(0);
//short version
<motion.div style={% raw %}{{x}}{% endraw %}/>
//<motion.div style={% raw %}{{x : x}}{% endraw %}/>
```

형식으로 x좌표를 추적 할 수 있다.<br>
drag = "x"를 주면 drag를 x방향으로만 이동이 가능하다.<br>

MotionValue는 업데이트 될 때 rendering cycle이 돌지 않기 때문에 rerendering이 되지 않는다. <br>
그래서 console.log(x)찍고 움직여봐도 한번만 찍히지 계속 찍히지 않는다.<br>
```
useEffect(()=> {x.onChange(() => console.log(x.get()))}, [x]);
```
x가 바뀌면 x.get()을 출력해주면 얻을 수 있다.

##### useTransform
MotionValue값에 따라 다른 애니메이션을 도출 하고 싶을 때 사용 하는 hook이다.<br>
useTransform에는 3개의 인자가 들어가는데<br>
예를 들어<br>
```
const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
```
입력값이 -800일때는 출력값을 -360을 800일때는 360을 사이 값은 그에 알맞게 상응하는 값이 나온다.<br>
이를 활용하여 gradient 출력값을 만들고 drag 할 때 배경색이 변화하게 해주었다.<br>


##### useScroll
[useScroll](https://www.framer.com/motion/use-scroll/)에 대한 docs이다 다양한 기능이 있지만<br> 내가 사용한 scrollYProgress는 0에서 1사이의 값이 있는데<br> 이를 아까 쓴 useTransform을 이용하여 scale을 스크롤에 따라 크기를 변화하게 해주었다.
```
const  scaleY  =  useTransform(scrollYProgress, [0,1],[1, 5]);
.
.
.
<Box style ={% raw %}{{scale : scaleY}}{% endraw %}/>

```

### Framer-Motion #5
svg에 애니메이션을 줄 것인데 어떠한 방식으로 줄 것이냐면 <br>svg가 그려지는 모습을 보여 줄 것이며 그 후 색을 채워주는 방식의 애니메이션을 줘보도록 하겠다.

![enter image description here](https://i.ibb.co/m59p6XW/React-App-Microsoft-Edge-2023-12-15-17-19-58.gif)


```
const  Svg  =  styled.svg`
	width: 300px;
	height: 300px;
	path {
		stroke: black;
		stroke-width: "2";
	}
`;
```
stroke를 주면 라인이 생기고 stroke-width를 주어 두께도 설정해 줄 수 있다.<br>

일단 하려는 애니메이션 중 stroke가 그려지는 것을 보여주기 위해 pathLength를 사용해보겠다. variants로 <br>
```
const  svg  = {
	start: { pathLength:  0, fill:  "rgba(255,255,255,0)" },
	end: {
		fill:  "rgba(162,255,255,1)",
		pathLength:  1,
	},
};
```
해주어 처음에는 pathLength : 0을 주어 마지막엔 1로 천천히 그려지는 모습을 보여주겠다. <br>

transition으로 duration을 주었다.<br>
하지만 먼저 로고가 먼저 그려지고 색을 채워지는 것을 원한 다면 특정 property의 transition의 시간을 정해주면 되는데,<br>

```
transition  ={% raw %}{{
	default:{
		duration :  5
	},
	fill : {
		duration :  1, delay :  2,
	}
}}{% endraw %}
```
default에는 그대로 duration을 주고 하지만 fill이라는 property를 특정해서 duration과 delay를 주어 따로 진행 되도록 적용해 주었다.<br>


<script src="https://gist.github.com/Flen-E/6d19354f2ddbeb63fde7700176bb130f.js"></script>


### Framer-Motion #6
그 다음 배울 것은 AnimatePresence이다. 이를 사용하면 얼마나 많은 걸 할 수 있는지 알 수 있을 것이다.

#### AnimatePresence
기존에 있던 initial과 animate는 애니메이션을 시작하게 해주고<br> 그 후 마무리를 exit props로 더 자연스러운 애니메이션을 안겨준다.

간단한 예제로 보여주자면, 
![enter image description here](https://i.ibb.co/RPVmY9K/React-App-Microsoft-Edge-2023-12-15-17-33-00.gif)


<script src="https://gist.github.com/Flen-E/f84ef952c329b99b043ab7cc71969341.js"></script>

원래 같으면 box를 사라지게 할 때 단순히 showing이 false가 되면서<br> 박스가 바로 사라질테지만 exit props를 이용하여 사라질 때 마저 애니메이션 효과를 준것을 확인 할 수 있다.<br>

더 나아가 슬라이드도 예쁘게 넘어가는 모습으로 만들어 줄 수 있는데,<br>

![enter image description here](https://i.ibb.co/GdTMnf5/React-App-Microsoft-Edge-2023-12-15-17-36-39.gif)

<script src="https://gist.github.com/Flen-E/b7eded5caa087bc3e1d82be2ae3618e5.js"></script>

이런 식으로 활용이 가능해진다.

### Framer-Motion #7

이번에는 layoutId를 활용 하는 법을 보여주겠다.

![enter image description here](https://i.ibb.co/SvBgdcc/React-App-Microsoft-Edge-2023-12-15-18-19-09.gif)

Framer에게 첫번째 Circle과 두번째 Circle 위치를 알려주고<br> 하나의 layoutId를 준다면 Framer는 이 두 Circle을 연결 해주어 animation을 만들어준다.<br>

layoutId를 안주었다면 그냥 toggle형식으로 짜주었기 때문에 원이 생겼다 사각형 생겼다 형식으로 바뀔 것이다.<br>

```
return (
	<Wrapper  onClick={toggleClicked}>
		<Box>
			{!clicked ? (
				<Circle  layoutId = "circle"  style={% raw %}{{ borderRadius:  50, }}{% endraw %}/>
			) : null}
		</Box>
		<Box>
			{!clicked ? null : (
				<Circle  layoutId = "circle"  style={% raw %}{{ borderRadius:  0,}}{% endraw %}/>
			)}
		</Box>
	</Wrapper>
);
```

### Framer-Motion #8

마지막으로 해볼 것은 
![enter image description here](https://i.ibb.co/MR01G5s/React-App-Microsoft-Edge-2023-12-15-18-37-12.gif)

화면이 어두워지는 Overlay Component를 만들고<br> AnimatePresence를 이용하여 자연스럽게 어두워지고 자연스럽게 밝아지게 만들어 주었다.

그리고 Box에는 layoutId를 클릭한 박스와 같이 주어 해당 박스가 가운데로 이동하는 애니메이션을 주었다.

<script src="https://gist.github.com/Flen-E/d12f6e8264a7b8f6ee496060f1e693e2.js"></script>


## 마무리
기본적인 Framer-Motion을 써보았다. <br>
이제 css로 애니메이션 노가다가 아닌 라이브러리를 사용하여 더 깔끔한 코드로 다양한 기능을 구현 해보도록 하겠다.<br>
다음에도 쓸만한 라이브러리 포스팅으로 찾아오겠다.<br>


