---
layout: post
title:  "[자바 공부] 신고 결과 받기 HashSet, HashMap 사용하고 알아보기"
date:   2023-10-14 09:30:00 -0500
tags: algorithm java
---


# [자바 공부] 신고 결과 받기(HashSet,HashMap)

## 문제

#### 문제 설명

신입사원 무지는 게시판 불량 이용자를 신고하고 처리 결과를 메일로 발송하는 시스템을 개발하려 합니다. 무지가 개발하려는 시스템은 다음과 같습니다.

-   각 유저는 한 번에 한 명의 유저를 신고할 수 있습니다.
    -   신고 횟수에 제한은 없습니다. 서로 다른 유저를 계속해서 신고할 수 있습니다.
    -   한 유저를 여러 번 신고할 수도 있지만, 동일한 유저에 대한 신고 횟수는 1회로 처리됩니다.
-   k번 이상 신고된 유저는 게시판 이용이 정지되며, 해당 유저를 신고한 모든 유저에게 정지 사실을 메일로 발송합니다.
    -   유저가 신고한 모든 내용을 취합하여 마지막에 한꺼번에 게시판 이용 정지를 시키면서 정지 메일을 발송합니다.

다음은 전체 유저 목록이 ["muzi", "frodo", "apeach", "neo"]이고, k = 2(즉, 2번 이상 신고당하면 이용 정지)인 경우의 예시입니다.
|유저 ID|유저가 신고한 ID | 설명|
|---|---|---|
|"muzi"|"frodo"|"muzi"가 "frodo"를 신고했습니다.
|"apeach"|"frodo"|"apeach"가 "frodo"를 신고했습니다.
|"frodo"|"neo"|"frodo"가 "neo"를 신고했습니다.
|"muzi"|"neo"|"muzi"가 "neo"를 신고했습니다.
|"apeach"| "muzi"|"apeach"가 "muzi"를 신고했습니다.

각 유저별로 신고당한 횟수는 다음과 같습니다.
|유저 ID|신고당한 횟수 | 
|---|---|
|"muzi"|1|
|"frodo"|2|
|"apeach"|0|
|"neo"|2|

위 예시에서는 2번 이상 신고당한 "frodo"와 "neo"의 게시판 이용이 정지됩니다. 이때, 각 유저별로 신고한 아이디와 정지된 아이디를 정리하면 다음과 같습니다.

유저 ID|유저가 신고한 ID | 정지된 ID|
|---|---|---|
|"muzi"|["frodo", "neo"]|["frodo", "neo"]
|"frodo"|["neo"]|["neo"]
|"apeach"|["muzi", "frodo"]|["frodo"]
|"neo"|없음|없음
따라서 "muzi"는 처리 결과 메일을 2회, "frodo"와 "apeach"는 각각 처리 결과 메일을 1회 받게 됩니다.

이용자의 ID가 담긴 문자열 배열  `id_list`, 각 이용자가 신고한 이용자의 ID 정보가 담긴 문자열 배열  `report`, 정지 기준이 되는 신고 횟수  `k`가 매개변수로 주어질 때, 각 유저별로 처리 결과 메일을 받은 횟수를 배열에 담아 return 하도록 solution 함수를 완성해주세요.

#### 제한 사항

-   2 ≤  `id_list`의 길이 ≤ 1,000
    -   1 ≤  `id_list`의 원소 길이 ≤ 10
    -   `id_list`의 원소는 이용자의 id를 나타내는 문자열이며 알파벳 소문자로만 이루어져 있습니다.
    -   `id_list`에는 같은 아이디가 중복해서 들어있지 않습니다.
-   1 ≤  `report`의 길이 ≤ 200,000
    -   3 ≤  `report`의 원소 길이 ≤ 21
    -   `report`의 원소는 "이용자id 신고한id"형태의 문자열입니다.
    -   예를 들어 "muzi frodo"의 경우 "muzi"가 "frodo"를 신고했다는 의미입니다.
    -   id는 알파벳 소문자로만 이루어져 있습니다.
    -   이용자id와 신고한id는 공백(스페이스)하나로 구분되어 있습니다.
    -   자기 자신을 신고하는 경우는 없습니다.
-   1 ≤  `k`  ≤ 200,  `k`는 자연수입니다.
-   return 하는 배열은  `id_list`에 담긴 id 순서대로 각 유저가 받은 결과 메일 수를 담으면 됩니다.

#### 입출력 예시
##### 입출력 예

