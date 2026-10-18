## [2026-10-16] Java exception, IO, enum

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### Exception 예외
##### Error & Exception
- Error: 예측 불가능. JVM 에러, 정전, 시스템, 컴퓨터 자체 하드웨어적인 문제 등
- Exception : 개발자가 미리 예측하고 처리할 수 있는 미약한 오류. 정확히는 프로그램이 처리할 수 있는 예외 상황 등이다.
    - Exception Handling (예외처리): 프로그램 실행 중 발생 문제를 감지하고 안내/기록/복구 방법을 정하는 핵심 메커니즘.
    - **Exception도 클래스이다.** 모든 예외처리는 java.lang.Throwable을 최상위 클래스에 두고 있다. Exception은 그 자식(RuntimeException 제외)으로 컴파일 단계에서 예외 처리 여부를 강제한다.
    - 예외처리는 크게 Checked Exception과 unChecked Exception 두 가지로 나뉜다.
        - Checked Exception: 컴파일러가 처리를 강제한다. try-catch 또는 throws 선언해야한다.
            - throws: 예외를 직접 처리하지 않고 호출한 쪽으로 처리를 맡긴다. 예외를 실제로 발생시키는 명령이 아니라, 메서드에서 발생할 수 있는 예외를 선언하는 것.
            - throw: 현재 위치에서 예외 객체를 직접 던진다. 그 예외를 try-catch로 처리하거나 메서드에 throws로 선언해야한다.
        - Unchecked Exception: 컴파일러가 처리를 강제하지 않으며 주로 실행 중(Runtime) 중 발견된다.
- printStackTrace(): 예외가 발생해 전달된 호출 경로 확인. 실제 서비스에서는 보통 로깅 도구를 이용하여 필요한 정보를 기록한다.
- 예외처리를 하려고 하는 메서드는 alt + enter 단축키를 이용해 자동으로 try/catch 구문을 만들 수 있다.
- 메서드 시그니처: 메서드를 구분하는 이름과 매개변수 목록. 메서드 식별 목록. 메서드 시그니처는 특정 위치를 뜻하는 게 아니라, 메서드를 식별하는 정보를 뜻한다.
- Exception을 상속받은 자식 클래스는 Exception 클래스 내의 기능을 자동으로 사용할 수 있게 된다.

##### Exception 범위
- 부모 클래스가 선언한 Exception 메서드를 자식 클래스에서 오버라이딩 했을 경우.
    - 선언하지 않은 것을 허용한다.
    - 같은 범위도 허용한다.
    - 부모보다 더 구체적인 범위도 허용한다.
    - **부모보다 더 넓은 범위의 Exception은 허용하지 않는다**.
-------------
#### IO (Input Stream 입력 / Output Stream 출력)
- Stream: 데이터가 한 쪽에서 다른 쪽으로 연속적으로 흘러가는 개념으로 사용한다. 단방향이며 입/출력 스트림을 따로 구성해야한다.
- **사용이 끝난 Stream은 반드시 닫아줘야한다** (자원 반납). close() 메서드로 닫을 수 있다.
- Input/Output Stream 흐름: 파일 -> Input Stream -> 프로그램 -> Output Stream -> 파일
    - Input: 프로그램이 데이터를 받아들임.
    - Output: 프로그램이 데이터를 내보냄.
    - **입/출력의 기준은 프로그램**이다.

`파일을 읽거나 쓰는 과정뿐 아니라 파일을 생성하거나 삭제하는 과정에서도 외부 환경의 영향을 받아 실패할 수 있기 때문에 입/출력 클래스는 예외 처리를 해주어야한다.`

