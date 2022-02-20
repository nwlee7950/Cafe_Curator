# 1.10.(월) 진행 사항
* 팀 미팅 진행 
	* 기획에서 부족한 부분과 다른 방향성에 대해 알 수 있었다. 
  * 정리 내용
    1. 인증 : 인증 자체가 고도의 복잡한 부분이 있다. Three party 사용하면 금방 진행되고 문제 없지만, 그게 아니라면 인증 설계를 따로 해야한다.   
    2. 관심사 : 설계는 카운팅하는 방향으로 되어있는데 이는 그닥 플러스 사항이 아님. 기술적으로 구현해보고자 한다면 log를 이용하여 추천 알고리즘 구현이 필요 
    3. 위치 : API 사용해도 되지만, 네이티브 사용도 가능 => API 사용
    4. 파일 업로드 : 어떻게 구현할지 생각할 필요있다. (SSAFY AWS 1대 운용) => AWS 
    5. 랭킹 : 기획은 단순 카운팅으로 진행되는 부분이라 간단. 단순 카운팅은 full-scan하기 때문에 트래픽 등의 문제 발생.  캐시 사용하는 방향으로 가는게 좋다
    6. 댓글 : 스키마 설계가 중요 => 해야하고
    7. 좋아요 : 기획은 랭킹과 같이 full-scan이므로 다른 방향 생각해보는 것이 좋다. 스키마 설계 중요 => 해야하고
    8. 알림 : TCP를 통한 방법 확인해볼것 => 후순위
    9. 기타 : 팀미팅 간 이야기한것 모두 구현이 가능할지 이야기해보고, 우선순위 정하는 것이 가장 중요 
  * 현재 백단은 CRUD로 기획된 부분이 많아 light함. 프론트 쪽으로 쏠림이 있다. 백단에서는 MSA 등을 사용하여 어필하는 방향이 좋을 거 같다.

* 와이어프레임 제작<br/>
  ![0110_와이어프레임_제작](/uploads/7ec2197427b2a274e862818c6a080b11/0110_와이어프레임_제작.JPG)

* React 공부<br/>
  * 리액트 기본 사용법 공부
  * JSX, Javascript 이용한 리액트 활용
  * useState, useEffect를 활용한 웹 상 기능들 구현 연습
  * Props를 통한 컴포넌트 간 데이터 교환방법 공부
  ![0110_React_1](/uploads/9223b7b89471f2f2a3726011675c18e8/0110_React_1.JPG)
  ![0110_React_2](/uploads/9e587181d23e8d7466c95e833ddb4653/0110_React_2.JPG)

# 1.11.(화) 진행 사항
* JIRA 완성 (프론트)<br/>
  ![0111_JIRA_제작](/uploads/0b1c98431d74ce1f3b9e13ba8656376f/0111_JIRA_제작.JPG)
* React 공부<br/>
  * API를 활용한 영화 평점 사이트 제작하여 리액트 연습
  * useState를 통한 데이터 변경 인식 후 변경 사항 적용
  * useEffect 또는 async await를 통해 API에서 필요한 정보를 가져옴
  * props를 통한 컴포넌트 간 데이터 교환
  * router를 사용하여 기능별로 나누어 영화 평점 사이트 제작
  * parameters를 사용하여 디테일 페이징 
  ![0111_React](/uploads/e5cef43bf94826aba74db8d2eb66ebcf/0111_React.JPG)

# 1.12.(수) 진행 사항
* JIRA 변경 (프론트)<br/>
  ![Jira2](/uploads/1c21d8c6d232ee7fc34e9eac2bed3f2c/Jira2.JPG)
  ![Jira](/uploads/69e02b6054f287ee3439eac0338aae0d/Jira.JPG)
* React 공부<br/>
  * 앞서 배운 React를 토대로 로그인 기능 제작 연습
  ![App](/uploads/87db695c70c3c92d90a3c859be98ed95/App.png)
  ![Loginform](/uploads/0a77b1035e5a293fb70c55965dbbc41d/Loginform.png)
  ![Login창](/uploads/82d19cb0676c96fe535f6c4d168a879a/Login창.JPG)
  ![로그인_성공창](/uploads/8e0329e9fdd3d834c67682335a2fb9c4/로그인_성공창.JPG)

# 1.13.(목) 진행 사항+
* JIRA 진행사항 (프론트)<br/>
  ![JIRA0113](/uploads/3ad966f4e31075992c209006a54705f8/JIRA0113.JPG)
* React 공부<br/>
  * 피드형 연습
  ![연습](/uploads/8b1dce4826cbb788a9d6042957588acb/연습.JPG)
  ![연습2](/uploads/d8b9fbd3f0baf39ec33a58a6b8d32b91/연습2.JPG)
  ![연습3](/uploads/f93bb036e084a7176fab4a2a7d12be7b/연습3.JPG)
  * Navbar 제작
  ![캡처](/uploads/63b3527a3f15ae536af704e101c840c9/캡처.JPG)
