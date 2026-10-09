## [2026-10-08] Java Copy, Sort, swap

### 1. 오늘 배운 핵심 개념 (What I Learned)
#### Copy 향상된 for문
- 배열을 더 간단하게 조회할 수 있는 반복문.
- 향상된 for문 안에서 변수는 임시적인 지역 변수이다. 조회하면서 값을 바꿀 수는 있지만, 원본 배열에는 영향을 줄 수 없다. 오로지 조회하는 목적이다.


#### Sort (정렬), 임시 변수 Swap
- Arrays.sort(): 자바에서 제공하는 Arrays 클래스 안의 sort() 메서드. 배열을 오름차순으로 정렬할 때 사용한다.
- 임시변수를 사용해 변수 간의 대입된 값을 Swap할 수 있다. 배열 안의 값도 인덱스를 활용해 가능하다.
- 선택 정렬: 정렬되지 않은 범위에서 가장 작은 값의 위치를 찾고, 그 값을 정렬되지 않은 범위의 첫 번째 값과 교환하는 과정을 반복한다.
- 버블 정렬: 인접한 두 요소를 비교하여, 큰 값을 오른쪽으로 계속 이동시킨다. 한 회차가 끝나면 가장 큰 값이 배열의 맨 뒤에 위치하게 된다.



### 2. 코드 예시 (Code)
```text
- 향상된 for문
int[] arr = {1, 2, 3};
for (int value : arr) {
    value += 10;
    System.out.println(value);  // 11, 12, 13 원본 배열에 영향을 주지 않는다.
}

- 임시변수를 사용해 Swap 하는 법
int num1 = 10;
int num2 = 20;

int temp = num1;    // 임시 변수에 10을 담는다.
num1 = num2;        // num2의 20을 num1에 담는다.
num2 = temp;        // 임시 변수에 담아둔 10을 num2에 담는다.

- 선택 정렬
int[] arr = {2, 5, 1, 6, 4, 3}
for (int i = 0; i < arr.length - 1; i++) {
    int minIndex = i;

    for (int j = i + 1; j < arr.length; j++) {
        if (arr[minIndex] > arr[j]) {
            minIndex = j;
        }
    }
    int temp = arr[minIndex];
    arr[minIndex] = arr[i];
    arr[i] = temp;
}

- 버블 정렬
int[] arr = {3, 6, 2, 5, 1, 4};

for (int i = arr.length - 1; i > 0; i--) {
    for (int j = 0; j < i; j++) {
        if (arr[j] > arr[j + 1]) {
            int temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}

- Arrays.sort 오름차순 정렬
Arrays.sort(arr);
System.out.println(Arrays.toString(arr));

- 정렬 및 Swap 활용해서 로또 생성기 제작
import java.util.Arrays;

public class Lotto {
    static void main() {
        // 중복 없는 로또 번호 6개 생성하기
        int[] lotto = new int[6];

        int index = 0;

        while (index < lotto.length) {

            int randomNumbers = (int) (Math.random() * 45) + 1;

            boolean duplication = false;

            for (int i = 0; i < index; i++) {
                if (lotto[i] == randomNumbers) {
                    duplication = true;
                    break;
                }
            }

            if (!duplication) {
                lotto[index] = randomNumbers;
                index++;
            }
        }
        Arrays.sort(lotto);
        System.out.println(Arrays.toString(lotto));
    }
}

```

### 3. 문제 해결 및 에러 (Troubleshooting / 헷갈린 점)
- 선택 정렬은 겨우 이해 했는데, 버블 정렬은 쉽지가 않다.
- boolean flag 문법: 반복문을 시작하기 전에 boolean 자료형을 변수를 만든 뒤 false를 담아두고, 반복문이 끝나기 전에 boolean 자료형 변수에 true 값을 담아주고, break문을 사용하면 가장 가까운 반복문이 종료된다.

### 4. 내일 공부할 내용 (Next)

