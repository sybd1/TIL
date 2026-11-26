## [2026-11-26] LangChain RAG

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### Text Splitter
- 긴 문서를 작은 단위로 나누고 그 작은 단위를 chunk라고 한다. chunk가 지나치게 크면 불필요한 내용이 함께 검색되고, 지나치게 작으면 문맥이 끊어진다.
- chunk overlap은 앞 chunk의 일부를 다음 chunk에 **겹쳐** 문맥 손실을 줄인다.
- RecursiveCharacterTextSplitter(chunk_overlap=chunk_overlap, chunk_size=120): 구분자 규칙으로 자른다. 문단(\n\n) -> 줄(\n) -> 공백 -> 글자 순으로 시도하며 chunk_size 이하로 맞춘다. 자르는 것은 Splitter, 벡터로 바꾸는 것은 임베딩 모델이다.
    - chunk_size: 청크 하나의 최대 글자 수.
    - chunk_overlap: 이웃한 청크끼리 겹치는 글자 수. 잘리는 곳의 문맥을 보존한다.
- split_documents(): Document 리스트를 청크 Document 리스트로 만든다. metadata는 유지된다.

### 2. 코드 예시 (Code)
```text

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)



### 4. 내일 공부할 내용 (Next)

