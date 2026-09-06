## [2026-09-05] HTML & CSS 연습

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### CSS
- 'CSS' 에서 섹션을 크게 대분류 해놓는 태그를 시맨틱 태그라고 한다.
- header는 상단의 머리말. 그 아래 nav (navgation) 문서의 목차 정도. header 안에 nav가 포함된다.
- textarea rows로 텍스트 크기를 설정할 수 있다.
- margin, border, padding, content 박스 모델 개념과 동시에 width, height 같은 공간을 결정하는 태그가 정말 헷갈렸는데, 하루종일 하니까 조금 알겠다.
- content : 가장 작은 기본 박스
- padding : content를 감싸는 박스. 값을 올리면 안이 채워진다.
- border : padding과 margin 사이의 테두리. 값을 올리면 테두리가 두꺼워진다.
- margin : border의 테두리 바깥 영역. 값을 올리면 바깥 영역이 채워진다.
- width : 정해진 영역의 너비를 고정값으로 결정한다.
- height : 정해진 영역의 높이를 고정값으로 결정한다.

### 2. 코드 예시 (Code)
#### HTML
- form action="#" method="post"/form
- form에서 action은 전송할 링크를 적고, method는 전송 수단 규칙이다. post는 로그인 개인정보 등, get는 검색, 조회, 정렬 등
#### CSS
- img src= "이미지 파일 이 곳에 추가" alt="이미지 파일이 뜨지 않았을 때 설명"
- type ="submit" 에서 submit은 form에서 사용자가 입력한 양식 데이터를 제출하고 전송하는 실행 버튼이다.
- background-img:url로 워크 스페이스에 있는 이미지를 추가할 수 있다.

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- 아직 section과 div를 어떻게 혼용해서 사용할지, 구역을 어떻게 나누고 일괄적으로 쉽고 편하게, 값을 입력하는지 어렵다. 공통 작업을 해야 하는 부분과, 그렇지 않은 부분을 먼저 알아내고 작업 하는 것이 더 나은 작업 같다.
- 어제 5시간은 오류밖에 없었지만, 오늘 8시간은 오류가 반이나 줄었다. 대부분은 오류는 선택자를 헷갈려 하며 이상한 영역에 변경사항이 적용됐다.
- 오늘은 form에서 button 태그가 헷갈리고, 동시에 css에서 작업하는 transition 태그와 이어 나오는 속성값, transfrom: traslateY();까지 다 헷갈렸다.


### 4. 내일 공부할 내용 (Next)
- header, nav, section, footer 그리고 body, div, span 각각의 요소 알맞게 사용할 수 있게 복습하기.
- HTML,CSS 전체적으로 복습 한 번 더 하고, JavaScript 예습하기.