##### File 
- java.io.File 존재하지 않는 파일의 경로와 관련 정보를 나타내는 객체를 만들 수 있다. File 객체를 사용한다고 실제 파일이 생성되는 것이 아니다. 메서드를 활용해 실제 프로그램에 저장,삭제,수정 등을 할 수 있다.
- File 메서드
    - createNewFile(): boolean값 반환. 새 파일을 만들면 true, 이미 파일이 존재하면 false 반환. 실제로 파일을 생성해주고, 그 파일이 실제로 존재하는지 체크하는 메서드.
    - length(): 파일 크기
    - getPath(): 경로 (컨텐츠 루트 기준 경로)
    - getAbsolutePath(): 절대 경로 (더 구체적인 경로 디스크에서 처음부터 끝까지)
    - delete(): 실제로 해당 파일이 삭제된다.

##### Byte 단위 Stream
- FileInputStream: 파일의 입력된 데이터를 byte 단위로 읽는 input Stream. 이미지, 영상, 텍스트 등 모든 파일은 Byte로 읽을 수 있다. 다만 텍스트를 한글 같은(유니코드) 문자로 처리할 때는 Reader 계열을 사용하는 편이 알맞다. Byte값 하나하나 반환하다 보면 유니코드(텍스트)를 그대로 올바르게 읽지 못하기 때문이다.
    - read(): 파일에 기록된 값을 1Byte씩 읽어온다. 더 이상 읽을 데이터가 없으면 -1을 반환. 그래서 주로 데이터를 읽어올 때 "while문과, != -1" 연산자 문법을 활용해 값을 활용한다.

- FileOutputStream: 데이터를 1Byte씩 파일에 출력하는 Output Stream. 이 클래스의 기본 동작은 덮어쓰기이다. 파일 안에 수정된 값이 있더라도 덮어씌워 버린다. 이어쓰기가 필요하다면 new FileOutputStream(path, true)처럼 append 옵션을 선택해야한다.
    - write(): 파일에 1Byte씩 값을 저장할 수 있다.
    - byte 기본 자료형으로 배열을 이용하여 여러 바이트를 한번에 기록할 수 있다.
        - ASCII(아스키코드)로 97이 a, 10이 개행문자(엔터로 줄바꿈)이다.

`try-with-resources 구문`
`try () 괄호 안에서 Stream을 만들면 try 블록이 끝날 때 자동으로 close가 호출된다.`

##### 문자 단위 Stream
- FileReader: Byte 단위가 아닌 문자 단위로 텍스트를 읽는 Input Stream이다.
    - read(): 문자 단위 Stream에서는 문자 단위로 읽어온다. 역시나 더 이상 읽을 데이터가 없으면 -1을 반환한다.
        - inputStreamReader: 보조스트림으로 혼자 사용할 수 없고, Byte Stream을 감싸 문자 변환 기능 추가.
        - StandardCharsets.UTF-8: 바이트로 해석할 문자 규칙. 한글도 여기에 속한다. 불러올 파일의 값이 UTF-8 규칙에 속하지 않으면 글자가 깨질 수 있다.

        `FileInputStream() 메서드가 해당 주소값에 있는 파일의 값을 byte 단위로 읽어오고, StandardCharsets.UTF_8은 읽어온 byte 값을 UTF_8 규칙에 맞게 해석한다. InputStreamReader() 메서드가 그 규칙에 따라 가져온 byte 값을 문자 단위로 디코딩 한다. 마지막에 read() 메서드를 사용해 해당 문자의 코드값을 int로 반환한다.`

- FileWriter: 문자 데이터를 텍스트 파일에 ㄹ쓰는 Output Stream
    - write(): 문자 단위 Stream에선 파일에 넣을 문자 단위를 저장할 수 있다.

