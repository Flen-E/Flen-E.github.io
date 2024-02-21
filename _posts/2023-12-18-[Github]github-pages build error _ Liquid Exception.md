---
layout: post
title:  "[Github] Liquid Exception: Liquid syntax error"
date:   2023-12-18 18:25:00 -0500
excerpt: "github page 포스팅에러 Liquid Exception에 대해서 알아보자"
tags: github
---

# [Github] Liaqid Exception: Liquid syntax error

블로그를 포스팅 했지만 github블로그에 포스팅이 되지 않아서 
아 원래 느린갑다 하고 넘어갔지만 2개째 올리는데도 포스팅이 되지 않아 github에 들어가 action을 확인해보니


![enter image description here](https://i.ibb.co/997FyR7/2023-12-17-211526.png)

오잉? build를 실패 한 것이다. 난 단순 빠르게 commit해서 난 오류인 줄 알았는데 오류 내용을 확인해보니

![enter image description here](https://i.ibb.co/GcbmsFG/2023-12-17-211839.png)

내 markdown 코드에 오류가 난 것이다. 현재 블로그들은 전부 markdown언어로 작성하고 있어 다음번에 같은 실수를 하지 않기 위하여 포스팅 하게 되었다.
 오류문을 읽어보면 알듯이 {{, }}은 정규표현식으로 사용되어 제대로된 처리가 되지 않아 오류가 난것이다.
## 해결법
이를 해결하는 방법은 쉽다고 한다.
![enter image description here](https://i.ibb.co/Lr8G57G/2023-12-17-212811.png)
앞에 raw 뒤에는 endraw를 넣어주면 된다고 한다.
오류 해결법을 더 찾아보니 그냥 띄어 주기만 하면 된다고 한다 `{{` => ` { { `
같은 형식으로 고쳐준다면 해결된다고 한다.

