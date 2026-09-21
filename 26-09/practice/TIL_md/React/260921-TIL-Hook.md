## [2026-09-21] Hook

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### Hook
- useEffect(side Effect 부수효과): 브라우저가 화면을 다 그린 직후 비동기 실행. 서버 REST API(표준 서버 통신 인터페이스) 호출, 전역 이벤트 등록/해제, 타이머 설정.

- useMemo(값의 캐싱):  Dependency Array (의존성 배열, 감시 대상 목록)의 값이 변하지 않았다면 무거운 CPU (중앙처리장치) 연산을 건너뛰고 이전 계산 결과를 재사용합니다. 수천~수만 건의 상품 목록 정렬, 복잡한 검색 필터링, 대시보드 통계 차트 데이터 가공. 자식 컴포넌트에 넘겨줄 무거운 객체/배열의 Reference Equality (참조 동일성, 메모리 주소 일치)를 유지하여 자식의 헛된 리렌더링 방지.

- useCallback(함수 참조 주소 고정) : 컴포넌트가 리렌더링될 때마다 내부 함수가 새 메로리 주소에 생성되는 것을 방지하고 기존 주소를 동결. React.memo로 최적화된 자식 컴포넌트에게 이벤트 핸들러(예: onDelete, onClick)를 Props (프롭스, 부모 전달 속성)로 내려줄 때 필수 사용 (함수 주소가 안 바뀌어야 자식이 리렌더링을 안 함).

- useRef: {.current: 값} 형태의 Mutable(가변성, 직접 수정 가능한) 객체. 값이 바뀌어도 화면이 리렌더링되지 않음. 실제 DOM 포커스(inputRef.current.focus())나 타이머 ID 보관에 사용.

- custom Hook: 컴포넌트가 화면의 UI를 효율적으로 재사용하기 위해 쪼개둔 것이라면, custom Hook은 useState와 useEffect로 이루어진 로직을 효율적으로 재사용하기 위해 만드는 함수이다. 이름은 반드시 use로 시작한다. 그렇게 해야 React엔진과 Linter(코드 검사기)가 Hook 함수라고 이해한다. 그리고 반드시 최상위에서만 호출해야한다. 조건문 반복문 일반 이벤트 핸들러 함수 안에서는 호출할 수 없다. 상태가 아닌 로직을 공유하는 개념이다.

### 2. 코드 예시 (Code)
```text
- useEffect: 화면이 브라우저에 다 뜬 다음, 처음 마운트 됐을 때 딱 1번만 뒤에서 실행.
useEffect(() => {
        fetch('https://api.example.com/user')
            .then(res => res.json())
            .then(data => {
                setUser(data.name);
            });
    }, []);

- useMemo: hardNumber의 값이 바뀌지 않았다면, 절대 hardCalculate함수를 실행시키지 않는다. 지난번에 계산해서 메모리에 메모해둔 결과 값을 그대로 복사해서 사용해!
const hardSum = useMemo(() => {
        return hardCalculate(hardNumber);
    }, [hardNumber]);

- useCallback: 컴포넌트가 리렌더링되어도, 의존성 배열 안의 값이 바뀌지 않는 한 이 함수를 새로 만들지마! 새 메모리 주소 할당하지 말고 지난번에 만든 함수 주소 그대로 재사용해!
const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
}, []); // 빈 배열: 처음 마운트될 때 만든 함수 메모리 주소를 영구 동결하여 자식(TodoItem)의 불필요한 리렌더링 방지

- useRef: 렌더링을 일으키지 않는 비밀 저장소이자 실제 DOM 요소(HTML 태그)를 직접 가리키는 족집게. 값이 바뀌어도 화면을 다시 그리지 마!
const inputRef = useRef(null);

const handleFocus = () => {
    // 렌더링을 유발하지 않고 실제 input 태그에 직접 접근하여 깜빡이는 커서(포커스) 강제 이동
    inputRef.current.focus();
};

return (
    <>
        <input ref={inputRef} type="text" placeholder="입력창" />
        <button onClick={handleFocus}>입력창으로 커서 이동</button>
    </>
);


- custom Hook: 복잡한 input 입력값 제어(useState + onChange) 로직을 깔끔하게 포장해 둔 맞춤형 공구. 로직만 재사용하고 각 컴포넌트의 state는 완전히 독립!
function useInput(initialValue = '') {
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => setValue(e.target.value);
    const reset = () => setValue('');

    return { value, onChange, reset }; // 컴포넌트에서 쓸 알맹이들만 반환
}

// 실제 컴포넌트에서 호출하여 단 한 줄로 연결:
function SignupForm() {
    const nameInput = useInput('');

    return <input value={nameInput.value} onChange={nameInput.onChange} />;
}

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- State가 바뀌면, React 대원칙에 따라 컴포넌트가 1번째 줄부터 다시 실행된다. (리렌더링)
- 모든 Hook 함수가 실제로 어떻게 동작하고 도움을 줄 수 있는지 경험이 없다보니 개념을 외워도 헷갈린다.


### 4. 내일 공부할 내용 (Next)

