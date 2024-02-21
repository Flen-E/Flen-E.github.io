---
layout: post
title:  "Fetch API,Axios로 데이터를 출력해보자"
date:   2023-09-18 18:25:00 -0500
tags: react typescript
category : [react] [typescript]
---


# Fetch API, Axios로 데이터를 가져오자

이번 포스팅에서는 HTTP를 이용하여 데이터를 가져오는 방법을 알아보도록 하겠다.<br>
우리가 웹을 만들 때 데이터를 받아와서 출력을 해줘야 할 때가 있는데 백엔드에서 보내거나 API에서 보내준 데이터를 받아 올 HTTP 클라이언트를 사용해야한다. 이를 해결 해주는 것이 바로 Axios와 Fetch와 같은 HTTP 클라이언트이다.

## Fetch API와 Axios 차이점
간단하게 btc Coin API를 이용해서 데이터를 가져오는 예제를 통해 알아 보도록 하겠다.<br>
useEffect를 활용하여 페이지에 접속 했을 때 바로 코인들의 이름을 출력해보자.<br>
우리가 이용할 API 주소는 https://api.coinpaprika.com/v1/coins 으로 코인의 다양한 정보를 확인 할 수 있는데 <br>

![enter image description here](https://i.ibb.co/JKw1jN7/2023-09-18-165705.png)
보면 id, name, symbol, rank, 등 다양한 데이터중 우린 name을 가져와 출력해볼 것이다.

<script src="https://gist.github.com/Flen-E/421512fed49230c1e4766dfff44c121f.js"></script>
해당 코인들의 정보를 담아 저장할 coins배열을 만들어준 다음 위에 데이터의 타입들을 interface로 정의해주었다. <br>
다음 coins들을 map을 이용하여 하나하나 나열 해주었다.<br>
이제 데이터들을 Fetch API와 Axios로 불러와 출력하는 예제를 보이겠다.


### Fetch API
JavaScript 내장 라이브러리로 Axios와 달리 따로 import 해줄 필요가 없다.<br>
하지만 반환을 Promise 객체로 해주기 때문에 json으로 다시 변환 해줄 필요가 있다. 

useEffect를 통하여 coins에 데이터를 넣어주도록 하겠다.<br>

<script src="https://gist.github.com/Flen-E/8b2d1020f25dddf3ab14792f9560530b.js"></script>

fetch를 이용하여 Promise를 받아 온 다음 해당 Promise를 .json()을 <br>
이용하여 json형식으로 바꾸어 setCoins()에 50개로 잘라서 저장해주었다.<br>
(양이 너무 많아 50개로 줄여줌)<br>
useEffect를 사용 하는 법을 까먹었다면, 
[React-Hook에 대해 간단히 알아보자(useState, useEffect) – 최정재 (flen-e.github.io)](https://flen-e.github.io/React-Hook%EC%97%90-%EB%8C%80%ED%95%B4-%EA%B0%84%EB%8B%A8%ED%9E%88-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90(useState,-useEffect)/) 에서 간단히 보고 오자.

### Axios
Axios는 Promise API를 활용한 HTTP 클라이언트인데 자동으로 Json 데이터 변환을 지원해주기에 따로 json으로 변환해 줄 필요가 없다. <br>
말고 여러가지 차이가 있지만 이번 포스팅에서는 간단하게 데이터 가져오는 것을 보여주겠다.<br>

<script src="https://gist.github.com/Flen-E/16656a0f922ecacbdd8e236cb807f3ae.js"></script>

### 차이점을 코드로 보자
위에서는 예제를 위해 설명했다면 밑에는 간단하게 포스팅하면서 차이를 확인해보겠다.

<li>fetch</li>

```
fetch(url, {
	method : //(POST,PUT,DELETE,ETC.) ,
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringfy({}),
});
```

<li>axios</li>

```
axios.get(post,put,delte, etc.)(url, {
	headers:{
		"Content-Type": "application/json",
	},
	data:{},
}
```
axios도 물론 method로 요청을 선택할 수도 있다.<br>
fetch는 body를 이용하기에 문자열 변환이 필요하며, JSON 데이터 핸들링을 위해 josn()을 이용해주어야 한다.



### fetch와 axios 차이

|Fetch|Axios|
|---|---|
|별도의 설치 필요없음|npm install axios|
|없음|XSRF Protection 보안기능 제공|
|JSON 데이터 핸들링을 위한 추가 절차 필요|자동 JSON 데이터 변환 지원|
|지원하지 않는 브라우저가 있음|거의 다 지원|
|없음|요청 중도 취소, 응답시간 초과 설정이 있음|
|body로 json.stringify()를 통해 서버가 이해하도록 파싱 필요|data로 바로전달|
|Promise based|Promise based|

등 차이가 있다 속도면에서는 fetch가 좀 더 가볍다던데 그래서 그런지 react-native에서는 fetch를 react에서는 axios를 주로 사용한다고 한다.


 

## 마무리
이번 포스팅은 HTTP클라이언트를 활용하여 CoinAPI데이터를 가져오는 간단한 예제를 보았는데 <br>
하단 간단한 예시의 출력물<br>
![enter image description here](https://i.ibb.co/gdr2TSB/2023-09-18-182329.png)

내가 보기에는 설치가 필요하고 다소 무거운 면이 있지만 장점이 많은 axios가 좋은 것 같다고 생각한다.
