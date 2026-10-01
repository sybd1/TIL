## [2026-10-01] Next.js 복습

### 1. 오늘 배운 핵심 개념 (What I Learned)
- useRouter: <Link> 태그처럼 클릭해서 이동하는 용도가 아니라, 로그인 성공 같은 기능을 실행 한 후에 자동으로 페이지 이동하는 로직 처리용도의 함수. next/navigation에서 불러오는 Hook 함수.
    - router.push('/'): 지정한 경로로 페이지 이동 (뒤로 가기 기록 남음)
    - router.replace('/'): 현재 페이지를 새로운 페이지로 교체 (뒤로 가기 기록 안 남음)
    - router.back(): 이전 페이지로 이동.
    - router.refresh(): 현재 페이지의 서버 데이터(Server Component)만 다시 불러와서 갱신.
- usePathname(현재 URL 경로 읽기): 현재 사용자가 위치한 URL의 경로를 문자열로 가져온다. 헤더/네비게이션 바에서 현재 활성화된 메뉴에 스타일을 줄 때 주로 사용한다.
- useSearchParams(쿼리 스트링 읽기): URL 뒤에 붙는 "?key=value" 형태의 쿼리 파라미터를 읽어온다. 검색어, 카테고리 필터 등을 읽어올 때 사용한다.
- useParams(동적 경로 파라미터 읽기): 폴더 이름이 app/products/[id]/page.js처럼 대괄호로 지정된 동적 라우팅 변수를 읽어온다. 상세 페이지 등에서 URL에 포함된 ID 값을 가져올 때 사용.

### 2. 코드 예시 (Code)
```text
'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

- useRouter
function LoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    // 로그인 처리 로직 성공 후
    router.push('/dashboard');
  };

  return <button onClick={handleLogin}>로그인</button>;
}

- usePathname
const pathname = usePathname(); // 예: '/about' 또는 '/products'

- useSearchParams
const searchParams = useSearchParams();
const query = searchParams.get('search'); // '?search=react' 일 때 'react' 반환

- useParams
const params = useParams();
console.log(params.id); // '/products/123' 이면 '123' 출력
```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)



### 4. 내일 공부할 내용 (Next)

