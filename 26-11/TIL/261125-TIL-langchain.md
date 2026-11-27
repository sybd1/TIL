## [2026-11-25] LangChain

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### LangChain
LLM을 활용하는 프로그램에서 프롬프트 작성, 모델 호출, 응답 처리를 연결하는 라이브러리. 필요한 단계를 연결해 하나의 실행 흐름(체인)으로 구성할 수 있다.

- LangChain의 프롬프트: AI에게 보낼 입력(문장 + 역할 구조 + 예시 + 형식 지시)을 "빈칸이 있는 틀"로 만들어 두고, 필요할 때 채워서 쓰는 것.
> 라이브러리 설치: pip install langchain-core langchain-openai

- PromptTemplate: 변수가 들어갈 문자열 하나짜리 프롬프트를 만든다. invoke하면 문자열 형태의 결과(StringPromptValue)가 나온다.
- ChatPromptTemplate: system, human, ai 같은 역할이 붙은 메시지 목록 형태의 프롬프트를 만든다. invoke하면 메시지 리스트 형태의 결과(ChatPromptValue)가 나온다.
    - from_template(): 템플릿 문자열로 템플릿 객체를 만든다. {변수}를 자동으로 찾아 입력 변수로 등록한다. ChatPromptTemplate에서는 문자열이 human 메시지 하나가 된다.
    - from_messages(): ("system", ...), ("human", ...)처럼 역할별 메시지를 여러 개 지정할 때 사용한다.
- **invoke**(): LangChain의 Runnable 인터페이스 메서드. Runnable(템플릿, 모델, 파서, 체인 등)에 입력을 넣고 한 번 실행해서 결과를 반환한다. 입력 형식과 출력 형식은 객체마다 다르다. 템플릿은 딕셔너리를 받고, 파서는 문자열을 받는다.

#### Runnable chain
- StrOutputParser(): 모델의 응답 메시지(AIMessage)에서 텍스트를 꺼내 문자열로 반환.
- | (파이프 연산자): 왼쪽의 작업 결과를 오른쪽 작업의 입력으로 넘기도록 연결해준다.

> LCEL (LangChainExpressionLanguage): 파이프 연산자로 Runnable들을 연결해서 체인을 만드는 LangChain 문법이다.

- ChatOpenAI를 설정할 때, use_responses_api=False 로 하면 chat completions api를 사용하겠다는 뜻이다. true로 하면 Responses api를 사용할 수 있고, OpenAI 내장 웹 검색, 파일 검색이 필요하면 검토해볼 수 있다.상황에 맞게 선택하면 된다.

#### Output Parser
- Pydantic: 클래스에 적은 타입과 규칙으로 입력 데이터를 검증하는 Python 라이브러리.
    - BaseModel: 상속해 필요한 항목을 선언하고, 검증을 통과한 값을 객체로 다룬다.
- ConfigDict: 클래스 전체의 검사 설정. Literal과 Field가 항목 하나하나의 규칙이라면, ConfigDict는 클래스 전체에 적용되는 설정이다.
    - extra="forbid": 선언하지 않은 추가 필드는 허용하지 않는다.
- Literal[]: 정해진 값만 허용할 때 사용하는 타입 힌트이다. BaseModel을 상속받으면 타입 힌트도 엄격한 검증 규칙이 된다.
- Field(): 항목에 추가 규칙과 설명을 붙인다.
    - min_length=1: 최소 한 글자 이상이어야 한다는 규칙이다. 빈 문자열은 거부된다.
    - description="판단 근거": 이 항목이 무슨 내용인지 적는 설명이다. 나중에 모델에게 형식을 안내할 때 이 설명도 같이 전달된다.
- PydanticOutputParser(pydantic_object=검증할클래스): JSON을 클래스 규칙으로 검증하고, 통과한 값을 그 클래스의 객체로 반환.
    - get_format_instructions(): 클래스의 항목과 규칙을 모델에게 전달할 JSON 응답 형식 안내로 만든다.
- partial(): 템플릿의 빈칸 중 일부를 미리 채워 둔 새 템플릿을 만든다. 빈칸 일부를 미리 채워서, 남은 빈칸만 나중에 넣으면 되는 새 템플릿을 만든다.

#### Quiz generation
- @model_validator(mode="after"): BaseModel을 상속받은 클래스에서만 사용할 수 있는 데코레이터. 각 필드의 검사를 통과한 뒤(mode="after"), 같은 퀴즈의 보기와 정답을 함께 검사한다.
- set(): 순서가 없고 중복을 허용하지 않는다. 중복을 제외한 값들의 집합을 만든다.
- any(): 값들 중 "하나라도" True이면 True, 전부 False이면 False를 반환한다.

