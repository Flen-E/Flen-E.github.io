## Styled-Components 

![enter image description here](https://i.ibb.co/XbgpYHY/img.png)


styled-components라는 것을 알아보도록 하자

![enter image description here](https://i.ibb.co/ZHTHh7J/2023-08-19-001527.png)
우리가 알고 있는 다양한 사이트들이 styled-component를 사용중이라고 한다. github 레고 라이엇 등등

## Styled Components 설치하기

Styled Components는 npm을 통해 관리되는 패키지라 간단하게 npm 명령어를 통해 설치가 가능하다.
```
npm install styled-components
```
을 이용하여 styled-components를 설치 해준다.

## 기본적인 사용법

설치가 완료 되었으면 당연히
```
import styled from "styled-components";
```
import 해주고 기본적으로 html의 모든 태그들에 스타일을 적용이 가능하다.
styled-component를 쓰기 이전이나 아무런 패키지를 사용하기 전에는 

<script src="https://gist.github.com/Flen-E/a71d0c1c0a0f73f0ba6cc3c8e010552a.js"></script>
non-styled-component

위와 같은 방식으로 `div`에 styled를 입히는 방법이나
<script src="https://gist.github.com/Flen-E/4ad2be32ec57bd64ba987ab098c3578b.js"></script>
위 방식으로 `className`을 붙여 해당하는 컴포넌트에 css를 불러와 입히는 방식이였다.

<script src="https://gist.github.com/Flen-E/b83213949ccb032ab432eb106848e067.js"></script>
기본적으로 
```
const varName = styled.tagName
```
뒤에 ``(back tick)를 붙여 style을 작성 해주면 된다.
![enter image description here](https://i.ibb.co/pjFTHzv/2023-08-19-012110.png)

## 재사용성

위 코드를 보면`BoxOne`과 `BoxTwo`가 거의 비슷한 내용을 지니고 있다.
색만 바꿔도 되는 경우에는 원한는 style을 `props`를 통해 컴포넌트 마다 원하는 속성을 적용해 줄 수 있다.

<script src="https://gist.github.com/Flen-E/e5b0e5ab6bdda811d0e424840ab7d94f.js"></script>

`BoxOne`과 `BoxTwo`를 하나의 `Box`라는 컴포넌트로 통합하고 bgcolor을 통해 배경색을 `props`받아 지정해주었다.
재사용성 up

## 확장
위 방법과 마찬가지로 나머지 속성은 동일한데 모양이 원인 Component를 만들고 싶을때는 이렇게 활용 해줄 수 있다.

<script src="https://gist.github.com/Flen-E/640eb5d4a26e377bcad1b352fea09337.js"></script>

`div`를 지우고 styled(Box)를 활용하여
`Box`에 있는 모든 속성들을 가지고 오고 추가할 속성을 적어주면 된다.

![enter image description here](https://i.ibb.co/4V5WW79/2023-08-19-013215.png)

## as 속성

원하는 속성을 그대로 가져다 쓰고 싶은데 `div`가 아닌 `header`로 설정을 하고 싶은데 중복되는 코드를 하나 더 만들기 보다는 `as`를 사용 하여 손쉽게 해결 할 수 있다.
<script src="https://gist.github.com/Flen-E/a6f6f3a84fa4f2a7db76a17c3c5632b1.js"></script>

![enter image description here](https://i.ibb.co/0DkxQjm/2023-08-19-013859.png)
`div` 태그가 `header` 태그로 교체된 것을 오른쪽 요소를 통해 알 수 있다.

## 속성 추가

태그를 수정 해주고 싶은데 예를 들어 `required` 속성과 `maxLength`가 필요한 `input` 태그가 여러개 필요할 경우에 각각` input`태그에다가 `required `속성을 다 추가 해주는 것이 아닌 styled-components를 통해 속성을 지정 해줄 수가 있다.

<script src="https://gist.github.com/Flen-E/65ae774f761be67588dd3ea85c89bedd.js"></script>

![enter image description here](https://i.ibb.co/xzk8Hpc/2023-08-19-022501.png)

성공적으로 적용됨을 확인 할 수 있다.

## 애니메이션
styled-component에서 애니메이션을 사용하기 위해서는 `keyframes`를 import 해줘야 한다.
```
import { keyframes } from  "styled-components";
```

`keyframes`를 이용하여 간단하게 사각형이 되었다 원이 되고 빙빙 도는 애니메이션을 추가 해보겠다.

 <script src="https://gist.github.com/Flen-E/de4161c5f3acd4c889e2527cd5a2ac4b.js"></script>

![enter image description here](https://i.ibb.co/C1Lfb8v/Clipchamp-1.gif)


## 가상 선택자, 타켓 지정
pseduo selector이라 부르는 가상선택자는 html 요소를 직접 선택하지 않고 요소의 상태에 따라 선택하여 꾸며주는 것을 의미한다.

간단하게 `span`위에 마우스를 올리면(:hover) 안에 있는 Emoji가 커지는 것을 만들어 보겠다.

<script src="https://gist.github.com/Flen-E/69429d4e72ad5e81ab3eb005916e24d8.js"></script>

![enter image description here](https://i.ibb.co/rvvXm4Y/Clipchamp-2.gif)

`span`에 `:hover` 가상 선택자를 적용 해준 모습이다.
`span`안에 `&:hover`형식으로 해줘도 되고 주석 처리 해둔 것처럼 해도 같은 동작을 한다
나는 위에 방식이 조금 더 좋다고 생각한다.

좀 더 디테일 하게 `span`이 아니라 Emoji Component를 만들어서 
타켓 지정하여 적용하는 방법도 알아 보겠다.

<script src="https://gist.github.com/Flen-E/ea506783430cb3021b8c0872060601ea.js"></script>

`&{Emoji}`를 활용하여 Emoji를 타켓해 변경해주는 모습이다.

## 마무리
이러한 방법은 우리가 css관리에 있어서 큰 장점이라 생각한다.
아얘 `Button`과 `Span` 등의 양식을 제공해주는 react 라이브러리도 있지만
해당 방법은 제공해주는 양식에 의존해야하는 단점이 있다.
하지만 styled-component를 사용한다면 자기 프로젝트에 입맛에 맞게 정해주고 CSS관리 처럼 
`className`을 올바르게 작성했는지 알아 볼 필요는 없고 랜덤한 `className`을 지정해주기에 네이밍 고민도 줄어든다.
styled-component를 처음 공부하여 사용해 보았는데 앞으로도 자주 사용 하고 사용하기에 따라 활용도는 엄청나다고 생각한다.
