---
layout: post
title:  "React Router 화면 이동"
date:   2023-08-16 18:19:00 -0500
tags: react
---
 
# React Router

페이지를 만들었으면 페이지 이동할 수단이 필요한데 리액트에서는 이를 `React Router`를 통해 처리 할 수 있다.
들어가기 앞서 `React Router`에 대해서 알아보고 가겠다.

 > React Router에 대해서

`SPA`방식 부터 알고 가자<br/>
Single Page Application으로 말 그대로 단일 페이지 애플리케이션이다.<br/>
서버로부터 완전한 새로운 페이지를 불러오는 것이 아닌 현재의 페이지를 동적으로 다시 `rendering`해주는 방식이다.<br/>

### 리액트 SPA 방식은 어떤가..<br/>
기존 웹 페이지 처럼 (MPA방식) 여러 개의 페이지를 사용하지만 새로운 페이지를 로드하지 않고 하나의 페이지 안에서 필요한 데이터만 가져오는 형태를 가진다.
한마디로 신규 페이지를 불러오지 않는 SPA에서 각각 요청한 URL에 따라 선택된 페이지를 렌더링 해주는 라이브러리라고 볼 수 있다.


## react-router-dom

### 설치하기
간단하게 npm 명령어를 통해 설치가 가능하다.
```
npm i react-router-dom
```
해당 프로젝트들은 여태 신규로 나온 v6이 아닌 이전 버전으로 진행을 할 것이기에 버전을 낮추어 설치 해주겠다.
```
npm i react-router-dom@5.3.0 react-query
npm i --save-dev @types/react-router-dom
```

### 기본 사용법

<script src="https://gist.github.com/Flen-E/4be395d2d35d0eabedd89bacde6331ce.js"></script>

* BrowserRouter : Browser History API를 사용하여 현재 위치의 URL을 저장해주는 역할이다.
* Switch : 자식 route들을 구성하고 있는 단위이다.
* Route : path를 통해 URL을 분기 시킬수 있으며 중첩하여 사용가능하다.

<h4/> 잠시... v6<br/>

v6버전에서는 Switch대신 Routes로 바뀌었으며 Route쓰는 법도 다르다. React Router에 대한 철학이 바뀌면서 전체적으로 쓰는 방법이 바뀌었다고 한다.
이에 대해서는 조금 더 공부해오고 알아보는 시간을 갖도록 하겠다.

### 링크 이동하기
React Router Dom 을 이용하여 path를 설정해 주었으면 이제 사용자의 요청을 받아 볼 것이다.
페이지를 새로운 페이지로 부르지 말고 렌더링 해주는 방식으로 이동하려면 `Link` Component를 사용하면 된다.
  
  <script src="https://gist.github.com/Flen-E/96a35bb0f7084be22d445687ee802c43.js"></script>
  
pathname에 이동할 url을 넣고 state를 통해서 원하는 state를 전송할 수도 있다. 
useParams와 useQuery는 다음 포스팅에서 Link예시와 같이 보여주도록 하겠다.

`Link`역시 `a태그`와 같이 이동을 하게 되지만 주소의 경로만 바꾸며 새로 렌더링 하지 않음을 확인 할 수 있다.

