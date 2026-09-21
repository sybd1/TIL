## [2026-09-13] DOM Document Object Model

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### DOM
- 브라우저가 HTML 문서를 읽어 들인 후, Jacvascript가 조작할 수 있도록 각각의 태그를 'Object'로 바꾸어 부모-자식 간의 Tree 형태로 조립해둔 메모리 데이터 구조
- 브라우저에서 HTML이 설계도, CSS가 디자인 레이아웃을 만들었다면, 실질적인 기능을 할 수 있게 하는 Javascript를 사용하기 위해서 DOM 구조를 활용하는 것이다.
- Parsing : HTML, CSS 파일의 텍스트 파일을 토큰으로 분해하고, 컴퓨터가 다루기 쉬운 트리 형태의 객체 구조로 메모리에 올려둔다. 
- Rendering : Parsing한 이후 브라우저 화면에 시각적으로 출력한다.
- Node: DOM Tree에서 갈라져 나와 생기는 점 하나하나를 Node라고 부른다.

#### get element node 
- getElementById : 조건에 맞는 첫번째 요소를 1개 가져온다. documnet 객체에서만 호출 가능하다. 오직 id 속성 하나만 찾을 수 있다. 단일 요소를 찾아오기에 querySelector보다 실행 속도는 가장 빠르다. 사람이 체감할 정도는 아니다.
    - HTMLCollection : getElementsByTagName, getElementsByClassName 같은 여러 개의 'HTML 요소'를 찾아냈을때 반환해주는 'Live Array-like Obeject (살아있는 유사 배열 객체)'이다. DOM에 새로운 요소가 생기거나 기존 요소가 지워지면 실시간으로 즉시 반영되어 업데이트하고 그래서 버그를 유발 할 가능성이 높다. 현재는 거의 사용하지 않는 문법. 최신 메서드를 지원하지 않는다. 
- querySelector : 조건에 맞는 첫번째 요소를 1개 가져온다. CSS 선택자 문법과 동일하게 다양한 태그를 모두 사용할 수 있다. 최신 메서드를 지원한다. document 뿐만 아니라 어떤 특정 요소에서도 바로 호출할 수 있다.
    NodeList : querySelectorAll()같이 여러 개의 '노드(태그, 텍스트)'를 찾아냈을때 이들을 한 묶음으로 담아 반환해주는 'Static Array-like Obeject (정적 유사 배열 객체)'. NodeList는 자체적으로 인덱스 접근, .length, .forEach로 지원하지만, map, filterm reduce 최신 메서드는 사용할 수 없다. 그래서 spread syntax 같이 배열로 바꾼 뒤에 최신 메서드를 사용한다.
    
### 2. 코드 예시 (Code)
```text
- DOM Tree
document (루트 노드)
                  │
                <html> (요소 노드)
            ┌─────┴─────┐
          <head>      <body> (요소 노드)
            │           │
         <title>     ┌──┴──┐
                   <h1>   <p> (요소 노드)
                     │     │
                 "안녕"  "반가워" (텍스트 노드)

- HTMP 문서에서 JavaScript 언어로 된 코드를 사용하려면 <script></script> 내부에 작성하면 된다.

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- DOM은 Javascript 자체 기능이 아니라 웹 브라우저가 제공하는 외부도구(Web API)이다.


### 4. 내일 공부할 내용 (Next)
- JavaScript web에서 작동구현하기