```python
class Nmixx(BaseModel): # Nmixx 클래스는 BaseModel의 자식 클래스가 된다. Java에선 "Nmixx extend BaseModel"과 의미가 같다.
    model_config = ConfigDict(extra="forbid")   # 이 클래스의 검사 설정, 
```
#### LangChain RAG
RAG (Retrieval-Augmented Generation, 검색 증강 생성) : 질문과 관련된 자료를 검색해서 프롬프트에 함께 넣고, 모델이 그 자료를 근거로 답변하게 하는 기법.
- 모델을 재학습하지 않고, 모델이 모르는 내 자료(정책, 문서)를 활용할 수 있다.

##### Loader and Documents
- Documents(): LangChain이 문서를 다루는 표준 객체. 본문과 부가 정보를 함께 보관하는 객체 생성.
    - page_content: 본문 문자열.
    - metadata: 출처, 페이지 같은 부가 정보를 담은 딕셔너리. 답변의 근거 출처를 보여 주거나 검색 범위를 좁힐 때 사용한다.
- Loader: 파일을 읽어 Document 리스트로 바꿔 주는 부품. TextLoader(경로, encoding="utf-8").load()는 파일이 하나여도 Document의 리스트를 반환한다.
    - 리스트를 반환하므로 여러 파일을 모을 때는 append가 아니라 extend를 쓴다.
    - TextLoader는 metadata["source"]에 전체 경로를 넣는다. 파일명만 남기려면 Path(...).name으로 바꾼다.
- Path(__file__).resolve().parent / "data": 현재 파일 기준으로 data 폴더 경로를 만든다.
    - resolve(): 절대 경로로 바꾼다. parent: 한 단계 위 폴더(이 파일이 있는 폴더). /: 경로를 이어 붙이는 pathlib 연산자.
    - 어느 위치에서 실행해도 같은 파일을 찾을 수 있다.
- path.read_text(encoding="utf-8"): 파일 내용을 문자열로 읽는다. 한글이 깨지지 않도록 인코딩을 지정한다.

##### PDF 로드 (pypdf)
- PdfReader(경로): PDF 파일을 읽는다. reader.pages는 페이지 리스트이다.
- page.extract_text(): 해당 페이지의 글자를 문자열로 추출한다. 글자가 없으면 None이 나올 수 있어 `or ""`로 빈 문자열로 바꿔 준다.
    - `A or B`: A가 None이나 빈 문자열처럼 False로 취급되면 B를 사용한다.
- enumerate(reader.pages, start=1): 번호와 페이지를 한 쌍씩 꺼낸다. start=1로 사람이 쓰는 페이지 번호에 맞춘다.
- if not text.strip(): continue: 글자가 없는 페이지는 건너뛴다. 이미지로만 된 페이지(스캔본)는 글자 추출이 안 되며 OCR이 필요하다.

> OCR(Optical Character Recognition, 광학 문자 인식): 이미지 속의 글자를 읽어서 진짜 텍스트(문자열)로 바꿔주는 기술이다.



### 2. 코드 예시 (Code)
```python
# 텍스트 파일 → Document
document = Document(
    page_content=path.read_text(encoding="utf-8"),   # 본문
    metadata={"source": path.name}                   # 출처(파일명)
)

# PDF → 페이지별 Document
reader = PdfReader(DATA_FILE)
for page_number, page in enumerate(reader.pages, start=1):
    text = page.extract_text() or ""
    if not text.strip():
        continue
    documents.append(Document(
        page_content=text.strip(),
        metadata={"source": DATA_FILE.name, "page": page_number}
    ))
```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- dunder, double underscore ("__"): 밑줄 두 개가 붙은 형식. 파이썬이 자체적으로 의미를 정해 둔 특별한 이름이라는 표시. 내가 만든 변수와 겹치지 않게 이런 모양을 사용한다.
    - __name__: 이 파일이 어떻게 실행됐는지 알려 주는 변수.
    - __file__: 현재 파일의 경로
- except APIError as error는 APIError안의 하위 에러들을 error 객체에 담아서 __name__으로 처리하면 실제 어떤 에러가 생겼는지 출력해서 확인할 수 있다.
- except OutputParserException 같은 예외처리는 명확하게 하나의 에러라고 명시했기 때문에 객체에 담지 않는다.
- 텍스트와 문자열은 파이썬에서 같은 str 타입이다. 따옴표로 감싸면 전부 str이다.
- 파이썬의 dict나 list는 파이썬 프로그램의 메모리 안에서만 존재하는 객체라서 데이터를 파일에 저장하거나 인터넷으로 보낼 때는 텍스트(문자열)형태여야 한다. 반대로 파이썬에서 구조(키, 값, 리스트)로 다루려면 문자열이 아니라 파이썬 객체여야 한다.
    - 그래서 파이썬 객체를 내보낼 때는 dumps로 str로 바꾸고, 받아올 때는 loads로 파이썬 객체로 받는 것이다.

### 4. 내일 공부할 내용 (Next)

