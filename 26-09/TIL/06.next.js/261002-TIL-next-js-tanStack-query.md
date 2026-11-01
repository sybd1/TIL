## [2026-10-02] Next.js TanStack Query

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### TanStack Query Cache
- TanStack Query를 사용하면 개발자가 관리하는 '애플리케이션 상태(State) 레벨의 케시'를 저장할 수 있다.
- 백엔드 서버나 DB로 매번 네트워킹(API 요청)하지 않고, 브라우저의 메모리(RAM)에 받아온 데이터를 임시로 저장해 두는 장소.
- TanStack Query를 사용하면 똑같은 화면을 다시 방문하거나 컴포넌트가 리렌더링 될 때마다 매번 다시 불러오지 않고, queryKey를 기준(key-value 구조)으로 데이터를 가져와 JS 객체 형태 메모리에 저장해둔다.
- 첫 요청 시에는 실제 API 요청을 보내서 데이터를 받아온 후, **캐시 메모리에 저장**하고 화면에 뿌려준다. 재요청 시 캐시에 데이터가 있는지 먼저 확인하고 데이터가 존재하면 즉시 캐시된 데이터를 노출하며 동시에 백그라운드에서 벡엔드 API를 재요청(isFetching)하여 최신 데이터로 캐시를 갱신.
- 불필요하고 비용이 많이 드는 작업(네트워크 요청 / 실제 DOM 조작)을 줄이기 위해 메모리에 중간 상태를 두고 비교·재사용한다"는 핵심 철학과 구조적 패턴은 React의 vDOM과 완벽하게 일치한다.

- useQuery: 캐싱 데이터에 존재하는 값들을 TanStack 내부에 존재하는 객체를 이용해 데이터를 보다 효율적으로 다룰 수 있다.
    - data: 비동기 데이터 요청(API 호출)이 성공했을 때 벡엔드 서버로부터 응답받은 실제 데이터가 담깁니다. 데이터를 받아오기 전이나 요청이 실패했을 때는 undefined 상태입니다.
    - isLoading: "캐시된 데이터가 없는 상태에서 완전히 처음 데이터를 가져오는 중인가?"를 나타내는 불리언 값.
    - isFetching: 처음이든 재요청이든 상관없이, 현재 벡엔드와 통신하며 데이터를 받아오는 중인가? 를 나타내는 불리언 값.
    - isError: API 요청이 실패했는지 여부를 알려주는 불리언 값.
    - refetch: 개발자가 원하는 시점에 강제로 API 요청을 다시 보내는 함수


### 2. 코드 예시 (Code)
```text
'use client'

import { fetchUsers } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";

export default function QueryPage() {
    const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
        queryKey: ["users"],    // 사용자 전체 목록
        // queryKey: ["users", 1]  // 1번 사용자
        queryFn: fetchUsers,
    });

    if (isLoading) {
        return <h1>데이터를 불러오는중...</h1>
    }
    if (isError) {
        <>
            return <h1>사용자 정보를 가져오지 못함</h1>
            <p>{error.message}</p>
            <button onClick={() => refetch()}>다시 시도</button>
        </>
    }
     return (
        <>
            <h1>사용자 목록</h1>
            {isFetching && (<p>최신 데이터 확인중...</p>)}
            {data.map((user) => (
                <div key={user.id}>
                    <strong>{user.name}</strong>
                    <p>{user.email}</p>
                </div>
            ))}
            <button onClick={() => refetch()}>새로고침</button>
        </>
    )
}

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- useQuery는 서버 데이터를 가져와 관리하고, useMutation은 서버 데이터를 변경하는 작업을 관리한다.
- 굳이 구조분해할당 하지 않고, users.isLoading 이런식으로 기능을 사용할 수 있다. 작성 방식의 차이다.


### 4. 내일 공부할 내용 (Next)

