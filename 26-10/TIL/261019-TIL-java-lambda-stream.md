## [2026-10-19] Java Lambda, Stream

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### Lambda
- **하나의 추상 메서드를 가진 함수형 인터페이스**의 구현을 간결하게 표현하는 이름 없는 함수의 개념이다.
    - 함수형 인터페이스는 추상메서드가 하나뿐이어야 한다. 두개 이상을 만들면 @FunctionalInterface 어노테이션이 컴파일러 에러를 일으킨다.
- 매개변수와 실행할 동작만 작성한다.
    - 람다식: (a, b) -> a + b;
- 람다가 참조하는 지역변수는 처음 정한 뒤 다시 대입할 수 없다. 람다식이 참조하는 지역변수 값을 변경하려고 하면 자바가 컴파일러 에러를 일으킨다. 자바는 그 지역변수의 값을 상수처럼 취급한다.

##### Lambda 표준 함수형 인터페이스
- 인터페이스를 계속 하나 하나 만들어서 사용하는 불편한 방식대신, Java에서 미리 만들어둔 편리한 함수형 인터페이스를 사용한다.

- Consumer<T> / accept(): 값을 받아서 사용하고(소비) 반환 값은 없다.
- Supplier<T> / accept(): 값은 받지 않고 결과를 반환.
- Function<T, R> / apply(): T 타입의 값을 받아, R의 다른 타입 결과로 변환(제네릭이기 때문에 참조 타입을 사용해야한다.)하고, apply로 값을 반환한다.
- Predicate<T> / test(): 값을 받아 조건을 검사하고 boolean 결과를 test()메서드로 반환.
- UnaryOperator<T> / apply(): 입력과 반환 타입이 같은 경우 사용. apply 메서드로 전달받은 값을 람다식에 넣어 실행하고 그 결과를 반환하는 역할을 한다.
- BiPredicate<T, U> / test(): 값 두 개를 받아 boolean으로 반환. (제네릭이 받는 참조 타입은 값이 달라도 상관없다.)

##### 메서드 참조
- 람다가 새로운 동작을 만들지 않고, 이미 존재하는 메서드 하나를 그대로 호출할 때, 그 호출을 **클래스이름::정적메서드이름** 형태로 간결하게 표현하는 문법이다.
    - 람다식: Function<String, Integer> parseInt = value -> Integer.parseInt(value);
    - 메서드 참조 형식: Function<String, Integer> parseIntReference = Integer::parseInt;
        System.out.println(parseIntReference.apply("123"));
---------
#### Stream API
- 컬렉션 인터페이스에 들어있는 여러 데이터를 선언적으로 필터링, 변환, 정렬, 집계 및 수집할 수 있도록 제공하는 API이다.

- stream(): 요소를 차례로 처리할 stream을 만든다.
- filter(): 조건에 맞는 데이터만 걸러내고, Stream 값을 반환한다.
- map(): 각 데이터를 다른 값으로 변환하고, Stream 값을 반환한다.
- forEach(): 각 데이터를 하니씩 처리한다. 반환값은 없다.
- sorted(): 데이터를 정렬하고, Stream 값을 반환한다.

- Optional<참조 타입>: 값이 존재할 수도, 존재하지 않을 수도 있음을 표현하는 컨테이너.
    - ifPresent(): Optional 안에 값이 있을 때만 전달한 Consumer를 진행.
- distinct(): 중복 요소를 제거하고 Stream을 반환.
- mapToInt: IntStream으로 변환 -> sum() 수행 가능.
    - sum(): 남은 요소 합계.
    - average(): 남은 요소 평균. 반환 타입은 OptionalDouble이다.

- Comparator 인터페이스
    - Comparator.reverseOrder(): 자연 정렬의 역순 비교 기준을 제공하고, Comparator 값을 반환한다.

- String 클래스
    - startsWith(): 문자열이 특정 문자로 시작하는지 확인하고, boolean 값을 반환한다.

- Collectors 클래스
    - Collectors.toList(): 스트림으로 처리한 데이터를 List 켈렉션으로 모을 때 사용한다.
    - Collectors.groupingBy(): 스트림의 요소들을 특정 기준으로 분류해서 그룹별로 모아 주는 기능.
        - collect(): Stream의 요소들을 지정한 방식으로 모아서 하나의 결과로 만드는 최종 연산.

##### 최종 연산
- Stream은 한 번 사용하고 나면 소비된다. 최종 연산이 한 번 실행되면 해당 메서드는 다시 사용이 불가능하다.
- count(): 현재 남아있는 요소의 개수를 세고, long 값을 반환한다.
- anyMatch(): 하나라도 조건을 만족하면 true 반환
- allMatch(): 모든 요소가 조건을 만족하면 true 반환
- forEach()
- collect()


### 2. 코드 예시 (Code)
```text

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)



### 4. 내일 공부할 내용 (Next)

