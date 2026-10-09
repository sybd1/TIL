## [2026-10-07] Java API, Control flow, Array

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### API
- 자바에서 지공해주는 기능이며 찾아와 사용할 대상이다. 자바는 자주 필요한 기능을 클래스와 메서드로 미리 제공한다. 이런 기능을 사용하기 위한 규칙과 도구의 집합을 API라고 부른다.
    - java.lang.Math: 수학에서 자주 사용하는 상수들과 함수들을 미리 구현해 놓은 클래스. 모든 메소드는 static 메소드이다.
        - Math.abs(): 절대값
        - Math.max(): 최대값
        - Math.min(): 최소값
        - Math.random(): 0.0 이상 1.0 미만의 실수 반환
        
#### Scanner
- java.util 안에 존재하는 클래스이자 api이다. import를 해줘야 사용가능하다.
- Scanner 객체 생성 후, 제공하는 메서드를 사용해 사용자의 입력 정보를 분석하는 기능을 사용할 수 있다.
    - nextLine(): 엔터 키 이전까지 한 줄 전체를 문자열로 읽음.
    - next(): 공백 문자나 개행 문자 전 까지 문자열로 읽음.
    - nextInt(): 공백 이전까지의 정수 값을 읽음.
    - nextDouble(): 공백 이전까지의 실수 값을 읽음.
    - java.lang.String의 charAt(index)를 사용해 문자열이 아닌 문자 자료형을 입력 받을 수 있다.
        - \n은 버퍼로 남아 있기에 오류가 날 수 있다. 개행문자 처리를 해야 제대로 된 문자 값을 받을 수 있다. nextLine(); 으로 처리하면 된다.

#### Control flow statement (제어 흐름문)- If, Switch, For, while
- if, else, else if: x가 true/false 인지, y가 true/false인지, z가 true/false인지 찾아 원하는 값을 받는 조건문이다.
- switch: x와 y 값을 받아 z라는 연산 기호로 계산을 할 수 있다. 원하는 값을 받아 원하는 기능을 할 수 있는 조건문 이다.
    - 향상된 -> 문법으로 더 간결하게 작성 가능하다. 메서드를 종료하는 return 대신 yield 0; 문법을 사용해야 한다.
- For: 주로 반복횟수가 정해져 있을 때 사용하는 반복문이다.
- while: 주로 반복횟수가 정해져 있지 않을 때 사용하는 반복문이다. 조건식이 false가 되면 반복이 종료된다.

- break: 가장 가까운 switch문 또는 반복문 즉시 중단하고 탈출.
    - 라벨 사용으로 반복문 전체를 멈출 수 있다. 반복문이 시작하기 전에
    라벨이름: for() ... break 라벨이름;
    라벨 사이에 있는 반복문이 바로 종료된다.
    - boolean flag 변수로도 반복문을 종료시킬 수 있다. 중첩문이라면 안에서 한 번, 밖에서 한 번 각각 종료시켜줘야 한다.
    반복문이 시작하기 전에
    boolean 변수이름 = false; for() ... 변수이름 = true; break;
- continue: 가장 가까운 반복문의 현재 회차만 중단. if문에서 true는 건너뛰고, false는 값을 반환한다.
- return: 반복문이 아니라 현재 메소드 전체 종료.

#### Array
- int[] iar = new int[3]; 배열 선언과 할당을 동시에 한 상태이다.
    - new int[3] 인스턴스 배열은 Heap 영역에 int값 3개를 저장할 배열 객체를 만든다.
    - new가 반환한 참조값은 iar이 있는 Stack에 저장하고, iar을 통해 Heap의 배열 객체에 접근 할 수 있다. = iar은 참조변수로서 Heap의 배열에 주소값을 통해 참조할 수 있다.
- 배열 안에 값을 넣지 않으면 자료형에 맞는 기본값으로 채워진다.
    - 정수는 0, 실수는 0.0, 논리형은 false, 문자형은 \u0000, 참조형은 null이다.
- Java는 JS와 다르게 이미 생성된 배열의 크기를 변경할 수 없다. 
- 배열 안의 문자열을 꺼내고 싶으면, 반복문이나 **Arrays.toString()** 메서드를 사용해야 한다.

