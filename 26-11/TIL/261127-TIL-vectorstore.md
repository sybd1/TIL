## [2026-11-27] Vectorstore

### 오늘 배운 핵심 개념 (What I Learned)
#### Jupyter
- 코드를 셀 단위로 실행하고 결과를 바로 볼 수 있는 노트북 환경.
    - 노트북 환경: 코드를 한 줄씩, 한 칸(셀)씩 실행해 가면서 결과를 바로 아래에서 확인하고, 설명과 코드를 한 문서에 같이 적는 방식을 말한다.
- .ipynb 파일
- Path.cwd(): 현재 작업 폴더(current working directory)를 Path 객체로 반환한다. pathlib의 일반 기능이라 .py에서도 쓸 수 있다.
- Jupyter 노트북에는 __file__이 없어서 Path.cwd()를 기준으로 쓴다.
- Path.cwd()는 실행한 위치 기준, Path(__file__).parent는 파일 위치 기준이다.

#### Chroma
- **`Chroma()`**: 벡터 저장소 중 하나이다. InMemoryVectorStore와 같은 역할을 하지만, **디스크(폴더)에 저장**할 수 있어서 프로그램을 꺼도 안 사라진다.
    - collection_name="": 저장소 안의 문서 묶음이다. 폴더 경로와 컬렉션 이름을 함께 구분한다.
    - embedding_function=embeddings: 질문을 벡터로 바꿀 때 쓸 임베딩 모델이다. 저장할 때와 같은 모델이어야 한다.
    - persist_directory=str(DATABASE_DIR): 디스크에 저장할 폴더이다.
        - str(): 문자열로 바꿔서 반환하는 것이다.
- store.get(limit=1): 저장된 데이터를 최대 1건만 가져온다.
- ids: Chroma 라이브러리가 get()의 결과를 딕셔너리로 만들면서 정해 둔 키 이름이다.
- **`add_documents()`**: 문서를 임베딩하고 ID·본문·metadata와 함께 저장.
- **`zip()`**: 같은 위치의 ID·본문·metadata를 튜플로 묶어 순회.
- search_kwargs={"k":2, "filter":{"topic":"policy"}}
    - search_kwargs={"k"=2}: "저장된 청크를 전부 비교해서 줄 세운 뒤, 가장 가까운 상위 2개만 돌려줘"라는 뜻이다. 비교 대상은 전부, 결과 개수가 2개이다.
    - "filter":{"topic":"policy"}: "검색하기 전에, 메타데이터가 이 조건에 맞는 청크만 후보로 삼아라"는 옵션이다.
        - filter 없음:  모든 청크 → 뜻이 가까운 순 → 상위 k개
        - filter 있음:  topic이 "policy"인 청크만 → 뜻이 가까운 순 → 상위 k개

#### CSV와 전용 저장 경로
- **`csv.DictReader`**: 열 이름을 키로 사용해 데이터 행을 딕셔너리로 읽는 도구.
- **`next(reader)`**: 다음 데이터 행 하나를 꺼냄. 열 이름 행 자체와 구분.
- **파일의 `with` 블록**: 블록 종료 시 파일을 닫음. 읽어 둔 문자열·딕셔너리는 변수에 남음.
    - open(): Path 객체로 파일을 여는 메서드이다. with...as 문법을 사용하면 파일을 안전하게 닫아준다. close()로 직접 닫을 수도 있다.
    - encoding="utf-8-sig": 엑셀에서 "CSV UTF-8"로 저장하면 파일 맨 앞에 BOM이라는 눈에 안 보이는 표식(\ufeff)이 붙어요. 그냥 utf-8로 읽으면 첫 열 이름이 "title"이 아니라 "\ufefftitle" 로 읽혀서 row["title"]에서 KeyError가 나요. utf-8-sig는 BOM이 있으면 떼고 읽어 줘요. 없어도 문제없이 읽고요. 엑셀을 거친 한글 CSV에서는 utf-8-sig가 안전해요.
- newline="": 파이썬의 자동 줄바꿈 변환을 꺼서 csv 모듈이 줄바꿈을 직접 처리하게 하는 옵션이다. 줄바꿈 처리를 csv 모듈에 전부 맡긴다. csv를 읽거나 쓸 때 관례로 항상 이 구문을 붙인다. 셀 안의 줄바꿈과 쓰기 시 빈 줄 문제를 막아 준다.
- enumerate(islice(csv.DictReader(file), limit), start=1)
    - islice(..., limit): 그중 앞에서 limit개만 가져온다.


### 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- a, b = x, y 한 줄에 두 변수를 동시에 할당할 수도 있다.



