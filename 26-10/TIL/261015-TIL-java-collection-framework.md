## [2026-10-15] Java Collection Framework

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### Collection Framework
- 여러 개의 데이터(객체)를 효과적으로 관리하기 위해 자바에서 제공하는 클래스들의 묶음.
- 그 중 Collection의 대표적인 하위 클래스 List, Queue, Set 인터페이스와 Map 인터페이스로 분류된다.
    - List: 배열 형태로 객체를 관리한다.
        - ArrayList: **순서가 있는** 데이터의 집합으로 같은 **데이터 중복 저장**을 허용하는 배열이다. 크기를 동적으로 조절할 수 있는 배열 기반 자료구조이다.
        - LinkedList: **이중 연결 리스트** 방식으로 데이터 관리. 각 요소는 자신의 **앞/뒤** 요소만 기억한다. 정확히는 각 노드가 이전 노드와 다음 노드를 가리키는 참조를 가진다.
    - Queue: 
        - Deque(LIFO): 원래는 양방향에서 값을 자유롭게 꺼내 사용하는 클래스이지만, 한쪽을 막고 Stack처럼 후입선출로 사용하는 편이다.
        - ArrayDeque(FIFO, LIFO): ArrayDeque는 양쪽 끝에서 삽입과 삭제가 모두 가능하기에 FIFO 큐와 LIFO 스택 모두 구현할 수 있지만, 수업 시간에선 양방향이 뚫린 파이프에 한방향에선 데이터를 입력만 하고, 반대 방향은 출력만 하는 선입선출 형태로 사용했다.
    - Set: 순서를 보장하지 않는다. 중복을 허용하지 않는다.
        - HashSet: 중복 제거, 순서 보장하지 않는다.
        - LinkedHashSet: 중복 제거, 입력 순서를 기억하며 유지한다.
        - TreeSet: 중복 제거, 요소를 저장할 때마다 비교 기준에 따라 요소를 정렬해서 보관. String 클래스와 Integer 같은 클래스는 이미 Comparable을 구현하여 자동 정렬된다.

    - Map: Collection의 하위 클래스는 아니다. key와 value를 하나의 쌍(Entry)로 묶어서 관리한다. key는 중복 저장을 허용하지 않고, value는 중복 저장을 허용한다.
        - HashMap: 저장 순서를 유지하지 않는다. 존재하지 않는 key 값은 null을 반환한다.
----

                ArrayList는 특정 순서의 값을 조회 할 때 효율적이다. 
                LinkedList는 중간에 데이터 추가/삭제에 효율적이다. 
                추가/삭제가 많다는 이유만으로 항상 ArrayList보다 빠른 것은 아니다. 
                현업에선 대체로 ArrayList를 사용할 일이 많다.


- ArrayList 메서드
    - add(): 해당 객체에 값을 집어넣을 수 있다.
    - get(): 해당 위치의 값 조회.
    - set(): 해당 위치의 값 수정.
    - remove(인덱스 또는 값): 해당 위치 또는 해당 값 삭제.
    - size(): 현재 저장된 요소 개수 확인. 인덱스 개수가 아닌 정수값으로 반환한다.

- Deque() 메서드
    - push(): 맨 앞에 값을 추가.
    - peek(): 마지막에 쌓은 데이터 확인.
    - pop(): 가장 꼭대기 요소를 **꺼내**고 제거한다.
- Queue() 메서드
    - offer(): 기존 대기열 맨 뒤에 값을 추가.
    - peek(): 맨 앞의 요소를 **확인**.
    - poll(): 맨 앞의 요소를 **꺼내고** 제거한다.


            Quere는 값이 비어있는 경우 null을 반환한다.
            Deque는 값이 비어있는 경우 NoSuchElementException 오류를 일으킨다.

