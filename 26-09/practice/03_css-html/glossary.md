## HTML 기초 설명
---
- HTML은 웹 페이지를 작성하는데 사용되는 표준 마크업 언어이다.
    
> 마크업 : 태그 (< >)를 이용해 문서의 구조, 뼈대, 의미를 정의하는 상위개념
ex) HTML,XML,SGML
마크다운 : 마크업 언어의 복잡성을 줄여 읽고 쓰기 편하게 만든 경량 마크업 언어
ex) Markdown(.md)
---
```text
- 기본 구조는 문서유형 <doctype html>
                  <html lang="en">
                   html
                    ├─ head
                    └─ body

   속성             내부문자
    │                 │
<p align='center'> HTML/CSS </p>
 │          │                 │
시작태그    속성값            종료태그
```
1. 태그(Tag) : <></> 형태의 시작과 종료 형태의 명령어
2. 요소(Elemnet) : 시작태그와 종료태그로 이루어진 모든 명령어
3. 속성 (Attribute) : 요소의 시작태그에만 사용 / 명령어 구체화 역할
4. 속성값 (Argument) : 속성이 가지는 값
> * 속성 (property) : JavaScript에서 뜻하는 속성은 property이다. JavaScript의 객체(Object)라는 데이터 상자 안에 들어있는 이름표(key)와 내용물(Value)의 쌍이다. 
<!-- HTML문서가 아닌 **DOM 트리 객체** (JavaScript 메모리) . 초기 설정값이 고정된 Attribute와 다르게 Property는 현재 실시간 상태값으로 동적으로 변한다.
        * **DOM (Document Object Model)트리 객체** : 브라우저가 HTML 코드를 읽어 들인 후 각각의 HTML 태그들을 JavaScript가 조작할 수 있는 객체(Object) 형태로 바꾸고, 이들을 나무가 가지를 뻗듯 부모-자식 관계로 엮어놓은 데이터 구조. HTML 파일의 단순한 텍스트 브라우저 화면을 JavaScript가 제어하려면 다루기 쉬운 형태로 변환해야한다. -->
---
- 태그는 대소문자를 구분하지 않지만, 통상적으로 태그는 소문자를 권장한다.
> 왜???