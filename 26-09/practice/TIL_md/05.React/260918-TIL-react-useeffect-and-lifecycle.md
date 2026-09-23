## [2026-09-18] React Rendering List, useEffect

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### Rendering List
- map메서드를 사용해서 HTML li(list) 목록으로 반환할 수 있다. forEach는 반환값이 없어서 사용할 수 없다.그리고 map으로 배열되는 콜백함수 2번째 매개변수는 index로 반환하기 때문에 li(list) 내부에 index key값을 바로 넣어 사용할 수 있다.

#### useEffect
- Hooks 함수의 집합 중 하나이다. useState가 입력받은 상태값을 실시간으로 처리하는 함수였다면, useEffect는 화면을 그리는 코드가 아니라 화면이 그려진 뒤 실행할 부수 효과(side effect)를 작성하는 함수이다. 즉 렌더링 이후에 발생하는 기능을 처리하기 위한 것이 핵심이다.
- 첫 마운트 시점에는 무조건 한 번 동작한다. 의존성 배열을 생략하면 매 렌더링마다 실행하고, 빈 의존성 배열일 때는 Mount(첫 렌더링) 시에만 실행한다.
- 의존성 배열에 특정 값을 지정하면, 그 값이 동작할 때마다 실행된다.
- 주로 타이머 등록, 이벤트 등록, API 요청 등 한번만 실행시키면 되는 동작에 사용한다.
- cleanup함수 : useEffect가 반환하는 함수이다. 컴포넌트가 화면에서 사라지기 직전(Unmount)에 호출된다. 의존성이 바뀌어 재실행하는 경우에는 이전 작업을 정리하고 새 값으로 작업을 시작한다.

### 2. 코드 예시 (Code)
```text
- Rendering List
function NameList() {

            const [inputValue, setInputValue] = useState('');
            const [names, setNames] = useState([
                { id: 1, text: '푼다' }
            ]);
            const [nextId, setNextId] = useState(2);

            const handelChange = (e) => setInputValue(e.target.value);

            const handleAdd = () => {
                if (inputValue.trim() === '') return;
                const newName = { id: nextId, text: inputValue };

                // 스프레드 문법을 활용하여 새 배열을 만들어 setter에 전달
                // 그래야 React가 '배열이 바뀌었다'는 사실을 안정적으로 인식할 수 있다
                setNames([...names, newName]);
                setNextId(nextId + 1);
                setInputValue('');
            }

            const handleRemove = (idToRemove) => {
                /*
                    배열.filter(callback)
                    배열의 각 요소를 검사한 뒤 콜백 함수가 true를 반환한 요소만 모아
                    새 배열을 반환한다
                */
                // id로 넘어온 값과 일치하지 않는 객체만 다시 배열로 반환
                const updateNames = names.filter(name => name.id !== idToRemove);
                setNames(updateNames);
            }

            return (
                <>
                    <input
                        type="text"
                        placeholder="이름을 입력하세요"
                        value={inputValue}
                        onChange={handelChange}
                    />
                    <button onClick={handleAdd}>추가</button>

                    <ul>
                        {names.map(name => (
                            <li key={name.id} onDoubleClick={() => handleRemove(name.id)}>{name.text}
                                <button onClick={() => handleRemove(name.id)}>
                                    삭제
                                </button></li>
                        ))}
                    </ul>
                </>
            )
        }

- useEffect 기본 문법
useEffect(() => {});

function Timer () {

            useEffect(() => {
                console.log('타이머가 시작되었습니다.(Mount)');

                const timerId = setInterval(() => {
                    console.log('...1초 경과...');
                }, 1000)

                return () => {
                    console.log('타이머를 정리합니다(Unmount)');
                    clearInterval(timerId);
                }
            }, []);

            return (
                <>
                <h3>타이머가 동작 중입니다.(콘솔을 확인하세요)</h3>
                </>
            )
        }

        function App() {
                const [showTimer, setShowTimer] = useState(true);
            return (
                <>
                    <Counter />
                    <hr/>
                    <button onClick={() => setShowTimer(!showTimer)}>타이머 보이기/숨기기</button>
                    {showTimer && <Timer/>}
                </>
            )
        }

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- JSX 문법을 사용할 땐 소괄호 내에서 해야 인식 가능하다.
- 컴포넌트의 핵심은 재사용가능하게 만들어 효율적으로 활용하는 것이다.
- map 메서드로 배열을 불러들여오는 문법이 아직 익숙하지 않아 헷갈린다. 적응하고 외워야한다.


### 4. 내일 공부할 내용 (Next)

