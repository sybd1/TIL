## [2026-11-26] LangChain RAG

### 오늘 배운 핵심 개념 (What I Learned)
#### Text Splitter
- 긴 문서를 작은 단위로 나누고 그 작은 단위를 chunk라고 한다. chunk가 지나치게 크면 불필요한 내용이 함께 검색되고, 지나치게 작으면 문맥이 끊어진다.
- chunk overlap은 앞 chunk의 일부를 다음 chunk에 **겹쳐** 문맥 손실을 줄인다.

- RecursiveCharacterTextSplitter(chunk_overlap=chunk_overlap, chunk_size=120): 구분자 규칙으로 자른다. 문단(\n\n) -> 줄(\n) -> 공백 -> 글자 순으로 시도하며 chunk_size 이하로 맞춘다. 자르는 것은 Splitter, 벡터로 바꾸는 것은 임베딩 모델이다.
    - chunk_size: 청크 하나의 최대 글자 수.
    - chunk_overlap: 이웃한 청크끼리 겹치는 글자 수. 잘리는 곳의 문맥을 보존한다.
- split_documents(): Document 리스트를 청크 Document 리스트로 만든다. metadata는 유지된다.

#### retrieval 검색
> 조건에 맞는 데이터를 찾아오는 검색 단계
문서 읽기 -> 조각 나누기 -> 임베딩, 저장 -> 질문별 검색 -> 근거를 넣어 답변 생성

- Embedding 임베딩: 텍스트를 의미가 비슷하면 가까워지는 숫자 목록(벡터)으로 바꾸는 것이다.
- OpenAIEmbeddings(): 텍스트를 벡터로 바꾸는 모델. 답변용 ChatOpenAI와 다르다.
- 코사인 유사도: 두 벡터의 방향이 얼마나 비슷한지 계산한다. 질문과 청크를 비교한다.
- InMemoryVectorStore(): 벡터를 메모리에 저장한다. 프로그램이 끝나면 사라진다. 해당 클래스 소괄호 안에 임베딩 모델을 넣는다.
    - add_documents(chunks): 메모리에 청크를 저장한다.
- as_retriever(search_kwargs={"k": 2}): "벡터 저장소를 검색기(Retriever)로 변환해 줘"라는 뜻이다. 질문과 가까운 청크를 2개 가져오는 검색기를 만든다. 질문 → 관련 Document 목록을 돌려주는 검색 창구.
    - {"k": 2}: 가장 비슷한 청크를 몇 개 가져올지 정하는 옵션이다. k가 크면 근거가 많아지는 대신 프롬프트가 길어지고 관련 없는 내용이 섞일 수 있다.
- retriever.invoke(): 질문과 가까운 순서의 Document 리스트를 반환한다. 질문을 연결된 임베딩 모델로 벡터화 하고, 저장된 문서 벡터와 비교한다.
- 튜플: 대괄호 안에 소괄호는 값을 변경할 수 없는 리스트이다.

#### ChatBot Memory
- LLM은 이전 대화를 기억하지 못해요. 요청마다 새로 시작하는 stateless이다.
> 요청 순서: 공통지시(system) -> 이전 대화(history) -> 이번 질문(human)
- MessagesPlaceholder("history"): 메시지 여러 개가 들어올 빈자리이다. {question}은 문자열 하나를 채우고, 이건 메시지 리스트를 통째로 끼워 넣는다.
- HumanMessage: 사용자 메시지 객체이다. {"role":"user","content":...}를 LangChain 객체로 만든 것이고, 모델의 답은 AIMessage이다.

```python
trim_messages(
            HISTORY,
            max_tokens=count,   # 남길 최대 양.
            token_counter=len,	# 메세지 개수를 센다.
            strategy="last",    # 뒤쪽(최신)부터 남긴다.
            start_on="human",   # 잘라낸 결과가 사용자 메시지로 시작해야 한다.
            allow_partial=False # 메세지 한 개를 중간에서 자르지 않는다. 통째로 넣거나 통째로 뺀다.
        )
```

##### **트레이드오프: 많이 남기면 정확하지만 비용이 늘고, 적게 남기면 싸지만 앞 내용을 잊는다.**

> 01: 이전 대화를 내가 직접 history에 담아서 보냄
> 03: 이번 질문만 보내면, thread_id로 이전 기록을 자동으로 불러와 붙임

- checkpointer: 대화 기록(실행 상태)을 저장하는 장치이다.
    - checkpointer=InMemorySaver: 실행 상태를 프로그램 메모리에 보관하고 프로그램이 끝나면 사라진다.
- thread_id: 대화방 식별자. 같은 thread_id면 이전 기록을 불러오고, 다르면 별개의 대화이다.
- agent.get_state(config).values["messages"]: 해당 thread_id의 현재 상태를 가져오고, 그 안의 메세지 목록을 꺼낸다.


### 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- 벡터는 숫자 리스트, 임베딩은 텍스트를 의미가 담긴 벡터로 바꾸는 일이다.
- 벡터 임베딩: 벡터로 바꾼 임베딩이라는 뜻. 보통 임베딩과 같은 뜻으로 사용한다.

```text
1. 문서를 작은 조각(청크)으로 자른다
2. 각 조각을 숫자 목록(벡터) 으로 바꾼다. 뜻이 비슷한 글은 비슷한 숫자가 나와요
3. 이 숫자들을 벡터 저장소에 보관한다 (미리 해 두는 준비 작업)
4. 질문이 들어오면 질문도 숫자로 바꾼다
5. 질문 숫자와 가장 가까운 숫자를 가진 조각 k개를 꺼낸다 ← 이게 검색
```


