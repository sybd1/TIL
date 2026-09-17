## [2026-09-07] React 기본 개념

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### React
- Element : 화면에 렌더링할 내용을 묘사하는 것은 같지만, React 내 가상 DOM에서 만들어지는 요소이다.
- Component : 요소를 찍어내는 함수 또는 클래스. UI를 재사용 가능한 '부품'으로 나눈 역할을 한다.
- Virtual DOM : 실제 DOM이 아닌 가상 돔을 만들어 이전화면과 새로운 화면을 비교해서 변경되는 입력 값만 수정하는 효율적인 방법을 가능하게 해준다.
- JSX : JavaScript의 확장 문법이다. 직관적이고 쉽게 코드를 작성 할 수 있다. 모든 컴포넌트 이름은 앞 글자 대문자로 작성해야 작동한다. JS 표현식은 {}중괄호 안에 넣어야 한다. 인라인 스타일은 '객체' 형태로 전달해야 한다. 모든 태그는 반드시 닫혀야 한다.
- DOM tree 방식은 요소 값 하나만 바뀌어도 페이지 전체가 동작하는데, Virtual DOM은 바뀐 요소 값이 있는 부분만 Diffing하여 변경 값의 레이아웃만 수정하고 화면에 나타낸다. 그 덕분에 1초마다 바뀌는 시계도 쉽게 만들 수 있다.
- CDN은 일종의 코드 덩어리 같은 것이다. 프로젝트가 아닌 임시로 사용할 수 있게 도와주는 라이브러리가 담긴 코드이다. 이 코드가 담긴 링크만 사용해도 라이브러리와 동일한 기능을 사용할 수 있다.
- Props : 읽기 전용 데이터. 부모 component가 자식 component에게 데이터를 전달하는 통로이다. 데이터는 항상 위에서 아래로 흐른다.

### 2. 코드 예시 (Code)
```text
- JSX 방식 컴포넌트
function NewWay() {
            return (
                <div>
                    <h1 className='greeting'>JSX방식</h1>
                    <p>HTML처럼 보여서 훨씬 직관적이다!!</p>
                </div>
            );
        }
Props 부모/자식 관계
        function Nmixx({ name = '귀여운 멤버들', age = '귀여운 나이', anything }) {
            return (
                <>
                    <h2>저는 {age}년생 {name}입니다. 잘 부탁드립니다~ {anything}</h2>
                </>
            );
        }

        function App() {
            const name1 = '윤아';
            const name2 = '지우';
            const age1 = '04'
            const age2 = '05'

            return (
                <>
                    <Nmixx name={name1} age={age1}>다시 뛰어 들어~ 난~</Nmixx>
                    <Nmixx name={name2} age={age2}>벽 앞에 새길래 난 너와 내 everything~</Nmixx>
                </>
            );
        }
    

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- 컴포넌트 이름 까먹지 말고 앞 글자를 대문자로!
- props 부모요소 태그 안에 값과, 자식 요소의 매개변수 안 객체 구조 분해로 빼내어 사용하는 변수 이름은 서로 연결되어 있다.
- 데이터가 위에서 아래로 흐른다는 이야기는 코드를 적는 순서(줄)가 아니라, DOM Tree에서 위 아래 위치를 말하는 것이다. 정확히는 React 엔진이 관리하는 Component Tree라고 한다.
- props 부모 태그 안 {}안에 값을 넣을때 0으로 시작하는 숫자를 사용하면 문법 오류가 나서 실행이 되지 않는다. 자바스크립트가 10진수가 아닌 8진수 데이터로 해석하려고 해서 오류가 난다.


### 4. 내일 공부할 내용 (Next)
- React State