- HapshMap() 메서드
    - put(): 해당 객체에 값을 집어넣을 수 있다. key가 중복되면 교체한다.
    - containsKey(): key 존재 여부 확인. boolean값을 반환
    - keySet(): 모든 키를 Set으로 받아, 키로 값을 다시 조회한다.
    - values(): 모든 value 값들만 Collection으로 반환 받아 순회하는 방법.
    - entrySet(): 모든 key-value 쌍(Entry)를 Set으로 반환한다. key와 value 모두 필요할 때는 이 방식이 가장 직접적이다.
    
 

#### Collections 클래스
- Collection framework를 다루는데 유용한 static 메서드들을 제공하는 유틸리티 클래스
- Collection 인터페이스와는 다르다.
    - Collections.sort(): 오름차순 정렬.
    - sort(Comparator.reverseOder()): 내림차순 정렬. List 인터페이스에서 제공하는 sort 메서드에 Comparator.reverseOrder()를 인자로 전달 한다.


#### 비교 기준을 정하는 인터페이스와 메서드
- Comparable: 객체의 기본 비교 기준을 정함.
    - compareTo(): 그 기준에 따라 객체를 비교.
- Comparator: 별도의 비교 기준을 정함.
    - compare(): 그 기준에 따라 두 객체를 비교.

- 실제 예시: 학생의 기본 정렬 기준을 점수순으로 정하고 싶다면 Comparable을 사용하고, 이름순 정렬도 추가하고 싶다면 Comparator를 별도로 만들 수 있다.

- Comparable + compareTo() : 객체 내부에 비교 기준을 정의
- Comparator + compare() : 객체 외부에 비교 기준을 정의


#### 제네릭 와일드 카드
- 호출할 때 들어오는 정확한 요소 타입은 달라도, 메서드가 허용할 타입의 범위를 정하는 문법.
- 기본 제네릭은 타입을 지정하면 그 타입을 계속 사용해야 했는데, 제네릭 와일드카드는 그 타입의 범위를 직접 정해서 폭 넓은 타입을 사용할 수 있다.
- List<?>: 요소의 타입을 특정하지 않아 어떤 타입의 자료형도 사용할 수 있다.
- List<? extends Number>: Number 또는 그 하위 타입을 요소로 갖는 리스트를 받을 수 있다.
- List<? super Integer>: Integer와 그 상위 타입을 요소로 갖는 리스트를 받을 수 있다.
    - 상속관계: Object <- Number <- Integer


### 2. 코드 예시 (Code)
```text
Collection Framework
│
├── Iterable (Interface)
│   └── Collection (Interface)
│       │
│       ├── List (Interface)
│       │   ├── ArrayList (Class)
│       │   ├── LinkedList (Class)
│       │   └── Vector (Class)
│       │       └── Stack (Class)
│       │
│       ├── Queue (Interface)
│       │   ├── PriorityQueue (Class)
│       │   └── Deque (Interface)
│       │       ├── ArrayDeque (Class)
│       │       └── LinkedList (Class)
│       │
│       └── Set (Interface)
│           ├── HashSet (Class)
│           ├── LinkedHashSet (Class)
│           └── SortedSet (Interface)
│               └── TreeSet (Class)
│
└── Map (Interface)
    ├── Hashtable (Class)
    ├── LinkedHashMap (Class)
    ├── HashMap (Class)
    └── SortedMap (Interface)
        └── TreeMap (Class)

Map 인터페이스는 Collection과 상속관계가 아니다.



- Comparable + compareTo() 문법
// 선언부
public class BookDTO implements Comparable<BookDTO> {
// 메서드
@Override
    public int compareTo(BookDTO o) {
    return Integer.compare(this.number, o.getNumber());
    }
}

- 
// 선언부
public class AscendingPrice implements Comparator<BookDTO> {
// 메서드
    @Override
    public int compare(BookDTO o1, BookDTO o2) {
        return Integer.compare(o1.getPrice(), o2.getPrice());
    }
}

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- Collection이 가지고 있는 클래스와 인터페이스의 구조와 기능은 이해했지만, 어떻게 활용할 수 있을지는 잘 모르겠다.


### 4. 내일 공부할 내용 (Next)