#### Two Dimensional Array (2차원 배열)
- 2차원 배열 선언 및 할당: int[][] iar = new int[3][5]; 이 객체는 세로로 3행과 가로로 5열이 있는 2차원 배열의 형태를 담고 있다.
- 가변 배열: 행마다 열의 개수가 달라도 상관없다. int[][] iar2 = {{1, 2}, {3, 4, 5}, {6, 7, 8, 9, 10}};
- 중첩 반복문을 통해 값을 대입해 줄 수 있다.

#### Copy 얕은 복사, 깊은 복사
- 얕은 복사가 일어나는 경우: int[] originArr = {1, 2, 3}; = int[] copyArr = originArr;
    - 두 객체는 Stack에서 Heap의 같은 주소값을 가리킨다.
    - 배열 자체가 복사되는 것이 아니라 배열을 가리키는 참조 값이 복사되므로 copyArr의 요소를 바꾸면 originArr에서도 값이 변경된다. 메서드에 인자로 배열을 전달하거나, 메서드가 배열을 반환할 때 발생한다.
- 깊은 복사: 새로운 배열을 생성하고 기존 배열의 int값 복사. 서로 다른 배열이다.

### 2. 코드 예시 (Code)
```text
- 난수 만들기
// 10 ~ 15까지 난수 발생
int random = (int) (Math.random() * 6) + 10;

- java.util.Random 클래스를 활용한 난수 만들기
// 0 ~ 9 까지 난수 발생
import java.util.Random;
Random random1 = new Random();
int random2 = random1.nextInt(10);

- 배열 반복문
/* 5명의 자바 점수를 정수로 입력받아 합계와 평균을 실수로 구하는 프로그램 만들기 */
import java.util.Scanner;

public class Array {
    static void main(String[] args) {
        
        int[] scores = new int[5];

        Scanner sc = new Scanner(System.in);
        for (int i = 0; i < scores.length; i++) {
            System.out.print((i + 1) + "번째 학생의 점수를 입력 하세요: ");
            scores[i] = sc.nextInt();
        }

        int sum = 0;
        for (int i = 0; i < scores.length; i++) {
            sum += scores[i];
        }

        double avg = (double)sum / scores.length;

        System.out.println("합계: " + sum);
        System.out.println("평균: " + avg);
    }
}

- 2차원 배열 반복문
/* 학생, 과목 수 입력 받아 합계와 평균 구하기 */
import java.util.Scanner;

public class Array2 {
    static void main(String[] args) {

        // 학생 수, 과목 수 입력 받아 설정.
        Scanner sc = new Scanner(System.in);
        System.out.print("학생 수 입력: ");
        int student = sc.nextInt();
        System.out.print("과목 수 입력: ");
        int subject = sc.nextInt();

        // 2차원 배열 객체 만들기
        int[][] scores = new int[student][subject];

        // 반복문을 돌며 학생들 과목 점수 받기
        for (int i = 0; i < student; i++) {
            int sum = 0;
            for (int j = 0; j < subject; j++) {
                System.out.print((i + 1) + "번째 학생의 " + (j + 1) + "번째 과목 점수를 입력: ");
                scores[i][j] = sc.nextInt();

                // 합계
                sum += scores[i][j];

            }


            // 평균
            double avg = (double) sum / scores.length;

            System.out.println("합계: " + sum);
            System.out.println("평균: " + avg);
            System.out.println();
        }
    }
}

- 깊은 복사

int[] originArr = {1, 2, 3, 4, 5};

1. for문을 이용한 수동 복사
int[] copyFor = new int[originArr.length];
for (int i = 0; i < originArr.length; i++) {
    copyFor[i] = originArr[i];
}

2. Arrays.copyOf(원본배열, 복사할 길이);
int[] copyOf = Arrays.copyOf(originArr, originArr.length);

3. System.arraycopy(원본, 원본시작위치, 사본, 사본시작위치, 복사할 길이);
int[] arrayCopy = new int[originArr.length];
System.arraycopy(originArr, 0, arrayCopy, 0, originArr.length);

4. clone() - 간단하지만 크기 조절 불가
int[] copyClone = originArr.clone();


```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- class는 데이터와 그 데이터를 다루는 메서드(특정 작업을 하는 명령 묶음)를 하나로 묶어 둔 설계도 이다. new로 그 설계도를 실행하면 메모리에 실제 객체가 생기고, 그 객체를 Instance라고 부른다.


### 4. 내일 공부할 내용 (Next)