|id_list|report| k| result|
|---|---|---|---|
|["muzi", "frodo", "apeach", "neo"]|["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"]|2|[2,1,1,0]|
|["con", "ryan"]|["ryan con", "ryan con", "ryan con", "ryan con"]|2|[2,1,1,0]|

##### 입출력 예 설명
##### 입출력 예#1
문제의 예시와 같습니다.
##### 입출력 예#2
"ryan"이 "con"을 4번 신고했으나, 주어진 조건에 따라 한 유저가 같은 유저를 여러 번 신고한 경우는 신고 횟수 1회로 처리합니다. 따라서 "con"은 1회 신고당했습니다. 3번 이상 신고당한 이용자는 없으며, "con"과 "ryan"은 결과 메일을 받지 않습니다. 따라서 [0, 0]을 return 합니다.

#### 제한시간 안내
-   정확성 테스트 : 10초

### 해결방안
#### solution#1
```
import java.util.*;

class Solution {
    public int[] solution(String[] id_list, String[] report, int k) {
        int [] answer = new int[id_list.length];
        //report를 유니크하게 만들어줌 같은 신고를 삭제해준다
        HashSet<String> uniqueReport = new HashSet<String>(Arrays.asList(report));
        //신고자와 신고 당한자 가질 map을 만들어준다
        HashMap<String, HashSet<String>> reporterInfoMap = new HashMap<>();
        //신고당한자와 신고된 수 가질 map을 만들어줍니다
        HashMap<String, Integer> reportedCountInfoMap = new HashMap<>();
        
        for(int i = 0; i < id_list.length; i++){
            String reporter = id_list[i];
            reporterInfoMap.put(reporter,new HashSet<>());
        }
        
        for(String reporterList : uniqueReport){
            // 신고자
            String reporter = reporterList.split(" ")[0];
            // 신고당한자
            String attacker = reporterList.split(" ")[1];
            //신고자들을 찾아 신고당한사람들을 추가해줌
            reporterInfoMap.get(reporter).add(attacker);
            //신고당한 사람의 신고횟수를 만들어줌
            reportedCountInfoMap.put(attacker, reportedCountInfoMap.getOrDefault(attacker, 0) + 1);

        }
        //reportedList : reportedCountInfoMap에 들어가는 attacker
        for(String reportedList : reportedCountInfoMap.keySet()){
            //신고자수를 받아옴
            int count = reportedCountInfoMap.get(reportedList); 
            //k명 이상이면 신고가 되기때문에 메일을 발송 해줘야함
            if(count >= k){
                //모든 유저를 둘러봄
                for(int i = 0; i < id_list.length; i++){
                  if(reporterInfoMap.containsKey(id_list[i]) && 
                     reporterInfoMap.get(id_list[i]).contains(reportedList)){
                      answer[i]++;
                  }   
                }
            }
        }
        return answer;     
    }
}
```

본인은 문제 해결에 있어 HashMap과 HashSet의 자바 Map 인터페이스를 잘 몰라서 String 배열로 짜보았지만<br> 문자열을 비교하기 때문에 해당 배열 하나하나 뒤져보고 비교를 하다 보니 시간초과도 나고 <bR>안나게 contain으로 짜다보니 사람 이름이 a 일수도 ab일수도 있어서 문제를 해결하지 못하였다.

### HashMap , HashSet
그리고 찾아본 결과 Map 인터페이스 구현체와 Set 인터페이스 구현체가 있어서 이를 이용하기로 했다. <bR>

#### 중복 여부
HashMap은 Key는 중복이 되지 않으며 유일하고,<br> HashSet은 객체 자체로 데이터를 저장하기에 중복이 허용되지 않는다.

#### 데이터 삽입
HashMap은 put() method를 활용하여 데이터를 삽입한다. Key-Value쌍인 형태로 데이터를 저장하기 때문에 하나의 객체가 생성된다. <bR>
HashSet은 add() method를 활용하여 데이터를 삽입한다. 객체 그 자체로 저장하고 내부에는 HashMap을 사용하기 때문에 객체 Key와 객체 Value를 저장하여 두개의 객체가 생성된다.

우리는 이러한 특성을 활용하여 중복된 신고를 없애기 위해 HashSet을 이용하여 유니크하게 만들어 주었다. 사실 key가 중복되서 hasmap으로 반복문을 사용하면 만들 수 있지만 해당 방법이 지금은 더 유용한 것 같아 set으로 Arrays.asList() 를 활용해 간단히 배열을 HashSet으로 만들어 주었다.<br>
나머지는 주석을 통해 자세히 적어 놨으니 코드를 보며 되씹으면 좋을 것 같다.