#### Buffered
##### BufferedWriter / BufferedReader
- 버퍼는 데이터를 모아두는 공간이다. 데이터를 바로바로 파일에 쓰거나 읽는 것보다, 버퍼를 거치면 입출력 횟수를 줄일 수 있다. 기존에 바이트, 문자 단위로 하나하나 내보내는 방식이 아니라, 모아둔 값을 한번에 입/출력해서 효율적으로 처리한다.
- 기본 Stream(FileWriter / FileReader)을 감싸서 사용하는 보조 Stream이다.
    - BufferedWriter: try문 안에 BufferedWriter 객체를 만들어, 그 안에 FileWriter 객체를 감싸서 사용한다. 
        - write(): 이 메서드를 사용해 작성한 데이터는 일단 버퍼에 머무를 수 있다.
        - flush(): 버퍼에 남은 내용을 즉시 파일로 밀어내는 메서드이다.
            - try-with-resources문을 사용하면 close()가 호출되면서 close() 메서드 내부에 있는 flush()도 함께 처리된다.
    
    - BufferedReader: try문 안에 BufferedReader 객체를 만들어, 그 안에 FileReader 객체를 감싸서 사용한다.
        - readLine(): 파일 내용을 한 줄씩 읽어 String으로 반환한다. 더 이상 읽을 줄이 없으면 null 값을 반환한다.

##### 형변환 보조 Stream (InputStreamReader / OutputStreamWriter)
- Byte 기반 Stream을 char 기반 Stream으로 디코딩한다.
- System.in은 키보드 입력을 Byte 단위로 받는 inputStream이다.
- inputStreamReader는 그 Byte를 char로 해석해 Reader 계열 클래스로 바꿔준다.
- BufferedReader는 Reader를 감싸서 버퍼 기능과 readLine()을 제공한다.


#### enum
- enum: 사용할 값의 종류를 미리 정의하는 열거 타입. 여러 관련된 **열거 상수를 하나의 독립적인 타입**으로 묶는다. 
- 보통 enum은 필드에 들어갈 수 있는 값을 제한하는 데 자주 사용한다. 
- 단순히 상수 하나를 만드는 것을 넘어, 여러 관련 값을 하나의 타입으로 묶는다. 선언하지 않은 열거 상수는 해당 enum 타입의 값으로 사용할 수 없다
- 허용할 열거 상수를 문자열 대문자로 선언하는 것이 관례이다.
- enum으로 선언하면 그 클래스가 새로운 열거 타입이 된다.
- enum 타입의 클래스의 열거 상수 하나를 처음 사용하면 해당 타입이 초기화 되고, 선언된 모든 열거 상수가 초기화된다. 초기화가 끝난 뒤 다른 상수를 사용해도 생성자가 다시 호출되지는 않는다.
- 

##### enum 문법
- class 자리에 enum을 대신 넣으면 파일이 열거형 파일이 된다.
- 열거 상수(): 소괄호 안은 생성자가 받도록 선언한 다양한 타입의 값을 넣을 수 있다. 그 값을 활용하는 방법은 열거 상수 소괄호 안의 값을 받아올 필드를 선언하고, 해당 타입 클래스 생성자를 만들어 매개변수로 전달받아 필드에 저장하고, Getter 메서드로 필드에 저장된 값을 외부에서 꺼낼 수 있다.
- values(): enum 클래스 내부의 값들을 호출할 수 있는 메서드.
- ordinal(): 현재 상수의 선언 위치를 0부터 반환.
- name(): 같은 열거 상수의 객체 이름을 문자열로 반환.


### 2. 코드 예시 (Code)
```text
- Exception 클래스 상속 관계
Object
└── Throwable
    ├── Error
    │   ├── OutOfMemoryError
    │   └── StackOverflowError
    │
    └── Exception
        ├── IOException                  (Checked Exception)
        ├── SQLException                 (Checked Exception)
        │
        └── RuntimeException             (Unchecked Exception)
            ├── NullPointerException
            ├── ArithmeticException
            ├── ArrayIndexOutOfBoundsException
            └── IllegalArgumentException

- try-with-resources 구문과 보조스트림, UTF-8 구문.
try (Reader reader = new InputStreamReader(
                new FileInputStream("src/com/ohgiraffers/section02/testReader.txt"),
                StandardCharsets.UTF_8))

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)



### 4. 내일 공부할 내용 (Next)
