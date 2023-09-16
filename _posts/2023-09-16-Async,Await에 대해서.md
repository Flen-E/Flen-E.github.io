---
layout: post
title:  "Async/Await 간단하게 사용해보자"
date:   2023-09-16 18:19:00 -0500
tags: react javascript
---

#  Async/Await 사용해보기
들어가기 앞서 이것이 무엇 인지와 왜 사용하는 지 간단하게 알아 보도록 하겠다.

##  Async/Await 무엇일까?

`async/await`는 `Promise`를 좀 더 가독성 좋고 유지보수성 좋게 도와주며 동기적으로 실행되는 것처럼 보이게 하는 문법이다.<br>
Async는 asyncronous(비동기)인데 우리가 JS를 사용하다 보면 비동기 방식을 자주 사용을 하게 될 것이다. <br>
이때 비동기 호출 후 이를 처리해주는 콜백 함수의 개념은 매우 중요해지는데 <br>
이때 콜백함수가 깊어지면 코드가 복잡해 가독성이 떨어지게 되는데,<br>
 async와 await를 이용하여 보다 깔끔하게 처리를 할 수 있게 되었다.

이를 사용하는 방법은 함수의 앞부분에 async 키워드를 붙여주고<br>
해당 함수 내부에서 `Promise` 앞부분에 await 키워드를 사용해주면 된다.<br>

이렇게 해주면 `Promise`가 끝날 때까지 기다리고 난 뒤 후의 작업을 실행시킬수 있다.


요약하자면<br>
<ul> 동기방식 특징
<ul>
	<li>동시에 여러 작업을 수행할 수 없다.
	<li>흐름을 예측하기 쉽고, 수행의 순서를 명확하게 안다.
	
<ul> 비동기 방식 특징
<ul>
	<li>동시에 여러 작업을 수행할 수 있다.
	<li> 흐름을 예측하기 어렵다. (무엇이 먼저 완료될지 모름,순서x)

이렇기에 우리는 비동기 방식의 함수들을 콜백 함수인 익명 함수를 사용 해주어 해결해주고 <br>
이에 코드를 더 간결하고 가독성과 유지보수를 향상 시켜주기 위하여 `async/await`를 사용 해준다.

## 그럼 Promise는 먼데?

`async/await`를 사용하기 전에 `Promise`를 알고 가야 한다.<br>
위에 말했듯이 `async/await`는 `Promise`를 깔끔하게 해주는 문법이라 했는데 그럼 Promise는 멀까?<br>

비동기 처리 예시를 콜백함수를 이용하여 처리해보겠다.<br>
`setTimeout()`을 사용하여 1초단위로 job을 출력해주는 코드이다.

<script src="https://gist.github.com/Flen-E/a7067acf4bba8014e5a691186332aa43.js"></script>

해당 코드처럼 `setTimeout()`안에 콜백안에 콜백안에 콜백을 넣어 순서대로 출력을 해줄 수 있는데<br>
 이를 반복하여 사용하다 보면 끔찍한 코드가 될 것이다.<br>

이를 해결 하고자` Promise`라는 도구를 사용하여 보다 깔끔하게 볼 수 있는데,

<script src="https://gist.github.com/Flen-E/aa7b1c94e5268c2ad29b69bf74ca9c91.js"></script>

`setTimeout()` 자체가 `Promise`반환을 하지 않아 new Promise로 감싸놨는데 이렇게 작성하면 콜백함수로 받아 작업을 하고 return으로 Promise를 던지고 다음 then 작업을 하게 되는 수행을 하게 된다.

## Async/Await 사용해보자
이제 가독성도 챙겼고 유지보수하기도 쉬운 코드를 얻었지만 계속 되는 then과 콜백함수를 줄이기 위해 `async/await`를 사용 하는 것이다.

<script src="https://gist.github.com/Flen-E/47688271b40cd7fcd42d8d1eadfe9b52.js"></script>

아까 위에 코드와 같지만 확실히 간결해진 것을 알 수 있다.

## 마무리
`async/await`를 사용하면 기존에 then(), catch()로 작업하던 `Promise`를 간편하게 사용이 가능하게 되었다. <br>
사실 나 같은 경우는 기초도 모른 채 `async/await`를 남발 해왔었는데 이런 의미가 있는 줄은 몰랐다.<br>
 구글에 검색해보니 더 자세히 나와있으니 여기선 간단히 본다고 생각하고 더 자세히 알아보면 좋을 것 같다.

