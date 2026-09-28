## [2026-09-28] Zustand

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### props drilling
- 부모와 자식 사이 중간 컴포넌트들이 사용하지도 않는 state 값들을 전달해주는 상황. 만약 state 값을 수정해야한다면 전달 경로에 있는 파라미터 값을 모두 수정해야해서 유지 보수적인 측면에서 좋지 않아 효율이 떨어진다.

#### Zustand (독일어로 상태라는 뜻)
- props drilling을 방지하며 전역 상태(global state)를 관리하는 라이브러리이다. state 값들을 store라는 컴포넌트 외부에서 가져와 중간 경로의 컴포넌트에게 따로 state 값을 지정해두지 않아도 된다는 장점이 있다. 마치 외부의 공용창고 같은 개념이다. 
- next.js 프레임워크에서 "npm install zustand" 명령어로 설치 가능하다.

#### persist
- zustand의 middleware 기능이다. 변경된 값이 브라우저 저장소 localStorage에 상태가 저장되어 새로고침을 해도 값이 바뀌지 않는다.
- middleware: 기존 동작 중간에 추가 기능이 생긴다.

#### HTTP Method: GET, POST, PATCH, PUT, DELETE
1. C: Create, 새로운 데이터 생성 (POST)
2. R: Read, 데이터 조회 (GET)
3. U: Update, 기존 데이터 수정 (PUT, PATCH)
    - PUT: 자원 전체를 수정할 때
    - PATCH: 자원 일부를 수정할 때
4. D: Delete, 기존 데이터 삭제 (DELETE)
- json-server: localhost:4000에서 연습용 REST API를 띄우는 도구.
- "npm install -D json-server" 협업할 때 gitignore으로 node_modules가 제대로 설치되지 않을 수 있으므로 협업시에는 node_modules 잘 확인하고 npm install으로 package.json에 있는 필요한 라이브러리 잘 다운받자.

#### TanStack
서버 요청과 그 결과를 캐시로 관리하는 라이브러리. 조회는 useQuery, 등록, 수정, 삭제는 useMutation이 맡는다.
- 비동기 함수의 요청을 관리하는 라이브러리. 서버에서 가지고 오는 정보를 편리하게 관리할 수 있다.


### 2. 코드 예시 (Code)
```text
- zustand 기본 문법
import { create } from "zustand"
export const nmixx = create((set) => ({
    members: [],
    addMember: (member) => set((state) => ({
        members: [...state.members, member],
    }))
}));

- zustand persist 문법
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePersistStore = create(
    persist(
        (set) => ({
            theme: "light",
            toggleTheme: () =>
                set((state) =>
                    ({ theme: state.theme === "light" ? "dark" : "light" })),
        }),
        { name: "theme-storage", }  // localStorage에 저장할 때 사용할 키 이름
    )
)

- HTTP Method
const BASE_URL = "http://localhost:4000/posts";

// GET
export const postApi = {
    getPosts: async () => {
        const response = await fetch(BASE_URL);

        if (!response.ok) {
            throw new Error("게시글 목록을 가져오지 못했다");
        }

        return response.json();
    },

// POST
    createPost: async (newPost) => {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "content-Type": "application/json" },
            // stringify: JS 객체를 JSON 본문으로 보낼때 사용
            body: JSON.stringify(newPost),
        });
        if (!response.ok) {
            throw new Error("게시글 등록 실패");
        }
        return response.json();
    },

// PATCH
    updatePost: async (id, updatedTitle) => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PATCH", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title: updatedTitle}),
        });

        if (!response.ok) {
            throw new Error("게시글 수정 실패");
        }
        return response.json();
    },

// DELETE
    deletePost: async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("게시글 삭제 실패");
        }
        return true;    // 성공 여부만 반환
    }
}

- TanStack 문법

- isLoading: 캐시에 데이터가 아직 없고, 첫 요청이 진행 중일 때 true.
- isError: queryFn이 실패해 에러 상태일 때 true.
- refetch: queryFn을 다시 실행한다.
- isFetching: 요청이 진행 중이면 true. 첫 요청도, 이미 데이터가 있는 뒤의 다시 받기도 포함된다. 다시 받는 동안에는 기존 화면을 유지한 채 이 값만 true가 된다.

'use client'

import { fetchUsers } from "@/api/userApi";
import { useQuery } from "@tanstack/react-query";

export default function QueryPage() {
    const { data, isLoading, isError, error, refetch, isFetching } = useQuery({

        // - queryKey: 캐시 이름. ["users"]가 같으면 같은 데이터를 쓴다.
        // - queryFn: 서버에 요청하는 비동기 함수.
        queryKey: ["users"],
        queryFn: fetchUsers,
    });
    
// isLoading
    if (isLoading) {
        return <h1>데이터를 불러오는중...</h1>
    }

// isError
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

// isFetching
            {isFetching && (<p>최신 데이터 확인중...</p>)}
            {data.map((user) => (
                <div key={user.id}>
                    <strong>{user.name}</strong>
                    <p>{user.email}</p>
                </div>
            ))}
            
// refetch
            <button onClick={() => refetch()}>새로고침</button>
        </>
    )
}
```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- rest parameter는 구조분해 할당에서 특정 프로퍼티를 제외하고 나머지 프로퍼티를 새로운 객체로 모으는 문법이다.
```text
const user = { id: 1, password: 'secret', name: '철수', age: 20};

const {password, ...safeUser} = user;
console.log(safeUser);  // { id: 1, name: '철수', age: 20 }
```


### 4. 내일 공부할 내용 (Next)

