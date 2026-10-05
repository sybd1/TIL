"use client";

import { useState } from "react";

const SEED = [
  { id: 1, title: "변수와 타입", track: "JS", done: true },
  { id: 2, title: "배열 메서드", track: "JS", done: false },
  { id: 3, title: "State와 Props", track: "React", done: true },
  { id: 4, title: "리스트 추가 삭제", track: "React", done: false },
  { id: 5, title: "App Router", track: "Next", done: false },
];

export default function BeginnerPage() {
  // 1. 기억할 값 세 개. State(상태, 이 컴포넌트가 기억하는 값).
  // cards: 카드 목록. 처음 값은 SEED.
  const [cards, setCards] = useState(SEED);
  // keyword: 검색창에 친 글자. 처음 값은 "".
  const [keyword, setKeyword] = useState("");
  // trackFilter: 고른 과목. 처음 값은 "ALL".
  const [trackFilter, setTrackFilter] = useState("ALL");
  // 모양: const [값, 값을바꾸는함수] = useState(처음값);

  // 2. 화면에 그릴 카드만 고른 새 배열. 이름은 visibleCards.
  const visibleCards = cards.filter((card) => {
    const trackOk = trackFilter === "ALL" || card.track === trackFilter;
    const text = keyword.trim();
    const keywordOk = text === "" || card.title.includes(text);
    return trackOk && keywordOk;
  });
  // cards를 직접 지우거나 done을 여기서 바꾸지 않는다.
  // filter(필터, 조건에 맞는 요소만 남긴 새 배열)로 고른다.
  // 남길 조건은 둘 다 참이어야 한다.
  // - trackFilter가 "ALL"이면 과목은 모두 통과. 아니면 card.track === trackFilter 인 것만 통과.
  // - keyword의 앞뒤 공백을 지운 값이 ""이면 검색은 모두 통과.
  //   글자가 있으면 card.title 안에 그 글자가 들어 있는 것만 통과.

  // 3. doneCount: visibleCards 중에서 done이 true인 개수.
  // 전체 SEED가 아니라, 지금 화면에 남은 카드만 센다.
  const doneCount = visibleCards.filter((card) => card.done).length;
  // 4. toggleDone(id)
  // cards를 앞에서부터 돌면서 id가 같은 카드만 고친 새 배열을 만든다.
  // 그 카드는 기존 값을 복사한 뒤 done만 반대로 한다. 예: { ...card, done: !card.done }
  // id가 다른 카드는 그 객체를 그대로 둔다.
  // 만든 새 배열을 cards 상태에 넣는다. cards[인덱스].done = ... 처럼 기존 객체를 직접 고치지 않는다.
  function toggleDone(id) {
    const nextCards = cards.map((card) => {
      if (card.id !== id) {
        return card;
      }
      return { ...card, done: !card.done };
    });
    setCards(nextCards);
  }

  return (
    <main>
      <h1>복습 카드 보드</h1>
      <p>
        보이는 카드 {visibleCards.length}개 / 완료 {doneCount}개
      </p>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div>
        <button type="button" onClick={() => setTrackFilter("ALL")}>
          ALL
        </button>
        <button type="button" onClick={() => setTrackFilter("JS")}>
          JS
        </button>
        <button type="button" onClick={() => setTrackFilter("React")}>
          React
        </button>
        <button type="button" onClick={() => setTrackFilter("Next")}>
          Next
        </button>
      </div>
      {visibleCards.length === 0 ? (
        <p>조건에 맞는 카드가 없습니다.</p>
      ) : (
        visibleCards.map((card) => (
          <Card
          key={card.id}
          title={card.title}
          track={card.track}
          done={card.done}
          onToggle={() => toggleDone(card.id)}
          />
        ))
      )}
      {/* 5. 문장 한 줄: 보이는 카드 N개 / 완료 M개
          N은 visibleCards의 개수, M은 doneCount */}

      {/* 6. 검색창 input
          화면에 보이는 글자는 keyword와 항상 같다.
          글자가 바뀔 때마다 keyword 상태를 방금 친 글자로 바꾼다.
          이벤트 객체의 target.value가 그 글자이다. */}

      {/* 7. 버튼 네 개. 보이는 글자는 ALL, JS, React, Next.
          누르면 trackFilter를 그 글자로 바꾼다.
          카드를 지우거나 SEED를 다시 넣지 않는다. 거르는 기준만 바꾼다. */}

      {/* 8. visibleCards의 개수가 0이면
          "조건에 맞는 카드가 없습니다." 만 보여 준다.
          1장 이상이면 visibleCards를 돌면서 Card를 한 장씩 그린다.
          Card에 넘기는 값:
          title={card.title}
          track={card.track}
          done={card.done}
          onToggle={() => toggleDone(card.id)}
          목록을 그릴 때 key={card.id} 를 붙인다. */}
    </main>
  );
}

function Card({ title, track, done, onToggle }) {
  return (
    <article>
      <p>{title}</p>
      <p>{track}</p>
      <p>{done ? "완료" : "미완료"}</p>
      <button type="button" onClick={onToggle}>
        상태 바꾸기
      </button>
    </article>
  );
  // 9. Card는 카드 한 장만 그린다. 목록 State는 여기 두지 않는다.
  // title을 보여 준다.
  // track을 보여 준다.
  // done이 true면 "완료", false면 "미완료".
  // 버튼 글자는 "상태 바꾸기". 누르면 부모에게 받은 onToggle을 호출한다.
  // onToggle이 어떤 id를 뒤집는지는 부모가 이미 정해 두었다.
}