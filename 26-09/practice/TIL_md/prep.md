### 예습 중인 개념
- 기본적으로 모든 코딩의 핵심은 물리적으로 CPU, GPU의 엔진과 RAM 같은 메모리 하드웨어를 가장 효율적으로 작동하게 하려고 하는 과정과 결과이다. Time-Space Trade-off(시간-공간의 상층관계), Bottleneck(병목현상) 등을 잘 파악하고 공부해서 코딩을 해야한다.









### 예습 해야할 개념

#### 1. DOM & Browser API
브라우저 환경과 사용자의 입력을 제어하는 필수 인터페이스 계층입니다.
- Critical Rendering Path (중요 렌더링 경로, 브라우저가 화면을 그리는 과정)
    - Reflow (리플로우, 레이아웃 재계산)와 Repaint (리페인트, 픽셀 재채색)를 줄이는 성능 최적화.

#### 2. Execution Engine & Memory (자바스크립트 엔진과 메모리 모델)
자바스크립트 코드가 컴퓨터 메모리에서 어떻게 해석되고 제어되는지를 다루는 가장 중요한 심장부입니다.
- Primitive Type vs Reference Type (원시 타입 대 참조 타입) [🔜 핵심]
    - Stack (스택, 값 자체가 복사되는 공간)과 Heap (힙, 메모리 주소만 참조하는 공간)의 동작 원리.
- Execution Context & Call Stack (실행 컨텍스트와 콜 스택) [🔜 핵심]
    - 코드가 실행될 때 생성되는 환경 객체와, 함수 호출 순서를 관리하는 스택 메모리 탑.
- Scope Chain & Lexical Environment (스코프 체인과 렉시컬 환경) [🔜 핵심]
    - 함수가 물리적으로 선언된 위치(Lexical)를 기준으로 바깥쪽 변수를 탐색해 나가는 계층 구조.
- Closure (클로저, 외부 함수의 생명주기가 끝나도 그 변수를 기억하는 내부 함수) [🔜 핵심]
    - 캡슐화, 상태 은닉, 모듈 패턴의 근간이 되는 핵심 원리.
- Hoisting & TDZ (호이스팅과 일시적 사각지대) [🔜 예정]
    - 변수/함수 선언문이 메모리에 우선 등록되는 현상과, let/const가 초기화 전 접근 불가한 영역.

#### 3. Asynchronous & Event Loop (비동기 및 동시성 제어)
단일 스레드(Single Thread, 한 번에 하나의 일만 처리함) 언어인 자바스크립트가 네트워크 통신을 동시에 처리하는 원리입니다.

- Event Loop & Task Queue (이벤트 루프와 태스크 큐) [🔜 핵심]
    - Call Stack이 비어 있을 때 백그라운드 완료 작업을 감시하여 스택으로 밀어 올려주는 감시 루프.
- Microtask Queue vs Macrotask Queue (마이크로태스크 대 매크로태스크 대기열) [🔜 심화]
    - Promise (프로미스) 계통의 작업이 setTimeout 등보다 우선적으로 실행되는 실행 우선순위 규칙.
Promise & async / await (프로미스와 비동기 제어 구문) [🔜 실무 필수]
비동기 작업의 성공/실패 상태 머신과, 콜백 지옥을 동기식 코드처럼 직관적으로 만드는 문법.


#### 4. Object-Oriented & Modern Paradigm (객체 지향과 최신 개발 패러다임)
대규모 프로젝트의 유지보수성을 결정하는 객체 및 코드 구조화 기법입니다.

- this Binding (디스 바인딩, 호출 시점에 동적으로 결정되는 실행 문맥 객체) [🔜 핵심]
    - 일반 함수, 화살표 함수, 생성자 함수, call/apply/bind에 따라 달라지는 this 판정 규칙.
- Prototype & Inheritance (프로토타입과 프로토타입 체인 상속) [🔜 심화]
    - 자바스크립트가 클래스 없이도 객체 간 메서드를 유전자처럼 물려주는 상속 메커니즘.
- Immutability & Shallow/Deep Copy (불변성과 얕은 복사/깊은 복사) [🔜 실무 필수]
    - 원본 데이터를 훼손하지 않고 상태를 변경하기 위한 객체 복제 테크닉 (React (리액트)의 필수 선결 조건).
- Module System (모듈 시스템, ESM/CommonJS) [🔜 실무 필수]
    - 코드를 파일 단위로 쪼개어 import/export로 의존성을 조립하는 구조화 방식.