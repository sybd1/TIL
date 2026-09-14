## [2026-09-07] Node와 Element를 HTML에서 JavaScript언어로 다루는 법

### 1. 오늘 배운 핵심 개념 (What I Learned)
- Node 부모, 자식, 형제 (element가 붙지 않은 메서드는 공백, 주석까지 포함하는 property이다.)
    - childNodes: 모든 자식 요소들을 NodeList로 반환
    - children: 모든 자식 요소들을 HTMLCollection으로 반환
    - firstElementChild: 첫번째 자식 요소 반환
    - lastElementChild: 마지막 자식 요소 반환
    - parentElement : 기준의 부모 노드 반환
    - nextElementSibling : 기준 바로 다음 형제 요소 반환
    - previousElementSibling : 기준 바로 이전 형제 요소 반환

- textContent: 특정 요소 전체의 텍스트 노드를 찾아 꺼내 변경 가능한 프로퍼티

- insertAdjacentHTML: 기존 내용은 그대로 유지하면서 원하는 위치 4곳 중 하나를 지정해 HTML 문자열을 파싱한 노드를 삽입하는 방법
    - beforebegin: 대상 요소 바깥쪽 앞
    - afterbegin: 대상 요소 앞쪽 맨 앞
    - beforeend: 대상 요소 안쪽 맨 뒤
    - afterend: 대상 요소 바깥쪽 뒤

- createElements / appendChild: HTML 문자열을 파싱하지 않고 요소를 직접 만드는 방법. 요소 블록을 만들고(createElement), 만들어진 요소를 원하는 위치에 조립(appendChild)하는 방식
    -createDocumentFragment(): 임시 조립 공간을 만들어 한번에 많은 요소를 효율적으로 추가할 수 있다.

- attribute, property: HTML 태그에 부여된 attribute 속성들을 Javascript로 읽고 쓰고 확인하고 지우는 방법
    - 읽기: getAttribute('어트리뷰트이름')
    - 쓰기: setAttribute('어트리뷰트이름', '새로운값')
    - 확인: hasAttribute('어트리뷰트이름')
    - 삭제: removeAttribute('어트리뷰트이름')
    - .value: 이 property는 사용자의 입력을 실시간으로 반영한다
    - .getAttribute('value): 이 property는 HTML에 적힌 초기값을 유지하며 실시간으로 바뀌지 않는다. 현업에서는 거의 사용하지 않는다.

- classList: HTML 요소가 가지고 있는 class들의 목록을 보여주고 조작할 수 있는 property. DOMTokenList라는 객체에 저장되어 사용할 수 있다.
    - add(): 클래스 추가
    - remove(): 클래스 제거
    - togle(): 클래스가 있으면 빼고, 없으면 넣는다.
    - contains(): 클래스를 확인하고 boolean값을 반환한다.

### 2. 코드 예시 (Code)
```text
- 노드삽입
const $nmnixxLove = document.getElementById('nswer');
const $member = document.getElementById('jiwoo');
1. 요소 노드 만들기
const $newMember = document.createElement('li');
2. 텍스트 넣어주기
$newMember.textContent = 'sullyoon';
3. 조립하기
$member.appendChild($newMember);

createDocumentFragment 사용
const $fragment = document.createDocumentFagment();
['lilly', 'haewon', 'bae', 'kyujin'].forEach(text => {
    const $li = document.createElement('li');
    $li.textContent = text;
    $fragment.appendChild($li);
});
$member.appendChild($fragment);
```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- camelCase 제발 까먹지 않고 실수 하지 않기.


### 4. 내일 공부할 내용 (Next)

