## [2026-09-21] Hook

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### Hook
- useEffect(side Effect 부수효과): 브라우저가 화면을 다 그린 직후 비동기 실행. 서버 REST API(표준 서버 통신 인터페이스) 호출, 전역 이벤트 등록/해제, 타이머 설정.
- useMemo(값의 캐싱):  Dependency Array (의존성 배열, 감시 대상 목록)의 값이 변하지 않았다면 무거운 CPU (중앙처리장치) 연산을 건너뛰고 이전 계산 결과를 재사용합니다. 수천~수만 건의 상품 목록 정렬, 복잡한 검색 필터링, 대시보드 통계 차트 데이터 가공. 자식 컴포넌트에 넘겨줄 무거운 객체/배열의 Reference Equality (참조 동일성, 메모리 주소 일치)를 유지하여 자식의 헛된 리렌더링 방지.
- useCallback(함수 참조 주소 고정) : 컴포넌트가 리렌더링될 때마다 내부 함수가 새 메로리 주소에 생성되는 것을 방지하고 기존 주소를 동결. React.memo로 최적화된 자식 컴포넌트에게 이벤트 핸들러(예: onDelete, onClick)를 Props (프롭스, 부모 전달 속성)로 내려줄 때 필수 사용 (함수 주소가 안 바뀌어야 자식이 리렌더링을 안 함).
- useRef: {.current: 값} 형태의 Mutable(가변성, 직접 수정 가능한) 객체. 값이 바뀌어도 화면이 리렌더링되지 않음. 실제 DOM 포커스(inputRef.current.focus())나 타이머 ID 보관에 사용.
- custom Hook

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


```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- State가 바뀌면, React 대원칙에 따라 컴포넌트가 1번째 줄부터 다시 실행된다. (리렌더링)


### 4. 내일 공부할 내용 (Next)

