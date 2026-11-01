## [2026-09-23] Next.js basic

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### Next.js 
React로 화면을 만드는 기능 위에, 주소, 파일, 서버 규칙을 정해 둔 Framework(앱을 짜는 뼈대.)
- Node.js: `npm run dev`가 실행되는 Runtime(프로그램이 실제로 도는 환경)
- npm: 패키지를 받고 `package.json`의 명령 (dev, build)를 실행하는 도구.
- npx: 설치해 두지 않은 도구 명령을 그 자리에서 실행. 
    - `npx create-next-app@latest nexts-params` 새로운 Next.js 만드는 명령. 맨 끝 단어 `nexts-params`가 폴더 이름
    ----
- package.json: 받을 패키지 목록, 실행 스크립트
- public: 이미지처럼 주소 그대로 여는 정적 파일
- src/app: 주소와 연결되는 작업 폴더. App Router(폴더가 주소가 되는 방식)의 출발점
- page.js: 그 주소의 화면.
- layout.js: 그 화면을 감싸는 틀.
----
- export defaulf: 그 파일의 대표 컴포넌트. Next.js는 `page.js`, `layout.js`의 default export를 화면으로 쓴다 export가 없으면 올릴 함수를 찾지 못해 에러가 난다.
- import: 다른 파일의 export를 이 파일로 가져올때 사용하는 문법.
- 'use client': `useState`, `useEffect`, `usePathname` 같은 Hook을 사용하려면 반드시 표기해야한다.
#### 주소창을 다루는 use함수
- useRouter(): `router.push("/menu/search?menuName=마늘");` 이런 식으로 검색 같은 이벤트를 누르면 직접 주소를 바꾸는 용도로 사용한다.
- useSearchParms(): 주소가 `/menu/search?menuName=마늘`이면 `menuName` 변수는 글자 "마늘"이 됩니다. 그다음 `searchMenu("마늘")`이 이름에 마늘이 들어간 메뉴만 골라 화면에 그린다. `?` 뒤를 `Query String(쿼리 스트링, 이름=값)`이라고 한다. `get('menuName')`은 그 안에서 `menuName`이라는 이름의 값을 꺼낸다.
- userParams(): `<Link href={`/menu/${menu.menuCode}`}>` 검색 결과에서 메뉴 카드를 누르면 MenuItem이 이런 주소로 보낸다. 메뉴 코드가 1이면 주소는 `/menu/1`입니다. 폴더 이름이 `menu/[menuCode]`라서, 1 자리는 고정된 글자가 아니라 매번 바뀌는 칸. 이 값은 숫자가 아니라 문자열 "1"이라 MenuAPI는 비교 전에 `Number(menuCode)`로 숫자로 바꿔야 한다.
- usePathname(): 주소창 전체를 가져오지 않고, `?` 앞의 경로만 가져온다. 주소가 `http://localhost:3000/menu`이면 pathname은 `"/menu"`이다.
- Suspense: 검색어를 읽는 동안 대신 보여줄 화면. `<Suspense fallback={<h1>검색 조건을 확인하는 중 입니다.</h1>}>`
  `<MenuSearchResultContent />`
`</Suspense>`
----
- Routing: 주소로 화면을 고르는 일. 주소는 `/`는 메인 페이지, `/about` 소개 페이지 이런 식이다. 문서 전체를 다 받지 않고, URL을 보고 그 자리 컴포넌트만 갈아 끼운다
### 2. 코드 예시 (Code)
```text
- App Router
app/page.js → /
Root (루트, 주소의 맨 위)
app/about/page.js → /about
app/menu/[menuCode]/page.js → /menu/1
폴더 한 칸이 값으로 바뀐다

- `<Link href="/">`: 원하는 주소로 이동할 수 있다. 문서 전체를 새로 받지 않고 주소만 바꾼다

node.js에서
서버 켜기: npm run dev
서버 끄기: ctrl + c
```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- **폴더가 주소이고, `page.js`가 화면이며, `layout.js`의 `children`이 그 화면이 꽂히는 자리.** 브라우저 값(`useState`, 주소 읽기, 클릭 이동)이 필요해진 파일만 맨 위에 `'use client'`를 붙인다.


### 4. 내일 공부할 내용 (Next)

